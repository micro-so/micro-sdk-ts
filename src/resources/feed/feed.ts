import { APIResource } from '../../core/resource';
import { Updates, FeedUpdate, FeedUpdateCreate, UpdateCreateParams } from './updates';

export class Feed extends APIResource {
  updates: Updates = new Updates(this._client);
}

Feed.Updates = Updates;

export declare namespace Feed {
  export {
    Updates as Updates,
    type FeedUpdate as FeedUpdate,
    type FeedUpdateCreate as FeedUpdateCreate,
    type UpdateCreateParams as UpdateCreateParams,
  };
}
