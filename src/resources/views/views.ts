// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RecordsAPI from './records';
import { Records } from './records';

export class Views extends APIResource {
  records: RecordsAPI.Records = new RecordsAPI.Records(this._client);
}

Views.Records = Records;

export declare namespace Views {
  export { Records as Records };
}
