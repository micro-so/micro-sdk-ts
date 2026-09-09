import { APIResource } from '../core/resource';
import type { Micro } from '../client';
import type { RequestOptions } from '../internal/request-options';
import { buildHeaders } from '../internal/headers';
import { path } from '../internal/utils/path';
import { uuid4 } from '../internal/utils/uuid';

export type ImageMimeType = 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';
export interface ImageUpload { upload_id: string; upload_url: string; fields: Record<string, string>; method: 'POST'; public_url: string; expires_in: number }
export interface RecordImage { url: string | null; photo_url?: string | null; logo_url?: string | null }
export interface ImageScope { teamId?: string }
export interface ImageUploadParams extends ImageScope { file: Blob }

/** Permanent record images. Replacing or removing an image retires its previous URL. */
export class RecordImages extends APIResource {
  constructor(client: Micro, private readonly objectType: 'identity' | 'organization') { super(client); }

  requestUpload(id: string, params: ImageScope & { mime_type: ImageMimeType }, options?: RequestOptions) {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post<ImageUpload>(path`/v2/prism/${teamId}/${this.objectType}/${id}/image/uploads`, { body, ...options });
  }

  complete(id: string, params: ImageScope & { upload_id: string }, options?: RequestOptions) {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post<RecordImage>(path`/v2/prism/${teamId}/${this.objectType}/${id}/image/complete`, { body, ...options });
  }

  importFromUrl(id: string, params: ImageScope & { url: string }, options?: RequestOptions) {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post<RecordImage>(path`/v2/prism/${teamId}/${this.objectType}/${id}/image/import`, { body, ...options });
  }

  remove(id: string, params: ImageScope = {}, options?: RequestOptions) {
    const { teamId = this._client.teamID } = params;
    return this._client.delete<RecordImage>(path`/v2/prism/${teamId}/${this.objectType}/${id}/image`, options);
  }

  /**
   * Uploads one file as a fresh attempt. A caller-supplied idempotency key is
   * scoped to this invocation, so calling `upload` again obtains a new signed
   * form even after an earlier form expires. Low-level `requestUpload` callers
   * should likewise use a fresh key when requesting a replacement form.
   */
  async upload(id: string, params: ImageUploadParams, options?: RequestOptions): Promise<RecordImage> {
    if (!params.file.size || params.file.size > 5 * 1024 * 1024) throw new Error('Images must be between 1 byte and 5 MB');
    if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(params.file.type)) throw new Error('Use JPEG, PNG, GIF or WebP');
    const teamId = params.teamId ?? this._client.teamID;
    const scope = teamId === undefined ? {} : { teamId };
    const invocationID = uuid4();
    const upload = await this.requestUpload(id, { ...scope, mime_type: params.file.type as ImageMimeType }, stepOptions(options, invocationID, 'request'));
    const form = new FormData();
    for (const [key, value] of Object.entries(upload.fields)) form.append(key, value);
    form.append('file', params.file);
    const controller = new AbortController();
    const abort = () => controller.abort();
    if (options?.signal?.aborted) abort();
    else options?.signal?.addEventListener('abort', abort, { once: true });
    const timeout = setTimeout(abort, options?.timeout ?? this._client.timeout);
    try {
      const response = await fetch(upload.upload_url, { method: 'POST', body: form, signal: controller.signal });
      if (!response.ok) throw new Error(`Image upload failed (${response.status})`);
    } finally {
      clearTimeout(timeout);
      options?.signal?.removeEventListener('abort', abort);
    }
    return this.complete(id, { ...scope, upload_id: upload.upload_id }, stepOptions(options, upload.upload_id, 'complete'));
  }
}

function stepOptions(options: RequestOptions | undefined, namespace: string, step: string): RequestOptions | undefined {
  if (!options) return options;
  const headerKey = buildHeaders([options.headers]).values.get('idempotency-key');
  const sourceKey = options.idempotencyKey || headerKey;
  if (!sourceKey) return options;
  const suffix = `:${namespace}:${step}`;
  const hash = idempotencyHash(sourceKey);
  const prefixLength = 255 - suffix.length - hash.length - 1;
  const key = sourceKey.length + suffix.length <= 255
    ? `${sourceKey}${suffix}`
    : `${sourceKey.slice(0, prefixLength)}:${hash}${suffix}`;
  return {
    ...options,
    idempotencyKey: key,
    headers: buildHeaders([options.headers, { 'Idempotency-Key': key }]),
  };
}

function idempotencyHash(value: string): string {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index++) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}
