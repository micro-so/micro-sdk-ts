// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'list',
    endpoint: '/v2/prism/{teamId}/{objectType}/properties',
    httpMethod: 'get',
    summary: 'Get metadata properties by object type',
    description: 'Get metadata properties by object type',
    stainlessPath: '(resource) prism.properties > (method) list',
    qualified: 'client.prism.properties.list',
    params: [
      'teamId: string;',
      'objectType: string;',
      'autofill?: boolean;',
      "include_options?: boolean | 'true' | 'false' | '0' | '1';",
      'list_id?: string;',
      'term?: string;',
    ],
    response: 'object',
    markdown:
      "## list\n\n`client.prism.properties.list(teamId: string, objectType: string, autofill?: boolean, include_options?: boolean | 'true' | 'false' | '0' | '1', list_id?: string, term?: string): object`\n\n**get** `/v2/prism/{teamId}/{objectType}/properties`\n\nGet metadata properties by object type\n\n### Parameters\n\n- `teamId: string`\n\n- `objectType: string`\n\n- `autofill?: boolean`\n\n- `include_options?: boolean | 'true' | 'false' | '0' | '1'`\n  When false, return property definitions without hydrating select/multiselect option rows. Defaults to true server-side (parseIncludeOptions). Accepts boolean or query-string forms (true/false/0/1). Uses anyOf (not oneOf) so qs/AJV boolean-vs-string ambiguity does not 400 when Speakeasy SDKs send include_options=true.\n\n- `list_id?: string`\n  Scope properties to a specific list/app.\n\n- `term?: string`\n\n### Returns\n\n- `object`\n  Property definitions keyed by object type, then by property definition id (UUID). When the request scopes to a single object type, only that key is present.\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst properties = await client.prism.properties.list('comment');\n\nconsole.log(properties);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.properties.list',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst properties = await client.prism.properties.list('comment');\n\nconsole.log(properties);",
      },
      python: {
        method: 'prism.properties.list',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nproperties = client.prism.properties.list(\n    object_type="comment",\n)\nprint(properties)',
      },
      go: {
        method: 'client.Prism.Properties.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tproperties, err := client.Prism.Properties.List(\n\t\tcontext.TODO(),\n\t\tmicro.PrismPropertyListParamsObjectTypeComment,\n\t\tmicro.PrismPropertyListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", properties)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/$OBJECT_TYPE/properties \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'list_all',
    endpoint: '/v2/prism/{teamId}/properties',
    httpMethod: 'get',
    summary: 'Get metadata properties',
    description: 'Get metadata properties',
    stainlessPath: '(resource) prism.properties > (method) list_all',
    qualified: 'client.prism.properties.listAll',
    params: [
      'teamId: string;',
      'autofill?: boolean;',
      "include_options?: boolean | 'true' | 'false' | '0' | '1';",
      'list_id?: string;',
      'term?: string;',
    ],
    response: 'object',
    markdown:
      "## list_all\n\n`client.prism.properties.listAll(teamId: string, autofill?: boolean, include_options?: boolean | 'true' | 'false' | '0' | '1', list_id?: string, term?: string): object`\n\n**get** `/v2/prism/{teamId}/properties`\n\nGet metadata properties\n\n### Parameters\n\n- `teamId: string`\n\n- `autofill?: boolean`\n\n- `include_options?: boolean | 'true' | 'false' | '0' | '1'`\n  When false, return property definitions without hydrating select/multiselect option rows. Defaults to true server-side (parseIncludeOptions). Accepts boolean or query-string forms (true/false/0/1). Uses anyOf (not oneOf) so qs/AJV boolean-vs-string ambiguity does not 400 when Speakeasy SDKs send include_options=true.\n\n- `list_id?: string`\n  Scope properties to a specific list/app.\n\n- `term?: string`\n\n### Returns\n\n- `object`\n  Property definitions keyed by object type, then by property definition id (UUID). When the request scopes to a single object type, only that key is present.\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.properties.listAll();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.properties.listAll',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.properties.listAll();\n\nconsole.log(response);",
      },
      python: {
        method: 'prism.properties.list_all',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.properties.list_all()\nprint(response)',
      },
      go: {
        method: 'client.Prism.Properties.ListAll',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Properties.ListAll(context.TODO(), micro.PrismPropertyListAllParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/properties \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v2/prism/{teamId}/imports/{jobId}',
    httpMethod: 'get',
    summary: 'Get the status of an import job',
    description:
      "Poll the status of an async import. Sync imports complete in the original response and don't appear here. Async jobs are retained for 7 days. Returns 404 once the job has expired.",
    stainlessPath: '(resource) prism.imports > (method) get',
    qualified: 'client.prism.imports.get',
    params: ['teamId: string;', 'jobId: string;'],
    response:
      "{ job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: { code?: string; message?: string; }; expires_at?: string; failed?: number; processed?: number; results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]; succeeded?: number; updated_at?: string; }",
    markdown:
      "## get\n\n`client.prism.imports.get(teamId: string, jobId: string): { job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: object; expires_at?: string; failed?: number; processed?: number; results?: object[]; succeeded?: number; updated_at?: string; }`\n\n**get** `/v2/prism/{teamId}/imports/{jobId}`\n\nPoll the status of an async import. Sync imports complete in the original response and don't appear here. Async jobs are retained for 7 days. Returns 404 once the job has expired.\n\n### Parameters\n\n- `teamId: string`\n\n- `jobId: string`\n\n### Returns\n\n- `{ job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: { code?: string; message?: string; }; expires_at?: string; failed?: number; processed?: number; results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]; succeeded?: number; updated_at?: string; }`\n  Status snapshot of an import job. Same shape used by the POST /import response and by GET /imports/{jobId}.\n\n  - `job_id: string`\n  - `status: 'complete' | 'processing' | 'failed'`\n  - `total: number`\n  - `created_at?: string`\n  - `error?: { code?: string; message?: string; }`\n  - `expires_at?: string`\n  - `failed?: number`\n  - `processed?: number`\n  - `results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]`\n  - `succeeded?: number`\n  - `updated_at?: string`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst _import = await client.prism.imports.get('jobId');\n\nconsole.log(_import);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.imports.get',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst _import = await client.prism.imports.get('jobId');\n\nconsole.log(_import.job_id);",
      },
      python: {
        method: 'prism.imports.get',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nimport_ = client.prism.imports.get(\n    job_id="jobId",\n)\nprint(import_.job_id)',
      },
      go: {
        method: 'client.Prism.Imports.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\timport_, err := client.Prism.Imports.Get(\n\t\tcontext.TODO(),\n\t\t"jobId",\n\t\tmicro.PrismImportGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", import_.JobID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/imports/$JOB_ID \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v2/prism/{teamId}/contact',
    httpMethod: 'post',
    summary: 'Create object',
    description: 'Create object',
    stainlessPath: '(resource) prism.objects.contacts > (method) create',
    qualified: 'client.prism.objects.contacts.create',
    params: ['teamId: string;', 'default?: object;', 'list?: object;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## create\n\n`client.prism.objects.contacts.create(teamId: string, default?: object, list?: object, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/contact`\n\nCreate object\n\n### Parameters\n\n- `teamId: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst contact = await client.prism.objects.contacts.create();\n\nconsole.log(contact);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.contacts.create',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst contact = await client.prism.objects.contacts.create();\n\nconsole.log(contact.id);",
      },
      python: {
        method: 'prism.objects.contacts.create',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ncontact = client.prism.objects.contacts.create()\nprint(contact.id)',
      },
      go: {
        method: 'client.Prism.Objects.Contacts.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tcontact, err := client.Prism.Objects.Contacts.New(context.TODO(), micro.PrismObjectContactNewParams{\n\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", contact.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/contact \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/prism/{teamId}/contact',
    httpMethod: 'get',
    summary: 'List records of an object type',
    description:
      'Convenience list endpoint. Equivalent to `POST /v2/prism/{teamId}/{objectType}/query` with an empty body, plus query-string sugar for the common cases. Any unrecognized query parameter is interpreted as an equality filter on a property of that name; pass arrays for `in`. Values are received as strings, so non-string property filters via this endpoint may not work — use the `query` endpoint for typed comparisons or anything beyond simple equality.',
    stainlessPath: '(resource) prism.objects.contacts > (method) list',
    qualified: 'client.prism.objects.contacts.list',
    params: [
      'teamId: string;',
      'cursor?: string;',
      'deleted?: boolean;',
      'include_total?: boolean;',
      'limit?: number;',
      'list_id?: string;',
      'select?: string;',
      'sort?: string;',
    ],
    response:
      '{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }',
    markdown:
      "## list\n\n`client.prism.objects.contacts.list(teamId: string, cursor?: string, deleted?: boolean, include_total?: boolean, limit?: number, list_id?: string, select?: string, sort?: string): { data: object[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n**get** `/v2/prism/{teamId}/contact`\n\nConvenience list endpoint. Equivalent to `POST /v2/prism/{teamId}/{objectType}/query` with an empty body, plus query-string sugar for the common cases. Any unrecognized query parameter is interpreted as an equality filter on a property of that name; pass arrays for `in`. Values are received as strings, so non-string property filters via this endpoint may not work — use the `query` endpoint for typed comparisons or anything beyond simple equality.\n\n### Parameters\n\n- `teamId: string`\n\n- `cursor?: string`\n  Opaque cursor from a previous response's `next_cursor`. Pass it back unchanged to fetch the next page.\n\n- `deleted?: boolean`\n  Include soft-deleted records. Pass the literal string `true`.\n\n- `include_total?: boolean`\n  When set to `true`, the response includes a `total` field with the unpaginated row count. Costs an extra pass; prefer `GET .../count` for the unfiltered total.\n\n- `limit?: number`\n  Maximum number of rows to return. Capped server-side at 50.\n\n- `list_id?: string`\n  Scope properties to a specific list/app.\n\n- `select?: string`\n  Comma-separated property slugs to return. Use dot notation for relationships. `id` is always returned at the top level. Defaults to all properties.\n\n- `sort?: string`\n  Comma-separated list of slugs. Prefix with `-` for descending. Example: `sort=-updated_at,name`.\n\n### Returns\n\n- `{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n  - `data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]`\n  - `has_more: boolean`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst contacts = await client.prism.objects.contacts.list();\n\nconsole.log(contacts);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.contacts.list',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst contacts = await client.prism.objects.contacts.list();\n\nconsole.log(contacts.data);",
      },
      python: {
        method: 'prism.objects.contacts.list',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ncontacts = client.prism.objects.contacts.list()\nprint(contacts.data)',
      },
      go: {
        method: 'client.Prism.Objects.Contacts.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tcontacts, err := client.Prism.Objects.Contacts.List(context.TODO(), micro.PrismObjectContactListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", contacts.Data)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/contact \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v2/prism/{teamId}/contact/{contactId}',
    httpMethod: 'get',
    summary: 'Get object',
    description: 'Get object',
    stainlessPath: '(resource) prism.objects.contacts > (method) get',
    qualified: 'client.prism.objects.contacts.get',
    params: ['teamId: string;', 'contactId: string;', 'select?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## get\n\n`client.prism.objects.contacts.get(teamId: string, contactId: string, select?: string): { id: string; default?: object; list?: object; }`\n\n**get** `/v2/prism/{teamId}/contact/{contactId}`\n\nGet object\n\n### Parameters\n\n- `teamId: string`\n\n- `contactId: string`\n\n- `select?: string`\n  Comma-separated property slugs to return. Use dot notation for relationships. `id` is always returned at the top level. Defaults to all properties.\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst contact = await client.prism.objects.contacts.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(contact);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.contacts.get',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst contact = await client.prism.objects.contacts.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(contact.id);",
      },
      python: {
        method: 'prism.objects.contacts.get',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ncontact = client.prism.objects.contacts.get(\n    contact_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(contact.id)',
      },
      go: {
        method: 'client.Prism.Objects.Contacts.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tcontact, err := client.Prism.Objects.Contacts.Get(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectContactGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", contact.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/contact/$CONTACT_ID \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/prism/{teamId}/contact/{contactId}',
    httpMethod: 'patch',
    summary: 'Patch object',
    description: 'Patch object',
    stainlessPath: '(resource) prism.objects.contacts > (method) update',
    qualified: 'client.prism.objects.contacts.update',
    params: [
      'teamId: string;',
      'contactId: string;',
      'default?: object;',
      'list?: object;',
      'Idempotency-Key?: string;',
      'If-Match?: string;',
    ],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## update\n\n`client.prism.objects.contacts.update(teamId: string, contactId: string, default?: object, list?: object, Idempotency-Key?: string, If-Match?: string): { id: string; default?: object; list?: object; }`\n\n**patch** `/v2/prism/{teamId}/contact/{contactId}`\n\nPatch object\n\n### Parameters\n\n- `teamId: string`\n\n- `contactId: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n- `If-Match?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst contact = await client.prism.objects.contacts.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(contact);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.contacts.update',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst contact = await client.prism.objects.contacts.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(contact.id);",
      },
      python: {
        method: 'prism.objects.contacts.update',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ncontact = client.prism.objects.contacts.update(\n    contact_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(contact.id)',
      },
      go: {
        method: 'client.Prism.Objects.Contacts.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tcontact, err := client.Prism.Objects.Contacts.Update(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectContactUpdateParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", contact.ID)\n}\n',
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/$TEAM_ID/contact/$CONTACT_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v2/prism/{teamId}/contact/{contactId}',
    httpMethod: 'delete',
    summary: 'Delete object',
    description: 'Delete object',
    stainlessPath: '(resource) prism.objects.contacts > (method) delete',
    qualified: 'client.prism.objects.contacts.delete',
    params: ['teamId: string;', 'contactId: string;', 'If-Match?: string;'],
    markdown:
      "## delete\n\n`client.prism.objects.contacts.delete(teamId: string, contactId: string, If-Match?: string): void`\n\n**delete** `/v2/prism/{teamId}/contact/{contactId}`\n\nDelete object\n\n### Parameters\n\n- `teamId: string`\n\n- `contactId: string`\n\n- `If-Match?: string`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nawait client.prism.objects.contacts.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.contacts.delete',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.prism.objects.contacts.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');",
      },
      python: {
        method: 'prism.objects.contacts.delete',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.prism.objects.contacts.delete(\n    contact_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)',
      },
      go: {
        method: 'client.Prism.Objects.Contacts.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Prism.Objects.Contacts.Delete(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectContactDeleteParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/contact/$CONTACT_ID \\\n    -X DELETE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'query',
    endpoint: '/v2/prism/{teamId}/contact/query',
    httpMethod: 'post',
    summary: 'Query',
    description: 'Query',
    stainlessPath: '(resource) prism.objects.contacts > (method) query',
    qualified: 'client.prism.objects.contacts.query',
    params: [
      'teamId: string;',
      "query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; };",
      'id?: string | string[];',
      'boxes?: string[];',
      'cursor?: string;',
      'deleted?: boolean;',
      'include_total?: boolean;',
      'sources?: string[];',
    ],
    response:
      '{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }',
    markdown:
      "## query\n\n`client.prism.objects.contacts.query(teamId: string, query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; }, id?: string | string[], boxes?: string[], cursor?: string, deleted?: boolean, include_total?: boolean, sources?: string[]): { data: object[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n**post** `/v2/prism/{teamId}/contact/query`\n\nQuery\n\n### Parameters\n\n- `teamId: string`\n\n- `query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; }`\n  - `select: string[]`\n    Property slugs to select. Use dot notation for relationships (e.g. attendee.contact.first_name). `id` is always returned at the top level of each row and does not need to be selected.\n  - `combinator?: 'AND' | 'OR'`\n    Logical operator for combining filters\n  - `cursor?: string`\n    Opaque cursor from a previous response's `next_cursor`. Pass it back unchanged to fetch the next page. When set, `page` and `limit` are derived from the cursor and any explicit values are ignored.\n  - `filter?: object[]`\n    Filters as [{ slug: { operator: value } }]. For select/multiselect properties, values may be option slugs or option UUIDs.\n  - `limit?: number`\n    Maximum number of rows to return. Capped server-side at 50; requests above the cap are rejected.\n  - `list_id?: string`\n  - `page?: number`\n    Page number (1-based). Prefer `cursor`. Page-number pagination drifts under concurrent writes; use it only for one-shot exports.\n  - `sort?: object[]`\n    Sort order as [{ slug: direction }]. Array order determines sort priority\n\n- `id?: string | string[]`\n\n- `boxes?: string[]`\n\n- `cursor?: string`\n  Alternative location for the opaque cursor (a sibling of `query`). Use whichever feels more natural; if both are present, `query.cursor` wins.\n\n- `deleted?: boolean`\n\n- `include_total?: boolean`\n  When true, the response includes a `total` field with the unpaginated row count. Costs an additional pass over the result set — for unfiltered totals prefer `GET /v2/prism/{teamId}/{objectType}/count` instead.\n\n- `sources?: string[]`\n\n### Returns\n\n- `{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n  - `data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]`\n  - `has_more: boolean`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.contacts.query({ query: { select: ['string'] } });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.contacts.query',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.contacts.query({ query: { select: ['string'] } });\n\nconsole.log(response.data);",
      },
      python: {
        method: 'prism.objects.contacts.query',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.contacts.query(\n    query={\n        "select": ["string"]\n    },\n)\nprint(response.data)',
      },
      go: {
        method: 'client.Prism.Objects.Contacts.Query',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Contacts.Query(context.TODO(), micro.PrismObjectContactQueryParams{\n\t\tQuery: micro.F(micro.PrismObjectContactQueryParamsQuery{\n\t\t\tSelect: micro.F([]string{"string"}),\n\t\t}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/contact/query \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "query": {\n            "select": [\n              "string"\n            ]\n          }\n        }\'',
      },
    },
  },
  {
    name: 'count',
    endpoint: '/v2/prism/{teamId}/contact/count',
    httpMethod: 'get',
    summary: 'Total record count for an object type',
    description:
      'Returns the total number of records of this object type that the caller can see. Avoids the page-overshoot anti-pattern — clients no longer need to keep paging until `has_more` flips false to discover the total. Currently does not apply query filters; for a filtered total, pass `include_total: true` in a POST `/query` body.',
    stainlessPath: '(resource) prism.objects.contacts > (method) count',
    qualified: 'client.prism.objects.contacts.count',
    params: ['teamId: string;', 'list_id?: string;'],
    response: '{ total: number; }',
    markdown:
      "## count\n\n`client.prism.objects.contacts.count(teamId: string, list_id?: string): { total: number; }`\n\n**get** `/v2/prism/{teamId}/contact/count`\n\nReturns the total number of records of this object type that the caller can see. Avoids the page-overshoot anti-pattern — clients no longer need to keep paging until `has_more` flips false to discover the total. Currently does not apply query filters; for a filtered total, pass `include_total: true` in a POST `/query` body.\n\n### Parameters\n\n- `teamId: string`\n\n- `list_id?: string`\n  Scope the count to a specific list/app.\n\n### Returns\n\n- `{ total: number; }`\n\n  - `total: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.contacts.count();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.contacts.count',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.contacts.count();\n\nconsole.log(response.total);",
      },
      python: {
        method: 'prism.objects.contacts.count',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.contacts.count()\nprint(response.total)',
      },
      go: {
        method: 'client.Prism.Objects.Contacts.Count',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Contacts.Count(context.TODO(), micro.PrismObjectContactCountParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Total)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/contact/count \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'find',
    endpoint: '/v2/prism/{teamId}/contact/by/{slug}/{value}',
    httpMethod: 'get',
    summary: 'Find a record by property value',
    description:
      'Returns the single record whose property `{slug}` equals `{value}`. 404 if nothing matches; 409 if more than one record matches.',
    stainlessPath: '(resource) prism.objects.contacts > (method) find',
    qualified: 'client.prism.objects.contacts.find',
    params: ['teamId: string;', 'slug: string;', 'value: string;', 'list_id?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## find\n\n`client.prism.objects.contacts.find(teamId: string, slug: string, value: string, list_id?: string): { id: string; default?: object; list?: object; }`\n\n**get** `/v2/prism/{teamId}/contact/by/{slug}/{value}`\n\nReturns the single record whose property `{slug}` equals `{value}`. 404 if nothing matches; 409 if more than one record matches.\n\n### Parameters\n\n- `teamId: string`\n\n- `slug: string`\n\n- `value: string`\n\n- `list_id?: string`\n  Scope the lookup to a specific list/app.\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.contacts.find('value', { slug: 'slug' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.contacts.find',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.contacts.find('value', { slug: 'slug' });\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.contacts.find',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.contacts.find(\n    value="value",\n    slug="slug",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Contacts.Find',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Contacts.Find(\n\t\tcontext.TODO(),\n\t\t"slug",\n\t\t"value",\n\t\tmicro.PrismObjectContactFindParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/contact/by/$SLUG/$VALUE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'upsert',
    endpoint: '/v2/prism/{teamId}/contact/by/{slug}/{value}',
    httpMethod: 'put',
    summary: 'Upsert by property value',
    description:
      'Idempotent create-or-update keyed on `{slug}={value}`. If exactly one record matches, it is patched and 200 is returned. If none match, a new record is created (with the lookup property set if absent) and 201 is returned. If multiple records match, 409 is returned and you should patch by id instead.',
    stainlessPath: '(resource) prism.objects.contacts > (method) upsert',
    qualified: 'client.prism.objects.contacts.upsert',
    params: [
      'teamId: string;',
      'slug: string;',
      'value: string;',
      'default?: object;',
      'list?: object;',
      'Idempotency-Key?: string;',
    ],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## upsert\n\n`client.prism.objects.contacts.upsert(teamId: string, slug: string, value: string, default?: object, list?: object, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**put** `/v2/prism/{teamId}/contact/by/{slug}/{value}`\n\nIdempotent create-or-update keyed on `{slug}={value}`. If exactly one record matches, it is patched and 200 is returned. If none match, a new record is created (with the lookup property set if absent) and 201 is returned. If multiple records match, 409 is returned and you should patch by id instead.\n\n### Parameters\n\n- `teamId: string`\n\n- `slug: string`\n\n- `value: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.contacts.upsert('value', { slug: 'slug' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.contacts.upsert',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.contacts.upsert('value', { slug: 'slug' });\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.contacts.upsert',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.contacts.upsert(\n    value="value",\n    slug="slug",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Contacts.Upsert',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Contacts.Upsert(\n\t\tcontext.TODO(),\n\t\t"slug",\n\t\t"value",\n\t\tmicro.PrismObjectContactUpsertParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/$TEAM_ID/contact/by/$SLUG/$VALUE \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'bulk_create',
    endpoint: '/v2/prism/{teamId}/contact/import',
    httpMethod: 'post',
    summary: 'Import objects',
    description:
      'Import multiple objects in batch. Properties are keyed by slug. Automatically routes based on size: small batches complete synchronously and return 200 with the final `ImportJob`; large batches start an async job, return 202 with `status: processing` and a `Location` header, and can be polled via `GET /v2/prism/{teamId}/imports/{jobId}`.',
    stainlessPath: '(resource) prism.objects.contacts > (method) bulk_create',
    qualified: 'client.prism.objects.contacts.bulkCreate',
    params: [
      'teamId: string;',
      'objects: { default?: object; list?: object; }[];',
      'options?: { caseInsensitive?: boolean; create_missing_options?: boolean; dedupe_by?: string; list_id?: string; };',
      'Idempotency-Key?: string;',
    ],
    response:
      "{ job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: { code?: string; message?: string; }; expires_at?: string; failed?: number; processed?: number; results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]; succeeded?: number; updated_at?: string; }",
    markdown:
      "## bulk_create\n\n`client.prism.objects.contacts.bulkCreate(teamId: string, objects: { default?: object; list?: object; }[], options?: { caseInsensitive?: boolean; create_missing_options?: boolean; dedupe_by?: string; list_id?: string; }, Idempotency-Key?: string): { job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: object; expires_at?: string; failed?: number; processed?: number; results?: object[]; succeeded?: number; updated_at?: string; }`\n\n**post** `/v2/prism/{teamId}/contact/import`\n\nImport multiple objects in batch. Properties are keyed by slug. Automatically routes based on size: small batches complete synchronously and return 200 with the final `ImportJob`; large batches start an async job, return 202 with `status: processing` and a `Location` header, and can be polled via `GET /v2/prism/{teamId}/imports/{jobId}`.\n\n### Parameters\n\n- `teamId: string`\n\n- `objects: { default?: object; list?: object; }[]`\n  Array of objects to import with property values keyed by slug\n\n- `options?: { caseInsensitive?: boolean; create_missing_options?: boolean; dedupe_by?: string; list_id?: string; }`\n  - `caseInsensitive?: boolean`\n    Whether deduplication should be case insensitive\n  - `create_missing_options?: boolean`\n    When true, unknown values for select/multiselect properties are created as new options instead of failing the import\n  - `dedupe_by?: string`\n    Property slug to deduplicate on\n  - `list_id?: string`\n    App/CRM ID for context (optional)\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: { code?: string; message?: string; }; expires_at?: string; failed?: number; processed?: number; results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]; succeeded?: number; updated_at?: string; }`\n  Status snapshot of an import job. Same shape used by the POST /import response and by GET /imports/{jobId}.\n\n  - `job_id: string`\n  - `status: 'complete' | 'processing' | 'failed'`\n  - `total: number`\n  - `created_at?: string`\n  - `error?: { code?: string; message?: string; }`\n  - `expires_at?: string`\n  - `failed?: number`\n  - `processed?: number`\n  - `results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]`\n  - `succeeded?: number`\n  - `updated_at?: string`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.contacts.bulkCreate({ objects: [{}] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.contacts.bulkCreate',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.contacts.bulkCreate({ objects: [{}] });\n\nconsole.log(response.job_id);",
      },
      python: {
        method: 'prism.objects.contacts.bulk_create',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.contacts.bulk_create(\n    objects=[{}],\n)\nprint(response.job_id)',
      },
      go: {
        method: 'client.Prism.Objects.Contacts.BulkNew',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Contacts.BulkNew(context.TODO(), micro.PrismObjectContactBulkNewParams{\n\t\tObjects: micro.F([]micro.PrismObjectPropertiesParam{{}}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.JobID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/contact/import \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "objects": [\n            {}\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'bulk_update',
    endpoint: '/v2/prism/{teamId}/contact/batch/update',
    httpMethod: 'post',
    summary: 'Bulk update records (partial success)',
    description:
      "Patch up to 100 records in a single call. Each item is attempted independently — failures don't abort the batch. Inspect `results[].status` per item.",
    stainlessPath: '(resource) prism.objects.contacts > (method) bulk_update',
    qualified: 'client.prism.objects.contacts.bulkUpdate',
    params: ['teamId: string;', 'items: { id: string; }[];', 'Idempotency-Key?: string;'],
    response:
      "{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }",
    markdown:
      "## bulk_update\n\n`client.prism.objects.contacts.bulkUpdate(teamId: string, items: { id: string; }[], Idempotency-Key?: string): { results: object[]; summary: object; }`\n\n**post** `/v2/prism/{teamId}/contact/batch/update`\n\nPatch up to 100 records in a single call. Each item is attempted independently — failures don't abort the batch. Inspect `results[].status` per item.\n\n### Parameters\n\n- `teamId: string`\n\n- `items: { id: string; }[]`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }`\n  Partial-success bulk operation result. Inspect `results[].status` per item; the operation as a whole returns 200 even if some items failed.\n\n  - `results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]`\n  - `summary: { failed: number; succeeded: number; total: number; }`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.contacts.bulkUpdate({ items: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.contacts.bulkUpdate',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.contacts.bulkUpdate({\n  items: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],\n});\n\nconsole.log(response.results);",
      },
      python: {
        method: 'prism.objects.contacts.bulk_update',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.contacts.bulk_update(\n    items=[{\n        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n    }],\n)\nprint(response.results)',
      },
      go: {
        method: 'client.Prism.Objects.Contacts.BulkUpdate',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Contacts.BulkUpdate(context.TODO(), micro.PrismObjectContactBulkUpdateParams{\n\t\tItems: micro.F([]micro.PrismObjectContactBulkUpdateParamsItem{{\n\t\t\tID: micro.F("182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"),\n\t\t}}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Results)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/contact/batch/update \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "items": [\n            {\n              "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n            }\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'bulk_delete',
    endpoint: '/v2/prism/{teamId}/contact/batch/delete',
    httpMethod: 'post',
    summary: 'Bulk delete records (partial success)',
    description:
      'Soft-delete up to 100 records in a single call. Same partial-success contract as batch/update.',
    stainlessPath: '(resource) prism.objects.contacts > (method) bulk_delete',
    qualified: 'client.prism.objects.contacts.bulkDelete',
    params: ['teamId: string;', 'ids: string[];', 'Idempotency-Key?: string;'],
    response:
      "{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }",
    markdown:
      "## bulk_delete\n\n`client.prism.objects.contacts.bulkDelete(teamId: string, ids: string[], Idempotency-Key?: string): { results: object[]; summary: object; }`\n\n**post** `/v2/prism/{teamId}/contact/batch/delete`\n\nSoft-delete up to 100 records in a single call. Same partial-success contract as batch/update.\n\n### Parameters\n\n- `teamId: string`\n\n- `ids: string[]`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }`\n  Partial-success bulk operation result. Inspect `results[].status` per item; the operation as a whole returns 200 even if some items failed.\n\n  - `results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]`\n  - `summary: { failed: number; succeeded: number; total: number; }`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.contacts.bulkDelete({ ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.contacts.bulkDelete',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.contacts.bulkDelete({\n  ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],\n});\n\nconsole.log(response.results);",
      },
      python: {
        method: 'prism.objects.contacts.bulk_delete',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.contacts.bulk_delete(\n    ids=["182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"],\n)\nprint(response.results)',
      },
      go: {
        method: 'client.Prism.Objects.Contacts.BulkDelete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Contacts.BulkDelete(context.TODO(), micro.PrismObjectContactBulkDeleteParams{\n\t\tIDs: micro.F([]string{"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Results)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/contact/batch/delete \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "ids": [\n            "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'duplicate',
    endpoint: '/v2/prism/{teamId}/contact/{contactId}/duplicate',
    httpMethod: 'post',
    summary: 'Duplicate object',
    description: 'Duplicate object',
    stainlessPath: '(resource) prism.objects.contacts > (method) duplicate',
    qualified: 'client.prism.objects.contacts.duplicate',
    params: ['teamId: string;', 'contactId: string;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## duplicate\n\n`client.prism.objects.contacts.duplicate(teamId: string, contactId: string, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/contact/{contactId}/duplicate`\n\nDuplicate object\n\n### Parameters\n\n- `teamId: string`\n\n- `contactId: string`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.contacts.duplicate('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.contacts.duplicate',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.contacts.duplicate(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.contacts.duplicate',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.contacts.duplicate(\n    contact_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Contacts.Duplicate',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Contacts.Duplicate(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectContactDuplicateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/contact/$CONTACT_ID/duplicate \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'restore',
    endpoint: '/v2/prism/{teamId}/contact/{contactId}/restore',
    httpMethod: 'post',
    summary: 'Restore object',
    description: 'Restore object',
    stainlessPath: '(resource) prism.objects.contacts > (method) restore',
    qualified: 'client.prism.objects.contacts.restore',
    params: ['teamId: string;', 'contactId: string;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## restore\n\n`client.prism.objects.contacts.restore(teamId: string, contactId: string, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/contact/{contactId}/restore`\n\nRestore object\n\n### Parameters\n\n- `teamId: string`\n\n- `contactId: string`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.contacts.restore('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.contacts.restore',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.contacts.restore(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.contacts.restore',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.contacts.restore(\n    contact_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Contacts.Restore',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Contacts.Restore(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectContactRestoreParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/contact/$CONTACT_ID/restore \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v2/prism/{teamId}/organization',
    httpMethod: 'post',
    summary: 'Create object',
    description: 'Create object',
    stainlessPath: '(resource) prism.objects.organizations > (method) create',
    qualified: 'client.prism.objects.organizations.create',
    params: ['teamId: string;', 'default?: object;', 'list?: object;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## create\n\n`client.prism.objects.organizations.create(teamId: string, default?: object, list?: object, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/organization`\n\nCreate object\n\n### Parameters\n\n- `teamId: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst organization = await client.prism.objects.organizations.create();\n\nconsole.log(organization);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.organizations.create',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst organization = await client.prism.objects.organizations.create();\n\nconsole.log(organization.id);",
      },
      python: {
        method: 'prism.objects.organizations.create',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\norganization = client.prism.objects.organizations.create()\nprint(organization.id)',
      },
      go: {
        method: 'client.Prism.Objects.Organizations.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\torganization, err := client.Prism.Objects.Organizations.New(context.TODO(), micro.PrismObjectOrganizationNewParams{\n\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", organization.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/organization \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/prism/{teamId}/organization',
    httpMethod: 'get',
    summary: 'List records of an object type',
    description:
      'Convenience list endpoint. Equivalent to `POST /v2/prism/{teamId}/{objectType}/query` with an empty body, plus query-string sugar for the common cases. Any unrecognized query parameter is interpreted as an equality filter on a property of that name; pass arrays for `in`. Values are received as strings, so non-string property filters via this endpoint may not work — use the `query` endpoint for typed comparisons or anything beyond simple equality.',
    stainlessPath: '(resource) prism.objects.organizations > (method) list',
    qualified: 'client.prism.objects.organizations.list',
    params: [
      'teamId: string;',
      'cursor?: string;',
      'deleted?: boolean;',
      'include_total?: boolean;',
      'limit?: number;',
      'list_id?: string;',
      'select?: string;',
      'sort?: string;',
    ],
    response:
      '{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }',
    markdown:
      "## list\n\n`client.prism.objects.organizations.list(teamId: string, cursor?: string, deleted?: boolean, include_total?: boolean, limit?: number, list_id?: string, select?: string, sort?: string): { data: object[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n**get** `/v2/prism/{teamId}/organization`\n\nConvenience list endpoint. Equivalent to `POST /v2/prism/{teamId}/{objectType}/query` with an empty body, plus query-string sugar for the common cases. Any unrecognized query parameter is interpreted as an equality filter on a property of that name; pass arrays for `in`. Values are received as strings, so non-string property filters via this endpoint may not work — use the `query` endpoint for typed comparisons or anything beyond simple equality.\n\n### Parameters\n\n- `teamId: string`\n\n- `cursor?: string`\n  Opaque cursor from a previous response's `next_cursor`. Pass it back unchanged to fetch the next page.\n\n- `deleted?: boolean`\n  Include soft-deleted records. Pass the literal string `true`.\n\n- `include_total?: boolean`\n  When set to `true`, the response includes a `total` field with the unpaginated row count. Costs an extra pass; prefer `GET .../count` for the unfiltered total.\n\n- `limit?: number`\n  Maximum number of rows to return. Capped server-side at 50.\n\n- `list_id?: string`\n  Scope properties to a specific list/app.\n\n- `select?: string`\n  Comma-separated property slugs to return. Use dot notation for relationships. `id` is always returned at the top level. Defaults to all properties.\n\n- `sort?: string`\n  Comma-separated list of slugs. Prefix with `-` for descending. Example: `sort=-updated_at,name`.\n\n### Returns\n\n- `{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n  - `data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]`\n  - `has_more: boolean`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst organizations = await client.prism.objects.organizations.list();\n\nconsole.log(organizations);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.organizations.list',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst organizations = await client.prism.objects.organizations.list();\n\nconsole.log(organizations.data);",
      },
      python: {
        method: 'prism.objects.organizations.list',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\norganizations = client.prism.objects.organizations.list()\nprint(organizations.data)',
      },
      go: {
        method: 'client.Prism.Objects.Organizations.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\torganizations, err := client.Prism.Objects.Organizations.List(context.TODO(), micro.PrismObjectOrganizationListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", organizations.Data)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/organization \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v2/prism/{teamId}/organization/{organizationId}',
    httpMethod: 'get',
    summary: 'Get object',
    description: 'Get object',
    stainlessPath: '(resource) prism.objects.organizations > (method) get',
    qualified: 'client.prism.objects.organizations.get',
    params: ['teamId: string;', 'organizationId: string;', 'select?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## get\n\n`client.prism.objects.organizations.get(teamId: string, organizationId: string, select?: string): { id: string; default?: object; list?: object; }`\n\n**get** `/v2/prism/{teamId}/organization/{organizationId}`\n\nGet object\n\n### Parameters\n\n- `teamId: string`\n\n- `organizationId: string`\n\n- `select?: string`\n  Comma-separated property slugs to return. Use dot notation for relationships. `id` is always returned at the top level. Defaults to all properties.\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst organization = await client.prism.objects.organizations.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(organization);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.organizations.get',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst organization = await client.prism.objects.organizations.get(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(organization.id);",
      },
      python: {
        method: 'prism.objects.organizations.get',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\norganization = client.prism.objects.organizations.get(\n    organization_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(organization.id)',
      },
      go: {
        method: 'client.Prism.Objects.Organizations.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\torganization, err := client.Prism.Objects.Organizations.Get(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectOrganizationGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", organization.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/organization/$ORGANIZATION_ID \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/prism/{teamId}/organization/{organizationId}',
    httpMethod: 'patch',
    summary: 'Patch object',
    description: 'Patch object',
    stainlessPath: '(resource) prism.objects.organizations > (method) update',
    qualified: 'client.prism.objects.organizations.update',
    params: [
      'teamId: string;',
      'organizationId: string;',
      'default?: object;',
      'list?: object;',
      'Idempotency-Key?: string;',
      'If-Match?: string;',
    ],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## update\n\n`client.prism.objects.organizations.update(teamId: string, organizationId: string, default?: object, list?: object, Idempotency-Key?: string, If-Match?: string): { id: string; default?: object; list?: object; }`\n\n**patch** `/v2/prism/{teamId}/organization/{organizationId}`\n\nPatch object\n\n### Parameters\n\n- `teamId: string`\n\n- `organizationId: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n- `If-Match?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst organization = await client.prism.objects.organizations.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(organization);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.organizations.update',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst organization = await client.prism.objects.organizations.update(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(organization.id);",
      },
      python: {
        method: 'prism.objects.organizations.update',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\norganization = client.prism.objects.organizations.update(\n    organization_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(organization.id)',
      },
      go: {
        method: 'client.Prism.Objects.Organizations.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\torganization, err := client.Prism.Objects.Organizations.Update(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectOrganizationUpdateParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", organization.ID)\n}\n',
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/$TEAM_ID/organization/$ORGANIZATION_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v2/prism/{teamId}/organization/{organizationId}',
    httpMethod: 'delete',
    summary: 'Delete object',
    description: 'Delete object',
    stainlessPath: '(resource) prism.objects.organizations > (method) delete',
    qualified: 'client.prism.objects.organizations.delete',
    params: ['teamId: string;', 'organizationId: string;', 'If-Match?: string;'],
    markdown:
      "## delete\n\n`client.prism.objects.organizations.delete(teamId: string, organizationId: string, If-Match?: string): void`\n\n**delete** `/v2/prism/{teamId}/organization/{organizationId}`\n\nDelete object\n\n### Parameters\n\n- `teamId: string`\n\n- `organizationId: string`\n\n- `If-Match?: string`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nawait client.prism.objects.organizations.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.organizations.delete',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.prism.objects.organizations.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');",
      },
      python: {
        method: 'prism.objects.organizations.delete',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.prism.objects.organizations.delete(\n    organization_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)',
      },
      go: {
        method: 'client.Prism.Objects.Organizations.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Prism.Objects.Organizations.Delete(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectOrganizationDeleteParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/organization/$ORGANIZATION_ID \\\n    -X DELETE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'query',
    endpoint: '/v2/prism/{teamId}/organization/query',
    httpMethod: 'post',
    summary: 'Query',
    description: 'Query',
    stainlessPath: '(resource) prism.objects.organizations > (method) query',
    qualified: 'client.prism.objects.organizations.query',
    params: [
      'teamId: string;',
      "query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; };",
      'id?: string | string[];',
      'boxes?: string[];',
      'cursor?: string;',
      'deleted?: boolean;',
      'include_total?: boolean;',
      'sources?: string[];',
    ],
    response:
      '{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }',
    markdown:
      "## query\n\n`client.prism.objects.organizations.query(teamId: string, query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; }, id?: string | string[], boxes?: string[], cursor?: string, deleted?: boolean, include_total?: boolean, sources?: string[]): { data: object[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n**post** `/v2/prism/{teamId}/organization/query`\n\nQuery\n\n### Parameters\n\n- `teamId: string`\n\n- `query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; }`\n  - `select: string[]`\n    Property slugs to select. Use dot notation for relationships (e.g. attendee.contact.first_name). `id` is always returned at the top level of each row and does not need to be selected.\n  - `combinator?: 'AND' | 'OR'`\n    Logical operator for combining filters\n  - `cursor?: string`\n    Opaque cursor from a previous response's `next_cursor`. Pass it back unchanged to fetch the next page. When set, `page` and `limit` are derived from the cursor and any explicit values are ignored.\n  - `filter?: object[]`\n    Filters as [{ slug: { operator: value } }]. For select/multiselect properties, values may be option slugs or option UUIDs.\n  - `limit?: number`\n    Maximum number of rows to return. Capped server-side at 50; requests above the cap are rejected.\n  - `list_id?: string`\n  - `page?: number`\n    Page number (1-based). Prefer `cursor`. Page-number pagination drifts under concurrent writes; use it only for one-shot exports.\n  - `sort?: object[]`\n    Sort order as [{ slug: direction }]. Array order determines sort priority\n\n- `id?: string | string[]`\n\n- `boxes?: string[]`\n\n- `cursor?: string`\n  Alternative location for the opaque cursor (a sibling of `query`). Use whichever feels more natural; if both are present, `query.cursor` wins.\n\n- `deleted?: boolean`\n\n- `include_total?: boolean`\n  When true, the response includes a `total` field with the unpaginated row count. Costs an additional pass over the result set — for unfiltered totals prefer `GET /v2/prism/{teamId}/{objectType}/count` instead.\n\n- `sources?: string[]`\n\n### Returns\n\n- `{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n  - `data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]`\n  - `has_more: boolean`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.organizations.query({ query: { select: ['string'] } });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.organizations.query',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.organizations.query({ query: { select: ['string'] } });\n\nconsole.log(response.data);",
      },
      python: {
        method: 'prism.objects.organizations.query',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.organizations.query(\n    query={\n        "select": ["string"]\n    },\n)\nprint(response.data)',
      },
      go: {
        method: 'client.Prism.Objects.Organizations.Query',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Organizations.Query(context.TODO(), micro.PrismObjectOrganizationQueryParams{\n\t\tQuery: micro.F(micro.PrismObjectOrganizationQueryParamsQuery{\n\t\t\tSelect: micro.F([]string{"string"}),\n\t\t}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/organization/query \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "query": {\n            "select": [\n              "string"\n            ]\n          }\n        }\'',
      },
    },
  },
  {
    name: 'count',
    endpoint: '/v2/prism/{teamId}/organization/count',
    httpMethod: 'get',
    summary: 'Total record count for an object type',
    description:
      'Returns the total number of records of this object type that the caller can see. Avoids the page-overshoot anti-pattern — clients no longer need to keep paging until `has_more` flips false to discover the total. Currently does not apply query filters; for a filtered total, pass `include_total: true` in a POST `/query` body.',
    stainlessPath: '(resource) prism.objects.organizations > (method) count',
    qualified: 'client.prism.objects.organizations.count',
    params: ['teamId: string;', 'list_id?: string;'],
    response: '{ total: number; }',
    markdown:
      "## count\n\n`client.prism.objects.organizations.count(teamId: string, list_id?: string): { total: number; }`\n\n**get** `/v2/prism/{teamId}/organization/count`\n\nReturns the total number of records of this object type that the caller can see. Avoids the page-overshoot anti-pattern — clients no longer need to keep paging until `has_more` flips false to discover the total. Currently does not apply query filters; for a filtered total, pass `include_total: true` in a POST `/query` body.\n\n### Parameters\n\n- `teamId: string`\n\n- `list_id?: string`\n  Scope the count to a specific list/app.\n\n### Returns\n\n- `{ total: number; }`\n\n  - `total: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.organizations.count();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.organizations.count',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.organizations.count();\n\nconsole.log(response.total);",
      },
      python: {
        method: 'prism.objects.organizations.count',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.organizations.count()\nprint(response.total)',
      },
      go: {
        method: 'client.Prism.Objects.Organizations.Count',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Organizations.Count(context.TODO(), micro.PrismObjectOrganizationCountParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Total)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/organization/count \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'find',
    endpoint: '/v2/prism/{teamId}/organization/by/{slug}/{value}',
    httpMethod: 'get',
    summary: 'Find a record by property value',
    description:
      'Returns the single record whose property `{slug}` equals `{value}`. 404 if nothing matches; 409 if more than one record matches.',
    stainlessPath: '(resource) prism.objects.organizations > (method) find',
    qualified: 'client.prism.objects.organizations.find',
    params: ['teamId: string;', 'slug: string;', 'value: string;', 'list_id?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## find\n\n`client.prism.objects.organizations.find(teamId: string, slug: string, value: string, list_id?: string): { id: string; default?: object; list?: object; }`\n\n**get** `/v2/prism/{teamId}/organization/by/{slug}/{value}`\n\nReturns the single record whose property `{slug}` equals `{value}`. 404 if nothing matches; 409 if more than one record matches.\n\n### Parameters\n\n- `teamId: string`\n\n- `slug: string`\n\n- `value: string`\n\n- `list_id?: string`\n  Scope the lookup to a specific list/app.\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.organizations.find('value', { slug: 'slug' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.organizations.find',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.organizations.find('value', { slug: 'slug' });\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.organizations.find',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.organizations.find(\n    value="value",\n    slug="slug",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Organizations.Find',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Organizations.Find(\n\t\tcontext.TODO(),\n\t\t"slug",\n\t\t"value",\n\t\tmicro.PrismObjectOrganizationFindParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/organization/by/$SLUG/$VALUE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'upsert',
    endpoint: '/v2/prism/{teamId}/organization/by/{slug}/{value}',
    httpMethod: 'put',
    summary: 'Upsert by property value',
    description:
      'Idempotent create-or-update keyed on `{slug}={value}`. If exactly one record matches, it is patched and 200 is returned. If none match, a new record is created (with the lookup property set if absent) and 201 is returned. If multiple records match, 409 is returned and you should patch by id instead.',
    stainlessPath: '(resource) prism.objects.organizations > (method) upsert',
    qualified: 'client.prism.objects.organizations.upsert',
    params: [
      'teamId: string;',
      'slug: string;',
      'value: string;',
      'default?: object;',
      'list?: object;',
      'Idempotency-Key?: string;',
    ],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## upsert\n\n`client.prism.objects.organizations.upsert(teamId: string, slug: string, value: string, default?: object, list?: object, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**put** `/v2/prism/{teamId}/organization/by/{slug}/{value}`\n\nIdempotent create-or-update keyed on `{slug}={value}`. If exactly one record matches, it is patched and 200 is returned. If none match, a new record is created (with the lookup property set if absent) and 201 is returned. If multiple records match, 409 is returned and you should patch by id instead.\n\n### Parameters\n\n- `teamId: string`\n\n- `slug: string`\n\n- `value: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.organizations.upsert('value', { slug: 'slug' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.organizations.upsert',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.organizations.upsert('value', { slug: 'slug' });\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.organizations.upsert',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.organizations.upsert(\n    value="value",\n    slug="slug",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Organizations.Upsert',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Organizations.Upsert(\n\t\tcontext.TODO(),\n\t\t"slug",\n\t\t"value",\n\t\tmicro.PrismObjectOrganizationUpsertParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/$TEAM_ID/organization/by/$SLUG/$VALUE \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'bulk_create',
    endpoint: '/v2/prism/{teamId}/organization/import',
    httpMethod: 'post',
    summary: 'Import objects',
    description:
      'Import multiple objects in batch. Properties are keyed by slug. Automatically routes based on size: small batches complete synchronously and return 200 with the final `ImportJob`; large batches start an async job, return 202 with `status: processing` and a `Location` header, and can be polled via `GET /v2/prism/{teamId}/imports/{jobId}`.',
    stainlessPath: '(resource) prism.objects.organizations > (method) bulk_create',
    qualified: 'client.prism.objects.organizations.bulkCreate',
    params: [
      'teamId: string;',
      'objects: { default?: object; list?: object; }[];',
      'options?: { caseInsensitive?: boolean; create_missing_options?: boolean; dedupe_by?: string; list_id?: string; };',
      'Idempotency-Key?: string;',
    ],
    response:
      "{ job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: { code?: string; message?: string; }; expires_at?: string; failed?: number; processed?: number; results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]; succeeded?: number; updated_at?: string; }",
    markdown:
      "## bulk_create\n\n`client.prism.objects.organizations.bulkCreate(teamId: string, objects: { default?: object; list?: object; }[], options?: { caseInsensitive?: boolean; create_missing_options?: boolean; dedupe_by?: string; list_id?: string; }, Idempotency-Key?: string): { job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: object; expires_at?: string; failed?: number; processed?: number; results?: object[]; succeeded?: number; updated_at?: string; }`\n\n**post** `/v2/prism/{teamId}/organization/import`\n\nImport multiple objects in batch. Properties are keyed by slug. Automatically routes based on size: small batches complete synchronously and return 200 with the final `ImportJob`; large batches start an async job, return 202 with `status: processing` and a `Location` header, and can be polled via `GET /v2/prism/{teamId}/imports/{jobId}`.\n\n### Parameters\n\n- `teamId: string`\n\n- `objects: { default?: object; list?: object; }[]`\n  Array of objects to import with property values keyed by slug\n\n- `options?: { caseInsensitive?: boolean; create_missing_options?: boolean; dedupe_by?: string; list_id?: string; }`\n  - `caseInsensitive?: boolean`\n    Whether deduplication should be case insensitive\n  - `create_missing_options?: boolean`\n    When true, unknown values for select/multiselect properties are created as new options instead of failing the import\n  - `dedupe_by?: string`\n    Property slug to deduplicate on\n  - `list_id?: string`\n    App/CRM ID for context (optional)\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: { code?: string; message?: string; }; expires_at?: string; failed?: number; processed?: number; results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]; succeeded?: number; updated_at?: string; }`\n  Status snapshot of an import job. Same shape used by the POST /import response and by GET /imports/{jobId}.\n\n  - `job_id: string`\n  - `status: 'complete' | 'processing' | 'failed'`\n  - `total: number`\n  - `created_at?: string`\n  - `error?: { code?: string; message?: string; }`\n  - `expires_at?: string`\n  - `failed?: number`\n  - `processed?: number`\n  - `results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]`\n  - `succeeded?: number`\n  - `updated_at?: string`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.organizations.bulkCreate({ objects: [{}] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.organizations.bulkCreate',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.organizations.bulkCreate({ objects: [{}] });\n\nconsole.log(response.job_id);",
      },
      python: {
        method: 'prism.objects.organizations.bulk_create',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.organizations.bulk_create(\n    objects=[{}],\n)\nprint(response.job_id)',
      },
      go: {
        method: 'client.Prism.Objects.Organizations.BulkNew',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Organizations.BulkNew(context.TODO(), micro.PrismObjectOrganizationBulkNewParams{\n\t\tObjects: micro.F([]micro.PrismObjectPropertiesParam{{}}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.JobID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/organization/import \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "objects": [\n            {}\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'bulk_update',
    endpoint: '/v2/prism/{teamId}/organization/batch/update',
    httpMethod: 'post',
    summary: 'Bulk update records (partial success)',
    description:
      "Patch up to 100 records in a single call. Each item is attempted independently — failures don't abort the batch. Inspect `results[].status` per item.",
    stainlessPath: '(resource) prism.objects.organizations > (method) bulk_update',
    qualified: 'client.prism.objects.organizations.bulkUpdate',
    params: ['teamId: string;', 'items: { id: string; }[];', 'Idempotency-Key?: string;'],
    response:
      "{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }",
    markdown:
      "## bulk_update\n\n`client.prism.objects.organizations.bulkUpdate(teamId: string, items: { id: string; }[], Idempotency-Key?: string): { results: object[]; summary: object; }`\n\n**post** `/v2/prism/{teamId}/organization/batch/update`\n\nPatch up to 100 records in a single call. Each item is attempted independently — failures don't abort the batch. Inspect `results[].status` per item.\n\n### Parameters\n\n- `teamId: string`\n\n- `items: { id: string; }[]`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }`\n  Partial-success bulk operation result. Inspect `results[].status` per item; the operation as a whole returns 200 even if some items failed.\n\n  - `results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]`\n  - `summary: { failed: number; succeeded: number; total: number; }`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.organizations.bulkUpdate({ items: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.organizations.bulkUpdate',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.organizations.bulkUpdate({\n  items: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],\n});\n\nconsole.log(response.results);",
      },
      python: {
        method: 'prism.objects.organizations.bulk_update',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.organizations.bulk_update(\n    items=[{\n        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n    }],\n)\nprint(response.results)',
      },
      go: {
        method: 'client.Prism.Objects.Organizations.BulkUpdate',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Organizations.BulkUpdate(context.TODO(), micro.PrismObjectOrganizationBulkUpdateParams{\n\t\tItems: micro.F([]micro.PrismObjectOrganizationBulkUpdateParamsItem{{\n\t\t\tID: micro.F("182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"),\n\t\t}}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Results)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/organization/batch/update \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "items": [\n            {\n              "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n            }\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'bulk_delete',
    endpoint: '/v2/prism/{teamId}/organization/batch/delete',
    httpMethod: 'post',
    summary: 'Bulk delete records (partial success)',
    description:
      'Soft-delete up to 100 records in a single call. Same partial-success contract as batch/update.',
    stainlessPath: '(resource) prism.objects.organizations > (method) bulk_delete',
    qualified: 'client.prism.objects.organizations.bulkDelete',
    params: ['teamId: string;', 'ids: string[];', 'Idempotency-Key?: string;'],
    response:
      "{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }",
    markdown:
      "## bulk_delete\n\n`client.prism.objects.organizations.bulkDelete(teamId: string, ids: string[], Idempotency-Key?: string): { results: object[]; summary: object; }`\n\n**post** `/v2/prism/{teamId}/organization/batch/delete`\n\nSoft-delete up to 100 records in a single call. Same partial-success contract as batch/update.\n\n### Parameters\n\n- `teamId: string`\n\n- `ids: string[]`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }`\n  Partial-success bulk operation result. Inspect `results[].status` per item; the operation as a whole returns 200 even if some items failed.\n\n  - `results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]`\n  - `summary: { failed: number; succeeded: number; total: number; }`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.organizations.bulkDelete({ ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.organizations.bulkDelete',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.organizations.bulkDelete({\n  ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],\n});\n\nconsole.log(response.results);",
      },
      python: {
        method: 'prism.objects.organizations.bulk_delete',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.organizations.bulk_delete(\n    ids=["182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"],\n)\nprint(response.results)',
      },
      go: {
        method: 'client.Prism.Objects.Organizations.BulkDelete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Organizations.BulkDelete(context.TODO(), micro.PrismObjectOrganizationBulkDeleteParams{\n\t\tIDs: micro.F([]string{"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Results)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/organization/batch/delete \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "ids": [\n            "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'duplicate',
    endpoint: '/v2/prism/{teamId}/organization/{organizationId}/duplicate',
    httpMethod: 'post',
    summary: 'Duplicate object',
    description: 'Duplicate object',
    stainlessPath: '(resource) prism.objects.organizations > (method) duplicate',
    qualified: 'client.prism.objects.organizations.duplicate',
    params: ['teamId: string;', 'organizationId: string;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## duplicate\n\n`client.prism.objects.organizations.duplicate(teamId: string, organizationId: string, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/organization/{organizationId}/duplicate`\n\nDuplicate object\n\n### Parameters\n\n- `teamId: string`\n\n- `organizationId: string`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.organizations.duplicate('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.organizations.duplicate',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.organizations.duplicate(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.organizations.duplicate',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.organizations.duplicate(\n    organization_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Organizations.Duplicate',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Organizations.Duplicate(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectOrganizationDuplicateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/organization/$ORGANIZATION_ID/duplicate \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'restore',
    endpoint: '/v2/prism/{teamId}/organization/{organizationId}/restore',
    httpMethod: 'post',
    summary: 'Restore object',
    description: 'Restore object',
    stainlessPath: '(resource) prism.objects.organizations > (method) restore',
    qualified: 'client.prism.objects.organizations.restore',
    params: ['teamId: string;', 'organizationId: string;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## restore\n\n`client.prism.objects.organizations.restore(teamId: string, organizationId: string, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/organization/{organizationId}/restore`\n\nRestore object\n\n### Parameters\n\n- `teamId: string`\n\n- `organizationId: string`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.organizations.restore('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.organizations.restore',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.organizations.restore(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.organizations.restore',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.organizations.restore(\n    organization_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Organizations.Restore',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Organizations.Restore(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectOrganizationRestoreParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/organization/$ORGANIZATION_ID/restore \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v2/prism/{teamId}/identity',
    httpMethod: 'post',
    summary: 'Create object',
    description: 'Create object',
    stainlessPath: '(resource) prism.objects.identities > (method) create',
    qualified: 'client.prism.objects.identities.create',
    params: ['teamId: string;', 'default?: object;', 'list?: object;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## create\n\n`client.prism.objects.identities.create(teamId: string, default?: object, list?: object, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/identity`\n\nCreate object\n\n### Parameters\n\n- `teamId: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst identity = await client.prism.objects.identities.create();\n\nconsole.log(identity);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.identities.create',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst identity = await client.prism.objects.identities.create();\n\nconsole.log(identity.id);",
      },
      python: {
        method: 'prism.objects.identities.create',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nidentity = client.prism.objects.identities.create()\nprint(identity.id)',
      },
      go: {
        method: 'client.Prism.Objects.Identities.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tidentity, err := client.Prism.Objects.Identities.New(context.TODO(), micro.PrismObjectIdentityNewParams{\n\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", identity.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/identity \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/prism/{teamId}/identity',
    httpMethod: 'get',
    summary: 'List records of an object type',
    description:
      'Convenience list endpoint. Equivalent to `POST /v2/prism/{teamId}/{objectType}/query` with an empty body, plus query-string sugar for the common cases. Any unrecognized query parameter is interpreted as an equality filter on a property of that name; pass arrays for `in`. Values are received as strings, so non-string property filters via this endpoint may not work — use the `query` endpoint for typed comparisons or anything beyond simple equality.',
    stainlessPath: '(resource) prism.objects.identities > (method) list',
    qualified: 'client.prism.objects.identities.list',
    params: [
      'teamId: string;',
      'cursor?: string;',
      'deleted?: boolean;',
      'include_total?: boolean;',
      'limit?: number;',
      'list_id?: string;',
      'select?: string;',
      'sort?: string;',
    ],
    response:
      '{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }',
    markdown:
      "## list\n\n`client.prism.objects.identities.list(teamId: string, cursor?: string, deleted?: boolean, include_total?: boolean, limit?: number, list_id?: string, select?: string, sort?: string): { data: object[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n**get** `/v2/prism/{teamId}/identity`\n\nConvenience list endpoint. Equivalent to `POST /v2/prism/{teamId}/{objectType}/query` with an empty body, plus query-string sugar for the common cases. Any unrecognized query parameter is interpreted as an equality filter on a property of that name; pass arrays for `in`. Values are received as strings, so non-string property filters via this endpoint may not work — use the `query` endpoint for typed comparisons or anything beyond simple equality.\n\n### Parameters\n\n- `teamId: string`\n\n- `cursor?: string`\n  Opaque cursor from a previous response's `next_cursor`. Pass it back unchanged to fetch the next page.\n\n- `deleted?: boolean`\n  Include soft-deleted records. Pass the literal string `true`.\n\n- `include_total?: boolean`\n  When set to `true`, the response includes a `total` field with the unpaginated row count. Costs an extra pass; prefer `GET .../count` for the unfiltered total.\n\n- `limit?: number`\n  Maximum number of rows to return. Capped server-side at 50.\n\n- `list_id?: string`\n  Scope properties to a specific list/app.\n\n- `select?: string`\n  Comma-separated property slugs to return. Use dot notation for relationships. `id` is always returned at the top level. Defaults to all properties.\n\n- `sort?: string`\n  Comma-separated list of slugs. Prefix with `-` for descending. Example: `sort=-updated_at,name`.\n\n### Returns\n\n- `{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n  - `data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]`\n  - `has_more: boolean`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst identities = await client.prism.objects.identities.list();\n\nconsole.log(identities);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.identities.list',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst identities = await client.prism.objects.identities.list();\n\nconsole.log(identities.data);",
      },
      python: {
        method: 'prism.objects.identities.list',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nidentities = client.prism.objects.identities.list()\nprint(identities.data)',
      },
      go: {
        method: 'client.Prism.Objects.Identities.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tidentities, err := client.Prism.Objects.Identities.List(context.TODO(), micro.PrismObjectIdentityListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", identities.Data)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/identity \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v2/prism/{teamId}/identity/{identityId}',
    httpMethod: 'get',
    summary: 'Get object',
    description: 'Get object',
    stainlessPath: '(resource) prism.objects.identities > (method) get',
    qualified: 'client.prism.objects.identities.get',
    params: ['teamId: string;', 'identityId: string;', 'select?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## get\n\n`client.prism.objects.identities.get(teamId: string, identityId: string, select?: string): { id: string; default?: object; list?: object; }`\n\n**get** `/v2/prism/{teamId}/identity/{identityId}`\n\nGet object\n\n### Parameters\n\n- `teamId: string`\n\n- `identityId: string`\n\n- `select?: string`\n  Comma-separated property slugs to return. Use dot notation for relationships. `id` is always returned at the top level. Defaults to all properties.\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst identity = await client.prism.objects.identities.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(identity);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.identities.get',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst identity = await client.prism.objects.identities.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(identity.id);",
      },
      python: {
        method: 'prism.objects.identities.get',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nidentity = client.prism.objects.identities.get(\n    identity_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(identity.id)',
      },
      go: {
        method: 'client.Prism.Objects.Identities.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tidentity, err := client.Prism.Objects.Identities.Get(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectIdentityGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", identity.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/identity/$IDENTITY_ID \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/prism/{teamId}/identity/{identityId}',
    httpMethod: 'patch',
    summary: 'Patch object',
    description: 'Patch object',
    stainlessPath: '(resource) prism.objects.identities > (method) update',
    qualified: 'client.prism.objects.identities.update',
    params: [
      'teamId: string;',
      'identityId: string;',
      'default?: object;',
      'list?: object;',
      'Idempotency-Key?: string;',
      'If-Match?: string;',
    ],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## update\n\n`client.prism.objects.identities.update(teamId: string, identityId: string, default?: object, list?: object, Idempotency-Key?: string, If-Match?: string): { id: string; default?: object; list?: object; }`\n\n**patch** `/v2/prism/{teamId}/identity/{identityId}`\n\nPatch object\n\n### Parameters\n\n- `teamId: string`\n\n- `identityId: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n- `If-Match?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst identity = await client.prism.objects.identities.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(identity);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.identities.update',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst identity = await client.prism.objects.identities.update(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(identity.id);",
      },
      python: {
        method: 'prism.objects.identities.update',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nidentity = client.prism.objects.identities.update(\n    identity_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(identity.id)',
      },
      go: {
        method: 'client.Prism.Objects.Identities.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tidentity, err := client.Prism.Objects.Identities.Update(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectIdentityUpdateParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", identity.ID)\n}\n',
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/$TEAM_ID/identity/$IDENTITY_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v2/prism/{teamId}/identity/{identityId}',
    httpMethod: 'delete',
    summary: 'Delete object',
    description: 'Delete object',
    stainlessPath: '(resource) prism.objects.identities > (method) delete',
    qualified: 'client.prism.objects.identities.delete',
    params: ['teamId: string;', 'identityId: string;', 'If-Match?: string;'],
    markdown:
      "## delete\n\n`client.prism.objects.identities.delete(teamId: string, identityId: string, If-Match?: string): void`\n\n**delete** `/v2/prism/{teamId}/identity/{identityId}`\n\nDelete object\n\n### Parameters\n\n- `teamId: string`\n\n- `identityId: string`\n\n- `If-Match?: string`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nawait client.prism.objects.identities.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.identities.delete',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.prism.objects.identities.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');",
      },
      python: {
        method: 'prism.objects.identities.delete',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.prism.objects.identities.delete(\n    identity_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)',
      },
      go: {
        method: 'client.Prism.Objects.Identities.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Prism.Objects.Identities.Delete(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectIdentityDeleteParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/identity/$IDENTITY_ID \\\n    -X DELETE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'query',
    endpoint: '/v2/prism/{teamId}/identity/query',
    httpMethod: 'post',
    summary: 'Query',
    description: 'Query',
    stainlessPath: '(resource) prism.objects.identities > (method) query',
    qualified: 'client.prism.objects.identities.query',
    params: [
      'teamId: string;',
      "query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; };",
      'id?: string | string[];',
      'boxes?: string[];',
      'cursor?: string;',
      'deleted?: boolean;',
      'include_total?: boolean;',
      'sources?: string[];',
    ],
    response:
      '{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }',
    markdown:
      "## query\n\n`client.prism.objects.identities.query(teamId: string, query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; }, id?: string | string[], boxes?: string[], cursor?: string, deleted?: boolean, include_total?: boolean, sources?: string[]): { data: object[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n**post** `/v2/prism/{teamId}/identity/query`\n\nQuery\n\n### Parameters\n\n- `teamId: string`\n\n- `query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; }`\n  - `select: string[]`\n    Property slugs to select. Use dot notation for relationships (e.g. attendee.contact.first_name). `id` is always returned at the top level of each row and does not need to be selected.\n  - `combinator?: 'AND' | 'OR'`\n    Logical operator for combining filters\n  - `cursor?: string`\n    Opaque cursor from a previous response's `next_cursor`. Pass it back unchanged to fetch the next page. When set, `page` and `limit` are derived from the cursor and any explicit values are ignored.\n  - `filter?: object[]`\n    Filters as [{ slug: { operator: value } }]. For select/multiselect properties, values may be option slugs or option UUIDs.\n  - `limit?: number`\n    Maximum number of rows to return. Capped server-side at 50; requests above the cap are rejected.\n  - `list_id?: string`\n  - `page?: number`\n    Page number (1-based). Prefer `cursor`. Page-number pagination drifts under concurrent writes; use it only for one-shot exports.\n  - `sort?: object[]`\n    Sort order as [{ slug: direction }]. Array order determines sort priority\n\n- `id?: string | string[]`\n\n- `boxes?: string[]`\n\n- `cursor?: string`\n  Alternative location for the opaque cursor (a sibling of `query`). Use whichever feels more natural; if both are present, `query.cursor` wins.\n\n- `deleted?: boolean`\n\n- `include_total?: boolean`\n  When true, the response includes a `total` field with the unpaginated row count. Costs an additional pass over the result set — for unfiltered totals prefer `GET /v2/prism/{teamId}/{objectType}/count` instead.\n\n- `sources?: string[]`\n\n### Returns\n\n- `{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n  - `data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]`\n  - `has_more: boolean`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.identities.query({ query: { select: ['string'] } });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.identities.query',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.identities.query({ query: { select: ['string'] } });\n\nconsole.log(response.data);",
      },
      python: {
        method: 'prism.objects.identities.query',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.identities.query(\n    query={\n        "select": ["string"]\n    },\n)\nprint(response.data)',
      },
      go: {
        method: 'client.Prism.Objects.Identities.Query',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Identities.Query(context.TODO(), micro.PrismObjectIdentityQueryParams{\n\t\tQuery: micro.F(micro.PrismObjectIdentityQueryParamsQuery{\n\t\t\tSelect: micro.F([]string{"string"}),\n\t\t}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/identity/query \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "query": {\n            "select": [\n              "string"\n            ]\n          }\n        }\'',
      },
    },
  },
  {
    name: 'count',
    endpoint: '/v2/prism/{teamId}/identity/count',
    httpMethod: 'get',
    summary: 'Total record count for an object type',
    description:
      'Returns the total number of records of this object type that the caller can see. Avoids the page-overshoot anti-pattern — clients no longer need to keep paging until `has_more` flips false to discover the total. Currently does not apply query filters; for a filtered total, pass `include_total: true` in a POST `/query` body.',
    stainlessPath: '(resource) prism.objects.identities > (method) count',
    qualified: 'client.prism.objects.identities.count',
    params: ['teamId: string;', 'list_id?: string;'],
    response: '{ total: number; }',
    markdown:
      "## count\n\n`client.prism.objects.identities.count(teamId: string, list_id?: string): { total: number; }`\n\n**get** `/v2/prism/{teamId}/identity/count`\n\nReturns the total number of records of this object type that the caller can see. Avoids the page-overshoot anti-pattern — clients no longer need to keep paging until `has_more` flips false to discover the total. Currently does not apply query filters; for a filtered total, pass `include_total: true` in a POST `/query` body.\n\n### Parameters\n\n- `teamId: string`\n\n- `list_id?: string`\n  Scope the count to a specific list/app.\n\n### Returns\n\n- `{ total: number; }`\n\n  - `total: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.identities.count();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.identities.count',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.identities.count();\n\nconsole.log(response.total);",
      },
      python: {
        method: 'prism.objects.identities.count',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.identities.count()\nprint(response.total)',
      },
      go: {
        method: 'client.Prism.Objects.Identities.Count',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Identities.Count(context.TODO(), micro.PrismObjectIdentityCountParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Total)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/identity/count \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'find',
    endpoint: '/v2/prism/{teamId}/identity/by/{slug}/{value}',
    httpMethod: 'get',
    summary: 'Find a record by property value',
    description:
      'Returns the single record whose property `{slug}` equals `{value}`. 404 if nothing matches; 409 if more than one record matches.',
    stainlessPath: '(resource) prism.objects.identities > (method) find',
    qualified: 'client.prism.objects.identities.find',
    params: ['teamId: string;', 'slug: string;', 'value: string;', 'list_id?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## find\n\n`client.prism.objects.identities.find(teamId: string, slug: string, value: string, list_id?: string): { id: string; default?: object; list?: object; }`\n\n**get** `/v2/prism/{teamId}/identity/by/{slug}/{value}`\n\nReturns the single record whose property `{slug}` equals `{value}`. 404 if nothing matches; 409 if more than one record matches.\n\n### Parameters\n\n- `teamId: string`\n\n- `slug: string`\n\n- `value: string`\n\n- `list_id?: string`\n  Scope the lookup to a specific list/app.\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.identities.find('value', { slug: 'slug' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.identities.find',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.identities.find('value', { slug: 'slug' });\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.identities.find',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.identities.find(\n    value="value",\n    slug="slug",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Identities.Find',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Identities.Find(\n\t\tcontext.TODO(),\n\t\t"slug",\n\t\t"value",\n\t\tmicro.PrismObjectIdentityFindParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/identity/by/$SLUG/$VALUE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'upsert',
    endpoint: '/v2/prism/{teamId}/identity/by/{slug}/{value}',
    httpMethod: 'put',
    summary: 'Upsert by property value',
    description:
      'Idempotent create-or-update keyed on `{slug}={value}`. If exactly one record matches, it is patched and 200 is returned. If none match, a new record is created (with the lookup property set if absent) and 201 is returned. If multiple records match, 409 is returned and you should patch by id instead.',
    stainlessPath: '(resource) prism.objects.identities > (method) upsert',
    qualified: 'client.prism.objects.identities.upsert',
    params: [
      'teamId: string;',
      'slug: string;',
      'value: string;',
      'default?: object;',
      'list?: object;',
      'Idempotency-Key?: string;',
    ],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## upsert\n\n`client.prism.objects.identities.upsert(teamId: string, slug: string, value: string, default?: object, list?: object, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**put** `/v2/prism/{teamId}/identity/by/{slug}/{value}`\n\nIdempotent create-or-update keyed on `{slug}={value}`. If exactly one record matches, it is patched and 200 is returned. If none match, a new record is created (with the lookup property set if absent) and 201 is returned. If multiple records match, 409 is returned and you should patch by id instead.\n\n### Parameters\n\n- `teamId: string`\n\n- `slug: string`\n\n- `value: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.identities.upsert('value', { slug: 'slug' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.identities.upsert',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.identities.upsert('value', { slug: 'slug' });\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.identities.upsert',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.identities.upsert(\n    value="value",\n    slug="slug",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Identities.Upsert',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Identities.Upsert(\n\t\tcontext.TODO(),\n\t\t"slug",\n\t\t"value",\n\t\tmicro.PrismObjectIdentityUpsertParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/$TEAM_ID/identity/by/$SLUG/$VALUE \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'bulk_create',
    endpoint: '/v2/prism/{teamId}/identity/import',
    httpMethod: 'post',
    summary: 'Import objects',
    description:
      'Import multiple objects in batch. Properties are keyed by slug. Automatically routes based on size: small batches complete synchronously and return 200 with the final `ImportJob`; large batches start an async job, return 202 with `status: processing` and a `Location` header, and can be polled via `GET /v2/prism/{teamId}/imports/{jobId}`.',
    stainlessPath: '(resource) prism.objects.identities > (method) bulk_create',
    qualified: 'client.prism.objects.identities.bulkCreate',
    params: [
      'teamId: string;',
      'objects: { default?: object; list?: object; }[];',
      'options?: { caseInsensitive?: boolean; create_missing_options?: boolean; dedupe_by?: string; list_id?: string; };',
      'Idempotency-Key?: string;',
    ],
    response:
      "{ job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: { code?: string; message?: string; }; expires_at?: string; failed?: number; processed?: number; results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]; succeeded?: number; updated_at?: string; }",
    markdown:
      "## bulk_create\n\n`client.prism.objects.identities.bulkCreate(teamId: string, objects: { default?: object; list?: object; }[], options?: { caseInsensitive?: boolean; create_missing_options?: boolean; dedupe_by?: string; list_id?: string; }, Idempotency-Key?: string): { job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: object; expires_at?: string; failed?: number; processed?: number; results?: object[]; succeeded?: number; updated_at?: string; }`\n\n**post** `/v2/prism/{teamId}/identity/import`\n\nImport multiple objects in batch. Properties are keyed by slug. Automatically routes based on size: small batches complete synchronously and return 200 with the final `ImportJob`; large batches start an async job, return 202 with `status: processing` and a `Location` header, and can be polled via `GET /v2/prism/{teamId}/imports/{jobId}`.\n\n### Parameters\n\n- `teamId: string`\n\n- `objects: { default?: object; list?: object; }[]`\n  Array of objects to import with property values keyed by slug\n\n- `options?: { caseInsensitive?: boolean; create_missing_options?: boolean; dedupe_by?: string; list_id?: string; }`\n  - `caseInsensitive?: boolean`\n    Whether deduplication should be case insensitive\n  - `create_missing_options?: boolean`\n    When true, unknown values for select/multiselect properties are created as new options instead of failing the import\n  - `dedupe_by?: string`\n    Property slug to deduplicate on\n  - `list_id?: string`\n    App/CRM ID for context (optional)\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: { code?: string; message?: string; }; expires_at?: string; failed?: number; processed?: number; results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]; succeeded?: number; updated_at?: string; }`\n  Status snapshot of an import job. Same shape used by the POST /import response and by GET /imports/{jobId}.\n\n  - `job_id: string`\n  - `status: 'complete' | 'processing' | 'failed'`\n  - `total: number`\n  - `created_at?: string`\n  - `error?: { code?: string; message?: string; }`\n  - `expires_at?: string`\n  - `failed?: number`\n  - `processed?: number`\n  - `results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]`\n  - `succeeded?: number`\n  - `updated_at?: string`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.identities.bulkCreate({ objects: [{}] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.identities.bulkCreate',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.identities.bulkCreate({ objects: [{}] });\n\nconsole.log(response.job_id);",
      },
      python: {
        method: 'prism.objects.identities.bulk_create',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.identities.bulk_create(\n    objects=[{}],\n)\nprint(response.job_id)',
      },
      go: {
        method: 'client.Prism.Objects.Identities.BulkNew',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Identities.BulkNew(context.TODO(), micro.PrismObjectIdentityBulkNewParams{\n\t\tObjects: micro.F([]micro.PrismObjectPropertiesParam{{}}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.JobID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/identity/import \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "objects": [\n            {}\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'bulk_update',
    endpoint: '/v2/prism/{teamId}/identity/batch/update',
    httpMethod: 'post',
    summary: 'Bulk update records (partial success)',
    description:
      "Patch up to 100 records in a single call. Each item is attempted independently — failures don't abort the batch. Inspect `results[].status` per item.",
    stainlessPath: '(resource) prism.objects.identities > (method) bulk_update',
    qualified: 'client.prism.objects.identities.bulkUpdate',
    params: ['teamId: string;', 'items: { id: string; }[];', 'Idempotency-Key?: string;'],
    response:
      "{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }",
    markdown:
      "## bulk_update\n\n`client.prism.objects.identities.bulkUpdate(teamId: string, items: { id: string; }[], Idempotency-Key?: string): { results: object[]; summary: object; }`\n\n**post** `/v2/prism/{teamId}/identity/batch/update`\n\nPatch up to 100 records in a single call. Each item is attempted independently — failures don't abort the batch. Inspect `results[].status` per item.\n\n### Parameters\n\n- `teamId: string`\n\n- `items: { id: string; }[]`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }`\n  Partial-success bulk operation result. Inspect `results[].status` per item; the operation as a whole returns 200 even if some items failed.\n\n  - `results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]`\n  - `summary: { failed: number; succeeded: number; total: number; }`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.identities.bulkUpdate({ items: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.identities.bulkUpdate',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.identities.bulkUpdate({\n  items: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],\n});\n\nconsole.log(response.results);",
      },
      python: {
        method: 'prism.objects.identities.bulk_update',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.identities.bulk_update(\n    items=[{\n        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n    }],\n)\nprint(response.results)',
      },
      go: {
        method: 'client.Prism.Objects.Identities.BulkUpdate',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Identities.BulkUpdate(context.TODO(), micro.PrismObjectIdentityBulkUpdateParams{\n\t\tItems: micro.F([]micro.PrismObjectIdentityBulkUpdateParamsItem{{\n\t\t\tID: micro.F("182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"),\n\t\t}}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Results)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/identity/batch/update \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "items": [\n            {\n              "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n            }\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'bulk_delete',
    endpoint: '/v2/prism/{teamId}/identity/batch/delete',
    httpMethod: 'post',
    summary: 'Bulk delete records (partial success)',
    description:
      'Soft-delete up to 100 records in a single call. Same partial-success contract as batch/update.',
    stainlessPath: '(resource) prism.objects.identities > (method) bulk_delete',
    qualified: 'client.prism.objects.identities.bulkDelete',
    params: ['teamId: string;', 'ids: string[];', 'Idempotency-Key?: string;'],
    response:
      "{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }",
    markdown:
      "## bulk_delete\n\n`client.prism.objects.identities.bulkDelete(teamId: string, ids: string[], Idempotency-Key?: string): { results: object[]; summary: object; }`\n\n**post** `/v2/prism/{teamId}/identity/batch/delete`\n\nSoft-delete up to 100 records in a single call. Same partial-success contract as batch/update.\n\n### Parameters\n\n- `teamId: string`\n\n- `ids: string[]`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }`\n  Partial-success bulk operation result. Inspect `results[].status` per item; the operation as a whole returns 200 even if some items failed.\n\n  - `results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]`\n  - `summary: { failed: number; succeeded: number; total: number; }`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.identities.bulkDelete({ ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.identities.bulkDelete',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.identities.bulkDelete({\n  ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],\n});\n\nconsole.log(response.results);",
      },
      python: {
        method: 'prism.objects.identities.bulk_delete',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.identities.bulk_delete(\n    ids=["182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"],\n)\nprint(response.results)',
      },
      go: {
        method: 'client.Prism.Objects.Identities.BulkDelete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Identities.BulkDelete(context.TODO(), micro.PrismObjectIdentityBulkDeleteParams{\n\t\tIDs: micro.F([]string{"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Results)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/identity/batch/delete \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "ids": [\n            "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'duplicate',
    endpoint: '/v2/prism/{teamId}/identity/{identityId}/duplicate',
    httpMethod: 'post',
    summary: 'Duplicate object',
    description: 'Duplicate object',
    stainlessPath: '(resource) prism.objects.identities > (method) duplicate',
    qualified: 'client.prism.objects.identities.duplicate',
    params: ['teamId: string;', 'identityId: string;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## duplicate\n\n`client.prism.objects.identities.duplicate(teamId: string, identityId: string, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/identity/{identityId}/duplicate`\n\nDuplicate object\n\n### Parameters\n\n- `teamId: string`\n\n- `identityId: string`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.identities.duplicate('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.identities.duplicate',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.identities.duplicate(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.identities.duplicate',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.identities.duplicate(\n    identity_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Identities.Duplicate',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Identities.Duplicate(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectIdentityDuplicateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/identity/$IDENTITY_ID/duplicate \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'restore',
    endpoint: '/v2/prism/{teamId}/identity/{identityId}/restore',
    httpMethod: 'post',
    summary: 'Restore object',
    description: 'Restore object',
    stainlessPath: '(resource) prism.objects.identities > (method) restore',
    qualified: 'client.prism.objects.identities.restore',
    params: ['teamId: string;', 'identityId: string;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## restore\n\n`client.prism.objects.identities.restore(teamId: string, identityId: string, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/identity/{identityId}/restore`\n\nRestore object\n\n### Parameters\n\n- `teamId: string`\n\n- `identityId: string`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.identities.restore('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.identities.restore',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.identities.restore(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.identities.restore',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.identities.restore(\n    identity_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Identities.Restore',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Identities.Restore(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectIdentityRestoreParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/identity/$IDENTITY_ID/restore \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v2/prism/{teamId}/deal',
    httpMethod: 'post',
    summary: 'Create object',
    description: 'Create object',
    stainlessPath: '(resource) prism.objects.deals > (method) create',
    qualified: 'client.prism.objects.deals.create',
    params: ['teamId: string;', 'default?: object;', 'list?: object;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## create\n\n`client.prism.objects.deals.create(teamId: string, default?: object, list?: object, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/deal`\n\nCreate object\n\n### Parameters\n\n- `teamId: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst deal = await client.prism.objects.deals.create();\n\nconsole.log(deal);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.deals.create',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst deal = await client.prism.objects.deals.create();\n\nconsole.log(deal.id);",
      },
      python: {
        method: 'prism.objects.deals.create',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ndeal = client.prism.objects.deals.create()\nprint(deal.id)',
      },
      go: {
        method: 'client.Prism.Objects.Deals.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tdeal, err := client.Prism.Objects.Deals.New(context.TODO(), micro.PrismObjectDealNewParams{\n\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", deal.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/deal \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/prism/{teamId}/deal',
    httpMethod: 'get',
    summary: 'List records of an object type',
    description:
      'Convenience list endpoint. Equivalent to `POST /v2/prism/{teamId}/{objectType}/query` with an empty body, plus query-string sugar for the common cases. Any unrecognized query parameter is interpreted as an equality filter on a property of that name; pass arrays for `in`. Values are received as strings, so non-string property filters via this endpoint may not work — use the `query` endpoint for typed comparisons or anything beyond simple equality.',
    stainlessPath: '(resource) prism.objects.deals > (method) list',
    qualified: 'client.prism.objects.deals.list',
    params: [
      'teamId: string;',
      'cursor?: string;',
      'deleted?: boolean;',
      'include_total?: boolean;',
      'limit?: number;',
      'list_id?: string;',
      'select?: string;',
      'sort?: string;',
    ],
    response:
      '{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }',
    markdown:
      "## list\n\n`client.prism.objects.deals.list(teamId: string, cursor?: string, deleted?: boolean, include_total?: boolean, limit?: number, list_id?: string, select?: string, sort?: string): { data: object[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n**get** `/v2/prism/{teamId}/deal`\n\nConvenience list endpoint. Equivalent to `POST /v2/prism/{teamId}/{objectType}/query` with an empty body, plus query-string sugar for the common cases. Any unrecognized query parameter is interpreted as an equality filter on a property of that name; pass arrays for `in`. Values are received as strings, so non-string property filters via this endpoint may not work — use the `query` endpoint for typed comparisons or anything beyond simple equality.\n\n### Parameters\n\n- `teamId: string`\n\n- `cursor?: string`\n  Opaque cursor from a previous response's `next_cursor`. Pass it back unchanged to fetch the next page.\n\n- `deleted?: boolean`\n  Include soft-deleted records. Pass the literal string `true`.\n\n- `include_total?: boolean`\n  When set to `true`, the response includes a `total` field with the unpaginated row count. Costs an extra pass; prefer `GET .../count` for the unfiltered total.\n\n- `limit?: number`\n  Maximum number of rows to return. Capped server-side at 50.\n\n- `list_id?: string`\n  Scope properties to a specific list/app.\n\n- `select?: string`\n  Comma-separated property slugs to return. Use dot notation for relationships. `id` is always returned at the top level. Defaults to all properties.\n\n- `sort?: string`\n  Comma-separated list of slugs. Prefix with `-` for descending. Example: `sort=-updated_at,name`.\n\n### Returns\n\n- `{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n  - `data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]`\n  - `has_more: boolean`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst deals = await client.prism.objects.deals.list();\n\nconsole.log(deals);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.deals.list',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst deals = await client.prism.objects.deals.list();\n\nconsole.log(deals.data);",
      },
      python: {
        method: 'prism.objects.deals.list',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ndeals = client.prism.objects.deals.list()\nprint(deals.data)',
      },
      go: {
        method: 'client.Prism.Objects.Deals.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tdeals, err := client.Prism.Objects.Deals.List(context.TODO(), micro.PrismObjectDealListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", deals.Data)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/deal \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v2/prism/{teamId}/deal/{dealId}',
    httpMethod: 'get',
    summary: 'Get object',
    description: 'Get object',
    stainlessPath: '(resource) prism.objects.deals > (method) get',
    qualified: 'client.prism.objects.deals.get',
    params: ['teamId: string;', 'dealId: string;', 'select?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## get\n\n`client.prism.objects.deals.get(teamId: string, dealId: string, select?: string): { id: string; default?: object; list?: object; }`\n\n**get** `/v2/prism/{teamId}/deal/{dealId}`\n\nGet object\n\n### Parameters\n\n- `teamId: string`\n\n- `dealId: string`\n\n- `select?: string`\n  Comma-separated property slugs to return. Use dot notation for relationships. `id` is always returned at the top level. Defaults to all properties.\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst deal = await client.prism.objects.deals.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(deal);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.deals.get',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst deal = await client.prism.objects.deals.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(deal.id);",
      },
      python: {
        method: 'prism.objects.deals.get',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ndeal = client.prism.objects.deals.get(\n    deal_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(deal.id)',
      },
      go: {
        method: 'client.Prism.Objects.Deals.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tdeal, err := client.Prism.Objects.Deals.Get(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectDealGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", deal.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/deal/$DEAL_ID \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/prism/{teamId}/deal/{dealId}',
    httpMethod: 'patch',
    summary: 'Patch object',
    description: 'Patch object',
    stainlessPath: '(resource) prism.objects.deals > (method) update',
    qualified: 'client.prism.objects.deals.update',
    params: [
      'teamId: string;',
      'dealId: string;',
      'default?: object;',
      'list?: object;',
      'Idempotency-Key?: string;',
      'If-Match?: string;',
    ],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## update\n\n`client.prism.objects.deals.update(teamId: string, dealId: string, default?: object, list?: object, Idempotency-Key?: string, If-Match?: string): { id: string; default?: object; list?: object; }`\n\n**patch** `/v2/prism/{teamId}/deal/{dealId}`\n\nPatch object\n\n### Parameters\n\n- `teamId: string`\n\n- `dealId: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n- `If-Match?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst deal = await client.prism.objects.deals.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(deal);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.deals.update',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst deal = await client.prism.objects.deals.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(deal.id);",
      },
      python: {
        method: 'prism.objects.deals.update',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ndeal = client.prism.objects.deals.update(\n    deal_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(deal.id)',
      },
      go: {
        method: 'client.Prism.Objects.Deals.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tdeal, err := client.Prism.Objects.Deals.Update(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectDealUpdateParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", deal.ID)\n}\n',
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/$TEAM_ID/deal/$DEAL_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v2/prism/{teamId}/deal/{dealId}',
    httpMethod: 'delete',
    summary: 'Delete object',
    description: 'Delete object',
    stainlessPath: '(resource) prism.objects.deals > (method) delete',
    qualified: 'client.prism.objects.deals.delete',
    params: ['teamId: string;', 'dealId: string;', 'If-Match?: string;'],
    markdown:
      "## delete\n\n`client.prism.objects.deals.delete(teamId: string, dealId: string, If-Match?: string): void`\n\n**delete** `/v2/prism/{teamId}/deal/{dealId}`\n\nDelete object\n\n### Parameters\n\n- `teamId: string`\n\n- `dealId: string`\n\n- `If-Match?: string`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nawait client.prism.objects.deals.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.deals.delete',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.prism.objects.deals.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');",
      },
      python: {
        method: 'prism.objects.deals.delete',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.prism.objects.deals.delete(\n    deal_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)',
      },
      go: {
        method: 'client.Prism.Objects.Deals.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Prism.Objects.Deals.Delete(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectDealDeleteParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/deal/$DEAL_ID \\\n    -X DELETE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'query',
    endpoint: '/v2/prism/{teamId}/deal/query',
    httpMethod: 'post',
    summary: 'Query',
    description: 'Query',
    stainlessPath: '(resource) prism.objects.deals > (method) query',
    qualified: 'client.prism.objects.deals.query',
    params: [
      'teamId: string;',
      "query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; };",
      'id?: string | string[];',
      'boxes?: string[];',
      'cursor?: string;',
      'deleted?: boolean;',
      'include_total?: boolean;',
      'sources?: string[];',
    ],
    response:
      '{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }',
    markdown:
      "## query\n\n`client.prism.objects.deals.query(teamId: string, query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; }, id?: string | string[], boxes?: string[], cursor?: string, deleted?: boolean, include_total?: boolean, sources?: string[]): { data: object[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n**post** `/v2/prism/{teamId}/deal/query`\n\nQuery\n\n### Parameters\n\n- `teamId: string`\n\n- `query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; }`\n  - `select: string[]`\n    Property slugs to select. Use dot notation for relationships (e.g. attendee.contact.first_name). `id` is always returned at the top level of each row and does not need to be selected.\n  - `combinator?: 'AND' | 'OR'`\n    Logical operator for combining filters\n  - `cursor?: string`\n    Opaque cursor from a previous response's `next_cursor`. Pass it back unchanged to fetch the next page. When set, `page` and `limit` are derived from the cursor and any explicit values are ignored.\n  - `filter?: object[]`\n    Filters as [{ slug: { operator: value } }]. For select/multiselect properties, values may be option slugs or option UUIDs.\n  - `limit?: number`\n    Maximum number of rows to return. Capped server-side at 50; requests above the cap are rejected.\n  - `list_id?: string`\n  - `page?: number`\n    Page number (1-based). Prefer `cursor`. Page-number pagination drifts under concurrent writes; use it only for one-shot exports.\n  - `sort?: object[]`\n    Sort order as [{ slug: direction }]. Array order determines sort priority\n\n- `id?: string | string[]`\n\n- `boxes?: string[]`\n\n- `cursor?: string`\n  Alternative location for the opaque cursor (a sibling of `query`). Use whichever feels more natural; if both are present, `query.cursor` wins.\n\n- `deleted?: boolean`\n\n- `include_total?: boolean`\n  When true, the response includes a `total` field with the unpaginated row count. Costs an additional pass over the result set — for unfiltered totals prefer `GET /v2/prism/{teamId}/{objectType}/count` instead.\n\n- `sources?: string[]`\n\n### Returns\n\n- `{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n  - `data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]`\n  - `has_more: boolean`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.deals.query({ query: { select: ['string'] } });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.deals.query',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.deals.query({ query: { select: ['string'] } });\n\nconsole.log(response.data);",
      },
      python: {
        method: 'prism.objects.deals.query',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.deals.query(\n    query={\n        "select": ["string"]\n    },\n)\nprint(response.data)',
      },
      go: {
        method: 'client.Prism.Objects.Deals.Query',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Deals.Query(context.TODO(), micro.PrismObjectDealQueryParams{\n\t\tQuery: micro.F(micro.PrismObjectDealQueryParamsQuery{\n\t\t\tSelect: micro.F([]string{"string"}),\n\t\t}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/deal/query \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "query": {\n            "select": [\n              "string"\n            ]\n          }\n        }\'',
      },
    },
  },
  {
    name: 'count',
    endpoint: '/v2/prism/{teamId}/deal/count',
    httpMethod: 'get',
    summary: 'Total record count for an object type',
    description:
      'Returns the total number of records of this object type that the caller can see. Avoids the page-overshoot anti-pattern — clients no longer need to keep paging until `has_more` flips false to discover the total. Currently does not apply query filters; for a filtered total, pass `include_total: true` in a POST `/query` body.',
    stainlessPath: '(resource) prism.objects.deals > (method) count',
    qualified: 'client.prism.objects.deals.count',
    params: ['teamId: string;', 'list_id?: string;'],
    response: '{ total: number; }',
    markdown:
      "## count\n\n`client.prism.objects.deals.count(teamId: string, list_id?: string): { total: number; }`\n\n**get** `/v2/prism/{teamId}/deal/count`\n\nReturns the total number of records of this object type that the caller can see. Avoids the page-overshoot anti-pattern — clients no longer need to keep paging until `has_more` flips false to discover the total. Currently does not apply query filters; for a filtered total, pass `include_total: true` in a POST `/query` body.\n\n### Parameters\n\n- `teamId: string`\n\n- `list_id?: string`\n  Scope the count to a specific list/app.\n\n### Returns\n\n- `{ total: number; }`\n\n  - `total: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.deals.count();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.deals.count',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.deals.count();\n\nconsole.log(response.total);",
      },
      python: {
        method: 'prism.objects.deals.count',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.deals.count()\nprint(response.total)',
      },
      go: {
        method: 'client.Prism.Objects.Deals.Count',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Deals.Count(context.TODO(), micro.PrismObjectDealCountParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Total)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/deal/count \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'find',
    endpoint: '/v2/prism/{teamId}/deal/by/{slug}/{value}',
    httpMethod: 'get',
    summary: 'Find a record by property value',
    description:
      'Returns the single record whose property `{slug}` equals `{value}`. 404 if nothing matches; 409 if more than one record matches.',
    stainlessPath: '(resource) prism.objects.deals > (method) find',
    qualified: 'client.prism.objects.deals.find',
    params: ['teamId: string;', 'slug: string;', 'value: string;', 'list_id?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## find\n\n`client.prism.objects.deals.find(teamId: string, slug: string, value: string, list_id?: string): { id: string; default?: object; list?: object; }`\n\n**get** `/v2/prism/{teamId}/deal/by/{slug}/{value}`\n\nReturns the single record whose property `{slug}` equals `{value}`. 404 if nothing matches; 409 if more than one record matches.\n\n### Parameters\n\n- `teamId: string`\n\n- `slug: string`\n\n- `value: string`\n\n- `list_id?: string`\n  Scope the lookup to a specific list/app.\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.deals.find('value', { slug: 'slug' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.deals.find',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.deals.find('value', { slug: 'slug' });\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.deals.find',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.deals.find(\n    value="value",\n    slug="slug",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Deals.Find',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Deals.Find(\n\t\tcontext.TODO(),\n\t\t"slug",\n\t\t"value",\n\t\tmicro.PrismObjectDealFindParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/deal/by/$SLUG/$VALUE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'upsert',
    endpoint: '/v2/prism/{teamId}/deal/by/{slug}/{value}',
    httpMethod: 'put',
    summary: 'Upsert by property value',
    description:
      'Idempotent create-or-update keyed on `{slug}={value}`. If exactly one record matches, it is patched and 200 is returned. If none match, a new record is created (with the lookup property set if absent) and 201 is returned. If multiple records match, 409 is returned and you should patch by id instead.',
    stainlessPath: '(resource) prism.objects.deals > (method) upsert',
    qualified: 'client.prism.objects.deals.upsert',
    params: [
      'teamId: string;',
      'slug: string;',
      'value: string;',
      'default?: object;',
      'list?: object;',
      'Idempotency-Key?: string;',
    ],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## upsert\n\n`client.prism.objects.deals.upsert(teamId: string, slug: string, value: string, default?: object, list?: object, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**put** `/v2/prism/{teamId}/deal/by/{slug}/{value}`\n\nIdempotent create-or-update keyed on `{slug}={value}`. If exactly one record matches, it is patched and 200 is returned. If none match, a new record is created (with the lookup property set if absent) and 201 is returned. If multiple records match, 409 is returned and you should patch by id instead.\n\n### Parameters\n\n- `teamId: string`\n\n- `slug: string`\n\n- `value: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.deals.upsert('value', { slug: 'slug' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.deals.upsert',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.deals.upsert('value', { slug: 'slug' });\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.deals.upsert',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.deals.upsert(\n    value="value",\n    slug="slug",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Deals.Upsert',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Deals.Upsert(\n\t\tcontext.TODO(),\n\t\t"slug",\n\t\t"value",\n\t\tmicro.PrismObjectDealUpsertParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/$TEAM_ID/deal/by/$SLUG/$VALUE \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'bulk_create',
    endpoint: '/v2/prism/{teamId}/deal/import',
    httpMethod: 'post',
    summary: 'Import objects',
    description:
      'Import multiple objects in batch. Properties are keyed by slug. Automatically routes based on size: small batches complete synchronously and return 200 with the final `ImportJob`; large batches start an async job, return 202 with `status: processing` and a `Location` header, and can be polled via `GET /v2/prism/{teamId}/imports/{jobId}`.',
    stainlessPath: '(resource) prism.objects.deals > (method) bulk_create',
    qualified: 'client.prism.objects.deals.bulkCreate',
    params: [
      'teamId: string;',
      'objects: { default?: object; list?: object; }[];',
      'options?: { caseInsensitive?: boolean; create_missing_options?: boolean; dedupe_by?: string; list_id?: string; };',
      'Idempotency-Key?: string;',
    ],
    response:
      "{ job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: { code?: string; message?: string; }; expires_at?: string; failed?: number; processed?: number; results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]; succeeded?: number; updated_at?: string; }",
    markdown:
      "## bulk_create\n\n`client.prism.objects.deals.bulkCreate(teamId: string, objects: { default?: object; list?: object; }[], options?: { caseInsensitive?: boolean; create_missing_options?: boolean; dedupe_by?: string; list_id?: string; }, Idempotency-Key?: string): { job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: object; expires_at?: string; failed?: number; processed?: number; results?: object[]; succeeded?: number; updated_at?: string; }`\n\n**post** `/v2/prism/{teamId}/deal/import`\n\nImport multiple objects in batch. Properties are keyed by slug. Automatically routes based on size: small batches complete synchronously and return 200 with the final `ImportJob`; large batches start an async job, return 202 with `status: processing` and a `Location` header, and can be polled via `GET /v2/prism/{teamId}/imports/{jobId}`.\n\n### Parameters\n\n- `teamId: string`\n\n- `objects: { default?: object; list?: object; }[]`\n  Array of objects to import with property values keyed by slug\n\n- `options?: { caseInsensitive?: boolean; create_missing_options?: boolean; dedupe_by?: string; list_id?: string; }`\n  - `caseInsensitive?: boolean`\n    Whether deduplication should be case insensitive\n  - `create_missing_options?: boolean`\n    When true, unknown values for select/multiselect properties are created as new options instead of failing the import\n  - `dedupe_by?: string`\n    Property slug to deduplicate on\n  - `list_id?: string`\n    App/CRM ID for context (optional)\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: { code?: string; message?: string; }; expires_at?: string; failed?: number; processed?: number; results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]; succeeded?: number; updated_at?: string; }`\n  Status snapshot of an import job. Same shape used by the POST /import response and by GET /imports/{jobId}.\n\n  - `job_id: string`\n  - `status: 'complete' | 'processing' | 'failed'`\n  - `total: number`\n  - `created_at?: string`\n  - `error?: { code?: string; message?: string; }`\n  - `expires_at?: string`\n  - `failed?: number`\n  - `processed?: number`\n  - `results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]`\n  - `succeeded?: number`\n  - `updated_at?: string`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.deals.bulkCreate({ objects: [{}] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.deals.bulkCreate',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.deals.bulkCreate({ objects: [{}] });\n\nconsole.log(response.job_id);",
      },
      python: {
        method: 'prism.objects.deals.bulk_create',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.deals.bulk_create(\n    objects=[{}],\n)\nprint(response.job_id)',
      },
      go: {
        method: 'client.Prism.Objects.Deals.BulkNew',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Deals.BulkNew(context.TODO(), micro.PrismObjectDealBulkNewParams{\n\t\tObjects: micro.F([]micro.PrismObjectPropertiesParam{{}}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.JobID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/deal/import \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "objects": [\n            {}\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'bulk_update',
    endpoint: '/v2/prism/{teamId}/deal/batch/update',
    httpMethod: 'post',
    summary: 'Bulk update records (partial success)',
    description:
      "Patch up to 100 records in a single call. Each item is attempted independently — failures don't abort the batch. Inspect `results[].status` per item.",
    stainlessPath: '(resource) prism.objects.deals > (method) bulk_update',
    qualified: 'client.prism.objects.deals.bulkUpdate',
    params: ['teamId: string;', 'items: { id: string; }[];', 'Idempotency-Key?: string;'],
    response:
      "{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }",
    markdown:
      "## bulk_update\n\n`client.prism.objects.deals.bulkUpdate(teamId: string, items: { id: string; }[], Idempotency-Key?: string): { results: object[]; summary: object; }`\n\n**post** `/v2/prism/{teamId}/deal/batch/update`\n\nPatch up to 100 records in a single call. Each item is attempted independently — failures don't abort the batch. Inspect `results[].status` per item.\n\n### Parameters\n\n- `teamId: string`\n\n- `items: { id: string; }[]`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }`\n  Partial-success bulk operation result. Inspect `results[].status` per item; the operation as a whole returns 200 even if some items failed.\n\n  - `results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]`\n  - `summary: { failed: number; succeeded: number; total: number; }`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.deals.bulkUpdate({ items: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.deals.bulkUpdate',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.deals.bulkUpdate({\n  items: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],\n});\n\nconsole.log(response.results);",
      },
      python: {
        method: 'prism.objects.deals.bulk_update',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.deals.bulk_update(\n    items=[{\n        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n    }],\n)\nprint(response.results)',
      },
      go: {
        method: 'client.Prism.Objects.Deals.BulkUpdate',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Deals.BulkUpdate(context.TODO(), micro.PrismObjectDealBulkUpdateParams{\n\t\tItems: micro.F([]micro.PrismObjectDealBulkUpdateParamsItem{{\n\t\t\tID: micro.F("182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"),\n\t\t}}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Results)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/deal/batch/update \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "items": [\n            {\n              "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n            }\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'bulk_delete',
    endpoint: '/v2/prism/{teamId}/deal/batch/delete',
    httpMethod: 'post',
    summary: 'Bulk delete records (partial success)',
    description:
      'Soft-delete up to 100 records in a single call. Same partial-success contract as batch/update.',
    stainlessPath: '(resource) prism.objects.deals > (method) bulk_delete',
    qualified: 'client.prism.objects.deals.bulkDelete',
    params: ['teamId: string;', 'ids: string[];', 'Idempotency-Key?: string;'],
    response:
      "{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }",
    markdown:
      "## bulk_delete\n\n`client.prism.objects.deals.bulkDelete(teamId: string, ids: string[], Idempotency-Key?: string): { results: object[]; summary: object; }`\n\n**post** `/v2/prism/{teamId}/deal/batch/delete`\n\nSoft-delete up to 100 records in a single call. Same partial-success contract as batch/update.\n\n### Parameters\n\n- `teamId: string`\n\n- `ids: string[]`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }`\n  Partial-success bulk operation result. Inspect `results[].status` per item; the operation as a whole returns 200 even if some items failed.\n\n  - `results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]`\n  - `summary: { failed: number; succeeded: number; total: number; }`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.deals.bulkDelete({ ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.deals.bulkDelete',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.deals.bulkDelete({\n  ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],\n});\n\nconsole.log(response.results);",
      },
      python: {
        method: 'prism.objects.deals.bulk_delete',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.deals.bulk_delete(\n    ids=["182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"],\n)\nprint(response.results)',
      },
      go: {
        method: 'client.Prism.Objects.Deals.BulkDelete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Deals.BulkDelete(context.TODO(), micro.PrismObjectDealBulkDeleteParams{\n\t\tIDs: micro.F([]string{"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Results)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/deal/batch/delete \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "ids": [\n            "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'duplicate',
    endpoint: '/v2/prism/{teamId}/deal/{dealId}/duplicate',
    httpMethod: 'post',
    summary: 'Duplicate object',
    description: 'Duplicate object',
    stainlessPath: '(resource) prism.objects.deals > (method) duplicate',
    qualified: 'client.prism.objects.deals.duplicate',
    params: ['teamId: string;', 'dealId: string;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## duplicate\n\n`client.prism.objects.deals.duplicate(teamId: string, dealId: string, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/deal/{dealId}/duplicate`\n\nDuplicate object\n\n### Parameters\n\n- `teamId: string`\n\n- `dealId: string`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.deals.duplicate('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.deals.duplicate',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.deals.duplicate('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.deals.duplicate',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.deals.duplicate(\n    deal_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Deals.Duplicate',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Deals.Duplicate(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectDealDuplicateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/deal/$DEAL_ID/duplicate \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'restore',
    endpoint: '/v2/prism/{teamId}/deal/{dealId}/restore',
    httpMethod: 'post',
    summary: 'Restore object',
    description: 'Restore object',
    stainlessPath: '(resource) prism.objects.deals > (method) restore',
    qualified: 'client.prism.objects.deals.restore',
    params: ['teamId: string;', 'dealId: string;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## restore\n\n`client.prism.objects.deals.restore(teamId: string, dealId: string, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/deal/{dealId}/restore`\n\nRestore object\n\n### Parameters\n\n- `teamId: string`\n\n- `dealId: string`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.deals.restore('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.deals.restore',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.deals.restore('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.deals.restore',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.deals.restore(\n    deal_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Deals.Restore',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Deals.Restore(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectDealRestoreParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/deal/$DEAL_ID/restore \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v2/prism/{teamId}/deal/{dealId}/grant',
    httpMethod: 'get',
    summary: 'Get grant',
    description: 'Get grant',
    stainlessPath: '(resource) prism.objects.deals.grant > (method) get',
    qualified: 'client.prism.objects.deals.grant.get',
    params: ['teamId: string;', 'dealId: string;'],
    response: '{ team_group_id?: object[]; team_id?: object; user_id?: object[]; }',
    markdown:
      "## get\n\n`client.prism.objects.deals.grant.get(teamId: string, dealId: string): { team_group_id?: object[]; team_id?: object; user_id?: object[]; }`\n\n**get** `/v2/prism/{teamId}/deal/{dealId}/grant`\n\nGet grant\n\n### Parameters\n\n- `teamId: string`\n\n- `dealId: string`\n\n### Returns\n\n- `{ team_group_id?: object[]; team_id?: object; user_id?: object[]; }`\n\n  - `team_group_id?: object[]`\n  - `team_id?: object`\n  - `user_id?: object[]`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst grant = await client.prism.objects.deals.grant.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(grant);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.deals.grant.get',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst grant = await client.prism.objects.deals.grant.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(grant.team_group_id);",
      },
      python: {
        method: 'prism.objects.deals.grant.get',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ngrant = client.prism.objects.deals.grant.get(\n    deal_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(grant.team_group_id)',
      },
      go: {
        method: 'client.Prism.Objects.Deals.Grant.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tgrant, err := client.Prism.Objects.Deals.Grant.Get(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectDealGrantGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", grant.TeamGroupID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/deal/$DEAL_ID/grant \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/prism/{teamId}/deal/{dealId}/grant',
    httpMethod: 'put',
    summary: 'Update grant',
    description: 'Update grant',
    stainlessPath: '(resource) prism.objects.deals.grant > (method) update',
    qualified: 'client.prism.objects.deals.grant.update',
    params: [
      'teamId: string;',
      'dealId: string;',
      'team_group_id?: object[];',
      'team_id?: object;',
      'user_id?: object[];',
      'Idempotency-Key?: string;',
    ],
    response: '{ team_group_id?: object[]; team_id?: object; user_id?: object[]; }',
    markdown:
      "## update\n\n`client.prism.objects.deals.grant.update(teamId: string, dealId: string, team_group_id?: object[], team_id?: object, user_id?: object[], Idempotency-Key?: string): { team_group_id?: object[]; team_id?: object; user_id?: object[]; }`\n\n**put** `/v2/prism/{teamId}/deal/{dealId}/grant`\n\nUpdate grant\n\n### Parameters\n\n- `teamId: string`\n\n- `dealId: string`\n\n- `team_group_id?: object[]`\n\n- `team_id?: object`\n\n- `user_id?: object[]`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ team_group_id?: object[]; team_id?: object; user_id?: object[]; }`\n\n  - `team_group_id?: object[]`\n  - `team_id?: object`\n  - `user_id?: object[]`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst grant = await client.prism.objects.deals.grant.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(grant);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.deals.grant.update',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst grant = await client.prism.objects.deals.grant.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(grant.team_group_id);",
      },
      python: {
        method: 'prism.objects.deals.grant.update',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ngrant = client.prism.objects.deals.grant.update(\n    deal_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(grant.team_group_id)',
      },
      go: {
        method: 'client.Prism.Objects.Deals.Grant.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tgrant, err := client.Prism.Objects.Deals.Grant.Update(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectDealGrantUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", grant.TeamGroupID)\n}\n',
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/$TEAM_ID/deal/$DEAL_ID/grant \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v2/prism/{teamId}/action',
    httpMethod: 'post',
    summary: 'Create object',
    description: 'Create object',
    stainlessPath: '(resource) prism.objects.actions > (method) create',
    qualified: 'client.prism.objects.actions.create',
    params: ['teamId: string;', 'default?: object;', 'list?: object;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## create\n\n`client.prism.objects.actions.create(teamId: string, default?: object, list?: object, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/action`\n\nCreate object\n\n### Parameters\n\n- `teamId: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst action = await client.prism.objects.actions.create();\n\nconsole.log(action);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.actions.create',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst action = await client.prism.objects.actions.create();\n\nconsole.log(action.id);",
      },
      python: {
        method: 'prism.objects.actions.create',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\naction = client.prism.objects.actions.create()\nprint(action.id)',
      },
      go: {
        method: 'client.Prism.Objects.Actions.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\taction, err := client.Prism.Objects.Actions.New(context.TODO(), micro.PrismObjectActionNewParams{\n\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", action.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/action \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/prism/{teamId}/action',
    httpMethod: 'get',
    summary: 'List records of an object type',
    description:
      'Convenience list endpoint. Equivalent to `POST /v2/prism/{teamId}/{objectType}/query` with an empty body, plus query-string sugar for the common cases. Any unrecognized query parameter is interpreted as an equality filter on a property of that name; pass arrays for `in`. Values are received as strings, so non-string property filters via this endpoint may not work — use the `query` endpoint for typed comparisons or anything beyond simple equality.',
    stainlessPath: '(resource) prism.objects.actions > (method) list',
    qualified: 'client.prism.objects.actions.list',
    params: [
      'teamId: string;',
      'cursor?: string;',
      'deleted?: boolean;',
      'include_total?: boolean;',
      'limit?: number;',
      'list_id?: string;',
      'select?: string;',
      'sort?: string;',
    ],
    response:
      '{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }',
    markdown:
      "## list\n\n`client.prism.objects.actions.list(teamId: string, cursor?: string, deleted?: boolean, include_total?: boolean, limit?: number, list_id?: string, select?: string, sort?: string): { data: object[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n**get** `/v2/prism/{teamId}/action`\n\nConvenience list endpoint. Equivalent to `POST /v2/prism/{teamId}/{objectType}/query` with an empty body, plus query-string sugar for the common cases. Any unrecognized query parameter is interpreted as an equality filter on a property of that name; pass arrays for `in`. Values are received as strings, so non-string property filters via this endpoint may not work — use the `query` endpoint for typed comparisons or anything beyond simple equality.\n\n### Parameters\n\n- `teamId: string`\n\n- `cursor?: string`\n  Opaque cursor from a previous response's `next_cursor`. Pass it back unchanged to fetch the next page.\n\n- `deleted?: boolean`\n  Include soft-deleted records. Pass the literal string `true`.\n\n- `include_total?: boolean`\n  When set to `true`, the response includes a `total` field with the unpaginated row count. Costs an extra pass; prefer `GET .../count` for the unfiltered total.\n\n- `limit?: number`\n  Maximum number of rows to return. Capped server-side at 50.\n\n- `list_id?: string`\n  Scope properties to a specific list/app.\n\n- `select?: string`\n  Comma-separated property slugs to return. Use dot notation for relationships. `id` is always returned at the top level. Defaults to all properties.\n\n- `sort?: string`\n  Comma-separated list of slugs. Prefix with `-` for descending. Example: `sort=-updated_at,name`.\n\n### Returns\n\n- `{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n  - `data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]`\n  - `has_more: boolean`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst actions = await client.prism.objects.actions.list();\n\nconsole.log(actions);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.actions.list',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst actions = await client.prism.objects.actions.list();\n\nconsole.log(actions.data);",
      },
      python: {
        method: 'prism.objects.actions.list',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nactions = client.prism.objects.actions.list()\nprint(actions.data)',
      },
      go: {
        method: 'client.Prism.Objects.Actions.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tactions, err := client.Prism.Objects.Actions.List(context.TODO(), micro.PrismObjectActionListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", actions.Data)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/action \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v2/prism/{teamId}/action/{actionId}',
    httpMethod: 'get',
    summary: 'Get object',
    description: 'Get object',
    stainlessPath: '(resource) prism.objects.actions > (method) get',
    qualified: 'client.prism.objects.actions.get',
    params: ['teamId: string;', 'actionId: string;', 'select?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## get\n\n`client.prism.objects.actions.get(teamId: string, actionId: string, select?: string): { id: string; default?: object; list?: object; }`\n\n**get** `/v2/prism/{teamId}/action/{actionId}`\n\nGet object\n\n### Parameters\n\n- `teamId: string`\n\n- `actionId: string`\n\n- `select?: string`\n  Comma-separated property slugs to return. Use dot notation for relationships. `id` is always returned at the top level. Defaults to all properties.\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst action = await client.prism.objects.actions.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(action);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.actions.get',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst action = await client.prism.objects.actions.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(action.id);",
      },
      python: {
        method: 'prism.objects.actions.get',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\naction = client.prism.objects.actions.get(\n    action_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(action.id)',
      },
      go: {
        method: 'client.Prism.Objects.Actions.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\taction, err := client.Prism.Objects.Actions.Get(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectActionGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", action.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/action/$ACTION_ID \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/prism/{teamId}/action/{actionId}',
    httpMethod: 'patch',
    summary: 'Patch object',
    description: 'Patch object',
    stainlessPath: '(resource) prism.objects.actions > (method) update',
    qualified: 'client.prism.objects.actions.update',
    params: [
      'teamId: string;',
      'actionId: string;',
      'default?: object;',
      'list?: object;',
      'Idempotency-Key?: string;',
      'If-Match?: string;',
    ],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## update\n\n`client.prism.objects.actions.update(teamId: string, actionId: string, default?: object, list?: object, Idempotency-Key?: string, If-Match?: string): { id: string; default?: object; list?: object; }`\n\n**patch** `/v2/prism/{teamId}/action/{actionId}`\n\nPatch object\n\n### Parameters\n\n- `teamId: string`\n\n- `actionId: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n- `If-Match?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst action = await client.prism.objects.actions.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(action);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.actions.update',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst action = await client.prism.objects.actions.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(action.id);",
      },
      python: {
        method: 'prism.objects.actions.update',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\naction = client.prism.objects.actions.update(\n    action_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(action.id)',
      },
      go: {
        method: 'client.Prism.Objects.Actions.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\taction, err := client.Prism.Objects.Actions.Update(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectActionUpdateParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", action.ID)\n}\n',
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/$TEAM_ID/action/$ACTION_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v2/prism/{teamId}/action/{actionId}',
    httpMethod: 'delete',
    summary: 'Delete object',
    description: 'Delete object',
    stainlessPath: '(resource) prism.objects.actions > (method) delete',
    qualified: 'client.prism.objects.actions.delete',
    params: ['teamId: string;', 'actionId: string;', 'If-Match?: string;'],
    markdown:
      "## delete\n\n`client.prism.objects.actions.delete(teamId: string, actionId: string, If-Match?: string): void`\n\n**delete** `/v2/prism/{teamId}/action/{actionId}`\n\nDelete object\n\n### Parameters\n\n- `teamId: string`\n\n- `actionId: string`\n\n- `If-Match?: string`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nawait client.prism.objects.actions.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.actions.delete',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.prism.objects.actions.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');",
      },
      python: {
        method: 'prism.objects.actions.delete',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.prism.objects.actions.delete(\n    action_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)',
      },
      go: {
        method: 'client.Prism.Objects.Actions.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Prism.Objects.Actions.Delete(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectActionDeleteParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/action/$ACTION_ID \\\n    -X DELETE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'query',
    endpoint: '/v2/prism/{teamId}/action/query',
    httpMethod: 'post',
    summary: 'Query',
    description: 'Query',
    stainlessPath: '(resource) prism.objects.actions > (method) query',
    qualified: 'client.prism.objects.actions.query',
    params: [
      'teamId: string;',
      "query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; };",
      'id?: string | string[];',
      'boxes?: string[];',
      'cursor?: string;',
      'deleted?: boolean;',
      'include_total?: boolean;',
      'sources?: string[];',
    ],
    response:
      '{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }',
    markdown:
      "## query\n\n`client.prism.objects.actions.query(teamId: string, query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; }, id?: string | string[], boxes?: string[], cursor?: string, deleted?: boolean, include_total?: boolean, sources?: string[]): { data: object[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n**post** `/v2/prism/{teamId}/action/query`\n\nQuery\n\n### Parameters\n\n- `teamId: string`\n\n- `query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; }`\n  - `select: string[]`\n    Property slugs to select. Use dot notation for relationships (e.g. attendee.contact.first_name). `id` is always returned at the top level of each row and does not need to be selected.\n  - `combinator?: 'AND' | 'OR'`\n    Logical operator for combining filters\n  - `cursor?: string`\n    Opaque cursor from a previous response's `next_cursor`. Pass it back unchanged to fetch the next page. When set, `page` and `limit` are derived from the cursor and any explicit values are ignored.\n  - `filter?: object[]`\n    Filters as [{ slug: { operator: value } }]. For select/multiselect properties, values may be option slugs or option UUIDs.\n  - `limit?: number`\n    Maximum number of rows to return. Capped server-side at 50; requests above the cap are rejected.\n  - `list_id?: string`\n  - `page?: number`\n    Page number (1-based). Prefer `cursor`. Page-number pagination drifts under concurrent writes; use it only for one-shot exports.\n  - `sort?: object[]`\n    Sort order as [{ slug: direction }]. Array order determines sort priority\n\n- `id?: string | string[]`\n\n- `boxes?: string[]`\n\n- `cursor?: string`\n  Alternative location for the opaque cursor (a sibling of `query`). Use whichever feels more natural; if both are present, `query.cursor` wins.\n\n- `deleted?: boolean`\n\n- `include_total?: boolean`\n  When true, the response includes a `total` field with the unpaginated row count. Costs an additional pass over the result set — for unfiltered totals prefer `GET /v2/prism/{teamId}/{objectType}/count` instead.\n\n- `sources?: string[]`\n\n### Returns\n\n- `{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n  - `data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]`\n  - `has_more: boolean`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.actions.query({ query: { select: ['string'] } });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.actions.query',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.actions.query({ query: { select: ['string'] } });\n\nconsole.log(response.data);",
      },
      python: {
        method: 'prism.objects.actions.query',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.actions.query(\n    query={\n        "select": ["string"]\n    },\n)\nprint(response.data)',
      },
      go: {
        method: 'client.Prism.Objects.Actions.Query',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Actions.Query(context.TODO(), micro.PrismObjectActionQueryParams{\n\t\tQuery: micro.F(micro.PrismObjectActionQueryParamsQuery{\n\t\t\tSelect: micro.F([]string{"string"}),\n\t\t}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/action/query \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "query": {\n            "select": [\n              "string"\n            ]\n          }\n        }\'',
      },
    },
  },
  {
    name: 'count',
    endpoint: '/v2/prism/{teamId}/action/count',
    httpMethod: 'get',
    summary: 'Total record count for an object type',
    description:
      'Returns the total number of records of this object type that the caller can see. Avoids the page-overshoot anti-pattern — clients no longer need to keep paging until `has_more` flips false to discover the total. Currently does not apply query filters; for a filtered total, pass `include_total: true` in a POST `/query` body.',
    stainlessPath: '(resource) prism.objects.actions > (method) count',
    qualified: 'client.prism.objects.actions.count',
    params: ['teamId: string;', 'list_id?: string;'],
    response: '{ total: number; }',
    markdown:
      "## count\n\n`client.prism.objects.actions.count(teamId: string, list_id?: string): { total: number; }`\n\n**get** `/v2/prism/{teamId}/action/count`\n\nReturns the total number of records of this object type that the caller can see. Avoids the page-overshoot anti-pattern — clients no longer need to keep paging until `has_more` flips false to discover the total. Currently does not apply query filters; for a filtered total, pass `include_total: true` in a POST `/query` body.\n\n### Parameters\n\n- `teamId: string`\n\n- `list_id?: string`\n  Scope the count to a specific list/app.\n\n### Returns\n\n- `{ total: number; }`\n\n  - `total: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.actions.count();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.actions.count',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.actions.count();\n\nconsole.log(response.total);",
      },
      python: {
        method: 'prism.objects.actions.count',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.actions.count()\nprint(response.total)',
      },
      go: {
        method: 'client.Prism.Objects.Actions.Count',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Actions.Count(context.TODO(), micro.PrismObjectActionCountParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Total)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/action/count \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'find',
    endpoint: '/v2/prism/{teamId}/action/by/{slug}/{value}',
    httpMethod: 'get',
    summary: 'Find a record by property value',
    description:
      'Returns the single record whose property `{slug}` equals `{value}`. 404 if nothing matches; 409 if more than one record matches.',
    stainlessPath: '(resource) prism.objects.actions > (method) find',
    qualified: 'client.prism.objects.actions.find',
    params: ['teamId: string;', 'slug: string;', 'value: string;', 'list_id?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## find\n\n`client.prism.objects.actions.find(teamId: string, slug: string, value: string, list_id?: string): { id: string; default?: object; list?: object; }`\n\n**get** `/v2/prism/{teamId}/action/by/{slug}/{value}`\n\nReturns the single record whose property `{slug}` equals `{value}`. 404 if nothing matches; 409 if more than one record matches.\n\n### Parameters\n\n- `teamId: string`\n\n- `slug: string`\n\n- `value: string`\n\n- `list_id?: string`\n  Scope the lookup to a specific list/app.\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.actions.find('value', { slug: 'slug' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.actions.find',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.actions.find('value', { slug: 'slug' });\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.actions.find',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.actions.find(\n    value="value",\n    slug="slug",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Actions.Find',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Actions.Find(\n\t\tcontext.TODO(),\n\t\t"slug",\n\t\t"value",\n\t\tmicro.PrismObjectActionFindParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/action/by/$SLUG/$VALUE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'upsert',
    endpoint: '/v2/prism/{teamId}/action/by/{slug}/{value}',
    httpMethod: 'put',
    summary: 'Upsert by property value',
    description:
      'Idempotent create-or-update keyed on `{slug}={value}`. If exactly one record matches, it is patched and 200 is returned. If none match, a new record is created (with the lookup property set if absent) and 201 is returned. If multiple records match, 409 is returned and you should patch by id instead.',
    stainlessPath: '(resource) prism.objects.actions > (method) upsert',
    qualified: 'client.prism.objects.actions.upsert',
    params: [
      'teamId: string;',
      'slug: string;',
      'value: string;',
      'default?: object;',
      'list?: object;',
      'Idempotency-Key?: string;',
    ],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## upsert\n\n`client.prism.objects.actions.upsert(teamId: string, slug: string, value: string, default?: object, list?: object, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**put** `/v2/prism/{teamId}/action/by/{slug}/{value}`\n\nIdempotent create-or-update keyed on `{slug}={value}`. If exactly one record matches, it is patched and 200 is returned. If none match, a new record is created (with the lookup property set if absent) and 201 is returned. If multiple records match, 409 is returned and you should patch by id instead.\n\n### Parameters\n\n- `teamId: string`\n\n- `slug: string`\n\n- `value: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.actions.upsert('value', { slug: 'slug' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.actions.upsert',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.actions.upsert('value', { slug: 'slug' });\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.actions.upsert',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.actions.upsert(\n    value="value",\n    slug="slug",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Actions.Upsert',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Actions.Upsert(\n\t\tcontext.TODO(),\n\t\t"slug",\n\t\t"value",\n\t\tmicro.PrismObjectActionUpsertParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/$TEAM_ID/action/by/$SLUG/$VALUE \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'bulk_create',
    endpoint: '/v2/prism/{teamId}/action/import',
    httpMethod: 'post',
    summary: 'Import objects',
    description:
      'Import multiple objects in batch. Properties are keyed by slug. Automatically routes based on size: small batches complete synchronously and return 200 with the final `ImportJob`; large batches start an async job, return 202 with `status: processing` and a `Location` header, and can be polled via `GET /v2/prism/{teamId}/imports/{jobId}`.',
    stainlessPath: '(resource) prism.objects.actions > (method) bulk_create',
    qualified: 'client.prism.objects.actions.bulkCreate',
    params: [
      'teamId: string;',
      'objects: { default?: object; list?: object; }[];',
      'options?: { caseInsensitive?: boolean; create_missing_options?: boolean; dedupe_by?: string; list_id?: string; };',
      'Idempotency-Key?: string;',
    ],
    response:
      "{ job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: { code?: string; message?: string; }; expires_at?: string; failed?: number; processed?: number; results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]; succeeded?: number; updated_at?: string; }",
    markdown:
      "## bulk_create\n\n`client.prism.objects.actions.bulkCreate(teamId: string, objects: { default?: object; list?: object; }[], options?: { caseInsensitive?: boolean; create_missing_options?: boolean; dedupe_by?: string; list_id?: string; }, Idempotency-Key?: string): { job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: object; expires_at?: string; failed?: number; processed?: number; results?: object[]; succeeded?: number; updated_at?: string; }`\n\n**post** `/v2/prism/{teamId}/action/import`\n\nImport multiple objects in batch. Properties are keyed by slug. Automatically routes based on size: small batches complete synchronously and return 200 with the final `ImportJob`; large batches start an async job, return 202 with `status: processing` and a `Location` header, and can be polled via `GET /v2/prism/{teamId}/imports/{jobId}`.\n\n### Parameters\n\n- `teamId: string`\n\n- `objects: { default?: object; list?: object; }[]`\n  Array of objects to import with property values keyed by slug\n\n- `options?: { caseInsensitive?: boolean; create_missing_options?: boolean; dedupe_by?: string; list_id?: string; }`\n  - `caseInsensitive?: boolean`\n    Whether deduplication should be case insensitive\n  - `create_missing_options?: boolean`\n    When true, unknown values for select/multiselect properties are created as new options instead of failing the import\n  - `dedupe_by?: string`\n    Property slug to deduplicate on\n  - `list_id?: string`\n    App/CRM ID for context (optional)\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: { code?: string; message?: string; }; expires_at?: string; failed?: number; processed?: number; results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]; succeeded?: number; updated_at?: string; }`\n  Status snapshot of an import job. Same shape used by the POST /import response and by GET /imports/{jobId}.\n\n  - `job_id: string`\n  - `status: 'complete' | 'processing' | 'failed'`\n  - `total: number`\n  - `created_at?: string`\n  - `error?: { code?: string; message?: string; }`\n  - `expires_at?: string`\n  - `failed?: number`\n  - `processed?: number`\n  - `results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]`\n  - `succeeded?: number`\n  - `updated_at?: string`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.actions.bulkCreate({ objects: [{}] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.actions.bulkCreate',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.actions.bulkCreate({ objects: [{}] });\n\nconsole.log(response.job_id);",
      },
      python: {
        method: 'prism.objects.actions.bulk_create',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.actions.bulk_create(\n    objects=[{}],\n)\nprint(response.job_id)',
      },
      go: {
        method: 'client.Prism.Objects.Actions.BulkNew',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Actions.BulkNew(context.TODO(), micro.PrismObjectActionBulkNewParams{\n\t\tObjects: micro.F([]micro.PrismObjectPropertiesParam{{}}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.JobID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/action/import \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "objects": [\n            {}\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'bulk_update',
    endpoint: '/v2/prism/{teamId}/action/batch/update',
    httpMethod: 'post',
    summary: 'Bulk update records (partial success)',
    description:
      "Patch up to 100 records in a single call. Each item is attempted independently — failures don't abort the batch. Inspect `results[].status` per item.",
    stainlessPath: '(resource) prism.objects.actions > (method) bulk_update',
    qualified: 'client.prism.objects.actions.bulkUpdate',
    params: ['teamId: string;', 'items: { id: string; }[];', 'Idempotency-Key?: string;'],
    response:
      "{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }",
    markdown:
      "## bulk_update\n\n`client.prism.objects.actions.bulkUpdate(teamId: string, items: { id: string; }[], Idempotency-Key?: string): { results: object[]; summary: object; }`\n\n**post** `/v2/prism/{teamId}/action/batch/update`\n\nPatch up to 100 records in a single call. Each item is attempted independently — failures don't abort the batch. Inspect `results[].status` per item.\n\n### Parameters\n\n- `teamId: string`\n\n- `items: { id: string; }[]`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }`\n  Partial-success bulk operation result. Inspect `results[].status` per item; the operation as a whole returns 200 even if some items failed.\n\n  - `results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]`\n  - `summary: { failed: number; succeeded: number; total: number; }`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.actions.bulkUpdate({ items: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.actions.bulkUpdate',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.actions.bulkUpdate({\n  items: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],\n});\n\nconsole.log(response.results);",
      },
      python: {
        method: 'prism.objects.actions.bulk_update',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.actions.bulk_update(\n    items=[{\n        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n    }],\n)\nprint(response.results)',
      },
      go: {
        method: 'client.Prism.Objects.Actions.BulkUpdate',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Actions.BulkUpdate(context.TODO(), micro.PrismObjectActionBulkUpdateParams{\n\t\tItems: micro.F([]micro.PrismObjectActionBulkUpdateParamsItem{{\n\t\t\tID: micro.F("182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"),\n\t\t}}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Results)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/action/batch/update \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "items": [\n            {\n              "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n            }\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'bulk_delete',
    endpoint: '/v2/prism/{teamId}/action/batch/delete',
    httpMethod: 'post',
    summary: 'Bulk delete records (partial success)',
    description:
      'Soft-delete up to 100 records in a single call. Same partial-success contract as batch/update.',
    stainlessPath: '(resource) prism.objects.actions > (method) bulk_delete',
    qualified: 'client.prism.objects.actions.bulkDelete',
    params: ['teamId: string;', 'ids: string[];', 'Idempotency-Key?: string;'],
    response:
      "{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }",
    markdown:
      "## bulk_delete\n\n`client.prism.objects.actions.bulkDelete(teamId: string, ids: string[], Idempotency-Key?: string): { results: object[]; summary: object; }`\n\n**post** `/v2/prism/{teamId}/action/batch/delete`\n\nSoft-delete up to 100 records in a single call. Same partial-success contract as batch/update.\n\n### Parameters\n\n- `teamId: string`\n\n- `ids: string[]`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }`\n  Partial-success bulk operation result. Inspect `results[].status` per item; the operation as a whole returns 200 even if some items failed.\n\n  - `results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]`\n  - `summary: { failed: number; succeeded: number; total: number; }`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.actions.bulkDelete({ ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.actions.bulkDelete',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.actions.bulkDelete({\n  ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],\n});\n\nconsole.log(response.results);",
      },
      python: {
        method: 'prism.objects.actions.bulk_delete',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.actions.bulk_delete(\n    ids=["182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"],\n)\nprint(response.results)',
      },
      go: {
        method: 'client.Prism.Objects.Actions.BulkDelete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Actions.BulkDelete(context.TODO(), micro.PrismObjectActionBulkDeleteParams{\n\t\tIDs: micro.F([]string{"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Results)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/action/batch/delete \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "ids": [\n            "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'duplicate',
    endpoint: '/v2/prism/{teamId}/action/{actionId}/duplicate',
    httpMethod: 'post',
    summary: 'Duplicate object',
    description: 'Duplicate object',
    stainlessPath: '(resource) prism.objects.actions > (method) duplicate',
    qualified: 'client.prism.objects.actions.duplicate',
    params: ['teamId: string;', 'actionId: string;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## duplicate\n\n`client.prism.objects.actions.duplicate(teamId: string, actionId: string, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/action/{actionId}/duplicate`\n\nDuplicate object\n\n### Parameters\n\n- `teamId: string`\n\n- `actionId: string`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.actions.duplicate('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.actions.duplicate',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.actions.duplicate(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.actions.duplicate',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.actions.duplicate(\n    action_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Actions.Duplicate',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Actions.Duplicate(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectActionDuplicateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/action/$ACTION_ID/duplicate \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'restore',
    endpoint: '/v2/prism/{teamId}/action/{actionId}/restore',
    httpMethod: 'post',
    summary: 'Restore object',
    description: 'Restore object',
    stainlessPath: '(resource) prism.objects.actions > (method) restore',
    qualified: 'client.prism.objects.actions.restore',
    params: ['teamId: string;', 'actionId: string;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## restore\n\n`client.prism.objects.actions.restore(teamId: string, actionId: string, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/action/{actionId}/restore`\n\nRestore object\n\n### Parameters\n\n- `teamId: string`\n\n- `actionId: string`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.actions.restore('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.actions.restore',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.actions.restore('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.actions.restore',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.actions.restore(\n    action_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Actions.Restore',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Actions.Restore(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectActionRestoreParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/action/$ACTION_ID/restore \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v2/prism/{teamId}/action/{actionId}/grant',
    httpMethod: 'get',
    summary: 'Get grant',
    description: 'Get grant',
    stainlessPath: '(resource) prism.objects.actions.grant > (method) get',
    qualified: 'client.prism.objects.actions.grant.get',
    params: ['teamId: string;', 'actionId: string;'],
    response: '{ team_group_id?: object[]; team_id?: object; user_id?: object[]; }',
    markdown:
      "## get\n\n`client.prism.objects.actions.grant.get(teamId: string, actionId: string): { team_group_id?: object[]; team_id?: object; user_id?: object[]; }`\n\n**get** `/v2/prism/{teamId}/action/{actionId}/grant`\n\nGet grant\n\n### Parameters\n\n- `teamId: string`\n\n- `actionId: string`\n\n### Returns\n\n- `{ team_group_id?: object[]; team_id?: object; user_id?: object[]; }`\n\n  - `team_group_id?: object[]`\n  - `team_id?: object`\n  - `user_id?: object[]`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst grant = await client.prism.objects.actions.grant.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(grant);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.actions.grant.get',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst grant = await client.prism.objects.actions.grant.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(grant.team_group_id);",
      },
      python: {
        method: 'prism.objects.actions.grant.get',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ngrant = client.prism.objects.actions.grant.get(\n    action_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(grant.team_group_id)',
      },
      go: {
        method: 'client.Prism.Objects.Actions.Grant.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tgrant, err := client.Prism.Objects.Actions.Grant.Get(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectActionGrantGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", grant.TeamGroupID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/action/$ACTION_ID/grant \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/prism/{teamId}/action/{actionId}/grant',
    httpMethod: 'put',
    summary: 'Update grant',
    description: 'Update grant',
    stainlessPath: '(resource) prism.objects.actions.grant > (method) update',
    qualified: 'client.prism.objects.actions.grant.update',
    params: [
      'teamId: string;',
      'actionId: string;',
      'team_group_id?: object[];',
      'team_id?: object;',
      'user_id?: object[];',
      'Idempotency-Key?: string;',
    ],
    response: '{ team_group_id?: object[]; team_id?: object; user_id?: object[]; }',
    markdown:
      "## update\n\n`client.prism.objects.actions.grant.update(teamId: string, actionId: string, team_group_id?: object[], team_id?: object, user_id?: object[], Idempotency-Key?: string): { team_group_id?: object[]; team_id?: object; user_id?: object[]; }`\n\n**put** `/v2/prism/{teamId}/action/{actionId}/grant`\n\nUpdate grant\n\n### Parameters\n\n- `teamId: string`\n\n- `actionId: string`\n\n- `team_group_id?: object[]`\n\n- `team_id?: object`\n\n- `user_id?: object[]`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ team_group_id?: object[]; team_id?: object; user_id?: object[]; }`\n\n  - `team_group_id?: object[]`\n  - `team_id?: object`\n  - `user_id?: object[]`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst grant = await client.prism.objects.actions.grant.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(grant);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.actions.grant.update',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst grant = await client.prism.objects.actions.grant.update(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(grant.team_group_id);",
      },
      python: {
        method: 'prism.objects.actions.grant.update',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ngrant = client.prism.objects.actions.grant.update(\n    action_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(grant.team_group_id)',
      },
      go: {
        method: 'client.Prism.Objects.Actions.Grant.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tgrant, err := client.Prism.Objects.Actions.Grant.Update(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectActionGrantUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", grant.TeamGroupID)\n}\n',
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/$TEAM_ID/action/$ACTION_ID/grant \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v2/prism/{teamId}/document',
    httpMethod: 'post',
    summary: 'Create object',
    description: 'Create object',
    stainlessPath: '(resource) prism.objects.documents > (method) create',
    qualified: 'client.prism.objects.documents.create',
    params: ['teamId: string;', 'default?: object;', 'list?: object;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## create\n\n`client.prism.objects.documents.create(teamId: string, default?: object, list?: object, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/document`\n\nCreate object\n\n### Parameters\n\n- `teamId: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst document = await client.prism.objects.documents.create();\n\nconsole.log(document);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.documents.create',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst document = await client.prism.objects.documents.create();\n\nconsole.log(document.id);",
      },
      python: {
        method: 'prism.objects.documents.create',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ndocument = client.prism.objects.documents.create()\nprint(document.id)',
      },
      go: {
        method: 'client.Prism.Objects.Documents.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tdocument, err := client.Prism.Objects.Documents.New(context.TODO(), micro.PrismObjectDocumentNewParams{\n\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", document.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/document \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/prism/{teamId}/document',
    httpMethod: 'get',
    summary: 'List records of an object type',
    description:
      'Convenience list endpoint. Equivalent to `POST /v2/prism/{teamId}/{objectType}/query` with an empty body, plus query-string sugar for the common cases. Any unrecognized query parameter is interpreted as an equality filter on a property of that name; pass arrays for `in`. Values are received as strings, so non-string property filters via this endpoint may not work — use the `query` endpoint for typed comparisons or anything beyond simple equality.',
    stainlessPath: '(resource) prism.objects.documents > (method) list',
    qualified: 'client.prism.objects.documents.list',
    params: [
      'teamId: string;',
      'cursor?: string;',
      'deleted?: boolean;',
      'include_total?: boolean;',
      'limit?: number;',
      'list_id?: string;',
      'select?: string;',
      'sort?: string;',
    ],
    response:
      '{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }',
    markdown:
      "## list\n\n`client.prism.objects.documents.list(teamId: string, cursor?: string, deleted?: boolean, include_total?: boolean, limit?: number, list_id?: string, select?: string, sort?: string): { data: object[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n**get** `/v2/prism/{teamId}/document`\n\nConvenience list endpoint. Equivalent to `POST /v2/prism/{teamId}/{objectType}/query` with an empty body, plus query-string sugar for the common cases. Any unrecognized query parameter is interpreted as an equality filter on a property of that name; pass arrays for `in`. Values are received as strings, so non-string property filters via this endpoint may not work — use the `query` endpoint for typed comparisons or anything beyond simple equality.\n\n### Parameters\n\n- `teamId: string`\n\n- `cursor?: string`\n  Opaque cursor from a previous response's `next_cursor`. Pass it back unchanged to fetch the next page.\n\n- `deleted?: boolean`\n  Include soft-deleted records. Pass the literal string `true`.\n\n- `include_total?: boolean`\n  When set to `true`, the response includes a `total` field with the unpaginated row count. Costs an extra pass; prefer `GET .../count` for the unfiltered total.\n\n- `limit?: number`\n  Maximum number of rows to return. Capped server-side at 50.\n\n- `list_id?: string`\n  Scope properties to a specific list/app.\n\n- `select?: string`\n  Comma-separated property slugs to return. Use dot notation for relationships. `id` is always returned at the top level. Defaults to all properties.\n\n- `sort?: string`\n  Comma-separated list of slugs. Prefix with `-` for descending. Example: `sort=-updated_at,name`.\n\n### Returns\n\n- `{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n  - `data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]`\n  - `has_more: boolean`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst documents = await client.prism.objects.documents.list();\n\nconsole.log(documents);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.documents.list',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst documents = await client.prism.objects.documents.list();\n\nconsole.log(documents.data);",
      },
      python: {
        method: 'prism.objects.documents.list',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ndocuments = client.prism.objects.documents.list()\nprint(documents.data)',
      },
      go: {
        method: 'client.Prism.Objects.Documents.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tdocuments, err := client.Prism.Objects.Documents.List(context.TODO(), micro.PrismObjectDocumentListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", documents.Data)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/document \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v2/prism/{teamId}/document/{documentId}',
    httpMethod: 'get',
    summary: 'Get object',
    description: 'Get object',
    stainlessPath: '(resource) prism.objects.documents > (method) get',
    qualified: 'client.prism.objects.documents.get',
    params: ['teamId: string;', 'documentId: string;', 'select?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## get\n\n`client.prism.objects.documents.get(teamId: string, documentId: string, select?: string): { id: string; default?: object; list?: object; }`\n\n**get** `/v2/prism/{teamId}/document/{documentId}`\n\nGet object\n\n### Parameters\n\n- `teamId: string`\n\n- `documentId: string`\n\n- `select?: string`\n  Comma-separated property slugs to return. Use dot notation for relationships. `id` is always returned at the top level. Defaults to all properties.\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst document = await client.prism.objects.documents.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(document);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.documents.get',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst document = await client.prism.objects.documents.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(document.id);",
      },
      python: {
        method: 'prism.objects.documents.get',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ndocument = client.prism.objects.documents.get(\n    document_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(document.id)',
      },
      go: {
        method: 'client.Prism.Objects.Documents.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tdocument, err := client.Prism.Objects.Documents.Get(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectDocumentGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", document.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/document/$DOCUMENT_ID \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/prism/{teamId}/document/{documentId}',
    httpMethod: 'patch',
    summary: 'Patch object',
    description: 'Patch object',
    stainlessPath: '(resource) prism.objects.documents > (method) update',
    qualified: 'client.prism.objects.documents.update',
    params: [
      'teamId: string;',
      'documentId: string;',
      'default?: object;',
      'list?: object;',
      'Idempotency-Key?: string;',
      'If-Match?: string;',
    ],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## update\n\n`client.prism.objects.documents.update(teamId: string, documentId: string, default?: object, list?: object, Idempotency-Key?: string, If-Match?: string): { id: string; default?: object; list?: object; }`\n\n**patch** `/v2/prism/{teamId}/document/{documentId}`\n\nPatch object\n\n### Parameters\n\n- `teamId: string`\n\n- `documentId: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n- `If-Match?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst document = await client.prism.objects.documents.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(document);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.documents.update',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst document = await client.prism.objects.documents.update(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(document.id);",
      },
      python: {
        method: 'prism.objects.documents.update',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ndocument = client.prism.objects.documents.update(\n    document_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(document.id)',
      },
      go: {
        method: 'client.Prism.Objects.Documents.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tdocument, err := client.Prism.Objects.Documents.Update(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectDocumentUpdateParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", document.ID)\n}\n',
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/$TEAM_ID/document/$DOCUMENT_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v2/prism/{teamId}/document/{documentId}',
    httpMethod: 'delete',
    summary: 'Delete object',
    description: 'Delete object',
    stainlessPath: '(resource) prism.objects.documents > (method) delete',
    qualified: 'client.prism.objects.documents.delete',
    params: ['teamId: string;', 'documentId: string;', 'If-Match?: string;'],
    markdown:
      "## delete\n\n`client.prism.objects.documents.delete(teamId: string, documentId: string, If-Match?: string): void`\n\n**delete** `/v2/prism/{teamId}/document/{documentId}`\n\nDelete object\n\n### Parameters\n\n- `teamId: string`\n\n- `documentId: string`\n\n- `If-Match?: string`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nawait client.prism.objects.documents.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.documents.delete',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.prism.objects.documents.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');",
      },
      python: {
        method: 'prism.objects.documents.delete',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.prism.objects.documents.delete(\n    document_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)',
      },
      go: {
        method: 'client.Prism.Objects.Documents.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Prism.Objects.Documents.Delete(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectDocumentDeleteParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/document/$DOCUMENT_ID \\\n    -X DELETE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'query',
    endpoint: '/v2/prism/{teamId}/document/query',
    httpMethod: 'post',
    summary: 'Query',
    description: 'Query',
    stainlessPath: '(resource) prism.objects.documents > (method) query',
    qualified: 'client.prism.objects.documents.query',
    params: [
      'teamId: string;',
      "query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; };",
      'id?: string | string[];',
      'boxes?: string[];',
      'cursor?: string;',
      'deleted?: boolean;',
      'include_total?: boolean;',
      'sources?: string[];',
    ],
    response:
      '{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }',
    markdown:
      "## query\n\n`client.prism.objects.documents.query(teamId: string, query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; }, id?: string | string[], boxes?: string[], cursor?: string, deleted?: boolean, include_total?: boolean, sources?: string[]): { data: object[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n**post** `/v2/prism/{teamId}/document/query`\n\nQuery\n\n### Parameters\n\n- `teamId: string`\n\n- `query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; }`\n  - `select: string[]`\n    Property slugs to select. Use dot notation for relationships (e.g. attendee.contact.first_name). `id` is always returned at the top level of each row and does not need to be selected.\n  - `combinator?: 'AND' | 'OR'`\n    Logical operator for combining filters\n  - `cursor?: string`\n    Opaque cursor from a previous response's `next_cursor`. Pass it back unchanged to fetch the next page. When set, `page` and `limit` are derived from the cursor and any explicit values are ignored.\n  - `filter?: object[]`\n    Filters as [{ slug: { operator: value } }]. For select/multiselect properties, values may be option slugs or option UUIDs.\n  - `limit?: number`\n    Maximum number of rows to return. Capped server-side at 50; requests above the cap are rejected.\n  - `list_id?: string`\n  - `page?: number`\n    Page number (1-based). Prefer `cursor`. Page-number pagination drifts under concurrent writes; use it only for one-shot exports.\n  - `sort?: object[]`\n    Sort order as [{ slug: direction }]. Array order determines sort priority\n\n- `id?: string | string[]`\n\n- `boxes?: string[]`\n\n- `cursor?: string`\n  Alternative location for the opaque cursor (a sibling of `query`). Use whichever feels more natural; if both are present, `query.cursor` wins.\n\n- `deleted?: boolean`\n\n- `include_total?: boolean`\n  When true, the response includes a `total` field with the unpaginated row count. Costs an additional pass over the result set — for unfiltered totals prefer `GET /v2/prism/{teamId}/{objectType}/count` instead.\n\n- `sources?: string[]`\n\n### Returns\n\n- `{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n  - `data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]`\n  - `has_more: boolean`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.documents.query({ query: { select: ['string'] } });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.documents.query',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.documents.query({ query: { select: ['string'] } });\n\nconsole.log(response.data);",
      },
      python: {
        method: 'prism.objects.documents.query',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.documents.query(\n    query={\n        "select": ["string"]\n    },\n)\nprint(response.data)',
      },
      go: {
        method: 'client.Prism.Objects.Documents.Query',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Documents.Query(context.TODO(), micro.PrismObjectDocumentQueryParams{\n\t\tQuery: micro.F(micro.PrismObjectDocumentQueryParamsQuery{\n\t\t\tSelect: micro.F([]string{"string"}),\n\t\t}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/document/query \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "query": {\n            "select": [\n              "string"\n            ]\n          }\n        }\'',
      },
    },
  },
  {
    name: 'count',
    endpoint: '/v2/prism/{teamId}/document/count',
    httpMethod: 'get',
    summary: 'Total record count for an object type',
    description:
      'Returns the total number of records of this object type that the caller can see. Avoids the page-overshoot anti-pattern — clients no longer need to keep paging until `has_more` flips false to discover the total. Currently does not apply query filters; for a filtered total, pass `include_total: true` in a POST `/query` body.',
    stainlessPath: '(resource) prism.objects.documents > (method) count',
    qualified: 'client.prism.objects.documents.count',
    params: ['teamId: string;', 'list_id?: string;'],
    response: '{ total: number; }',
    markdown:
      "## count\n\n`client.prism.objects.documents.count(teamId: string, list_id?: string): { total: number; }`\n\n**get** `/v2/prism/{teamId}/document/count`\n\nReturns the total number of records of this object type that the caller can see. Avoids the page-overshoot anti-pattern — clients no longer need to keep paging until `has_more` flips false to discover the total. Currently does not apply query filters; for a filtered total, pass `include_total: true` in a POST `/query` body.\n\n### Parameters\n\n- `teamId: string`\n\n- `list_id?: string`\n  Scope the count to a specific list/app.\n\n### Returns\n\n- `{ total: number; }`\n\n  - `total: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.documents.count();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.documents.count',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.documents.count();\n\nconsole.log(response.total);",
      },
      python: {
        method: 'prism.objects.documents.count',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.documents.count()\nprint(response.total)',
      },
      go: {
        method: 'client.Prism.Objects.Documents.Count',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Documents.Count(context.TODO(), micro.PrismObjectDocumentCountParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Total)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/document/count \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'find',
    endpoint: '/v2/prism/{teamId}/document/by/{slug}/{value}',
    httpMethod: 'get',
    summary: 'Find a record by property value',
    description:
      'Returns the single record whose property `{slug}` equals `{value}`. 404 if nothing matches; 409 if more than one record matches.',
    stainlessPath: '(resource) prism.objects.documents > (method) find',
    qualified: 'client.prism.objects.documents.find',
    params: ['teamId: string;', 'slug: string;', 'value: string;', 'list_id?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## find\n\n`client.prism.objects.documents.find(teamId: string, slug: string, value: string, list_id?: string): { id: string; default?: object; list?: object; }`\n\n**get** `/v2/prism/{teamId}/document/by/{slug}/{value}`\n\nReturns the single record whose property `{slug}` equals `{value}`. 404 if nothing matches; 409 if more than one record matches.\n\n### Parameters\n\n- `teamId: string`\n\n- `slug: string`\n\n- `value: string`\n\n- `list_id?: string`\n  Scope the lookup to a specific list/app.\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.documents.find('value', { slug: 'slug' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.documents.find',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.documents.find('value', { slug: 'slug' });\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.documents.find',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.documents.find(\n    value="value",\n    slug="slug",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Documents.Find',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Documents.Find(\n\t\tcontext.TODO(),\n\t\t"slug",\n\t\t"value",\n\t\tmicro.PrismObjectDocumentFindParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/document/by/$SLUG/$VALUE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'upsert',
    endpoint: '/v2/prism/{teamId}/document/by/{slug}/{value}',
    httpMethod: 'put',
    summary: 'Upsert by property value',
    description:
      'Idempotent create-or-update keyed on `{slug}={value}`. If exactly one record matches, it is patched and 200 is returned. If none match, a new record is created (with the lookup property set if absent) and 201 is returned. If multiple records match, 409 is returned and you should patch by id instead.',
    stainlessPath: '(resource) prism.objects.documents > (method) upsert',
    qualified: 'client.prism.objects.documents.upsert',
    params: [
      'teamId: string;',
      'slug: string;',
      'value: string;',
      'default?: object;',
      'list?: object;',
      'Idempotency-Key?: string;',
    ],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## upsert\n\n`client.prism.objects.documents.upsert(teamId: string, slug: string, value: string, default?: object, list?: object, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**put** `/v2/prism/{teamId}/document/by/{slug}/{value}`\n\nIdempotent create-or-update keyed on `{slug}={value}`. If exactly one record matches, it is patched and 200 is returned. If none match, a new record is created (with the lookup property set if absent) and 201 is returned. If multiple records match, 409 is returned and you should patch by id instead.\n\n### Parameters\n\n- `teamId: string`\n\n- `slug: string`\n\n- `value: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.documents.upsert('value', { slug: 'slug' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.documents.upsert',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.documents.upsert('value', { slug: 'slug' });\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.documents.upsert',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.documents.upsert(\n    value="value",\n    slug="slug",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Documents.Upsert',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Documents.Upsert(\n\t\tcontext.TODO(),\n\t\t"slug",\n\t\t"value",\n\t\tmicro.PrismObjectDocumentUpsertParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/$TEAM_ID/document/by/$SLUG/$VALUE \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'bulk_create',
    endpoint: '/v2/prism/{teamId}/document/import',
    httpMethod: 'post',
    summary: 'Import objects',
    description:
      'Import multiple objects in batch. Properties are keyed by slug. Automatically routes based on size: small batches complete synchronously and return 200 with the final `ImportJob`; large batches start an async job, return 202 with `status: processing` and a `Location` header, and can be polled via `GET /v2/prism/{teamId}/imports/{jobId}`.',
    stainlessPath: '(resource) prism.objects.documents > (method) bulk_create',
    qualified: 'client.prism.objects.documents.bulkCreate',
    params: [
      'teamId: string;',
      'objects: { default?: object; list?: object; }[];',
      'options?: { caseInsensitive?: boolean; create_missing_options?: boolean; dedupe_by?: string; list_id?: string; };',
      'Idempotency-Key?: string;',
    ],
    response:
      "{ job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: { code?: string; message?: string; }; expires_at?: string; failed?: number; processed?: number; results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]; succeeded?: number; updated_at?: string; }",
    markdown:
      "## bulk_create\n\n`client.prism.objects.documents.bulkCreate(teamId: string, objects: { default?: object; list?: object; }[], options?: { caseInsensitive?: boolean; create_missing_options?: boolean; dedupe_by?: string; list_id?: string; }, Idempotency-Key?: string): { job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: object; expires_at?: string; failed?: number; processed?: number; results?: object[]; succeeded?: number; updated_at?: string; }`\n\n**post** `/v2/prism/{teamId}/document/import`\n\nImport multiple objects in batch. Properties are keyed by slug. Automatically routes based on size: small batches complete synchronously and return 200 with the final `ImportJob`; large batches start an async job, return 202 with `status: processing` and a `Location` header, and can be polled via `GET /v2/prism/{teamId}/imports/{jobId}`.\n\n### Parameters\n\n- `teamId: string`\n\n- `objects: { default?: object; list?: object; }[]`\n  Array of objects to import with property values keyed by slug\n\n- `options?: { caseInsensitive?: boolean; create_missing_options?: boolean; dedupe_by?: string; list_id?: string; }`\n  - `caseInsensitive?: boolean`\n    Whether deduplication should be case insensitive\n  - `create_missing_options?: boolean`\n    When true, unknown values for select/multiselect properties are created as new options instead of failing the import\n  - `dedupe_by?: string`\n    Property slug to deduplicate on\n  - `list_id?: string`\n    App/CRM ID for context (optional)\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: { code?: string; message?: string; }; expires_at?: string; failed?: number; processed?: number; results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]; succeeded?: number; updated_at?: string; }`\n  Status snapshot of an import job. Same shape used by the POST /import response and by GET /imports/{jobId}.\n\n  - `job_id: string`\n  - `status: 'complete' | 'processing' | 'failed'`\n  - `total: number`\n  - `created_at?: string`\n  - `error?: { code?: string; message?: string; }`\n  - `expires_at?: string`\n  - `failed?: number`\n  - `processed?: number`\n  - `results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]`\n  - `succeeded?: number`\n  - `updated_at?: string`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.documents.bulkCreate({ objects: [{}] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.documents.bulkCreate',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.documents.bulkCreate({ objects: [{}] });\n\nconsole.log(response.job_id);",
      },
      python: {
        method: 'prism.objects.documents.bulk_create',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.documents.bulk_create(\n    objects=[{}],\n)\nprint(response.job_id)',
      },
      go: {
        method: 'client.Prism.Objects.Documents.BulkNew',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Documents.BulkNew(context.TODO(), micro.PrismObjectDocumentBulkNewParams{\n\t\tObjects: micro.F([]micro.PrismObjectPropertiesParam{{}}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.JobID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/document/import \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "objects": [\n            {}\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'bulk_update',
    endpoint: '/v2/prism/{teamId}/document/batch/update',
    httpMethod: 'post',
    summary: 'Bulk update records (partial success)',
    description:
      "Patch up to 100 records in a single call. Each item is attempted independently — failures don't abort the batch. Inspect `results[].status` per item.",
    stainlessPath: '(resource) prism.objects.documents > (method) bulk_update',
    qualified: 'client.prism.objects.documents.bulkUpdate',
    params: ['teamId: string;', 'items: { id: string; }[];', 'Idempotency-Key?: string;'],
    response:
      "{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }",
    markdown:
      "## bulk_update\n\n`client.prism.objects.documents.bulkUpdate(teamId: string, items: { id: string; }[], Idempotency-Key?: string): { results: object[]; summary: object; }`\n\n**post** `/v2/prism/{teamId}/document/batch/update`\n\nPatch up to 100 records in a single call. Each item is attempted independently — failures don't abort the batch. Inspect `results[].status` per item.\n\n### Parameters\n\n- `teamId: string`\n\n- `items: { id: string; }[]`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }`\n  Partial-success bulk operation result. Inspect `results[].status` per item; the operation as a whole returns 200 even if some items failed.\n\n  - `results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]`\n  - `summary: { failed: number; succeeded: number; total: number; }`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.documents.bulkUpdate({ items: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.documents.bulkUpdate',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.documents.bulkUpdate({\n  items: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],\n});\n\nconsole.log(response.results);",
      },
      python: {
        method: 'prism.objects.documents.bulk_update',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.documents.bulk_update(\n    items=[{\n        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n    }],\n)\nprint(response.results)',
      },
      go: {
        method: 'client.Prism.Objects.Documents.BulkUpdate',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Documents.BulkUpdate(context.TODO(), micro.PrismObjectDocumentBulkUpdateParams{\n\t\tItems: micro.F([]micro.PrismObjectDocumentBulkUpdateParamsItem{{\n\t\t\tID: micro.F("182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"),\n\t\t}}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Results)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/document/batch/update \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "items": [\n            {\n              "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n            }\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'bulk_delete',
    endpoint: '/v2/prism/{teamId}/document/batch/delete',
    httpMethod: 'post',
    summary: 'Bulk delete records (partial success)',
    description:
      'Soft-delete up to 100 records in a single call. Same partial-success contract as batch/update.',
    stainlessPath: '(resource) prism.objects.documents > (method) bulk_delete',
    qualified: 'client.prism.objects.documents.bulkDelete',
    params: ['teamId: string;', 'ids: string[];', 'Idempotency-Key?: string;'],
    response:
      "{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }",
    markdown:
      "## bulk_delete\n\n`client.prism.objects.documents.bulkDelete(teamId: string, ids: string[], Idempotency-Key?: string): { results: object[]; summary: object; }`\n\n**post** `/v2/prism/{teamId}/document/batch/delete`\n\nSoft-delete up to 100 records in a single call. Same partial-success contract as batch/update.\n\n### Parameters\n\n- `teamId: string`\n\n- `ids: string[]`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }`\n  Partial-success bulk operation result. Inspect `results[].status` per item; the operation as a whole returns 200 even if some items failed.\n\n  - `results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]`\n  - `summary: { failed: number; succeeded: number; total: number; }`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.documents.bulkDelete({ ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.documents.bulkDelete',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.documents.bulkDelete({\n  ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],\n});\n\nconsole.log(response.results);",
      },
      python: {
        method: 'prism.objects.documents.bulk_delete',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.documents.bulk_delete(\n    ids=["182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"],\n)\nprint(response.results)',
      },
      go: {
        method: 'client.Prism.Objects.Documents.BulkDelete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Documents.BulkDelete(context.TODO(), micro.PrismObjectDocumentBulkDeleteParams{\n\t\tIDs: micro.F([]string{"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Results)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/document/batch/delete \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "ids": [\n            "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'duplicate',
    endpoint: '/v2/prism/{teamId}/document/{documentId}/duplicate',
    httpMethod: 'post',
    summary: 'Duplicate object',
    description: 'Duplicate object',
    stainlessPath: '(resource) prism.objects.documents > (method) duplicate',
    qualified: 'client.prism.objects.documents.duplicate',
    params: ['teamId: string;', 'documentId: string;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## duplicate\n\n`client.prism.objects.documents.duplicate(teamId: string, documentId: string, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/document/{documentId}/duplicate`\n\nDuplicate object\n\n### Parameters\n\n- `teamId: string`\n\n- `documentId: string`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.documents.duplicate('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.documents.duplicate',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.documents.duplicate(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.documents.duplicate',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.documents.duplicate(\n    document_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Documents.Duplicate',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Documents.Duplicate(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectDocumentDuplicateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/document/$DOCUMENT_ID/duplicate \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'restore',
    endpoint: '/v2/prism/{teamId}/document/{documentId}/restore',
    httpMethod: 'post',
    summary: 'Restore object',
    description: 'Restore object',
    stainlessPath: '(resource) prism.objects.documents > (method) restore',
    qualified: 'client.prism.objects.documents.restore',
    params: ['teamId: string;', 'documentId: string;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## restore\n\n`client.prism.objects.documents.restore(teamId: string, documentId: string, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/document/{documentId}/restore`\n\nRestore object\n\n### Parameters\n\n- `teamId: string`\n\n- `documentId: string`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.documents.restore('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.documents.restore',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.documents.restore(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.documents.restore',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.documents.restore(\n    document_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Documents.Restore',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Documents.Restore(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectDocumentRestoreParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/document/$DOCUMENT_ID/restore \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v2/prism/{teamId}/document/{documentId}/grant',
    httpMethod: 'get',
    summary: 'Get grant',
    description: 'Get grant',
    stainlessPath: '(resource) prism.objects.documents.grant > (method) get',
    qualified: 'client.prism.objects.documents.grant.get',
    params: ['teamId: string;', 'documentId: string;'],
    response: '{ team_group_id?: object[]; team_id?: object; user_id?: object[]; }',
    markdown:
      "## get\n\n`client.prism.objects.documents.grant.get(teamId: string, documentId: string): { team_group_id?: object[]; team_id?: object; user_id?: object[]; }`\n\n**get** `/v2/prism/{teamId}/document/{documentId}/grant`\n\nGet grant\n\n### Parameters\n\n- `teamId: string`\n\n- `documentId: string`\n\n### Returns\n\n- `{ team_group_id?: object[]; team_id?: object; user_id?: object[]; }`\n\n  - `team_group_id?: object[]`\n  - `team_id?: object`\n  - `user_id?: object[]`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst grant = await client.prism.objects.documents.grant.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(grant);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.documents.grant.get',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst grant = await client.prism.objects.documents.grant.get(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(grant.team_group_id);",
      },
      python: {
        method: 'prism.objects.documents.grant.get',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ngrant = client.prism.objects.documents.grant.get(\n    document_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(grant.team_group_id)',
      },
      go: {
        method: 'client.Prism.Objects.Documents.Grant.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tgrant, err := client.Prism.Objects.Documents.Grant.Get(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectDocumentGrantGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", grant.TeamGroupID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/document/$DOCUMENT_ID/grant \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/prism/{teamId}/document/{documentId}/grant',
    httpMethod: 'put',
    summary: 'Update grant',
    description: 'Update grant',
    stainlessPath: '(resource) prism.objects.documents.grant > (method) update',
    qualified: 'client.prism.objects.documents.grant.update',
    params: [
      'teamId: string;',
      'documentId: string;',
      'team_group_id?: object[];',
      'team_id?: object;',
      'user_id?: object[];',
      'Idempotency-Key?: string;',
    ],
    response: '{ team_group_id?: object[]; team_id?: object; user_id?: object[]; }',
    markdown:
      "## update\n\n`client.prism.objects.documents.grant.update(teamId: string, documentId: string, team_group_id?: object[], team_id?: object, user_id?: object[], Idempotency-Key?: string): { team_group_id?: object[]; team_id?: object; user_id?: object[]; }`\n\n**put** `/v2/prism/{teamId}/document/{documentId}/grant`\n\nUpdate grant\n\n### Parameters\n\n- `teamId: string`\n\n- `documentId: string`\n\n- `team_group_id?: object[]`\n\n- `team_id?: object`\n\n- `user_id?: object[]`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ team_group_id?: object[]; team_id?: object; user_id?: object[]; }`\n\n  - `team_group_id?: object[]`\n  - `team_id?: object`\n  - `user_id?: object[]`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst grant = await client.prism.objects.documents.grant.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(grant);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.documents.grant.update',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst grant = await client.prism.objects.documents.grant.update(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(grant.team_group_id);",
      },
      python: {
        method: 'prism.objects.documents.grant.update',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ngrant = client.prism.objects.documents.grant.update(\n    document_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(grant.team_group_id)',
      },
      go: {
        method: 'client.Prism.Objects.Documents.Grant.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tgrant, err := client.Prism.Objects.Documents.Grant.Update(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectDocumentGrantUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", grant.TeamGroupID)\n}\n',
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/$TEAM_ID/document/$DOCUMENT_ID/grant \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v2/prism/{teamId}/event',
    httpMethod: 'post',
    summary: 'Create object',
    description: 'Create object',
    stainlessPath: '(resource) prism.objects.events > (method) create',
    qualified: 'client.prism.objects.events.create',
    params: ['teamId: string;', 'default?: object;', 'list?: object;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## create\n\n`client.prism.objects.events.create(teamId: string, default?: object, list?: object, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/event`\n\nCreate object\n\n### Parameters\n\n- `teamId: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst event = await client.prism.objects.events.create();\n\nconsole.log(event);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.events.create',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst event = await client.prism.objects.events.create();\n\nconsole.log(event.id);",
      },
      python: {
        method: 'prism.objects.events.create',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nevent = client.prism.objects.events.create()\nprint(event.id)',
      },
      go: {
        method: 'client.Prism.Objects.Events.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tevent, err := client.Prism.Objects.Events.New(context.TODO(), micro.PrismObjectEventNewParams{\n\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", event.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/event \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/prism/{teamId}/event',
    httpMethod: 'get',
    summary: 'List records of an object type',
    description:
      'Convenience list endpoint. Equivalent to `POST /v2/prism/{teamId}/{objectType}/query` with an empty body, plus query-string sugar for the common cases. Any unrecognized query parameter is interpreted as an equality filter on a property of that name; pass arrays for `in`. Values are received as strings, so non-string property filters via this endpoint may not work — use the `query` endpoint for typed comparisons or anything beyond simple equality.',
    stainlessPath: '(resource) prism.objects.events > (method) list',
    qualified: 'client.prism.objects.events.list',
    params: [
      'teamId: string;',
      'cursor?: string;',
      'deleted?: boolean;',
      'include_total?: boolean;',
      'limit?: number;',
      'list_id?: string;',
      'select?: string;',
      'sort?: string;',
    ],
    response:
      '{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }',
    markdown:
      "## list\n\n`client.prism.objects.events.list(teamId: string, cursor?: string, deleted?: boolean, include_total?: boolean, limit?: number, list_id?: string, select?: string, sort?: string): { data: object[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n**get** `/v2/prism/{teamId}/event`\n\nConvenience list endpoint. Equivalent to `POST /v2/prism/{teamId}/{objectType}/query` with an empty body, plus query-string sugar for the common cases. Any unrecognized query parameter is interpreted as an equality filter on a property of that name; pass arrays for `in`. Values are received as strings, so non-string property filters via this endpoint may not work — use the `query` endpoint for typed comparisons or anything beyond simple equality.\n\n### Parameters\n\n- `teamId: string`\n\n- `cursor?: string`\n  Opaque cursor from a previous response's `next_cursor`. Pass it back unchanged to fetch the next page.\n\n- `deleted?: boolean`\n  Include soft-deleted records. Pass the literal string `true`.\n\n- `include_total?: boolean`\n  When set to `true`, the response includes a `total` field with the unpaginated row count. Costs an extra pass; prefer `GET .../count` for the unfiltered total.\n\n- `limit?: number`\n  Maximum number of rows to return. Capped server-side at 50.\n\n- `list_id?: string`\n  Scope properties to a specific list/app.\n\n- `select?: string`\n  Comma-separated property slugs to return. Use dot notation for relationships. `id` is always returned at the top level. Defaults to all properties.\n\n- `sort?: string`\n  Comma-separated list of slugs. Prefix with `-` for descending. Example: `sort=-updated_at,name`.\n\n### Returns\n\n- `{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n  - `data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]`\n  - `has_more: boolean`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst events = await client.prism.objects.events.list();\n\nconsole.log(events);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.events.list',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst events = await client.prism.objects.events.list();\n\nconsole.log(events.data);",
      },
      python: {
        method: 'prism.objects.events.list',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nevents = client.prism.objects.events.list()\nprint(events.data)',
      },
      go: {
        method: 'client.Prism.Objects.Events.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tevents, err := client.Prism.Objects.Events.List(context.TODO(), micro.PrismObjectEventListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", events.Data)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/event \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v2/prism/{teamId}/event/{eventId}',
    httpMethod: 'get',
    summary: 'Get object',
    description: 'Get object',
    stainlessPath: '(resource) prism.objects.events > (method) get',
    qualified: 'client.prism.objects.events.get',
    params: ['teamId: string;', 'eventId: string;', 'select?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## get\n\n`client.prism.objects.events.get(teamId: string, eventId: string, select?: string): { id: string; default?: object; list?: object; }`\n\n**get** `/v2/prism/{teamId}/event/{eventId}`\n\nGet object\n\n### Parameters\n\n- `teamId: string`\n\n- `eventId: string`\n\n- `select?: string`\n  Comma-separated property slugs to return. Use dot notation for relationships. `id` is always returned at the top level. Defaults to all properties.\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst event = await client.prism.objects.events.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(event);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.events.get',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst event = await client.prism.objects.events.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(event.id);",
      },
      python: {
        method: 'prism.objects.events.get',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nevent = client.prism.objects.events.get(\n    event_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(event.id)',
      },
      go: {
        method: 'client.Prism.Objects.Events.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tevent, err := client.Prism.Objects.Events.Get(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectEventGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", event.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/event/$EVENT_ID \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/prism/{teamId}/event/{eventId}',
    httpMethod: 'patch',
    summary: 'Patch object',
    description: 'Patch object',
    stainlessPath: '(resource) prism.objects.events > (method) update',
    qualified: 'client.prism.objects.events.update',
    params: [
      'teamId: string;',
      'eventId: string;',
      'default?: object;',
      'list?: object;',
      'Idempotency-Key?: string;',
      'If-Match?: string;',
    ],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## update\n\n`client.prism.objects.events.update(teamId: string, eventId: string, default?: object, list?: object, Idempotency-Key?: string, If-Match?: string): { id: string; default?: object; list?: object; }`\n\n**patch** `/v2/prism/{teamId}/event/{eventId}`\n\nPatch object\n\n### Parameters\n\n- `teamId: string`\n\n- `eventId: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n- `If-Match?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst event = await client.prism.objects.events.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(event);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.events.update',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst event = await client.prism.objects.events.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(event.id);",
      },
      python: {
        method: 'prism.objects.events.update',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nevent = client.prism.objects.events.update(\n    event_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(event.id)',
      },
      go: {
        method: 'client.Prism.Objects.Events.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tevent, err := client.Prism.Objects.Events.Update(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectEventUpdateParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", event.ID)\n}\n',
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/$TEAM_ID/event/$EVENT_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v2/prism/{teamId}/event/{eventId}',
    httpMethod: 'delete',
    summary: 'Delete object',
    description: 'Delete object',
    stainlessPath: '(resource) prism.objects.events > (method) delete',
    qualified: 'client.prism.objects.events.delete',
    params: ['teamId: string;', 'eventId: string;', 'If-Match?: string;'],
    markdown:
      "## delete\n\n`client.prism.objects.events.delete(teamId: string, eventId: string, If-Match?: string): void`\n\n**delete** `/v2/prism/{teamId}/event/{eventId}`\n\nDelete object\n\n### Parameters\n\n- `teamId: string`\n\n- `eventId: string`\n\n- `If-Match?: string`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nawait client.prism.objects.events.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.events.delete',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.prism.objects.events.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');",
      },
      python: {
        method: 'prism.objects.events.delete',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.prism.objects.events.delete(\n    event_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)',
      },
      go: {
        method: 'client.Prism.Objects.Events.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Prism.Objects.Events.Delete(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectEventDeleteParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/event/$EVENT_ID \\\n    -X DELETE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'query',
    endpoint: '/v2/prism/{teamId}/event/query',
    httpMethod: 'post',
    summary: 'Query',
    description: 'Query',
    stainlessPath: '(resource) prism.objects.events > (method) query',
    qualified: 'client.prism.objects.events.query',
    params: [
      'teamId: string;',
      "query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; };",
      'id?: string | string[];',
      'boxes?: string[];',
      'cursor?: string;',
      'deleted?: boolean;',
      'include_total?: boolean;',
      'sources?: string[];',
    ],
    response:
      '{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }',
    markdown:
      "## query\n\n`client.prism.objects.events.query(teamId: string, query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; }, id?: string | string[], boxes?: string[], cursor?: string, deleted?: boolean, include_total?: boolean, sources?: string[]): { data: object[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n**post** `/v2/prism/{teamId}/event/query`\n\nQuery\n\n### Parameters\n\n- `teamId: string`\n\n- `query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; }`\n  - `select: string[]`\n    Property slugs to select. Use dot notation for relationships (e.g. attendee.contact.first_name). `id` is always returned at the top level of each row and does not need to be selected.\n  - `combinator?: 'AND' | 'OR'`\n    Logical operator for combining filters\n  - `cursor?: string`\n    Opaque cursor from a previous response's `next_cursor`. Pass it back unchanged to fetch the next page. When set, `page` and `limit` are derived from the cursor and any explicit values are ignored.\n  - `filter?: object[]`\n    Filters as [{ slug: { operator: value } }]. For select/multiselect properties, values may be option slugs or option UUIDs.\n  - `limit?: number`\n    Maximum number of rows to return. Capped server-side at 50; requests above the cap are rejected.\n  - `list_id?: string`\n  - `page?: number`\n    Page number (1-based). Prefer `cursor`. Page-number pagination drifts under concurrent writes; use it only for one-shot exports.\n  - `sort?: object[]`\n    Sort order as [{ slug: direction }]. Array order determines sort priority\n\n- `id?: string | string[]`\n\n- `boxes?: string[]`\n\n- `cursor?: string`\n  Alternative location for the opaque cursor (a sibling of `query`). Use whichever feels more natural; if both are present, `query.cursor` wins.\n\n- `deleted?: boolean`\n\n- `include_total?: boolean`\n  When true, the response includes a `total` field with the unpaginated row count. Costs an additional pass over the result set — for unfiltered totals prefer `GET /v2/prism/{teamId}/{objectType}/count` instead.\n\n- `sources?: string[]`\n\n### Returns\n\n- `{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n  - `data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]`\n  - `has_more: boolean`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.events.query({ query: { select: ['string'] } });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.events.query',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.events.query({ query: { select: ['string'] } });\n\nconsole.log(response.data);",
      },
      python: {
        method: 'prism.objects.events.query',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.events.query(\n    query={\n        "select": ["string"]\n    },\n)\nprint(response.data)',
      },
      go: {
        method: 'client.Prism.Objects.Events.Query',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Events.Query(context.TODO(), micro.PrismObjectEventQueryParams{\n\t\tQuery: micro.F(micro.PrismObjectEventQueryParamsQuery{\n\t\t\tSelect: micro.F([]string{"string"}),\n\t\t}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/event/query \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "query": {\n            "select": [\n              "string"\n            ]\n          }\n        }\'',
      },
    },
  },
  {
    name: 'count',
    endpoint: '/v2/prism/{teamId}/event/count',
    httpMethod: 'get',
    summary: 'Total record count for an object type',
    description:
      'Returns the total number of records of this object type that the caller can see. Avoids the page-overshoot anti-pattern — clients no longer need to keep paging until `has_more` flips false to discover the total. Currently does not apply query filters; for a filtered total, pass `include_total: true` in a POST `/query` body.',
    stainlessPath: '(resource) prism.objects.events > (method) count',
    qualified: 'client.prism.objects.events.count',
    params: ['teamId: string;', 'list_id?: string;'],
    response: '{ total: number; }',
    markdown:
      "## count\n\n`client.prism.objects.events.count(teamId: string, list_id?: string): { total: number; }`\n\n**get** `/v2/prism/{teamId}/event/count`\n\nReturns the total number of records of this object type that the caller can see. Avoids the page-overshoot anti-pattern — clients no longer need to keep paging until `has_more` flips false to discover the total. Currently does not apply query filters; for a filtered total, pass `include_total: true` in a POST `/query` body.\n\n### Parameters\n\n- `teamId: string`\n\n- `list_id?: string`\n  Scope the count to a specific list/app.\n\n### Returns\n\n- `{ total: number; }`\n\n  - `total: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.events.count();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.events.count',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.events.count();\n\nconsole.log(response.total);",
      },
      python: {
        method: 'prism.objects.events.count',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.events.count()\nprint(response.total)',
      },
      go: {
        method: 'client.Prism.Objects.Events.Count',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Events.Count(context.TODO(), micro.PrismObjectEventCountParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Total)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/event/count \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'find',
    endpoint: '/v2/prism/{teamId}/event/by/{slug}/{value}',
    httpMethod: 'get',
    summary: 'Find a record by property value',
    description:
      'Returns the single record whose property `{slug}` equals `{value}`. 404 if nothing matches; 409 if more than one record matches.',
    stainlessPath: '(resource) prism.objects.events > (method) find',
    qualified: 'client.prism.objects.events.find',
    params: ['teamId: string;', 'slug: string;', 'value: string;', 'list_id?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## find\n\n`client.prism.objects.events.find(teamId: string, slug: string, value: string, list_id?: string): { id: string; default?: object; list?: object; }`\n\n**get** `/v2/prism/{teamId}/event/by/{slug}/{value}`\n\nReturns the single record whose property `{slug}` equals `{value}`. 404 if nothing matches; 409 if more than one record matches.\n\n### Parameters\n\n- `teamId: string`\n\n- `slug: string`\n\n- `value: string`\n\n- `list_id?: string`\n  Scope the lookup to a specific list/app.\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.events.find('value', { slug: 'slug' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.events.find',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.events.find('value', { slug: 'slug' });\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.events.find',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.events.find(\n    value="value",\n    slug="slug",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Events.Find',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Events.Find(\n\t\tcontext.TODO(),\n\t\t"slug",\n\t\t"value",\n\t\tmicro.PrismObjectEventFindParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/event/by/$SLUG/$VALUE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'upsert',
    endpoint: '/v2/prism/{teamId}/event/by/{slug}/{value}',
    httpMethod: 'put',
    summary: 'Upsert by property value',
    description:
      'Idempotent create-or-update keyed on `{slug}={value}`. If exactly one record matches, it is patched and 200 is returned. If none match, a new record is created (with the lookup property set if absent) and 201 is returned. If multiple records match, 409 is returned and you should patch by id instead.',
    stainlessPath: '(resource) prism.objects.events > (method) upsert',
    qualified: 'client.prism.objects.events.upsert',
    params: [
      'teamId: string;',
      'slug: string;',
      'value: string;',
      'default?: object;',
      'list?: object;',
      'Idempotency-Key?: string;',
    ],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## upsert\n\n`client.prism.objects.events.upsert(teamId: string, slug: string, value: string, default?: object, list?: object, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**put** `/v2/prism/{teamId}/event/by/{slug}/{value}`\n\nIdempotent create-or-update keyed on `{slug}={value}`. If exactly one record matches, it is patched and 200 is returned. If none match, a new record is created (with the lookup property set if absent) and 201 is returned. If multiple records match, 409 is returned and you should patch by id instead.\n\n### Parameters\n\n- `teamId: string`\n\n- `slug: string`\n\n- `value: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.events.upsert('value', { slug: 'slug' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.events.upsert',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.events.upsert('value', { slug: 'slug' });\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.events.upsert',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.events.upsert(\n    value="value",\n    slug="slug",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Events.Upsert',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Events.Upsert(\n\t\tcontext.TODO(),\n\t\t"slug",\n\t\t"value",\n\t\tmicro.PrismObjectEventUpsertParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/$TEAM_ID/event/by/$SLUG/$VALUE \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'duplicate',
    endpoint: '/v2/prism/{teamId}/event/{eventId}/duplicate',
    httpMethod: 'post',
    summary: 'Duplicate object',
    description: 'Duplicate object',
    stainlessPath: '(resource) prism.objects.events > (method) duplicate',
    qualified: 'client.prism.objects.events.duplicate',
    params: ['teamId: string;', 'eventId: string;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## duplicate\n\n`client.prism.objects.events.duplicate(teamId: string, eventId: string, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/event/{eventId}/duplicate`\n\nDuplicate object\n\n### Parameters\n\n- `teamId: string`\n\n- `eventId: string`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.events.duplicate('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.events.duplicate',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.events.duplicate(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.events.duplicate',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.events.duplicate(\n    event_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Events.Duplicate',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Events.Duplicate(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectEventDuplicateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/event/$EVENT_ID/duplicate \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'restore',
    endpoint: '/v2/prism/{teamId}/event/{eventId}/restore',
    httpMethod: 'post',
    summary: 'Restore object',
    description: 'Restore object',
    stainlessPath: '(resource) prism.objects.events > (method) restore',
    qualified: 'client.prism.objects.events.restore',
    params: ['teamId: string;', 'eventId: string;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## restore\n\n`client.prism.objects.events.restore(teamId: string, eventId: string, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/event/{eventId}/restore`\n\nRestore object\n\n### Parameters\n\n- `teamId: string`\n\n- `eventId: string`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.events.restore('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.events.restore',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.events.restore('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.events.restore',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.events.restore(\n    event_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Events.Restore',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Events.Restore(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectEventRestoreParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/event/$EVENT_ID/restore \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v2/prism/{teamId}/event/{eventId}/grant',
    httpMethod: 'get',
    summary: 'Get grant',
    description: 'Get grant',
    stainlessPath: '(resource) prism.objects.events.grant > (method) get',
    qualified: 'client.prism.objects.events.grant.get',
    params: ['teamId: string;', 'eventId: string;'],
    response: '{ team_group_id?: object[]; team_id?: object; user_id?: object[]; }',
    markdown:
      "## get\n\n`client.prism.objects.events.grant.get(teamId: string, eventId: string): { team_group_id?: object[]; team_id?: object; user_id?: object[]; }`\n\n**get** `/v2/prism/{teamId}/event/{eventId}/grant`\n\nGet grant\n\n### Parameters\n\n- `teamId: string`\n\n- `eventId: string`\n\n### Returns\n\n- `{ team_group_id?: object[]; team_id?: object; user_id?: object[]; }`\n\n  - `team_group_id?: object[]`\n  - `team_id?: object`\n  - `user_id?: object[]`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst grant = await client.prism.objects.events.grant.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(grant);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.events.grant.get',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst grant = await client.prism.objects.events.grant.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(grant.team_group_id);",
      },
      python: {
        method: 'prism.objects.events.grant.get',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ngrant = client.prism.objects.events.grant.get(\n    event_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(grant.team_group_id)',
      },
      go: {
        method: 'client.Prism.Objects.Events.Grant.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tgrant, err := client.Prism.Objects.Events.Grant.Get(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectEventGrantGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", grant.TeamGroupID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/event/$EVENT_ID/grant \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/prism/{teamId}/event/{eventId}/grant',
    httpMethod: 'put',
    summary: 'Update grant',
    description: 'Update grant',
    stainlessPath: '(resource) prism.objects.events.grant > (method) update',
    qualified: 'client.prism.objects.events.grant.update',
    params: [
      'teamId: string;',
      'eventId: string;',
      'team_group_id?: object[];',
      'team_id?: object;',
      'user_id?: object[];',
      'Idempotency-Key?: string;',
    ],
    response: '{ team_group_id?: object[]; team_id?: object; user_id?: object[]; }',
    markdown:
      "## update\n\n`client.prism.objects.events.grant.update(teamId: string, eventId: string, team_group_id?: object[], team_id?: object, user_id?: object[], Idempotency-Key?: string): { team_group_id?: object[]; team_id?: object; user_id?: object[]; }`\n\n**put** `/v2/prism/{teamId}/event/{eventId}/grant`\n\nUpdate grant\n\n### Parameters\n\n- `teamId: string`\n\n- `eventId: string`\n\n- `team_group_id?: object[]`\n\n- `team_id?: object`\n\n- `user_id?: object[]`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ team_group_id?: object[]; team_id?: object; user_id?: object[]; }`\n\n  - `team_group_id?: object[]`\n  - `team_id?: object`\n  - `user_id?: object[]`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst grant = await client.prism.objects.events.grant.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(grant);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.events.grant.update',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst grant = await client.prism.objects.events.grant.update(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(grant.team_group_id);",
      },
      python: {
        method: 'prism.objects.events.grant.update',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ngrant = client.prism.objects.events.grant.update(\n    event_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(grant.team_group_id)',
      },
      go: {
        method: 'client.Prism.Objects.Events.Grant.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tgrant, err := client.Prism.Objects.Events.Grant.Update(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectEventGrantUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", grant.TeamGroupID)\n}\n',
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/$TEAM_ID/event/$EVENT_ID/grant \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v2/prism/{teamId}/engagement',
    httpMethod: 'post',
    summary: 'Create object',
    description: 'Create object',
    stainlessPath: '(resource) prism.objects.engagements > (method) create',
    qualified: 'client.prism.objects.engagements.create',
    params: ['teamId: string;', 'default?: object;', 'list?: object;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## create\n\n`client.prism.objects.engagements.create(teamId: string, default?: object, list?: object, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/engagement`\n\nCreate object\n\n### Parameters\n\n- `teamId: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst engagement = await client.prism.objects.engagements.create();\n\nconsole.log(engagement);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.engagements.create',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst engagement = await client.prism.objects.engagements.create();\n\nconsole.log(engagement.id);",
      },
      python: {
        method: 'prism.objects.engagements.create',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nengagement = client.prism.objects.engagements.create()\nprint(engagement.id)',
      },
      go: {
        method: 'client.Prism.Objects.Engagements.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tengagement, err := client.Prism.Objects.Engagements.New(context.TODO(), micro.PrismObjectEngagementNewParams{\n\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", engagement.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/engagement \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/prism/{teamId}/engagement',
    httpMethod: 'get',
    summary: 'List records of an object type',
    description:
      'Convenience list endpoint. Equivalent to `POST /v2/prism/{teamId}/{objectType}/query` with an empty body, plus query-string sugar for the common cases. Any unrecognized query parameter is interpreted as an equality filter on a property of that name; pass arrays for `in`. Values are received as strings, so non-string property filters via this endpoint may not work — use the `query` endpoint for typed comparisons or anything beyond simple equality.',
    stainlessPath: '(resource) prism.objects.engagements > (method) list',
    qualified: 'client.prism.objects.engagements.list',
    params: [
      'teamId: string;',
      'cursor?: string;',
      'deleted?: boolean;',
      'include_total?: boolean;',
      'limit?: number;',
      'list_id?: string;',
      'select?: string;',
      'sort?: string;',
    ],
    response:
      '{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }',
    markdown:
      "## list\n\n`client.prism.objects.engagements.list(teamId: string, cursor?: string, deleted?: boolean, include_total?: boolean, limit?: number, list_id?: string, select?: string, sort?: string): { data: object[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n**get** `/v2/prism/{teamId}/engagement`\n\nConvenience list endpoint. Equivalent to `POST /v2/prism/{teamId}/{objectType}/query` with an empty body, plus query-string sugar for the common cases. Any unrecognized query parameter is interpreted as an equality filter on a property of that name; pass arrays for `in`. Values are received as strings, so non-string property filters via this endpoint may not work — use the `query` endpoint for typed comparisons or anything beyond simple equality.\n\n### Parameters\n\n- `teamId: string`\n\n- `cursor?: string`\n  Opaque cursor from a previous response's `next_cursor`. Pass it back unchanged to fetch the next page.\n\n- `deleted?: boolean`\n  Include soft-deleted records. Pass the literal string `true`.\n\n- `include_total?: boolean`\n  When set to `true`, the response includes a `total` field with the unpaginated row count. Costs an extra pass; prefer `GET .../count` for the unfiltered total.\n\n- `limit?: number`\n  Maximum number of rows to return. Capped server-side at 50.\n\n- `list_id?: string`\n  Scope properties to a specific list/app.\n\n- `select?: string`\n  Comma-separated property slugs to return. Use dot notation for relationships. `id` is always returned at the top level. Defaults to all properties.\n\n- `sort?: string`\n  Comma-separated list of slugs. Prefix with `-` for descending. Example: `sort=-updated_at,name`.\n\n### Returns\n\n- `{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n  - `data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]`\n  - `has_more: boolean`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst engagements = await client.prism.objects.engagements.list();\n\nconsole.log(engagements);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.engagements.list',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst engagements = await client.prism.objects.engagements.list();\n\nconsole.log(engagements.data);",
      },
      python: {
        method: 'prism.objects.engagements.list',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nengagements = client.prism.objects.engagements.list()\nprint(engagements.data)',
      },
      go: {
        method: 'client.Prism.Objects.Engagements.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tengagements, err := client.Prism.Objects.Engagements.List(context.TODO(), micro.PrismObjectEngagementListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", engagements.Data)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/engagement \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v2/prism/{teamId}/engagement/{engagementId}',
    httpMethod: 'get',
    summary: 'Get object',
    description: 'Get object',
    stainlessPath: '(resource) prism.objects.engagements > (method) get',
    qualified: 'client.prism.objects.engagements.get',
    params: ['teamId: string;', 'engagementId: string;', 'select?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## get\n\n`client.prism.objects.engagements.get(teamId: string, engagementId: string, select?: string): { id: string; default?: object; list?: object; }`\n\n**get** `/v2/prism/{teamId}/engagement/{engagementId}`\n\nGet object\n\n### Parameters\n\n- `teamId: string`\n\n- `engagementId: string`\n\n- `select?: string`\n  Comma-separated property slugs to return. Use dot notation for relationships. `id` is always returned at the top level. Defaults to all properties.\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst engagement = await client.prism.objects.engagements.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(engagement);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.engagements.get',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst engagement = await client.prism.objects.engagements.get(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(engagement.id);",
      },
      python: {
        method: 'prism.objects.engagements.get',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nengagement = client.prism.objects.engagements.get(\n    engagement_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(engagement.id)',
      },
      go: {
        method: 'client.Prism.Objects.Engagements.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tengagement, err := client.Prism.Objects.Engagements.Get(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectEngagementGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", engagement.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/engagement/$ENGAGEMENT_ID \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/prism/{teamId}/engagement/{engagementId}',
    httpMethod: 'patch',
    summary: 'Patch object',
    description: 'Patch object',
    stainlessPath: '(resource) prism.objects.engagements > (method) update',
    qualified: 'client.prism.objects.engagements.update',
    params: [
      'teamId: string;',
      'engagementId: string;',
      'default?: object;',
      'list?: object;',
      'Idempotency-Key?: string;',
      'If-Match?: string;',
    ],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## update\n\n`client.prism.objects.engagements.update(teamId: string, engagementId: string, default?: object, list?: object, Idempotency-Key?: string, If-Match?: string): { id: string; default?: object; list?: object; }`\n\n**patch** `/v2/prism/{teamId}/engagement/{engagementId}`\n\nPatch object\n\n### Parameters\n\n- `teamId: string`\n\n- `engagementId: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n- `If-Match?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst engagement = await client.prism.objects.engagements.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(engagement);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.engagements.update',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst engagement = await client.prism.objects.engagements.update(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(engagement.id);",
      },
      python: {
        method: 'prism.objects.engagements.update',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nengagement = client.prism.objects.engagements.update(\n    engagement_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(engagement.id)',
      },
      go: {
        method: 'client.Prism.Objects.Engagements.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tengagement, err := client.Prism.Objects.Engagements.Update(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectEngagementUpdateParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", engagement.ID)\n}\n',
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/$TEAM_ID/engagement/$ENGAGEMENT_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v2/prism/{teamId}/engagement/{engagementId}',
    httpMethod: 'delete',
    summary: 'Delete object',
    description: 'Delete object',
    stainlessPath: '(resource) prism.objects.engagements > (method) delete',
    qualified: 'client.prism.objects.engagements.delete',
    params: ['teamId: string;', 'engagementId: string;', 'If-Match?: string;'],
    markdown:
      "## delete\n\n`client.prism.objects.engagements.delete(teamId: string, engagementId: string, If-Match?: string): void`\n\n**delete** `/v2/prism/{teamId}/engagement/{engagementId}`\n\nDelete object\n\n### Parameters\n\n- `teamId: string`\n\n- `engagementId: string`\n\n- `If-Match?: string`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nawait client.prism.objects.engagements.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.engagements.delete',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.prism.objects.engagements.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');",
      },
      python: {
        method: 'prism.objects.engagements.delete',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.prism.objects.engagements.delete(\n    engagement_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)',
      },
      go: {
        method: 'client.Prism.Objects.Engagements.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Prism.Objects.Engagements.Delete(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectEngagementDeleteParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/engagement/$ENGAGEMENT_ID \\\n    -X DELETE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'query',
    endpoint: '/v2/prism/{teamId}/engagement/query',
    httpMethod: 'post',
    summary: 'Query',
    description: 'Query',
    stainlessPath: '(resource) prism.objects.engagements > (method) query',
    qualified: 'client.prism.objects.engagements.query',
    params: [
      'teamId: string;',
      "query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; };",
      'id?: string | string[];',
      'boxes?: string[];',
      'cursor?: string;',
      'deleted?: boolean;',
      'include_total?: boolean;',
      'sources?: string[];',
    ],
    response:
      '{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }',
    markdown:
      "## query\n\n`client.prism.objects.engagements.query(teamId: string, query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; }, id?: string | string[], boxes?: string[], cursor?: string, deleted?: boolean, include_total?: boolean, sources?: string[]): { data: object[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n**post** `/v2/prism/{teamId}/engagement/query`\n\nQuery\n\n### Parameters\n\n- `teamId: string`\n\n- `query: { select: string[]; combinator?: 'AND' | 'OR'; cursor?: string; filter?: object[]; limit?: number; list_id?: string; page?: number; sort?: object[]; }`\n  - `select: string[]`\n    Property slugs to select. Use dot notation for relationships (e.g. attendee.contact.first_name). `id` is always returned at the top level of each row and does not need to be selected.\n  - `combinator?: 'AND' | 'OR'`\n    Logical operator for combining filters\n  - `cursor?: string`\n    Opaque cursor from a previous response's `next_cursor`. Pass it back unchanged to fetch the next page. When set, `page` and `limit` are derived from the cursor and any explicit values are ignored.\n  - `filter?: object[]`\n    Filters as [{ slug: { operator: value } }]. For select/multiselect properties, values may be option slugs or option UUIDs.\n  - `limit?: number`\n    Maximum number of rows to return. Capped server-side at 50; requests above the cap are rejected.\n  - `list_id?: string`\n  - `page?: number`\n    Page number (1-based). Prefer `cursor`. Page-number pagination drifts under concurrent writes; use it only for one-shot exports.\n  - `sort?: object[]`\n    Sort order as [{ slug: direction }]. Array order determines sort priority\n\n- `id?: string | string[]`\n\n- `boxes?: string[]`\n\n- `cursor?: string`\n  Alternative location for the opaque cursor (a sibling of `query`). Use whichever feels more natural; if both are present, `query.cursor` wins.\n\n- `deleted?: boolean`\n\n- `include_total?: boolean`\n  When true, the response includes a `total` field with the unpaginated row count. Costs an additional pass over the result set — for unfiltered totals prefer `GET /v2/prism/{teamId}/{objectType}/count` instead.\n\n- `sources?: string[]`\n\n### Returns\n\n- `{ data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]; has_more: boolean; next_cursor?: string; total?: number; }`\n\n  - `data: { id: string; is_user_object?: boolean; properties?: object; source?: string[]; }[]`\n  - `has_more: boolean`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.engagements.query({ query: { select: ['string'] } });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.engagements.query',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.engagements.query({ query: { select: ['string'] } });\n\nconsole.log(response.data);",
      },
      python: {
        method: 'prism.objects.engagements.query',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.engagements.query(\n    query={\n        "select": ["string"]\n    },\n)\nprint(response.data)',
      },
      go: {
        method: 'client.Prism.Objects.Engagements.Query',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Engagements.Query(context.TODO(), micro.PrismObjectEngagementQueryParams{\n\t\tQuery: micro.F(micro.PrismObjectEngagementQueryParamsQuery{\n\t\t\tSelect: micro.F([]string{"string"}),\n\t\t}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/engagement/query \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "query": {\n            "select": [\n              "string"\n            ]\n          }\n        }\'',
      },
    },
  },
  {
    name: 'count',
    endpoint: '/v2/prism/{teamId}/engagement/count',
    httpMethod: 'get',
    summary: 'Total record count for an object type',
    description:
      'Returns the total number of records of this object type that the caller can see. Avoids the page-overshoot anti-pattern — clients no longer need to keep paging until `has_more` flips false to discover the total. Currently does not apply query filters; for a filtered total, pass `include_total: true` in a POST `/query` body.',
    stainlessPath: '(resource) prism.objects.engagements > (method) count',
    qualified: 'client.prism.objects.engagements.count',
    params: ['teamId: string;', 'list_id?: string;'],
    response: '{ total: number; }',
    markdown:
      "## count\n\n`client.prism.objects.engagements.count(teamId: string, list_id?: string): { total: number; }`\n\n**get** `/v2/prism/{teamId}/engagement/count`\n\nReturns the total number of records of this object type that the caller can see. Avoids the page-overshoot anti-pattern — clients no longer need to keep paging until `has_more` flips false to discover the total. Currently does not apply query filters; for a filtered total, pass `include_total: true` in a POST `/query` body.\n\n### Parameters\n\n- `teamId: string`\n\n- `list_id?: string`\n  Scope the count to a specific list/app.\n\n### Returns\n\n- `{ total: number; }`\n\n  - `total: number`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.engagements.count();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.engagements.count',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.engagements.count();\n\nconsole.log(response.total);",
      },
      python: {
        method: 'prism.objects.engagements.count',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.engagements.count()\nprint(response.total)',
      },
      go: {
        method: 'client.Prism.Objects.Engagements.Count',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Engagements.Count(context.TODO(), micro.PrismObjectEngagementCountParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Total)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/engagement/count \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'find',
    endpoint: '/v2/prism/{teamId}/engagement/by/{slug}/{value}',
    httpMethod: 'get',
    summary: 'Find a record by property value',
    description:
      'Returns the single record whose property `{slug}` equals `{value}`. 404 if nothing matches; 409 if more than one record matches.',
    stainlessPath: '(resource) prism.objects.engagements > (method) find',
    qualified: 'client.prism.objects.engagements.find',
    params: ['teamId: string;', 'slug: string;', 'value: string;', 'list_id?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## find\n\n`client.prism.objects.engagements.find(teamId: string, slug: string, value: string, list_id?: string): { id: string; default?: object; list?: object; }`\n\n**get** `/v2/prism/{teamId}/engagement/by/{slug}/{value}`\n\nReturns the single record whose property `{slug}` equals `{value}`. 404 if nothing matches; 409 if more than one record matches.\n\n### Parameters\n\n- `teamId: string`\n\n- `slug: string`\n\n- `value: string`\n\n- `list_id?: string`\n  Scope the lookup to a specific list/app.\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.engagements.find('value', { slug: 'slug' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.engagements.find',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.engagements.find('value', { slug: 'slug' });\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.engagements.find',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.engagements.find(\n    value="value",\n    slug="slug",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Engagements.Find',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Engagements.Find(\n\t\tcontext.TODO(),\n\t\t"slug",\n\t\t"value",\n\t\tmicro.PrismObjectEngagementFindParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/engagement/by/$SLUG/$VALUE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'upsert',
    endpoint: '/v2/prism/{teamId}/engagement/by/{slug}/{value}',
    httpMethod: 'put',
    summary: 'Upsert by property value',
    description:
      'Idempotent create-or-update keyed on `{slug}={value}`. If exactly one record matches, it is patched and 200 is returned. If none match, a new record is created (with the lookup property set if absent) and 201 is returned. If multiple records match, 409 is returned and you should patch by id instead.',
    stainlessPath: '(resource) prism.objects.engagements > (method) upsert',
    qualified: 'client.prism.objects.engagements.upsert',
    params: [
      'teamId: string;',
      'slug: string;',
      'value: string;',
      'default?: object;',
      'list?: object;',
      'Idempotency-Key?: string;',
    ],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## upsert\n\n`client.prism.objects.engagements.upsert(teamId: string, slug: string, value: string, default?: object, list?: object, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**put** `/v2/prism/{teamId}/engagement/by/{slug}/{value}`\n\nIdempotent create-or-update keyed on `{slug}={value}`. If exactly one record matches, it is patched and 200 is returned. If none match, a new record is created (with the lookup property set if absent) and 201 is returned. If multiple records match, 409 is returned and you should patch by id instead.\n\n### Parameters\n\n- `teamId: string`\n\n- `slug: string`\n\n- `value: string`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null. For select/multiselect properties, values may be option slugs or option UUIDs on write; option slugs are returned on read.\n\n- `list?: object`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.engagements.upsert('value', { slug: 'slug' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.engagements.upsert',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.engagements.upsert('value', { slug: 'slug' });\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.engagements.upsert',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.engagements.upsert(\n    value="value",\n    slug="slug",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Engagements.Upsert',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Engagements.Upsert(\n\t\tcontext.TODO(),\n\t\t"slug",\n\t\t"value",\n\t\tmicro.PrismObjectEngagementUpsertParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/$TEAM_ID/engagement/by/$SLUG/$VALUE \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'bulk_create',
    endpoint: '/v2/prism/{teamId}/engagement/import',
    httpMethod: 'post',
    summary: 'Import objects',
    description:
      'Import multiple objects in batch. Properties are keyed by slug. Automatically routes based on size: small batches complete synchronously and return 200 with the final `ImportJob`; large batches start an async job, return 202 with `status: processing` and a `Location` header, and can be polled via `GET /v2/prism/{teamId}/imports/{jobId}`.',
    stainlessPath: '(resource) prism.objects.engagements > (method) bulk_create',
    qualified: 'client.prism.objects.engagements.bulkCreate',
    params: [
      'teamId: string;',
      'objects: { default?: object; list?: object; }[];',
      'options?: { caseInsensitive?: boolean; create_missing_options?: boolean; dedupe_by?: string; list_id?: string; };',
      'Idempotency-Key?: string;',
    ],
    response:
      "{ job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: { code?: string; message?: string; }; expires_at?: string; failed?: number; processed?: number; results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]; succeeded?: number; updated_at?: string; }",
    markdown:
      "## bulk_create\n\n`client.prism.objects.engagements.bulkCreate(teamId: string, objects: { default?: object; list?: object; }[], options?: { caseInsensitive?: boolean; create_missing_options?: boolean; dedupe_by?: string; list_id?: string; }, Idempotency-Key?: string): { job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: object; expires_at?: string; failed?: number; processed?: number; results?: object[]; succeeded?: number; updated_at?: string; }`\n\n**post** `/v2/prism/{teamId}/engagement/import`\n\nImport multiple objects in batch. Properties are keyed by slug. Automatically routes based on size: small batches complete synchronously and return 200 with the final `ImportJob`; large batches start an async job, return 202 with `status: processing` and a `Location` header, and can be polled via `GET /v2/prism/{teamId}/imports/{jobId}`.\n\n### Parameters\n\n- `teamId: string`\n\n- `objects: { default?: object; list?: object; }[]`\n  Array of objects to import with property values keyed by slug\n\n- `options?: { caseInsensitive?: boolean; create_missing_options?: boolean; dedupe_by?: string; list_id?: string; }`\n  - `caseInsensitive?: boolean`\n    Whether deduplication should be case insensitive\n  - `create_missing_options?: boolean`\n    When true, unknown values for select/multiselect properties are created as new options instead of failing the import\n  - `dedupe_by?: string`\n    Property slug to deduplicate on\n  - `list_id?: string`\n    App/CRM ID for context (optional)\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ job_id: string; status: 'complete' | 'processing' | 'failed'; total: number; created_at?: string; error?: { code?: string; message?: string; }; expires_at?: string; failed?: number; processed?: number; results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]; succeeded?: number; updated_at?: string; }`\n  Status snapshot of an import job. Same shape used by the POST /import response and by GET /imports/{jobId}.\n\n  - `job_id: string`\n  - `status: 'complete' | 'processing' | 'failed'`\n  - `total: number`\n  - `created_at?: string`\n  - `error?: { code?: string; message?: string; }`\n  - `expires_at?: string`\n  - `failed?: number`\n  - `processed?: number`\n  - `results?: { id?: string; created?: boolean; error?: { code?: string; message?: string; }; existing?: boolean; }[]`\n  - `succeeded?: number`\n  - `updated_at?: string`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.engagements.bulkCreate({ objects: [{}] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.engagements.bulkCreate',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.engagements.bulkCreate({ objects: [{}] });\n\nconsole.log(response.job_id);",
      },
      python: {
        method: 'prism.objects.engagements.bulk_create',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.engagements.bulk_create(\n    objects=[{}],\n)\nprint(response.job_id)',
      },
      go: {
        method: 'client.Prism.Objects.Engagements.BulkNew',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Engagements.BulkNew(context.TODO(), micro.PrismObjectEngagementBulkNewParams{\n\t\tObjects: micro.F([]micro.PrismObjectPropertiesParam{{}}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.JobID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/engagement/import \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "objects": [\n            {}\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'bulk_update',
    endpoint: '/v2/prism/{teamId}/engagement/batch/update',
    httpMethod: 'post',
    summary: 'Bulk update records (partial success)',
    description:
      "Patch up to 100 records in a single call. Each item is attempted independently — failures don't abort the batch. Inspect `results[].status` per item.",
    stainlessPath: '(resource) prism.objects.engagements > (method) bulk_update',
    qualified: 'client.prism.objects.engagements.bulkUpdate',
    params: ['teamId: string;', 'items: { id: string; }[];', 'Idempotency-Key?: string;'],
    response:
      "{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }",
    markdown:
      "## bulk_update\n\n`client.prism.objects.engagements.bulkUpdate(teamId: string, items: { id: string; }[], Idempotency-Key?: string): { results: object[]; summary: object; }`\n\n**post** `/v2/prism/{teamId}/engagement/batch/update`\n\nPatch up to 100 records in a single call. Each item is attempted independently — failures don't abort the batch. Inspect `results[].status` per item.\n\n### Parameters\n\n- `teamId: string`\n\n- `items: { id: string; }[]`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }`\n  Partial-success bulk operation result. Inspect `results[].status` per item; the operation as a whole returns 200 even if some items failed.\n\n  - `results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]`\n  - `summary: { failed: number; succeeded: number; total: number; }`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.engagements.bulkUpdate({ items: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.engagements.bulkUpdate',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.engagements.bulkUpdate({\n  items: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],\n});\n\nconsole.log(response.results);",
      },
      python: {
        method: 'prism.objects.engagements.bulk_update',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.engagements.bulk_update(\n    items=[{\n        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n    }],\n)\nprint(response.results)',
      },
      go: {
        method: 'client.Prism.Objects.Engagements.BulkUpdate',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Engagements.BulkUpdate(context.TODO(), micro.PrismObjectEngagementBulkUpdateParams{\n\t\tItems: micro.F([]micro.PrismObjectEngagementBulkUpdateParamsItem{{\n\t\t\tID: micro.F("182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"),\n\t\t}}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Results)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/engagement/batch/update \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "items": [\n            {\n              "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n            }\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'bulk_delete',
    endpoint: '/v2/prism/{teamId}/engagement/batch/delete',
    httpMethod: 'post',
    summary: 'Bulk delete records (partial success)',
    description:
      'Soft-delete up to 100 records in a single call. Same partial-success contract as batch/update.',
    stainlessPath: '(resource) prism.objects.engagements > (method) bulk_delete',
    qualified: 'client.prism.objects.engagements.bulkDelete',
    params: ['teamId: string;', 'ids: string[];', 'Idempotency-Key?: string;'],
    response:
      "{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }",
    markdown:
      "## bulk_delete\n\n`client.prism.objects.engagements.bulkDelete(teamId: string, ids: string[], Idempotency-Key?: string): { results: object[]; summary: object; }`\n\n**post** `/v2/prism/{teamId}/engagement/batch/delete`\n\nSoft-delete up to 100 records in a single call. Same partial-success contract as batch/update.\n\n### Parameters\n\n- `teamId: string`\n\n- `ids: string[]`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]; summary: { failed: number; succeeded: number; total: number; }; }`\n  Partial-success bulk operation result. Inspect `results[].status` per item; the operation as a whole returns 200 even if some items failed.\n\n  - `results: { id: string; status: 'ok' | 'error'; error?: { code?: string; message?: string; }; record?: { id: string; default?: object; list?: object; }; }[]`\n  - `summary: { failed: number; succeeded: number; total: number; }`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.engagements.bulkDelete({ ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.engagements.bulkDelete',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.engagements.bulkDelete({\n  ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],\n});\n\nconsole.log(response.results);",
      },
      python: {
        method: 'prism.objects.engagements.bulk_delete',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.engagements.bulk_delete(\n    ids=["182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"],\n)\nprint(response.results)',
      },
      go: {
        method: 'client.Prism.Objects.Engagements.BulkDelete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Engagements.BulkDelete(context.TODO(), micro.PrismObjectEngagementBulkDeleteParams{\n\t\tIDs: micro.F([]string{"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Results)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/engagement/batch/delete \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "ids": [\n            "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'duplicate',
    endpoint: '/v2/prism/{teamId}/engagement/{engagementId}/duplicate',
    httpMethod: 'post',
    summary: 'Duplicate object',
    description: 'Duplicate object',
    stainlessPath: '(resource) prism.objects.engagements > (method) duplicate',
    qualified: 'client.prism.objects.engagements.duplicate',
    params: ['teamId: string;', 'engagementId: string;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## duplicate\n\n`client.prism.objects.engagements.duplicate(teamId: string, engagementId: string, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/engagement/{engagementId}/duplicate`\n\nDuplicate object\n\n### Parameters\n\n- `teamId: string`\n\n- `engagementId: string`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.engagements.duplicate('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.engagements.duplicate',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.engagements.duplicate(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.engagements.duplicate',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.engagements.duplicate(\n    engagement_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Engagements.Duplicate',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Engagements.Duplicate(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectEngagementDuplicateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/engagement/$ENGAGEMENT_ID/duplicate \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'restore',
    endpoint: '/v2/prism/{teamId}/engagement/{engagementId}/restore',
    httpMethod: 'post',
    summary: 'Restore object',
    description: 'Restore object',
    stainlessPath: '(resource) prism.objects.engagements > (method) restore',
    qualified: 'client.prism.objects.engagements.restore',
    params: ['teamId: string;', 'engagementId: string;', 'Idempotency-Key?: string;'],
    response: '{ id: string; default?: object; list?: object; }',
    markdown:
      "## restore\n\n`client.prism.objects.engagements.restore(teamId: string, engagementId: string, Idempotency-Key?: string): { id: string; default?: object; list?: object; }`\n\n**post** `/v2/prism/{teamId}/engagement/{engagementId}/restore`\n\nRestore object\n\n### Parameters\n\n- `teamId: string`\n\n- `engagementId: string`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ id: string; default?: object; list?: object; }`\n  Object returned by reads (get/create/patch/restore). id is always present.\n\n  - `id: string`\n  - `default?: object`\n  - `list?: object`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.prism.objects.engagements.restore('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.engagements.restore',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.engagements.restore(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.objects.engagements.restore',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.objects.engagements.restore(\n    engagement_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.Objects.Engagements.Restore',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Engagements.Restore(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectEngagementRestoreParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/engagement/$ENGAGEMENT_ID/restore \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v2/prism/{teamId}/engagement/{engagementId}/grant',
    httpMethod: 'get',
    summary: 'Get grant',
    description: 'Get grant',
    stainlessPath: '(resource) prism.objects.engagements.grant > (method) get',
    qualified: 'client.prism.objects.engagements.grant.get',
    params: ['teamId: string;', 'engagementId: string;'],
    response: '{ team_group_id?: object[]; team_id?: object; user_id?: object[]; }',
    markdown:
      "## get\n\n`client.prism.objects.engagements.grant.get(teamId: string, engagementId: string): { team_group_id?: object[]; team_id?: object; user_id?: object[]; }`\n\n**get** `/v2/prism/{teamId}/engagement/{engagementId}/grant`\n\nGet grant\n\n### Parameters\n\n- `teamId: string`\n\n- `engagementId: string`\n\n### Returns\n\n- `{ team_group_id?: object[]; team_id?: object; user_id?: object[]; }`\n\n  - `team_group_id?: object[]`\n  - `team_id?: object`\n  - `user_id?: object[]`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst grant = await client.prism.objects.engagements.grant.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(grant);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.engagements.grant.get',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst grant = await client.prism.objects.engagements.grant.get(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(grant.team_group_id);",
      },
      python: {
        method: 'prism.objects.engagements.grant.get',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ngrant = client.prism.objects.engagements.grant.get(\n    engagement_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(grant.team_group_id)',
      },
      go: {
        method: 'client.Prism.Objects.Engagements.Grant.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tgrant, err := client.Prism.Objects.Engagements.Grant.Get(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectEngagementGrantGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", grant.TeamGroupID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/engagement/$ENGAGEMENT_ID/grant \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/prism/{teamId}/engagement/{engagementId}/grant',
    httpMethod: 'put',
    summary: 'Update grant',
    description: 'Update grant',
    stainlessPath: '(resource) prism.objects.engagements.grant > (method) update',
    qualified: 'client.prism.objects.engagements.grant.update',
    params: [
      'teamId: string;',
      'engagementId: string;',
      'team_group_id?: object[];',
      'team_id?: object;',
      'user_id?: object[];',
      'Idempotency-Key?: string;',
    ],
    response: '{ team_group_id?: object[]; team_id?: object; user_id?: object[]; }',
    markdown:
      "## update\n\n`client.prism.objects.engagements.grant.update(teamId: string, engagementId: string, team_group_id?: object[], team_id?: object, user_id?: object[], Idempotency-Key?: string): { team_group_id?: object[]; team_id?: object; user_id?: object[]; }`\n\n**put** `/v2/prism/{teamId}/engagement/{engagementId}/grant`\n\nUpdate grant\n\n### Parameters\n\n- `teamId: string`\n\n- `engagementId: string`\n\n- `team_group_id?: object[]`\n\n- `team_id?: object`\n\n- `user_id?: object[]`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ team_group_id?: object[]; team_id?: object; user_id?: object[]; }`\n\n  - `team_group_id?: object[]`\n  - `team_id?: object`\n  - `user_id?: object[]`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst grant = await client.prism.objects.engagements.grant.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(grant);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.objects.engagements.grant.update',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst grant = await client.prism.objects.engagements.grant.update(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(grant.team_group_id);",
      },
      python: {
        method: 'prism.objects.engagements.grant.update',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ngrant = client.prism.objects.engagements.grant.update(\n    engagement_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(grant.team_group_id)',
      },
      go: {
        method: 'client.Prism.Objects.Engagements.Grant.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tgrant, err := client.Prism.Objects.Engagements.Grant.Update(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismObjectEngagementGrantUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", grant.TeamGroupID)\n}\n',
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/$TEAM_ID/engagement/$ENGAGEMENT_ID/grant \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v2/prism/{teamId}/{automationObjectType}/triggered_automations',
    httpMethod: 'post',
    summary: 'Create a triggered automation (state + changeset filter trees)',
    description: 'Create a triggered automation (state + changeset filter trees)',
    stainlessPath: '(resource) triggered_automations > (method) create',
    qualified: 'client.triggeredAutomations.create',
    params: [
      'teamId: string;',
      'automationObjectType: string;',
      "kind: 'update' | 'lifecycle';",
      'name: string;',
      'id?: string;',
      "actions?: { type: 'agent' | 'webhook' | 'wait' | 'email' | 'linkedin'; agent_id?: string; cron_expression?: string; delay_seconds?: number; recipient_email_prop_def_id?: string; recipient_provider_prop_def_id?: string; recipient_view_id?: string; recipient_view_object_type?: string; send_as_user_id?: string; subject?: string; template_id?: string; timezone?: string; webhook_id?: string; }[];",
      "changeset?: { combinator?: 'AND' | 'OR'; filter?: object[]; };",
      'created_at?: string;',
      'enabled?: boolean;',
      'list_id?: string;',
      'on_create?: boolean;',
      'on_delete?: boolean;',
      "state?: { combinator?: 'AND' | 'OR'; filter?: object[]; };",
      'team_id?: string;',
      'updated_at?: string;',
      'user_id?: string;',
      'Idempotency-Key?: string;',
    ],
    response:
      "{ kind: 'update' | 'lifecycle'; name: string; id?: string; actions?: { type: 'agent' | 'webhook' | 'wait' | 'email' | 'linkedin'; agent_id?: string; cron_expression?: string; delay_seconds?: number; recipient_email_prop_def_id?: string; recipient_provider_prop_def_id?: string; recipient_view_id?: string; recipient_view_object_type?: string; send_as_user_id?: string; subject?: string; template_id?: string; timezone?: string; webhook_id?: string; }[]; changeset?: { combinator?: 'AND' | 'OR'; filter?: object[]; }; created_at?: string; enabled?: boolean; list_id?: string; on_create?: boolean; on_delete?: boolean; state?: { combinator?: 'AND' | 'OR'; filter?: object[]; }; team_id?: string; updated_at?: string; user_id?: string; }",
    markdown:
      "## create\n\n`client.triggeredAutomations.create(teamId: string, automationObjectType: string, kind: 'update' | 'lifecycle', name: string, id?: string, actions?: { type: 'agent' | 'webhook' | 'wait' | 'email' | 'linkedin'; agent_id?: string; cron_expression?: string; delay_seconds?: number; recipient_email_prop_def_id?: string; recipient_provider_prop_def_id?: string; recipient_view_id?: string; recipient_view_object_type?: string; send_as_user_id?: string; subject?: string; template_id?: string; timezone?: string; webhook_id?: string; }[], changeset?: { combinator?: 'AND' | 'OR'; filter?: object[]; }, created_at?: string, enabled?: boolean, list_id?: string, on_create?: boolean, on_delete?: boolean, state?: { combinator?: 'AND' | 'OR'; filter?: object[]; }, team_id?: string, updated_at?: string, user_id?: string, Idempotency-Key?: string): { kind: 'update' | 'lifecycle'; name: string; id?: string; actions?: object[]; changeset?: object; created_at?: string; enabled?: boolean; list_id?: string; on_create?: boolean; on_delete?: boolean; state?: object; team_id?: string; updated_at?: string; user_id?: string; }`\n\n**post** `/v2/prism/{teamId}/{automationObjectType}/triggered_automations`\n\nCreate a triggered automation (state + changeset filter trees)\n\n### Parameters\n\n- `teamId: string`\n\n- `automationObjectType: string`\n  Object types that support triggered automations. Must match the triggered-automation whitelist in @micro/database migrate-sql (TRIGGERED_AUTOMATION_OBJECTS).\n\n- `kind: 'update' | 'lifecycle'`\n\n- `name: string`\n\n- `id?: string`\n\n- `actions?: { type: 'agent' | 'webhook' | 'wait' | 'email' | 'linkedin'; agent_id?: string; cron_expression?: string; delay_seconds?: number; recipient_email_prop_def_id?: string; recipient_provider_prop_def_id?: string; recipient_view_id?: string; recipient_view_object_type?: string; send_as_user_id?: string; subject?: string; template_id?: string; timezone?: string; webhook_id?: string; }[]`\n  Actions to run when the automation fires; each item has a `type` plus type-specific fields.\n\n- `changeset?: { combinator?: 'AND' | 'OR'; filter?: object[]; }`\n  A changeset filter group (update automations only): a combinator plus an array of transition clauses matching what is changing. Dot-paths (nested reference filters) are NOT permitted — direct properties only.\n  - `combinator?: 'AND' | 'OR'`\n  - `filter?: object[]`\n    Each entry is a transition clause { slug: { from?: { comparator: value }, to?: { comparator: value } } }. `from` matches the prior value, `to` the new value; an empty body { slug: {} } matches any change to that property.\n\n- `created_at?: string`\n\n- `enabled?: boolean`\n\n- `list_id?: string`\n\n- `on_create?: boolean`\n  Lifecycle automations only.\n\n- `on_delete?: boolean`\n  Lifecycle automations only.\n\n- `state?: { combinator?: 'AND' | 'OR'; filter?: object[]; }`\n  A filter group: a combinator plus an array of slug-based clauses. Dot-paths (e.g. `organization.location`) express nested reference filters.\n  - `combinator?: 'AND' | 'OR'`\n  - `filter?: object[]`\n    Each entry is { slug: { comparator: value } }\n\n- `team_id?: string`\n\n- `updated_at?: string`\n\n- `user_id?: string`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ kind: 'update' | 'lifecycle'; name: string; id?: string; actions?: { type: 'agent' | 'webhook' | 'wait' | 'email' | 'linkedin'; agent_id?: string; cron_expression?: string; delay_seconds?: number; recipient_email_prop_def_id?: string; recipient_provider_prop_def_id?: string; recipient_view_id?: string; recipient_view_object_type?: string; send_as_user_id?: string; subject?: string; template_id?: string; timezone?: string; webhook_id?: string; }[]; changeset?: { combinator?: 'AND' | 'OR'; filter?: object[]; }; created_at?: string; enabled?: boolean; list_id?: string; on_create?: boolean; on_delete?: boolean; state?: { combinator?: 'AND' | 'OR'; filter?: object[]; }; team_id?: string; updated_at?: string; user_id?: string; }`\n  A triggered automation. `kind` selects the shape: `update` fires on object updates and requires a `changeset` (from/to transition) filter plus an optional `state` precondition; `lifecycle` fires on create and/or delete (`on_create`/`on_delete`) and requires a `state` filter (no changeset). `state` permits dot-paths (nested reference filters); `changeset` is direct properties only. Object type is taken from the path.\n\n  - `kind: 'update' | 'lifecycle'`\n  - `name: string`\n  - `id?: string`\n  - `actions?: { type: 'agent' | 'webhook' | 'wait' | 'email' | 'linkedin'; agent_id?: string; cron_expression?: string; delay_seconds?: number; recipient_email_prop_def_id?: string; recipient_provider_prop_def_id?: string; recipient_view_id?: string; recipient_view_object_type?: string; send_as_user_id?: string; subject?: string; template_id?: string; timezone?: string; webhook_id?: string; }[]`\n  - `changeset?: { combinator?: 'AND' | 'OR'; filter?: object[]; }`\n  - `created_at?: string`\n  - `enabled?: boolean`\n  - `list_id?: string`\n  - `on_create?: boolean`\n  - `on_delete?: boolean`\n  - `state?: { combinator?: 'AND' | 'OR'; filter?: object[]; }`\n  - `team_id?: string`\n  - `updated_at?: string`\n  - `user_id?: string`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst triggeredAutomation = await client.triggeredAutomations.create('message', { kind: 'update', name: 'name' });\n\nconsole.log(triggeredAutomation);\n```",
    perLanguage: {
      typescript: {
        method: 'client.triggeredAutomations.create',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst triggeredAutomation = await client.triggeredAutomations.create('message', {\n  kind: 'update',\n  name: 'name',\n});\n\nconsole.log(triggeredAutomation.id);",
      },
      python: {
        method: 'triggered_automations.create',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ntriggered_automation = client.triggered_automations.create(\n    automation_object_type="message",\n    kind="update",\n    name="name",\n)\nprint(triggered_automation.id)',
      },
      go: {
        method: 'client.TriggeredAutomations.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\ttriggeredAutomation, err := client.TriggeredAutomations.New(\n\t\tcontext.TODO(),\n\t\tmicro.TriggeredAutomationNewParamsAutomationObjectTypeMessage,\n\t\tmicro.TriggeredAutomationNewParams{\n\t\t\tTriggeredAutomation: micro.TriggeredAutomationParam{\n\t\t\t\tKind: micro.F(micro.TriggeredAutomationKindUpdate),\n\t\t\t\tName: micro.F("name"),\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", triggeredAutomation.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/$AUTOMATION_OBJECT_TYPE/triggered_automations \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "kind": "update",\n          "name": "name"\n        }\'',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/prism/{teamId}/{automationObjectType}/triggered_automations',
    httpMethod: 'get',
    summary: 'List triggered automations for an owner',
    description: 'List triggered automations for an owner',
    stainlessPath: '(resource) triggered_automations > (method) list',
    qualified: 'client.triggeredAutomations.list',
    params: [
      'teamId: string;',
      'automationObjectType: string;',
      'cursor?: string;',
      "kind?: 'update' | 'lifecycle';",
      'limit?: number;',
      'list_id?: string;',
      'page?: number;',
    ],
    response:
      "{ data: { kind: 'update' | 'lifecycle'; name: string; id?: string; actions?: object[]; changeset?: object; created_at?: string; enabled?: boolean; list_id?: string; on_create?: boolean; on_delete?: boolean; state?: object; team_id?: string; updated_at?: string; user_id?: string; }[]; has_more: boolean; next_cursor?: string; }",
    markdown:
      "## list\n\n`client.triggeredAutomations.list(teamId: string, automationObjectType: string, cursor?: string, kind?: 'update' | 'lifecycle', limit?: number, list_id?: string, page?: number): { data: triggered_automation[]; has_more: boolean; next_cursor?: string; }`\n\n**get** `/v2/prism/{teamId}/{automationObjectType}/triggered_automations`\n\nList triggered automations for an owner\n\n### Parameters\n\n- `teamId: string`\n\n- `automationObjectType: string`\n  Object types that support triggered automations. Must match the triggered-automation whitelist in @micro/database migrate-sql (TRIGGERED_AUTOMATION_OBJECTS).\n\n- `cursor?: string`\n  Opaque pagination cursor (from a prior response's next_cursor); supersedes page/limit when present.\n\n- `kind?: 'update' | 'lifecycle'`\n  Optional filter to a single automation kind. When omitted, both kinds are returned.\n\n- `limit?: number`\n  Maximum items per page (<= 50; defaults to 50).\n\n- `list_id?: string`\n  List (CRM) id to scope the listing to. When omitted, automations owned by the path team are returned.\n\n- `page?: number`\n  1-based page number. Prefer cursor.\n\n### Returns\n\n- `{ data: { kind: 'update' | 'lifecycle'; name: string; id?: string; actions?: object[]; changeset?: object; created_at?: string; enabled?: boolean; list_id?: string; on_create?: boolean; on_delete?: boolean; state?: object; team_id?: string; updated_at?: string; user_id?: string; }[]; has_more: boolean; next_cursor?: string; }`\n\n  - `data: { kind: 'update' | 'lifecycle'; name: string; id?: string; actions?: { type: 'agent' | 'webhook' | 'wait' | 'email' | 'linkedin'; agent_id?: string; cron_expression?: string; delay_seconds?: number; recipient_email_prop_def_id?: string; recipient_provider_prop_def_id?: string; recipient_view_id?: string; recipient_view_object_type?: string; send_as_user_id?: string; subject?: string; template_id?: string; timezone?: string; webhook_id?: string; }[]; changeset?: { combinator?: 'AND' | 'OR'; filter?: object[]; }; created_at?: string; enabled?: boolean; list_id?: string; on_create?: boolean; on_delete?: boolean; state?: { combinator?: 'AND' | 'OR'; filter?: object[]; }; team_id?: string; updated_at?: string; user_id?: string; }[]`\n  - `has_more: boolean`\n  - `next_cursor?: string`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst triggeredAutomations = await client.triggeredAutomations.list('message');\n\nconsole.log(triggeredAutomations);\n```",
    perLanguage: {
      typescript: {
        method: 'client.triggeredAutomations.list',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst triggeredAutomations = await client.triggeredAutomations.list('message');\n\nconsole.log(triggeredAutomations.data);",
      },
      python: {
        method: 'triggered_automations.list',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ntriggered_automations = client.triggered_automations.list(\n    automation_object_type="message",\n)\nprint(triggered_automations.data)',
      },
      go: {
        method: 'client.TriggeredAutomations.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\ttriggeredAutomations, err := client.TriggeredAutomations.List(\n\t\tcontext.TODO(),\n\t\tmicro.TriggeredAutomationListParamsAutomationObjectTypeMessage,\n\t\tmicro.TriggeredAutomationListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", triggeredAutomations.Data)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/$AUTOMATION_OBJECT_TYPE/triggered_automations \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v2/prism/{teamId}/{automationObjectType}/triggered_automations/{automationId}',
    httpMethod: 'get',
    summary: 'Read a triggered automation',
    description: 'Read a triggered automation',
    stainlessPath: '(resource) triggered_automations > (method) get',
    qualified: 'client.triggeredAutomations.get',
    params: ['teamId: string;', 'automationObjectType: string;', 'automationId: string;'],
    response:
      "{ kind: 'update' | 'lifecycle'; name: string; id?: string; actions?: { type: 'agent' | 'webhook' | 'wait' | 'email' | 'linkedin'; agent_id?: string; cron_expression?: string; delay_seconds?: number; recipient_email_prop_def_id?: string; recipient_provider_prop_def_id?: string; recipient_view_id?: string; recipient_view_object_type?: string; send_as_user_id?: string; subject?: string; template_id?: string; timezone?: string; webhook_id?: string; }[]; changeset?: { combinator?: 'AND' | 'OR'; filter?: object[]; }; created_at?: string; enabled?: boolean; list_id?: string; on_create?: boolean; on_delete?: boolean; state?: { combinator?: 'AND' | 'OR'; filter?: object[]; }; team_id?: string; updated_at?: string; user_id?: string; }",
    markdown:
      "## get\n\n`client.triggeredAutomations.get(teamId: string, automationObjectType: string, automationId: string): { kind: 'update' | 'lifecycle'; name: string; id?: string; actions?: object[]; changeset?: object; created_at?: string; enabled?: boolean; list_id?: string; on_create?: boolean; on_delete?: boolean; state?: object; team_id?: string; updated_at?: string; user_id?: string; }`\n\n**get** `/v2/prism/{teamId}/{automationObjectType}/triggered_automations/{automationId}`\n\nRead a triggered automation\n\n### Parameters\n\n- `teamId: string`\n\n- `automationObjectType: string`\n  Object types that support triggered automations. Must match the triggered-automation whitelist in @micro/database migrate-sql (TRIGGERED_AUTOMATION_OBJECTS).\n\n- `automationId: string`\n\n### Returns\n\n- `{ kind: 'update' | 'lifecycle'; name: string; id?: string; actions?: { type: 'agent' | 'webhook' | 'wait' | 'email' | 'linkedin'; agent_id?: string; cron_expression?: string; delay_seconds?: number; recipient_email_prop_def_id?: string; recipient_provider_prop_def_id?: string; recipient_view_id?: string; recipient_view_object_type?: string; send_as_user_id?: string; subject?: string; template_id?: string; timezone?: string; webhook_id?: string; }[]; changeset?: { combinator?: 'AND' | 'OR'; filter?: object[]; }; created_at?: string; enabled?: boolean; list_id?: string; on_create?: boolean; on_delete?: boolean; state?: { combinator?: 'AND' | 'OR'; filter?: object[]; }; team_id?: string; updated_at?: string; user_id?: string; }`\n  A triggered automation. `kind` selects the shape: `update` fires on object updates and requires a `changeset` (from/to transition) filter plus an optional `state` precondition; `lifecycle` fires on create and/or delete (`on_create`/`on_delete`) and requires a `state` filter (no changeset). `state` permits dot-paths (nested reference filters); `changeset` is direct properties only. Object type is taken from the path.\n\n  - `kind: 'update' | 'lifecycle'`\n  - `name: string`\n  - `id?: string`\n  - `actions?: { type: 'agent' | 'webhook' | 'wait' | 'email' | 'linkedin'; agent_id?: string; cron_expression?: string; delay_seconds?: number; recipient_email_prop_def_id?: string; recipient_provider_prop_def_id?: string; recipient_view_id?: string; recipient_view_object_type?: string; send_as_user_id?: string; subject?: string; template_id?: string; timezone?: string; webhook_id?: string; }[]`\n  - `changeset?: { combinator?: 'AND' | 'OR'; filter?: object[]; }`\n  - `created_at?: string`\n  - `enabled?: boolean`\n  - `list_id?: string`\n  - `on_create?: boolean`\n  - `on_delete?: boolean`\n  - `state?: { combinator?: 'AND' | 'OR'; filter?: object[]; }`\n  - `team_id?: string`\n  - `updated_at?: string`\n  - `user_id?: string`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst triggeredAutomation = await client.triggeredAutomations.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { automationObjectType: 'message' });\n\nconsole.log(triggeredAutomation);\n```",
    perLanguage: {
      typescript: {
        method: 'client.triggeredAutomations.get',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst triggeredAutomation = await client.triggeredAutomations.get(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n  { automationObjectType: 'message' },\n);\n\nconsole.log(triggeredAutomation.id);",
      },
      python: {
        method: 'triggered_automations.get',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ntriggered_automation = client.triggered_automations.get(\n    automation_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n    automation_object_type="message",\n)\nprint(triggered_automation.id)',
      },
      go: {
        method: 'client.TriggeredAutomations.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\ttriggeredAutomation, err := client.TriggeredAutomations.Get(\n\t\tcontext.TODO(),\n\t\tmicro.TriggeredAutomationGetParamsAutomationObjectTypeMessage,\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.TriggeredAutomationGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", triggeredAutomation.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/$AUTOMATION_OBJECT_TYPE/triggered_automations/$AUTOMATION_ID \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/prism/{teamId}/{automationObjectType}/triggered_automations/{automationId}',
    httpMethod: 'put',
    summary: 'Replace a triggered automation (idempotent full write of the whole tree)',
    description: 'Replace a triggered automation (idempotent full write of the whole tree)',
    stainlessPath: '(resource) triggered_automations > (method) update',
    qualified: 'client.triggeredAutomations.update',
    params: [
      'teamId: string;',
      'automationObjectType: string;',
      'automationId: string;',
      "kind: 'update' | 'lifecycle';",
      'name: string;',
      'id?: string;',
      "actions?: { type: 'agent' | 'webhook' | 'wait' | 'email' | 'linkedin'; agent_id?: string; cron_expression?: string; delay_seconds?: number; recipient_email_prop_def_id?: string; recipient_provider_prop_def_id?: string; recipient_view_id?: string; recipient_view_object_type?: string; send_as_user_id?: string; subject?: string; template_id?: string; timezone?: string; webhook_id?: string; }[];",
      "changeset?: { combinator?: 'AND' | 'OR'; filter?: object[]; };",
      'created_at?: string;',
      'enabled?: boolean;',
      'list_id?: string;',
      'on_create?: boolean;',
      'on_delete?: boolean;',
      "state?: { combinator?: 'AND' | 'OR'; filter?: object[]; };",
      'team_id?: string;',
      'updated_at?: string;',
      'user_id?: string;',
    ],
    response:
      "{ kind: 'update' | 'lifecycle'; name: string; id?: string; actions?: { type: 'agent' | 'webhook' | 'wait' | 'email' | 'linkedin'; agent_id?: string; cron_expression?: string; delay_seconds?: number; recipient_email_prop_def_id?: string; recipient_provider_prop_def_id?: string; recipient_view_id?: string; recipient_view_object_type?: string; send_as_user_id?: string; subject?: string; template_id?: string; timezone?: string; webhook_id?: string; }[]; changeset?: { combinator?: 'AND' | 'OR'; filter?: object[]; }; created_at?: string; enabled?: boolean; list_id?: string; on_create?: boolean; on_delete?: boolean; state?: { combinator?: 'AND' | 'OR'; filter?: object[]; }; team_id?: string; updated_at?: string; user_id?: string; }",
    markdown:
      "## update\n\n`client.triggeredAutomations.update(teamId: string, automationObjectType: string, automationId: string, kind: 'update' | 'lifecycle', name: string, id?: string, actions?: { type: 'agent' | 'webhook' | 'wait' | 'email' | 'linkedin'; agent_id?: string; cron_expression?: string; delay_seconds?: number; recipient_email_prop_def_id?: string; recipient_provider_prop_def_id?: string; recipient_view_id?: string; recipient_view_object_type?: string; send_as_user_id?: string; subject?: string; template_id?: string; timezone?: string; webhook_id?: string; }[], changeset?: { combinator?: 'AND' | 'OR'; filter?: object[]; }, created_at?: string, enabled?: boolean, list_id?: string, on_create?: boolean, on_delete?: boolean, state?: { combinator?: 'AND' | 'OR'; filter?: object[]; }, team_id?: string, updated_at?: string, user_id?: string): { kind: 'update' | 'lifecycle'; name: string; id?: string; actions?: object[]; changeset?: object; created_at?: string; enabled?: boolean; list_id?: string; on_create?: boolean; on_delete?: boolean; state?: object; team_id?: string; updated_at?: string; user_id?: string; }`\n\n**put** `/v2/prism/{teamId}/{automationObjectType}/triggered_automations/{automationId}`\n\nReplace a triggered automation (idempotent full write of the whole tree)\n\n### Parameters\n\n- `teamId: string`\n\n- `automationObjectType: string`\n  Object types that support triggered automations. Must match the triggered-automation whitelist in @micro/database migrate-sql (TRIGGERED_AUTOMATION_OBJECTS).\n\n- `automationId: string`\n\n- `kind: 'update' | 'lifecycle'`\n\n- `name: string`\n\n- `id?: string`\n\n- `actions?: { type: 'agent' | 'webhook' | 'wait' | 'email' | 'linkedin'; agent_id?: string; cron_expression?: string; delay_seconds?: number; recipient_email_prop_def_id?: string; recipient_provider_prop_def_id?: string; recipient_view_id?: string; recipient_view_object_type?: string; send_as_user_id?: string; subject?: string; template_id?: string; timezone?: string; webhook_id?: string; }[]`\n  Actions to run when the automation fires; each item has a `type` plus type-specific fields.\n\n- `changeset?: { combinator?: 'AND' | 'OR'; filter?: object[]; }`\n  A changeset filter group (update automations only): a combinator plus an array of transition clauses matching what is changing. Dot-paths (nested reference filters) are NOT permitted — direct properties only.\n  - `combinator?: 'AND' | 'OR'`\n  - `filter?: object[]`\n    Each entry is a transition clause { slug: { from?: { comparator: value }, to?: { comparator: value } } }. `from` matches the prior value, `to` the new value; an empty body { slug: {} } matches any change to that property.\n\n- `created_at?: string`\n\n- `enabled?: boolean`\n\n- `list_id?: string`\n\n- `on_create?: boolean`\n  Lifecycle automations only.\n\n- `on_delete?: boolean`\n  Lifecycle automations only.\n\n- `state?: { combinator?: 'AND' | 'OR'; filter?: object[]; }`\n  A filter group: a combinator plus an array of slug-based clauses. Dot-paths (e.g. `organization.location`) express nested reference filters.\n  - `combinator?: 'AND' | 'OR'`\n  - `filter?: object[]`\n    Each entry is { slug: { comparator: value } }\n\n- `team_id?: string`\n\n- `updated_at?: string`\n\n- `user_id?: string`\n\n### Returns\n\n- `{ kind: 'update' | 'lifecycle'; name: string; id?: string; actions?: { type: 'agent' | 'webhook' | 'wait' | 'email' | 'linkedin'; agent_id?: string; cron_expression?: string; delay_seconds?: number; recipient_email_prop_def_id?: string; recipient_provider_prop_def_id?: string; recipient_view_id?: string; recipient_view_object_type?: string; send_as_user_id?: string; subject?: string; template_id?: string; timezone?: string; webhook_id?: string; }[]; changeset?: { combinator?: 'AND' | 'OR'; filter?: object[]; }; created_at?: string; enabled?: boolean; list_id?: string; on_create?: boolean; on_delete?: boolean; state?: { combinator?: 'AND' | 'OR'; filter?: object[]; }; team_id?: string; updated_at?: string; user_id?: string; }`\n  A triggered automation. `kind` selects the shape: `update` fires on object updates and requires a `changeset` (from/to transition) filter plus an optional `state` precondition; `lifecycle` fires on create and/or delete (`on_create`/`on_delete`) and requires a `state` filter (no changeset). `state` permits dot-paths (nested reference filters); `changeset` is direct properties only. Object type is taken from the path.\n\n  - `kind: 'update' | 'lifecycle'`\n  - `name: string`\n  - `id?: string`\n  - `actions?: { type: 'agent' | 'webhook' | 'wait' | 'email' | 'linkedin'; agent_id?: string; cron_expression?: string; delay_seconds?: number; recipient_email_prop_def_id?: string; recipient_provider_prop_def_id?: string; recipient_view_id?: string; recipient_view_object_type?: string; send_as_user_id?: string; subject?: string; template_id?: string; timezone?: string; webhook_id?: string; }[]`\n  - `changeset?: { combinator?: 'AND' | 'OR'; filter?: object[]; }`\n  - `created_at?: string`\n  - `enabled?: boolean`\n  - `list_id?: string`\n  - `on_create?: boolean`\n  - `on_delete?: boolean`\n  - `state?: { combinator?: 'AND' | 'OR'; filter?: object[]; }`\n  - `team_id?: string`\n  - `updated_at?: string`\n  - `user_id?: string`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst triggeredAutomation = await client.triggeredAutomations.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {\n  automationObjectType: 'message',\n  kind: 'update',\n  name: 'name',\n});\n\nconsole.log(triggeredAutomation);\n```",
    perLanguage: {
      typescript: {
        method: 'client.triggeredAutomations.update',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst triggeredAutomation = await client.triggeredAutomations.update(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n  {\n    automationObjectType: 'message',\n    kind: 'update',\n    name: 'name',\n  },\n);\n\nconsole.log(triggeredAutomation.id);",
      },
      python: {
        method: 'triggered_automations.update',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ntriggered_automation = client.triggered_automations.update(\n    automation_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n    automation_object_type="message",\n    kind="update",\n    name="name",\n)\nprint(triggered_automation.id)',
      },
      go: {
        method: 'client.TriggeredAutomations.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\ttriggeredAutomation, err := client.TriggeredAutomations.Update(\n\t\tcontext.TODO(),\n\t\tmicro.TriggeredAutomationUpdateParamsAutomationObjectTypeMessage,\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.TriggeredAutomationUpdateParams{\n\t\t\tTriggeredAutomation: micro.TriggeredAutomationParam{\n\t\t\t\tKind: micro.F(micro.TriggeredAutomationKindUpdate),\n\t\t\t\tName: micro.F("name"),\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", triggeredAutomation.ID)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/$AUTOMATION_OBJECT_TYPE/triggered_automations/$AUTOMATION_ID \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "kind": "update",\n          "name": "name"\n        }\'',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v2/prism/{teamId}/{automationObjectType}/triggered_automations/{automationId}',
    httpMethod: 'delete',
    summary: 'Delete a triggered automation and its filter trees',
    description: 'Delete a triggered automation and its filter trees',
    stainlessPath: '(resource) triggered_automations > (method) delete',
    qualified: 'client.triggeredAutomations.delete',
    params: ['teamId: string;', 'automationObjectType: string;', 'automationId: string;'],
    markdown:
      "## delete\n\n`client.triggeredAutomations.delete(teamId: string, automationObjectType: string, automationId: string): void`\n\n**delete** `/v2/prism/{teamId}/{automationObjectType}/triggered_automations/{automationId}`\n\nDelete a triggered automation and its filter trees\n\n### Parameters\n\n- `teamId: string`\n\n- `automationObjectType: string`\n  Object types that support triggered automations. Must match the triggered-automation whitelist in @micro/database migrate-sql (TRIGGERED_AUTOMATION_OBJECTS).\n\n- `automationId: string`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nawait client.triggeredAutomations.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { automationObjectType: 'message' })\n```",
    perLanguage: {
      typescript: {
        method: 'client.triggeredAutomations.delete',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.triggeredAutomations.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {\n  automationObjectType: 'message',\n});",
      },
      python: {
        method: 'triggered_automations.delete',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.triggered_automations.delete(\n    automation_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n    automation_object_type="message",\n)',
      },
      go: {
        method: 'client.TriggeredAutomations.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.TriggeredAutomations.Delete(\n\t\tcontext.TODO(),\n\t\tmicro.TriggeredAutomationDeleteParamsAutomationObjectTypeMessage,\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.TriggeredAutomationDeleteParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/$AUTOMATION_OBJECT_TYPE/triggered_automations/$AUTOMATION_ID \\\n    -X DELETE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'create_ticket',
    endpoint: '/v2/realtime/ticket',
    httpMethod: 'post',
    summary: 'Create a realtime streaming ticket',
    description:
      'Exchange your API key (or session) for a short-lived ticket that authenticates a connection to the realtime object-change stream. Open a WebSocket to the push endpoint with the returned ticket as the `token` query parameter. The ticket is single-purpose and expires quickly; call this again to obtain a fresh one before reconnecting.',
    stainlessPath: '(resource) realtime > (method) create_ticket',
    qualified: 'client.realtime.createTicket',
    response: '{ expires_in: number; ticket: string; ws_url: string; }',
    markdown:
      "## create_ticket\n\n`client.realtime.createTicket(): { expires_in: number; ticket: string; ws_url: string; }`\n\n**post** `/v2/realtime/ticket`\n\nExchange your API key (or session) for a short-lived ticket that authenticates a connection to the realtime object-change stream. Open a WebSocket to the push endpoint with the returned ticket as the `token` query parameter. The ticket is single-purpose and expires quickly; call this again to obtain a fresh one before reconnecting.\n\n### Returns\n\n- `{ expires_in: number; ticket: string; ws_url: string; }`\n\n  - `expires_in: number`\n  - `ticket: string`\n  - `ws_url: string`\n\n### Example\n\n```typescript\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro();\n\nconst response = await client.realtime.createTicket();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.realtime.createTicket',
        example:
          "import Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.realtime.createTicket();\n\nconsole.log(response.expires_in);",
      },
      python: {
        method: 'realtime.create_ticket',
        example:
          'import os\nfrom micro_so import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.realtime.create_ticket()\nprint(response.expires_in)',
      },
      go: {
        method: 'client.Realtime.NewTicket',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Realtime.NewTicket(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ExpiresIn)\n}\n',
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/realtime/ticket \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'go',
    content:
      '# Micro Go API Library\n\n<a href="https://pkg.go.dev/github.com/micro-so/micro-sdk-go"><img src="https://pkg.go.dev/badge/github.com/micro-so/micro-sdk-go.svg" alt="Go Reference"></a>\n\nThe Micro Go library provides convenient access to the Micro REST API\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Micro MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40micro-so%2Fmcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBtaWNyby1zby9tY3AiXSwiZW52Ijp7Ik1JQ1JPX0FQSV9LRVkiOiJNeSBBUEkgS2V5IiwiTUlDUk9fVEVBTV9JRCI6Ik15IFRlYW0gSUQifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40micro-so%2Fmcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40micro-so%2Fmcp%22%5D%2C%22env%22%3A%7B%22MICRO_API_KEY%22%3A%22My%20API%20Key%22%2C%22MICRO_TEAM_ID%22%3A%22My%20Team%20ID%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/micro-so/micro-sdk-go" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/micro-so/micro-sdk-go@v0.0.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/micro-so/micro-sdk-go"\n\t"github.com/micro-so/micro-sdk-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"), // defaults to os.LookupEnv("MICRO_API_KEY")\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Objects.Deals.Query(context.TODO(), micro.PrismObjectDealQueryParams{\n\t\tQuery: micro.F(micro.PrismObjectDealQueryParamsQuery{\n\t\t\tSelect: micro.F([]string{"id", "name"}),\n\t\t}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Prism.Objects.Deals.Query(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/micro-so/micro-sdk-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Prism.Objects.Deals.Query(context.TODO(), micro.PrismObjectDealQueryParams{\n\tQuery: micro.F(micro.PrismObjectDealQueryParamsQuery{\n\t\tSelect: micro.F([]string{"id", "name"}),\n\t}),\n})\nif err != nil {\n\tvar apierr *micro.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/v2/prism/{teamId}/deal/query": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Prism.Objects.Deals.Query(\n\tctx,\n\tmicro.PrismObjectDealQueryParams{\n\t\tQuery: micro.F(micro.PrismObjectDealQueryParamsQuery{\n\t\t\tSelect: micro.F([]string{"id", "name"}),\n\t\t}),\n\t},\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := micro.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Prism.Objects.Deals.Query(\n\tcontext.TODO(),\n\tmicro.PrismObjectDealQueryParams{\n\t\tQuery: micro.F(micro.PrismObjectDealQueryParamsQuery{\n\t\t\tSelect: micro.F([]string{"id", "name"}),\n\t\t}),\n\t},\n\toption.WithMaxRetries(5),\n)\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\nresponse, err := client.Prism.Objects.Deals.Query(\n\tcontext.TODO(),\n\tmicro.PrismObjectDealQueryParams{\n\t\tQuery: micro.F(micro.PrismObjectDealQueryParamsQuery{\n\t\t\tSelect: micro.F([]string{"id", "name"}),\n\t\t}),\n\t},\n\toption.WithResponseInto(&response),\n)\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", response)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/micro-so/micro-sdk-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'python',
    content:
      '# Micro Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/micro_so.svg?label=pypi%20(stable))](https://pypi.org/project/micro_so/)\n\nThe Micro Python library provides convenient access to the Micro REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Micro MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40micro-so%2Fmcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBtaWNyby1zby9tY3AiXSwiZW52Ijp7Ik1JQ1JPX0FQSV9LRVkiOiJNeSBBUEkgS2V5IiwiTUlDUk9fVEVBTV9JRCI6Ik15IFRlYW0gSUQifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40micro-so%2Fmcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40micro-so%2Fmcp%22%5D%2C%22env%22%3A%7B%22MICRO_API_KEY%22%3A%22My%20API%20Key%22%2C%22MICRO_TEAM_ID%22%3A%22My%20Team%20ID%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\n The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install micro_so\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom micro_so import Micro\n\nclient = Micro(\n    team_id="My Team ID",\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\n\nresponse = client.prism.objects.deals.query(\n    query={\n        "select": ["id", "name"]\n    },\n)\nprint(response.data)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `MICRO_API_KEY="My API Key"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncMicro` instead of `Micro` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom micro_so import AsyncMicro\n\nclient = AsyncMicro(\n    team_id="My Team ID",\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  response = await client.prism.objects.deals.query(\n      query={\n          "select": ["id", "name"]\n      },\n  )\n  print(response.data)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install micro_so[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom micro_so import DefaultAioHttpClient\nfrom micro_so import AsyncMicro\n\nasync def main() -> None:\n  async with AsyncMicro(\n    team_id="My Team ID",\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    response = await client.prism.objects.deals.query(\n        query={\n            "select": ["id", "name"]\n        },\n    )\n    print(response.data)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom micro_so import Micro\n\nclient = Micro(\n    team_id="My Team ID",\n)\n\nresponse = client.prism.objects.deals.query(\n    query={\n        "select": ["string"]\n    },\n)\nprint(response.query)\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `micro_so.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `micro_so.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `micro_so.APIError`.\n\n```python\nimport micro_so\nfrom micro_so import Micro\n\nclient = Micro(\n    team_id="My Team ID",\n)\n\ntry:\n    client.prism.objects.deals.query(\n        query={\n            "select": ["id", "name"]\n        },\n    )\nexcept micro_so.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept micro_so.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept micro_so.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom micro_so import Micro\n\n# Configure the default for all requests:\nclient = Micro(\n    team_id="My Team ID",\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).prism.objects.deals.query(\n    query={\n        "select": ["id", "name"]\n    },\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom micro_so import Micro\n\n# Configure the default for all requests:\nclient = Micro(\n    team_id="My Team ID",\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = Micro(\n    team_id="My Team ID",\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).prism.objects.deals.query(\n    query={\n        "select": ["id", "name"]\n    },\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `MICRO_LOG` to `info`.\n\n```shell\n$ export MICRO_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom micro_so import Micro\n\nclient = Micro(\n    team_id="My Team ID",\n)\nresponse = client.prism.objects.deals.with_raw_response.query(\n    query={\n        "select": ["id", "name"]\n    },\n)\nprint(response.headers.get(\'X-My-Header\'))\n\ndeal = response.parse()  # get the object that `prism.objects.deals.query()` would have returned\nprint(deal.data)\n```\n\nThese methods return an [`APIResponse`](https://github.com/micro-so/micro-sdk-py/tree/main/src/micro_so/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/micro-so/micro-sdk-py/tree/main/src/micro_so/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.prism.objects.deals.with_streaming_response.query(\n    query={\n        "select": ["id", "name"]\n    },\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom micro_so import Micro, DefaultHttpxClient\n\nclient = Micro(\n    team_id="My Team ID",\n    # Or use the `MICRO_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom micro_so import Micro\n\nwith Micro(\n    team_id="My Team ID",\n) as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/micro-so/micro-sdk-py/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport micro_so\nprint(micro_so.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Micro TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/@micro-so/sdk.svg?label=npm%20(stable))](https://npmjs.org/package/@micro-so/sdk) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@micro-so/sdk)\n\nThis library provides convenient access to the Micro REST API from server-side TypeScript or JavaScript.\n\n\n\nThe full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Micro MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40micro-so%2Fmcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBtaWNyby1zby9tY3AiXSwiZW52Ijp7Ik1JQ1JPX0FQSV9LRVkiOiJNeSBBUEkgS2V5IiwiTUlDUk9fVEVBTV9JRCI6Ik15IFRlYW0gSUQifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40micro-so%2Fmcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40micro-so%2Fmcp%22%5D%2C%22env%22%3A%7B%22MICRO_API_KEY%22%3A%22My%20API%20Key%22%2C%22MICRO_TEAM_ID%22%3A%22My%20Team%20ID%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install @micro-so/sdk\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.objects.deals.query({ query: { select: ['id', 'name'] } });\n\nconsole.log(response.data);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst params: Micro.Prism.Objects.DealQueryParams = { query: { select: ['id', 'name'] } };\nconst response: Micro.Prism.Objects.DealQueryResponse = await client.prism.objects.deals.query(\n  params,\n);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst response = await client.prism.objects.deals\n  .query({ query: { select: ['id', 'name'] } })\n  .catch(async (err) => {\n    if (err instanceof Micro.APIError) {\n      console.log(err.status); // 400\n      console.log(err.name); // BadRequestError\n      console.log(err.headers); // {server: 'nginx', ...}\n    } else {\n      throw err;\n    }\n  });\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Micro({\n  teamID: 'My Team ID',\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.prism.objects.deals.query({ query: { select: ['id', 'name'] } }, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Micro({\n  teamID: 'My Team ID',\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.prism.objects.deals.query({ query: { select: ['id', 'name'] } }, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Micro();\n\nconst response = await client.prism.objects.deals\n  .query({ query: { select: ['id', 'name'] } })\n  .asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: response, response: raw } = await client.prism.objects.deals\n  .query({ query: { select: ['id', 'name'] } })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(response.data);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `MICRO_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Micro from '@micro-so/sdk';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Micro({\n  logger: logger.child({ name: 'Micro' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.prism.objects.deals.query({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Micro from '@micro-so/sdk';\nimport fetch from 'my-fetch';\n\nconst client = new Micro({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Micro from '@micro-so/sdk';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Micro({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Micro from '@micro-so/sdk';\n\nconst client = new Micro({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Micro from 'npm:@micro-so/sdk';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Micro({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/micro-so/micro-sdk-ts/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
