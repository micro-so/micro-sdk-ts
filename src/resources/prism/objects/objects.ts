// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ContactsAPI from './contacts';
import {
  Contact,
  ContactBulkCreateParams,
  ContactBulkCreateResponse,
  ContactCreateParams,
  ContactCreateResponse,
  ContactQueryParams,
  ContactQueryResponse,
  Contacts,
} from './contacts';
import * as IdentitiesAPI from './identities';
import {
  Identities,
  Identity,
  IdentityBulkCreateParams,
  IdentityBulkCreateResponse,
  IdentityCreateParams,
  IdentityCreateResponse,
  IdentityDeleteParams,
  IdentityDuplicateParams,
  IdentityDuplicateResponse,
  IdentityGetParams,
  IdentityGetResponse,
  IdentityQueryParams,
  IdentityQueryResponse,
  IdentityRestoreParams,
  IdentityRestoreResponse,
  IdentityUpdateParams,
  IdentityUpdateResponse,
} from './identities';
import * as OrganizationsAPI from './organizations';
import {
  Organization,
  OrganizationBulkCreateParams,
  OrganizationBulkCreateResponse,
  OrganizationCreateParams,
  OrganizationCreateResponse,
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
  ActionCreateResponse,
  ActionDeleteParams,
  ActionDuplicateParams,
  ActionDuplicateResponse,
  ActionGetParams,
  ActionGetResponse,
  ActionQueryParams,
  ActionQueryResponse,
  ActionRestoreParams,
  ActionRestoreResponse,
  ActionUpdateParams,
  ActionUpdateResponse,
  Actions,
} from './actions/actions';
import * as DealsAPI from './deals/deals';
import {
  Deal,
  DealBulkCreateParams,
  DealBulkCreateResponse,
  DealCreateParams,
  DealCreateResponse,
  DealDeleteParams,
  DealDuplicateParams,
  DealDuplicateResponse,
  DealGetParams,
  DealGetResponse,
  DealQueryParams,
  DealQueryResponse,
  DealRestoreParams,
  DealRestoreResponse,
  DealUpdateParams,
  DealUpdateResponse,
  Deals,
} from './deals/deals';
import * as DocumentsAPI from './documents/documents';
import {
  Document,
  DocumentBulkCreateParams,
  DocumentBulkCreateResponse,
  DocumentCreateParams,
  DocumentCreateResponse,
  DocumentDeleteParams,
  DocumentDuplicateParams,
  DocumentDuplicateResponse,
  DocumentGetParams,
  DocumentGetResponse,
  DocumentQueryParams,
  DocumentQueryResponse,
  DocumentRestoreParams,
  DocumentRestoreResponse,
  DocumentUpdateParams,
  DocumentUpdateResponse,
  Documents,
} from './documents/documents';
import * as EventsAPI from './events/events';
import {
  Event,
  EventGetParams,
  EventGetResponse,
  EventQueryParams,
  EventQueryResponse,
  Events,
} from './events/events';

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
    type ContactCreateResponse as ContactCreateResponse,
    type ContactBulkCreateResponse as ContactBulkCreateResponse,
    type ContactQueryResponse as ContactQueryResponse,
    type ContactCreateParams as ContactCreateParams,
    type ContactBulkCreateParams as ContactBulkCreateParams,
    type ContactQueryParams as ContactQueryParams,
  };

  export {
    Organizations as Organizations,
    type Organization as Organization,
    type OrganizationCreateResponse as OrganizationCreateResponse,
    type OrganizationBulkCreateResponse as OrganizationBulkCreateResponse,
    type OrganizationQueryResponse as OrganizationQueryResponse,
    type OrganizationCreateParams as OrganizationCreateParams,
    type OrganizationBulkCreateParams as OrganizationBulkCreateParams,
    type OrganizationQueryParams as OrganizationQueryParams,
  };

  export {
    Identities as Identities,
    type Identity as Identity,
    type IdentityCreateResponse as IdentityCreateResponse,
    type IdentityUpdateResponse as IdentityUpdateResponse,
    type IdentityBulkCreateResponse as IdentityBulkCreateResponse,
    type IdentityDuplicateResponse as IdentityDuplicateResponse,
    type IdentityGetResponse as IdentityGetResponse,
    type IdentityQueryResponse as IdentityQueryResponse,
    type IdentityRestoreResponse as IdentityRestoreResponse,
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
    type DealCreateResponse as DealCreateResponse,
    type DealUpdateResponse as DealUpdateResponse,
    type DealBulkCreateResponse as DealBulkCreateResponse,
    type DealDuplicateResponse as DealDuplicateResponse,
    type DealGetResponse as DealGetResponse,
    type DealQueryResponse as DealQueryResponse,
    type DealRestoreResponse as DealRestoreResponse,
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
    type ActionCreateResponse as ActionCreateResponse,
    type ActionUpdateResponse as ActionUpdateResponse,
    type ActionBulkCreateResponse as ActionBulkCreateResponse,
    type ActionDuplicateResponse as ActionDuplicateResponse,
    type ActionGetResponse as ActionGetResponse,
    type ActionQueryResponse as ActionQueryResponse,
    type ActionRestoreResponse as ActionRestoreResponse,
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
    type DocumentCreateResponse as DocumentCreateResponse,
    type DocumentUpdateResponse as DocumentUpdateResponse,
    type DocumentBulkCreateResponse as DocumentBulkCreateResponse,
    type DocumentDuplicateResponse as DocumentDuplicateResponse,
    type DocumentGetResponse as DocumentGetResponse,
    type DocumentQueryResponse as DocumentQueryResponse,
    type DocumentRestoreResponse as DocumentRestoreResponse,
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
    type EventGetResponse as EventGetResponse,
    type EventQueryResponse as EventQueryResponse,
    type EventGetParams as EventGetParams,
    type EventQueryParams as EventQueryParams,
  };
}
