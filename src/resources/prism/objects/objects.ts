// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ContactsAPI from './contacts';
import { Contact, ContactQueryParams, ContactQueryResponse, Contacts } from './contacts';
import * as OrganizationsAPI from './organizations';
import {
  Organization,
  OrganizationQueryParams,
  OrganizationQueryResponse,
  Organizations,
} from './organizations';
import * as ActionsAPI from './actions/actions';
import {
  Action,
  ActionBulkCreateParams,
  ActionBulkCreateResponse,
  ActionCreateParams,
  ActionDeleteParams,
  ActionDuplicateParams,
  ActionDuplicateResponse,
  ActionGetParams,
  ActionQueryParams,
  ActionQueryResponse,
  ActionRestoreParams,
  ActionUpdateParams,
  Actions,
} from './actions/actions';
import * as DealsAPI from './deals/deals';
import {
  Deal,
  DealBulkCreateParams,
  DealBulkCreateResponse,
  DealCreateParams,
  DealDeleteParams,
  DealDuplicateParams,
  DealDuplicateResponse,
  DealGetParams,
  DealQueryParams,
  DealQueryResponse,
  DealRestoreParams,
  DealUpdateParams,
  Deals,
} from './deals/deals';
import * as DocumentsAPI from './documents/documents';
import {
  Document,
  DocumentBulkCreateParams,
  DocumentBulkCreateResponse,
  DocumentCreateParams,
  DocumentDeleteParams,
  DocumentDuplicateParams,
  DocumentDuplicateResponse,
  DocumentGetParams,
  DocumentQueryParams,
  DocumentQueryResponse,
  DocumentRestoreParams,
  DocumentUpdateParams,
  Documents,
} from './documents/documents';
import * as EventsAPI from './events/events';
import { Event, EventGetParams, EventQueryParams, EventQueryResponse, Events } from './events/events';
import * as IdentitiesAPI from './identities/identities';
import {
  Identities,
  Identity,
  IdentityBulkCreateParams,
  IdentityBulkCreateResponse,
  IdentityCreateParams,
  IdentityDeleteParams,
  IdentityDuplicateParams,
  IdentityDuplicateResponse,
  IdentityGetParams,
  IdentityQueryParams,
  IdentityQueryResponse,
  IdentityRestoreParams,
  IdentityUpdateParams,
} from './identities/identities';

export class Objects extends APIResource {
  contacts: ContactsAPI.Contacts = new ContactsAPI.Contacts(this._client);
  organizations: OrganizationsAPI.Organizations = new OrganizationsAPI.Organizations(this._client);
  identities: IdentitiesAPI.Identities = new IdentitiesAPI.Identities(this._client);
  deals: DealsAPI.Deals = new DealsAPI.Deals(this._client);
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);
  documents: DocumentsAPI.Documents = new DocumentsAPI.Documents(this._client);
  events: EventsAPI.Events = new EventsAPI.Events(this._client);
}

Objects.Contacts = Contacts;
Objects.Organizations = Organizations;
Objects.Identities = Identities;
Objects.Deals = Deals;
Objects.Actions = Actions;
Objects.Documents = Documents;
Objects.Events = Events;

export declare namespace Objects {
  export {
    Contacts as Contacts,
    type Contact as Contact,
    type ContactQueryResponse as ContactQueryResponse,
    type ContactQueryParams as ContactQueryParams,
  };

  export {
    Organizations as Organizations,
    type Organization as Organization,
    type OrganizationQueryResponse as OrganizationQueryResponse,
    type OrganizationQueryParams as OrganizationQueryParams,
  };

  export {
    Identities as Identities,
    type Identity as Identity,
    type IdentityBulkCreateResponse as IdentityBulkCreateResponse,
    type IdentityDuplicateResponse as IdentityDuplicateResponse,
    type IdentityQueryResponse as IdentityQueryResponse,
    type IdentityCreateParams as IdentityCreateParams,
    type IdentityUpdateParams as IdentityUpdateParams,
    type IdentityDeleteParams as IdentityDeleteParams,
    type IdentityBulkCreateParams as IdentityBulkCreateParams,
    type IdentityDuplicateParams as IdentityDuplicateParams,
    type IdentityGetParams as IdentityGetParams,
    type IdentityQueryParams as IdentityQueryParams,
    type IdentityRestoreParams as IdentityRestoreParams,
  };

  export {
    Deals as Deals,
    type Deal as Deal,
    type DealBulkCreateResponse as DealBulkCreateResponse,
    type DealDuplicateResponse as DealDuplicateResponse,
    type DealQueryResponse as DealQueryResponse,
    type DealCreateParams as DealCreateParams,
    type DealUpdateParams as DealUpdateParams,
    type DealDeleteParams as DealDeleteParams,
    type DealBulkCreateParams as DealBulkCreateParams,
    type DealDuplicateParams as DealDuplicateParams,
    type DealGetParams as DealGetParams,
    type DealQueryParams as DealQueryParams,
    type DealRestoreParams as DealRestoreParams,
  };

  export {
    Actions as Actions,
    type Action as Action,
    type ActionBulkCreateResponse as ActionBulkCreateResponse,
    type ActionDuplicateResponse as ActionDuplicateResponse,
    type ActionQueryResponse as ActionQueryResponse,
    type ActionCreateParams as ActionCreateParams,
    type ActionUpdateParams as ActionUpdateParams,
    type ActionDeleteParams as ActionDeleteParams,
    type ActionBulkCreateParams as ActionBulkCreateParams,
    type ActionDuplicateParams as ActionDuplicateParams,
    type ActionGetParams as ActionGetParams,
    type ActionQueryParams as ActionQueryParams,
    type ActionRestoreParams as ActionRestoreParams,
  };

  export {
    Documents as Documents,
    type Document as Document,
    type DocumentBulkCreateResponse as DocumentBulkCreateResponse,
    type DocumentDuplicateResponse as DocumentDuplicateResponse,
    type DocumentQueryResponse as DocumentQueryResponse,
    type DocumentCreateParams as DocumentCreateParams,
    type DocumentUpdateParams as DocumentUpdateParams,
    type DocumentDeleteParams as DocumentDeleteParams,
    type DocumentBulkCreateParams as DocumentBulkCreateParams,
    type DocumentDuplicateParams as DocumentDuplicateParams,
    type DocumentGetParams as DocumentGetParams,
    type DocumentQueryParams as DocumentQueryParams,
    type DocumentRestoreParams as DocumentRestoreParams,
  };

  export {
    Events as Events,
    type Event as Event,
    type EventQueryResponse as EventQueryResponse,
    type EventGetParams as EventGetParams,
    type EventQueryParams as EventQueryParams,
  };
}
