// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Micro } from '../client';

export abstract class APIResource {
  protected _client: Micro;

  constructor(client: Micro) {
    this._client = client;
  }
}
