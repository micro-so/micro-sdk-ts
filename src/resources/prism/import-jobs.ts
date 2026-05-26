// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class ImportJobs extends APIResource {
  /**
   * Poll the status of an async import. Sync imports complete in the original
   * response and don't appear here. Async jobs are retained for 7 days. Returns 404
   * once the job has expired.
   */
  get(
    jobID: string,
    params: ImportJobGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ImportJobGetResponse> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.get(path`/v2/prism/${teamId}/imports/${jobID}`, options);
  }
}

/**
 * Status snapshot of an import job. Same shape used by the POST /import response
 * and by GET /imports/{jobId}.
 */
export interface ImportJobGetResponse {
  /**
   * Null for sync imports (results inlined). Set for async imports.
   */
  job_id: string | null;

  status: 'complete' | 'processing' | 'failed';

  /**
   * Total number of rows in the import.
   */
  total: number;

  created_at?: string;

  /**
   * Set when status=failed; describes the job-level failure (not per-row).
   */
  error?: ImportJobGetResponse.Error;

  expires_at?: string;

  failed?: number;

  /**
   * Rows that have been attempted (succeeded + failed).
   */
  processed?: number;

  /**
   * Per-row outcomes. Always present for sync imports; populated for async imports
   * once the job reaches `complete`.
   */
  results?: Array<ImportJobGetResponse.Result>;

  succeeded?: number;

  updated_at?: string;
}

export namespace ImportJobGetResponse {
  /**
   * Set when status=failed; describes the job-level failure (not per-row).
   */
  export interface Error {
    code?: string;

    message?: string;
  }

  export interface Result {
    id?: string | null;

    created?: boolean;

    error?: Result.Error;

    /**
     * True if the row matched an existing record via the dedupe key.
     */
    existing?: boolean;
  }

  export namespace Result {
    export interface Error {
      code?: string;

      message?: string;
    }
  }
}

export interface ImportJobGetParams {
  teamId?: string;
}

export declare namespace ImportJobs {
  export { type ImportJobGetResponse as ImportJobGetResponse, type ImportJobGetParams as ImportJobGetParams };
}
