import type RawMicro from '../index';
import { InvalidResponseError, request, type CallOptions } from './simple-core';

export type ContentReadParams = { format?: 'markdown' };
export type ContentSnapshot = {
  format: 'markdown';
  value: string;
  /** Opaque editor-state version. This is not a record metadata version. */
  version: string;
  fidelity: 'exact' | 'rendered' | 'lossy';
  unsupported_blocks: string[];
};
export type DocumentContent = ContentSnapshot & { document_id: string };
export type TaskDescription = ContentSnapshot & { task_id: string };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Read-only content surface; lifecycle and content mutations are not yet exposed. */
export class ContentReader<K extends 'document_id' | 'task_id'> {
  constructor(
    private readonly client: RawMicro,
    private readonly kind: K,
  ) {}

  async get(
    id: string,
    params: ContentReadParams = {},
    options: CallOptions = {},
  ): Promise<ContentSnapshot & Record<K, string>> {
    if (typeof id !== 'string' || !UUID.test(id)) throw new TypeError('Content ID must be a UUID.');
    if (!params || typeof params !== 'object' || Array.isArray(params))
      throw new TypeError('Content read parameters must be an object.');
    for (const key of Object.keys(params)) {
      if (key !== 'format') throw new TypeError(`Unknown content read parameter: ${key}.`);
    }
    if (params.format !== undefined && params.format !== 'markdown')
      throw new TypeError('Content reads currently support markdown.');
    const objectType = this.kind === 'task_id' ? 'action' : 'document';
    const normalizedId = id.toLowerCase();
    const result = await this.client.get<unknown>(
      `/v2/prism/${encodeURIComponent(this.client.teamID)}/${objectType}/${normalizedId}/content`,
      { ...request(options), query: { format: 'markdown' } },
    );
    if (!result || typeof result !== 'object') throw new InvalidResponseError('Invalid content snapshot.');
    const row = result as Record<string, unknown>;
    if (
      row[this.kind] !== normalizedId ||
      row['format'] !== 'markdown' ||
      typeof row['value'] !== 'string' ||
      typeof row['version'] !== 'string' ||
      !row['version'] ||
      !['exact', 'rendered', 'lossy'].includes(row['fidelity'] as string) ||
      !Array.isArray(row['unsupported_blocks']) ||
      row['unsupported_blocks'].some((item) => typeof item !== 'string')
    )
      throw new InvalidResponseError('Invalid content snapshot.');
    return {
      [this.kind]: normalizedId,
      format: 'markdown',
      value: row['value'],
      version: row['version'],
      fidelity: row['fidelity'] as ContentSnapshot['fidelity'],
      unsupported_blocks: [...row['unsupported_blocks']],
    } as ContentSnapshot & Record<K, string>;
  }
}
