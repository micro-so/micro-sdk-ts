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
    name: 'restore_object',
    endpoint: '/v2/prism/{teamId}/{objectType}/{objectId}/restore',
    httpMethod: 'post',
    summary: 'Restore object',
    description: 'Restore object',
    stainlessPath: '(resource) prism > (method) restore_object',
    qualified: 'client.prism.restoreObject',
    params: [
      'teamId: string;',
      "objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event';",
      'objectId: string;',
    ],
    markdown:
      "## restore_object\n\n`client.prism.restoreObject(teamId: string, objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event', objectId: string): void`\n\n**post** `/v2/prism/{teamId}/{objectType}/{objectId}/restore`\n\nRestore object\n\n### Parameters\n\n- `teamId: string`\n\n- `objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event'`\n\n- `objectId: string`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nawait client.prism.restoreObject('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { objectType: 'deal' })\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.restoreObject',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.prism.restoreObject('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { objectType: 'deal' });",
      },
      python: {
        method: 'prism.restore_object',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.prism.restore_object(\n    object_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n    object_type="deal",\n)',
      },
      go: {
        method: 'client.Prism.RestoreObject',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Prism.RestoreObject(\n\t\tcontext.TODO(),\n\t\tmicro.ObjectTypeDeal,\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismRestoreObjectParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      cli: {
        method: 'prism restore_object',
        example:
          "micro prism restore-object \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --object-type deal \\\n  --object-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/$OBJECT_TYPE/$OBJECT_ID/restore \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'duplicate_object',
    endpoint: '/v2/prism/{teamId}/{objectType}/{objectId}/duplicate',
    httpMethod: 'post',
    summary: 'Duplicate object',
    description: 'Duplicate object',
    stainlessPath: '(resource) prism > (method) duplicate_object',
    qualified: 'client.prism.duplicateObject',
    params: [
      'teamId: string;',
      "objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event';",
      'objectId: string;',
    ],
    response: '{ id?: string; }',
    markdown:
      "## duplicate_object\n\n`client.prism.duplicateObject(teamId: string, objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event', objectId: string): { id?: string; }`\n\n**post** `/v2/prism/{teamId}/{objectType}/{objectId}/duplicate`\n\nDuplicate object\n\n### Parameters\n\n- `teamId: string`\n\n- `objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event'`\n\n- `objectId: string`\n\n### Returns\n\n- `{ id?: string; }`\n\n  - `id?: string`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nconst response = await client.prism.duplicateObject('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { objectType: 'deal' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.duplicateObject',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.duplicateObject('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {\n  objectType: 'deal',\n});\n\nconsole.log(response.id);",
      },
      python: {
        method: 'prism.duplicate_object',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.duplicate_object(\n    object_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n    object_type="deal",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Prism.DuplicateObject',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.DuplicateObject(\n\t\tcontext.TODO(),\n\t\tmicro.ObjectTypeDeal,\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismDuplicateObjectParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      cli: {
        method: 'prism duplicate_object',
        example:
          "micro prism duplicate-object \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --object-type deal \\\n  --object-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/$OBJECT_TYPE/$OBJECT_ID/duplicate \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'create_object',
    endpoint: '/v2/prism/{teamId}/{objectType}',
    httpMethod: 'post',
    summary: 'Create object',
    description: 'Create object',
    stainlessPath: '(resource) prism > (method) create_object',
    qualified: 'client.prism.createObject',
    params: [
      'teamId: string;',
      "objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event';",
      'id?: string;',
      'crm?: object;',
      'default?: object;',
      'extended?: object;',
    ],
    markdown:
      "## create_object\n\n`client.prism.createObject(teamId: string, objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event', id?: string, crm?: object, default?: object, extended?: object): void`\n\n**post** `/v2/prism/{teamId}/{objectType}`\n\nCreate object\n\n### Parameters\n\n- `teamId: string`\n\n- `objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event'`\n\n- `id?: string`\n\n- `crm?: object`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null.\n\n- `extended?: object`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nawait client.prism.createObject('deal')\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.createObject',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.prism.createObject('deal');",
      },
      python: {
        method: 'prism.create_object',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.prism.create_object(\n    object_type="deal",\n)',
      },
      go: {
        method: 'client.Prism.NewObject',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Prism.NewObject(\n\t\tcontext.TODO(),\n\t\tmicro.ObjectTypeDeal,\n\t\tmicro.PrismNewObjectParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      cli: {
        method: 'prism create_object',
        example:
          "micro prism create-object \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --object-type deal",
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/$TEAM_ID/$OBJECT_TYPE \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'delete_object',
    endpoint: '/v2/prism/{teamId}/{objectType}/{objectId}',
    httpMethod: 'delete',
    summary: 'Delete object',
    description: 'Delete object',
    stainlessPath: '(resource) prism > (method) delete_object',
    qualified: 'client.prism.deleteObject',
    params: [
      'teamId: string;',
      "objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event';",
      'objectId: string;',
    ],
    markdown:
      "## delete_object\n\n`client.prism.deleteObject(teamId: string, objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event', objectId: string): void`\n\n**delete** `/v2/prism/{teamId}/{objectType}/{objectId}`\n\nDelete object\n\n### Parameters\n\n- `teamId: string`\n\n- `objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event'`\n\n- `objectId: string`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nawait client.prism.deleteObject('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { objectType: 'deal' })\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.deleteObject',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.prism.deleteObject('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { objectType: 'deal' });",
      },
      python: {
        method: 'prism.delete_object',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.prism.delete_object(\n    object_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n    object_type="deal",\n)',
      },
      go: {
        method: 'client.Prism.DeleteObject',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Prism.DeleteObject(\n\t\tcontext.TODO(),\n\t\tmicro.ObjectTypeDeal,\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismDeleteObjectParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      cli: {
        method: 'prism delete_object',
        example:
          "micro prism delete-object \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --object-type deal \\\n  --object-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/$OBJECT_TYPE/$OBJECT_ID \\\n    -X DELETE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'patch_object',
    endpoint: '/v2/prism/{teamId}/{objectType}/{objectId}',
    httpMethod: 'patch',
    summary: 'Patch object',
    description: 'Patch object',
    stainlessPath: '(resource) prism > (method) patch_object',
    qualified: 'client.prism.patchObject',
    params: [
      'teamId: string;',
      "objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event';",
      'objectId: string;',
      'id?: string;',
      'crm?: object;',
      'default?: object;',
      'extended?: object;',
    ],
    markdown:
      "## patch_object\n\n`client.prism.patchObject(teamId: string, objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event', objectId: string, id?: string, crm?: object, default?: object, extended?: object): void`\n\n**patch** `/v2/prism/{teamId}/{objectType}/{objectId}`\n\nPatch object\n\n### Parameters\n\n- `teamId: string`\n\n- `objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event'`\n\n- `objectId: string`\n\n- `id?: string`\n\n- `crm?: object`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null.\n\n- `extended?: object`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nawait client.prism.patchObject('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { objectType: 'deal' })\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.patchObject',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.prism.patchObject('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { objectType: 'deal' });",
      },
      python: {
        method: 'prism.patch_object',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.prism.patch_object(\n    object_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n    object_type="deal",\n)',
      },
      go: {
        method: 'client.Prism.PatchObject',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Prism.PatchObject(\n\t\tcontext.TODO(),\n\t\tmicro.ObjectTypeDeal,\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismPatchObjectParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      cli: {
        method: 'prism patch_object',
        example:
          "micro prism patch-object \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --object-type deal \\\n  --object-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/$TEAM_ID/$OBJECT_TYPE/$OBJECT_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'import_objects',
    endpoint: '/v2/prism/{teamId}/{objectType}/import',
    httpMethod: 'post',
    summary: 'Import objects',
    description:
      'Import multiple objects in batch. Properties are keyed by slug. Automatically routes based on size: <100 records sync (immediate response), >=100 records async (S3/Lambda with WebSocket progress)',
    stainlessPath: '(resource) prism > (method) import_objects',
    qualified: 'client.prism.importObjects',
    params: [
      'teamId: string;',
      "objectType: 'identity' | 'organization' | 'contact' | 'action' | 'document' | 'deal';",
      'objects: { id?: string; crm?: object; default?: object; extended?: object; }[];',
      'options?: { caseInsensitive?: boolean; crm_id?: string; dedupe_by?: string; };',
    ],
    response:
      "{ results?: { id?: string; created?: boolean; error?: string; existing?: boolean; }[]; status?: 'complete'; summary?: { created?: number; errors?: number; existing?: number; total?: number; }; }",
    markdown:
      "## import_objects\n\n`client.prism.importObjects(teamId: string, objectType: 'identity' | 'organization' | 'contact' | 'action' | 'document' | 'deal', objects: { id?: string; crm?: object; default?: object; extended?: object; }[], options?: { caseInsensitive?: boolean; crm_id?: string; dedupe_by?: string; }): { results?: object[]; status?: 'complete'; summary?: object; }`\n\n**post** `/v2/prism/{teamId}/{objectType}/import`\n\nImport multiple objects in batch. Properties are keyed by slug. Automatically routes based on size: <100 records sync (immediate response), >=100 records async (S3/Lambda with WebSocket progress)\n\n### Parameters\n\n- `teamId: string`\n\n- `objectType: 'identity' | 'organization' | 'contact' | 'action' | 'document' | 'deal'`\n\n- `objects: { id?: string; crm?: object; default?: object; extended?: object; }[]`\n  Array of objects to import with property values keyed by slug\n\n- `options?: { caseInsensitive?: boolean; crm_id?: string; dedupe_by?: string; }`\n  - `caseInsensitive?: boolean`\n    Whether deduplication should be case insensitive\n  - `crm_id?: string`\n    App/CRM ID for context (optional)\n  - `dedupe_by?: string`\n    Property slug to deduplicate on\n\n### Returns\n\n- `{ results?: { id?: string; created?: boolean; error?: string; existing?: boolean; }[]; status?: 'complete'; summary?: { created?: number; errors?: number; existing?: number; total?: number; }; }`\n\n  - `results?: { id?: string; created?: boolean; error?: string; existing?: boolean; }[]`\n  - `status?: 'complete'`\n  - `summary?: { created?: number; errors?: number; existing?: number; total?: number; }`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nconst response = await client.prism.importObjects('identity', { objects: [{}] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.importObjects',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.importObjects('identity', { objects: [{}] });\n\nconsole.log(response.results);",
      },
      python: {
        method: 'prism.import_objects',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.import_objects(\n    object_type="identity",\n    objects=[{}],\n)\nprint(response.results)',
      },
      go: {
        method: 'client.Prism.ImportObjects',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.ImportObjects(\n\t\tcontext.TODO(),\n\t\tmicro.PrismImportObjectsParamsObjectTypeIdentity,\n\t\tmicro.PrismImportObjectsParams{\n\t\t\tObjects: micro.F([]micro.PrismObjectPropertiesParam{{}}),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Results)\n}\n',
      },
      cli: {
        method: 'prism import_objects',
        example:
          "micro prism import-objects \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --object-type identity \\\n  --object '{}'",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/$OBJECT_TYPE/import \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "objects": [\n            {}\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'retrieve_grant',
    endpoint: '/v2/prism/grant/{teamId}/{objectType}/{objectId}',
    httpMethod: 'get',
    summary: 'Get grant',
    description: 'Get grant',
    stainlessPath: '(resource) prism.grant > (method) retrieve_grant',
    qualified: 'client.prism.grant.retrieveGrant',
    params: [
      'teamId: string;',
      "objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event';",
      'objectId: string;',
    ],
    markdown:
      "## retrieve_grant\n\n`client.prism.grant.retrieveGrant(teamId: string, objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event', objectId: string): void`\n\n**get** `/v2/prism/grant/{teamId}/{objectType}/{objectId}`\n\nGet grant\n\n### Parameters\n\n- `teamId: string`\n\n- `objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event'`\n\n- `objectId: string`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nawait client.prism.grant.retrieveGrant('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { objectType: 'deal' })\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.grant.retrieveGrant',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.prism.grant.retrieveGrant('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {\n  objectType: 'deal',\n});",
      },
      python: {
        method: 'prism.grant.retrieve_grant',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.prism.grant.retrieve_grant(\n    object_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n    object_type="deal",\n)',
      },
      go: {
        method: 'client.Prism.Grant.GetGrant',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Prism.Grant.GetGrant(\n\t\tcontext.TODO(),\n\t\tmicro.ObjectTypeDeal,\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismGrantGetGrantParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      cli: {
        method: 'grant retrieve_grant',
        example:
          "micro prism:grant retrieve-grant \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --object-type deal \\\n  --object-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/grant/$TEAM_ID/$OBJECT_TYPE/$OBJECT_ID \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'update_grant',
    endpoint: '/v2/prism/grant/{teamId}/{objectType}/{objectId}',
    httpMethod: 'put',
    summary: 'Update grant',
    description: 'Update grant',
    stainlessPath: '(resource) prism.grant > (method) update_grant',
    qualified: 'client.prism.grant.updateGrant',
    params: [
      'teamId: string;',
      "objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event';",
      'objectId: string;',
      'team_group_id?: object[];',
      'team_id?: object;',
      'user_id?: object[];',
    ],
    markdown:
      "## update_grant\n\n`client.prism.grant.updateGrant(teamId: string, objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event', objectId: string, team_group_id?: object[], team_id?: object, user_id?: object[]): void`\n\n**put** `/v2/prism/grant/{teamId}/{objectType}/{objectId}`\n\nUpdate grant\n\n### Parameters\n\n- `teamId: string`\n\n- `objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event'`\n\n- `objectId: string`\n\n- `team_group_id?: object[]`\n\n- `team_id?: object`\n\n- `user_id?: object[]`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nawait client.prism.grant.updateGrant('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { objectType: 'deal' })\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.grant.updateGrant',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.prism.grant.updateGrant('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {\n  objectType: 'deal',\n});",
      },
      python: {
        method: 'prism.grant.update_grant',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.prism.grant.update_grant(\n    object_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n    object_type="deal",\n)',
      },
      go: {
        method: 'client.Prism.Grant.UpdateGrant',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Prism.Grant.UpdateGrant(\n\t\tcontext.TODO(),\n\t\tmicro.ObjectTypeDeal,\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.PrismGrantUpdateGrantParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      cli: {
        method: 'grant update_grant',
        example:
          "micro prism:grant update-grant \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --object-type deal \\\n  --object-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      },
      http: {
        example:
          "curl https://developers.micro.so/v2/prism/grant/$TEAM_ID/$OBJECT_TYPE/$OBJECT_ID \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $MICRO_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'execute',
    endpoint: '/v2/prism/query/{teamId}/{objectType}',
    httpMethod: 'post',
    summary: 'Query v2',
    description: 'Query v2',
    stainlessPath: '(resource) prism.query > (method) execute',
    qualified: 'client.prism.query.execute',
    params: [
      'teamId: string;',
      'objectType: string;',
      "query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; };",
      'id?: string | string[];',
      'boxes?: string[];',
      'deleted?: boolean;',
      'sources?: string[];',
    ],
    response: '{ data?: object[]; next_cursor?: string; total?: number; }',
    markdown:
      "## execute\n\n`client.prism.query.execute(teamId: string, objectType: string, query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; }, id?: string | string[], boxes?: string[], deleted?: boolean, sources?: string[]): { data?: object[]; next_cursor?: string; total?: number; }`\n\n**post** `/v2/prism/query/{teamId}/{objectType}`\n\nQuery v2\n\n### Parameters\n\n- `teamId: string`\n\n- `objectType: string`\n\n- `query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; }`\n  - `select: string[]`\n    Property slugs to select. Use dot notation for relationships (e.g. attendee.contact.first_name)\n  - `combinator?: 'AND' | 'OR'`\n    Logical operator for combining filters\n  - `crm_id?: string`\n  - `filter?: object[]`\n    Filters as [{ slug: { operator: value } }]. For select/multiselect properties, values must be option slugs\n  - `limit?: number`\n  - `page?: number`\n  - `sort?: object[]`\n    Sort order as [{ slug: direction }]. Array order determines sort priority\n\n- `id?: string | string[]`\n\n- `boxes?: string[]`\n\n- `deleted?: boolean`\n\n- `sources?: string[]`\n\n### Returns\n\n- `{ data?: object[]; next_cursor?: string; total?: number; }`\n\n  - `data?: object[]`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nconst response = await client.prism.query.execute('deal', { query: { select: ['string'] } });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.query.execute',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.prism.query.execute('deal', { query: { select: ['string'] } });\n\nconsole.log(response.data);",
      },
      python: {
        method: 'prism.query.execute',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.prism.query.execute(\n    object_type="deal",\n    query={\n        "select": ["string"]\n    },\n)\nprint(response.data)',
      },
      go: {
        method: 'client.Prism.Query.Execute',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Prism.Query.Execute(\n\t\tcontext.TODO(),\n\t\tmicro.PrismQueryExecuteParamsObjectTypeDeal,\n\t\tmicro.PrismQueryExecuteParams{\n\t\t\tQuery: micro.F(micro.PrismQueryExecuteParamsQuery{\n\t\t\t\tSelect: micro.F([]string{"string"}),\n\t\t\t}),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      cli: {
        method: 'query execute',
        example:
          "micro prism:query execute \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --object-type deal \\\n  --query '{select: [string]}'",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/query/$TEAM_ID/$OBJECT_TYPE \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "query": {\n            "select": [\n              "string"\n            ]\n          }\n        }\'',
      },
    },
  },
  {
    name: 'properties',
    endpoint: '/v2/prism/metadata/properties/{teamId}/{objectType}',
    httpMethod: 'get',
    summary: 'Get metadata properties by object type',
    description: 'Get metadata properties by object type',
    stainlessPath: '(resource) prism.metadata > (method) properties',
    qualified: 'client.prism.metadata.properties',
    params: [
      'teamId: string;',
      "objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event';",
      'autofill?: boolean;',
      'crmId?: string;',
      'term?: string;',
    ],
    markdown:
      "## properties\n\n`client.prism.metadata.properties(teamId: string, objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event', autofill?: boolean, crmId?: string, term?: string): void`\n\n**get** `/v2/prism/metadata/properties/{teamId}/{objectType}`\n\nGet metadata properties by object type\n\n### Parameters\n\n- `teamId: string`\n\n- `objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event'`\n\n- `autofill?: boolean`\n\n- `crmId?: string`\n\n- `term?: string`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nawait client.prism.metadata.properties('deal')\n```",
    perLanguage: {
      typescript: {
        method: 'client.prism.metadata.properties',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.prism.metadata.properties('deal');",
      },
      python: {
        method: 'prism.metadata.properties',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.prism.metadata.properties(\n    object_type="deal",\n)',
      },
      go: {
        method: 'client.Prism.Metadata.Properties',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Prism.Metadata.Properties(\n\t\tcontext.TODO(),\n\t\tmicro.ObjectTypeDeal,\n\t\tmicro.PrismMetadataPropertiesParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      cli: {
        method: 'metadata properties',
        example:
          "micro prism:metadata properties \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --object-type deal",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/metadata/properties/$TEAM_ID/$OBJECT_TYPE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v2/prism/{teamId}/contact',
    httpMethod: 'post',
    summary: 'Create Contact',
    description: 'Create Contact',
    stainlessPath: '(resource) contacts > (method) create',
    qualified: 'client.contacts.create',
    params: ['teamId: string;', 'id?: string;', 'crm?: object;', 'default?: object;', 'extended?: object;'],
    response: '{ id?: string; }',
    markdown:
      "## create\n\n`client.contacts.create(teamId: string, id?: string, crm?: object, default?: object, extended?: object): { id?: string; }`\n\n**post** `/v2/prism/{teamId}/contact`\n\nCreate Contact\n\n### Parameters\n\n- `teamId: string`\n\n- `id?: string`\n\n- `crm?: object`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null.\n\n- `extended?: object`\n\n### Returns\n\n- `{ id?: string; }`\n\n  - `id?: string`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nconst contact = await client.contacts.create();\n\nconsole.log(contact);\n```",
    perLanguage: {
      typescript: {
        method: 'client.contacts.create',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst contact = await client.contacts.create();\n\nconsole.log(contact.id);",
      },
      python: {
        method: 'contacts.create',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ncontact = client.contacts.create()\nprint(contact.id)',
      },
      go: {
        method: 'client.Contacts.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tcontact, err := client.Contacts.New(context.TODO(), micro.ContactNewParams{\n\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", contact.ID)\n}\n',
      },
      cli: {
        method: 'contacts create',
        example:
          "micro contacts create \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/contact \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/prism/{teamId}/contact/{contactId}',
    httpMethod: 'patch',
    summary: 'Update Contact',
    description: 'Update Contact',
    stainlessPath: '(resource) contacts > (method) update',
    qualified: 'client.contacts.update',
    params: [
      'teamId: string;',
      'contactId: string;',
      'id?: string;',
      'crm?: object;',
      'default?: object;',
      'extended?: object;',
    ],
    markdown:
      "## update\n\n`client.contacts.update(teamId: string, contactId: string, id?: string, crm?: object, default?: object, extended?: object): void`\n\n**patch** `/v2/prism/{teamId}/contact/{contactId}`\n\nUpdate Contact\n\n### Parameters\n\n- `teamId: string`\n\n- `contactId: string`\n\n- `id?: string`\n\n- `crm?: object`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null.\n\n- `extended?: object`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nawait client.contacts.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
    perLanguage: {
      typescript: {
        method: 'client.contacts.update',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.contacts.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');",
      },
      python: {
        method: 'contacts.update',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.contacts.update(\n    contact_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)',
      },
      go: {
        method: 'client.Contacts.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Contacts.Update(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.ContactUpdateParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      cli: {
        method: 'contacts update',
        example:
          "micro contacts update \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --contact-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
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
    summary: 'Delete Contact',
    description: 'Delete Contact',
    stainlessPath: '(resource) contacts > (method) delete',
    qualified: 'client.contacts.delete',
    params: ['teamId: string;', 'contactId: string;'],
    markdown:
      "## delete\n\n`client.contacts.delete(teamId: string, contactId: string): void`\n\n**delete** `/v2/prism/{teamId}/contact/{contactId}`\n\nDelete Contact\n\n### Parameters\n\n- `teamId: string`\n\n- `contactId: string`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nawait client.contacts.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
    perLanguage: {
      typescript: {
        method: 'client.contacts.delete',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.contacts.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');",
      },
      python: {
        method: 'contacts.delete',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.contacts.delete(\n    contact_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)',
      },
      go: {
        method: 'client.Contacts.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Contacts.Delete(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.ContactDeleteParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      cli: {
        method: 'contacts delete',
        example:
          "micro contacts delete \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --contact-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/contact/$CONTACT_ID \\\n    -X DELETE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/prism/query/{teamId}/contact',
    httpMethod: 'post',
    summary: 'List Contacts',
    description: 'List Contacts',
    stainlessPath: '(resource) contacts > (method) list',
    qualified: 'client.contacts.list',
    params: [
      'teamId: string;',
      "query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; };",
      'id?: string | string[];',
      'boxes?: string[];',
      'deleted?: boolean;',
      'sources?: string[];',
    ],
    response: '{ data?: object[]; next_cursor?: string; total?: number; }',
    markdown:
      "## list\n\n`client.contacts.list(teamId: string, query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; }, id?: string | string[], boxes?: string[], deleted?: boolean, sources?: string[]): { data?: object[]; next_cursor?: string; total?: number; }`\n\n**post** `/v2/prism/query/{teamId}/contact`\n\nList Contacts\n\n### Parameters\n\n- `teamId: string`\n\n- `query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; }`\n  - `select: string[]`\n    Property slugs to select. Use dot notation for relationships (e.g. attendee.contact.first_name)\n  - `combinator?: 'AND' | 'OR'`\n    Logical operator for combining filters\n  - `crm_id?: string`\n  - `filter?: object[]`\n    Filters as [{ slug: { operator: value } }]. For select/multiselect properties, values must be option slugs\n  - `limit?: number`\n  - `page?: number`\n  - `sort?: object[]`\n    Sort order as [{ slug: direction }]. Array order determines sort priority\n\n- `id?: string | string[]`\n\n- `boxes?: string[]`\n\n- `deleted?: boolean`\n\n- `sources?: string[]`\n\n### Returns\n\n- `{ data?: object[]; next_cursor?: string; total?: number; }`\n\n  - `data?: object[]`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nconst contacts = await client.contacts.list({ query: { select: ['string'] } });\n\nconsole.log(contacts);\n```",
    perLanguage: {
      typescript: {
        method: 'client.contacts.list',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst contacts = await client.contacts.list({ query: { select: ['string'] } });\n\nconsole.log(contacts.data);",
      },
      python: {
        method: 'contacts.list',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ncontacts = client.contacts.list(\n    query={\n        "select": ["string"]\n    },\n)\nprint(contacts.data)',
      },
      go: {
        method: 'client.Contacts.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tcontacts, err := client.Contacts.List(context.TODO(), micro.ContactListParams{\n\t\tQuery: micro.F(micro.ContactListParamsQuery{\n\t\t\tSelect: micro.F([]string{"string"}),\n\t\t}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", contacts.Data)\n}\n',
      },
      cli: {
        method: 'contacts list',
        example:
          "micro contacts list \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --query '{select: [string]}'",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/query/$TEAM_ID/contact \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "query": {\n            "select": [\n              "string"\n            ]\n          }\n        }\'',
      },
    },
  },
  {
    name: 'import',
    endpoint: '/v2/prism/{teamId}/contact/import',
    httpMethod: 'post',
    summary: 'Import Contacts',
    description: 'Import Contacts',
    stainlessPath: '(resource) contacts > (method) import',
    qualified: 'client.contacts.import',
    params: [
      'teamId: string;',
      'objects: { id?: string; crm?: object; default?: object; extended?: object; }[];',
      'options?: { caseInsensitive?: boolean; crm_id?: string; dedupe_by?: string; };',
    ],
    response:
      "{ results?: { id?: string; created?: boolean; error?: string; existing?: boolean; }[]; status?: 'complete'; summary?: { created?: number; errors?: number; existing?: number; total?: number; }; }",
    markdown:
      "## import\n\n`client.contacts.import(teamId: string, objects: { id?: string; crm?: object; default?: object; extended?: object; }[], options?: { caseInsensitive?: boolean; crm_id?: string; dedupe_by?: string; }): { results?: object[]; status?: 'complete'; summary?: object; }`\n\n**post** `/v2/prism/{teamId}/contact/import`\n\nImport Contacts\n\n### Parameters\n\n- `teamId: string`\n\n- `objects: { id?: string; crm?: object; default?: object; extended?: object; }[]`\n  Array of objects to import with property values keyed by slug\n\n- `options?: { caseInsensitive?: boolean; crm_id?: string; dedupe_by?: string; }`\n  - `caseInsensitive?: boolean`\n    Whether deduplication should be case insensitive\n  - `crm_id?: string`\n    App/CRM ID for context (optional)\n  - `dedupe_by?: string`\n    Property slug to deduplicate on\n\n### Returns\n\n- `{ results?: { id?: string; created?: boolean; error?: string; existing?: boolean; }[]; status?: 'complete'; summary?: { created?: number; errors?: number; existing?: number; total?: number; }; }`\n\n  - `results?: { id?: string; created?: boolean; error?: string; existing?: boolean; }[]`\n  - `status?: 'complete'`\n  - `summary?: { created?: number; errors?: number; existing?: number; total?: number; }`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nconst response = await client.contacts.import({ objects: [{}] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.contacts.import',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.contacts.import({ objects: [{}] });\n\nconsole.log(response.results);",
      },
      python: {
        method: 'contacts.import_',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.contacts.import_(\n    objects=[{}],\n)\nprint(response.results)',
      },
      go: {
        method: 'client.Contacts.Import',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Contacts.Import(context.TODO(), micro.ContactImportParams{\n\t\tObjects: micro.F([]micro.PrismObjectPropertiesParam{{}}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Results)\n}\n',
      },
      cli: {
        method: 'contacts import',
        example:
          "micro contacts import \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --object '{}'",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/contact/import \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "objects": [\n            {}\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v2/prism/{teamId}/organization',
    httpMethod: 'post',
    summary: 'Create Organization',
    description: 'Create Organization',
    stainlessPath: '(resource) organizations > (method) create',
    qualified: 'client.organizations.create',
    params: ['teamId: string;', 'id?: string;', 'crm?: object;', 'default?: object;', 'extended?: object;'],
    response: '{ id?: string; }',
    markdown:
      "## create\n\n`client.organizations.create(teamId: string, id?: string, crm?: object, default?: object, extended?: object): { id?: string; }`\n\n**post** `/v2/prism/{teamId}/organization`\n\nCreate Organization\n\n### Parameters\n\n- `teamId: string`\n\n- `id?: string`\n\n- `crm?: object`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null.\n\n- `extended?: object`\n\n### Returns\n\n- `{ id?: string; }`\n\n  - `id?: string`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nconst organization = await client.organizations.create();\n\nconsole.log(organization);\n```",
    perLanguage: {
      typescript: {
        method: 'client.organizations.create',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst organization = await client.organizations.create();\n\nconsole.log(organization.id);",
      },
      python: {
        method: 'organizations.create',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\norganization = client.organizations.create()\nprint(organization.id)',
      },
      go: {
        method: 'client.Organizations.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\torganization, err := client.Organizations.New(context.TODO(), micro.OrganizationNewParams{\n\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", organization.ID)\n}\n',
      },
      cli: {
        method: 'organizations create',
        example:
          "micro organizations create \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/organization \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/prism/{teamId}/organization/{organizationId}',
    httpMethod: 'patch',
    summary: 'Update Organization',
    description: 'Update Organization',
    stainlessPath: '(resource) organizations > (method) update',
    qualified: 'client.organizations.update',
    params: [
      'teamId: string;',
      'organizationId: string;',
      'id?: string;',
      'crm?: object;',
      'default?: object;',
      'extended?: object;',
    ],
    markdown:
      "## update\n\n`client.organizations.update(teamId: string, organizationId: string, id?: string, crm?: object, default?: object, extended?: object): void`\n\n**patch** `/v2/prism/{teamId}/organization/{organizationId}`\n\nUpdate Organization\n\n### Parameters\n\n- `teamId: string`\n\n- `organizationId: string`\n\n- `id?: string`\n\n- `crm?: object`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null.\n\n- `extended?: object`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nawait client.organizations.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
    perLanguage: {
      typescript: {
        method: 'client.organizations.update',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.organizations.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');",
      },
      python: {
        method: 'organizations.update',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.organizations.update(\n    organization_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)',
      },
      go: {
        method: 'client.Organizations.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Organizations.Update(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.OrganizationUpdateParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      cli: {
        method: 'organizations update',
        example:
          "micro organizations update \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --organization-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
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
    summary: 'Delete Organization',
    description: 'Delete Organization',
    stainlessPath: '(resource) organizations > (method) delete',
    qualified: 'client.organizations.delete',
    params: ['teamId: string;', 'organizationId: string;'],
    markdown:
      "## delete\n\n`client.organizations.delete(teamId: string, organizationId: string): void`\n\n**delete** `/v2/prism/{teamId}/organization/{organizationId}`\n\nDelete Organization\n\n### Parameters\n\n- `teamId: string`\n\n- `organizationId: string`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nawait client.organizations.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
    perLanguage: {
      typescript: {
        method: 'client.organizations.delete',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.organizations.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');",
      },
      python: {
        method: 'organizations.delete',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.organizations.delete(\n    organization_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)',
      },
      go: {
        method: 'client.Organizations.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Organizations.Delete(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.OrganizationDeleteParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      cli: {
        method: 'organizations delete',
        example:
          "micro organizations delete \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --organization-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/organization/$ORGANIZATION_ID \\\n    -X DELETE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/prism/query/{teamId}/organization',
    httpMethod: 'post',
    summary: 'List Organizations',
    description: 'List Organizations',
    stainlessPath: '(resource) organizations > (method) list',
    qualified: 'client.organizations.list',
    params: [
      'teamId: string;',
      "query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; };",
      'id?: string | string[];',
      'boxes?: string[];',
      'deleted?: boolean;',
      'sources?: string[];',
    ],
    response: '{ data?: object[]; next_cursor?: string; total?: number; }',
    markdown:
      "## list\n\n`client.organizations.list(teamId: string, query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; }, id?: string | string[], boxes?: string[], deleted?: boolean, sources?: string[]): { data?: object[]; next_cursor?: string; total?: number; }`\n\n**post** `/v2/prism/query/{teamId}/organization`\n\nList Organizations\n\n### Parameters\n\n- `teamId: string`\n\n- `query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; }`\n  - `select: string[]`\n    Property slugs to select. Use dot notation for relationships (e.g. attendee.contact.first_name)\n  - `combinator?: 'AND' | 'OR'`\n    Logical operator for combining filters\n  - `crm_id?: string`\n  - `filter?: object[]`\n    Filters as [{ slug: { operator: value } }]. For select/multiselect properties, values must be option slugs\n  - `limit?: number`\n  - `page?: number`\n  - `sort?: object[]`\n    Sort order as [{ slug: direction }]. Array order determines sort priority\n\n- `id?: string | string[]`\n\n- `boxes?: string[]`\n\n- `deleted?: boolean`\n\n- `sources?: string[]`\n\n### Returns\n\n- `{ data?: object[]; next_cursor?: string; total?: number; }`\n\n  - `data?: object[]`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nconst organizations = await client.organizations.list({ query: { select: ['string'] } });\n\nconsole.log(organizations);\n```",
    perLanguage: {
      typescript: {
        method: 'client.organizations.list',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst organizations = await client.organizations.list({ query: { select: ['string'] } });\n\nconsole.log(organizations.data);",
      },
      python: {
        method: 'organizations.list',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\norganizations = client.organizations.list(\n    query={\n        "select": ["string"]\n    },\n)\nprint(organizations.data)',
      },
      go: {
        method: 'client.Organizations.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\torganizations, err := client.Organizations.List(context.TODO(), micro.OrganizationListParams{\n\t\tQuery: micro.F(micro.OrganizationListParamsQuery{\n\t\t\tSelect: micro.F([]string{"string"}),\n\t\t}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", organizations.Data)\n}\n',
      },
      cli: {
        method: 'organizations list',
        example:
          "micro organizations list \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --query '{select: [string]}'",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/query/$TEAM_ID/organization \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "query": {\n            "select": [\n              "string"\n            ]\n          }\n        }\'',
      },
    },
  },
  {
    name: 'import',
    endpoint: '/v2/prism/{teamId}/organization/import',
    httpMethod: 'post',
    summary: 'Import Organizations',
    description: 'Import Organizations',
    stainlessPath: '(resource) organizations > (method) import',
    qualified: 'client.organizations.import',
    params: [
      'teamId: string;',
      'objects: { id?: string; crm?: object; default?: object; extended?: object; }[];',
      'options?: { caseInsensitive?: boolean; crm_id?: string; dedupe_by?: string; };',
    ],
    response:
      "{ results?: { id?: string; created?: boolean; error?: string; existing?: boolean; }[]; status?: 'complete'; summary?: { created?: number; errors?: number; existing?: number; total?: number; }; }",
    markdown:
      "## import\n\n`client.organizations.import(teamId: string, objects: { id?: string; crm?: object; default?: object; extended?: object; }[], options?: { caseInsensitive?: boolean; crm_id?: string; dedupe_by?: string; }): { results?: object[]; status?: 'complete'; summary?: object; }`\n\n**post** `/v2/prism/{teamId}/organization/import`\n\nImport Organizations\n\n### Parameters\n\n- `teamId: string`\n\n- `objects: { id?: string; crm?: object; default?: object; extended?: object; }[]`\n  Array of objects to import with property values keyed by slug\n\n- `options?: { caseInsensitive?: boolean; crm_id?: string; dedupe_by?: string; }`\n  - `caseInsensitive?: boolean`\n    Whether deduplication should be case insensitive\n  - `crm_id?: string`\n    App/CRM ID for context (optional)\n  - `dedupe_by?: string`\n    Property slug to deduplicate on\n\n### Returns\n\n- `{ results?: { id?: string; created?: boolean; error?: string; existing?: boolean; }[]; status?: 'complete'; summary?: { created?: number; errors?: number; existing?: number; total?: number; }; }`\n\n  - `results?: { id?: string; created?: boolean; error?: string; existing?: boolean; }[]`\n  - `status?: 'complete'`\n  - `summary?: { created?: number; errors?: number; existing?: number; total?: number; }`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nconst response = await client.organizations.import({ objects: [{}] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.organizations.import',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.organizations.import({ objects: [{}] });\n\nconsole.log(response.results);",
      },
      python: {
        method: 'organizations.import_',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.organizations.import_(\n    objects=[{}],\n)\nprint(response.results)',
      },
      go: {
        method: 'client.Organizations.Import',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Organizations.Import(context.TODO(), micro.OrganizationImportParams{\n\t\tObjects: micro.F([]micro.PrismObjectPropertiesParam{{}}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Results)\n}\n',
      },
      cli: {
        method: 'organizations import',
        example:
          "micro organizations import \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --object '{}'",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/organization/import \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "objects": [\n            {}\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v2/prism/{teamId}/identity',
    httpMethod: 'post',
    summary: 'Create Identity',
    description: 'Create Identity',
    stainlessPath: '(resource) identities > (method) create',
    qualified: 'client.identities.create',
    params: ['teamId: string;', 'id?: string;', 'crm?: object;', 'default?: object;', 'extended?: object;'],
    response: '{ id?: string; }',
    markdown:
      "## create\n\n`client.identities.create(teamId: string, id?: string, crm?: object, default?: object, extended?: object): { id?: string; }`\n\n**post** `/v2/prism/{teamId}/identity`\n\nCreate Identity\n\n### Parameters\n\n- `teamId: string`\n\n- `id?: string`\n\n- `crm?: object`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null.\n\n- `extended?: object`\n\n### Returns\n\n- `{ id?: string; }`\n\n  - `id?: string`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nconst identity = await client.identities.create();\n\nconsole.log(identity);\n```",
    perLanguage: {
      typescript: {
        method: 'client.identities.create',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst identity = await client.identities.create();\n\nconsole.log(identity.id);",
      },
      python: {
        method: 'identities.create',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nidentity = client.identities.create()\nprint(identity.id)',
      },
      go: {
        method: 'client.Identities.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tidentity, err := client.Identities.New(context.TODO(), micro.IdentityNewParams{\n\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", identity.ID)\n}\n',
      },
      cli: {
        method: 'identities create',
        example:
          "micro identities create \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/identity \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/prism/{teamId}/identity/{identityId}',
    httpMethod: 'patch',
    summary: 'Update Identity',
    description: 'Update Identity',
    stainlessPath: '(resource) identities > (method) update',
    qualified: 'client.identities.update',
    params: [
      'teamId: string;',
      'identityId: string;',
      'id?: string;',
      'crm?: object;',
      'default?: object;',
      'extended?: object;',
    ],
    markdown:
      "## update\n\n`client.identities.update(teamId: string, identityId: string, id?: string, crm?: object, default?: object, extended?: object): void`\n\n**patch** `/v2/prism/{teamId}/identity/{identityId}`\n\nUpdate Identity\n\n### Parameters\n\n- `teamId: string`\n\n- `identityId: string`\n\n- `id?: string`\n\n- `crm?: object`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null.\n\n- `extended?: object`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nawait client.identities.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
    perLanguage: {
      typescript: {
        method: 'client.identities.update',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.identities.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');",
      },
      python: {
        method: 'identities.update',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.identities.update(\n    identity_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)',
      },
      go: {
        method: 'client.Identities.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Identities.Update(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.IdentityUpdateParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      cli: {
        method: 'identities update',
        example:
          "micro identities update \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --identity-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
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
    summary: 'Delete Identity',
    description: 'Delete Identity',
    stainlessPath: '(resource) identities > (method) delete',
    qualified: 'client.identities.delete',
    params: ['teamId: string;', 'identityId: string;'],
    markdown:
      "## delete\n\n`client.identities.delete(teamId: string, identityId: string): void`\n\n**delete** `/v2/prism/{teamId}/identity/{identityId}`\n\nDelete Identity\n\n### Parameters\n\n- `teamId: string`\n\n- `identityId: string`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nawait client.identities.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
    perLanguage: {
      typescript: {
        method: 'client.identities.delete',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.identities.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');",
      },
      python: {
        method: 'identities.delete',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.identities.delete(\n    identity_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)',
      },
      go: {
        method: 'client.Identities.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Identities.Delete(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.IdentityDeleteParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      cli: {
        method: 'identities delete',
        example:
          "micro identities delete \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --identity-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/identity/$IDENTITY_ID \\\n    -X DELETE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/prism/query/{teamId}/identity',
    httpMethod: 'post',
    summary: 'List Identities',
    description: 'List Identities',
    stainlessPath: '(resource) identities > (method) list',
    qualified: 'client.identities.list',
    params: [
      'teamId: string;',
      "query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; };",
      'id?: string | string[];',
      'boxes?: string[];',
      'deleted?: boolean;',
      'sources?: string[];',
    ],
    response: '{ data?: object[]; next_cursor?: string; total?: number; }',
    markdown:
      "## list\n\n`client.identities.list(teamId: string, query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; }, id?: string | string[], boxes?: string[], deleted?: boolean, sources?: string[]): { data?: object[]; next_cursor?: string; total?: number; }`\n\n**post** `/v2/prism/query/{teamId}/identity`\n\nList Identities\n\n### Parameters\n\n- `teamId: string`\n\n- `query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; }`\n  - `select: string[]`\n    Property slugs to select. Use dot notation for relationships (e.g. attendee.contact.first_name)\n  - `combinator?: 'AND' | 'OR'`\n    Logical operator for combining filters\n  - `crm_id?: string`\n  - `filter?: object[]`\n    Filters as [{ slug: { operator: value } }]. For select/multiselect properties, values must be option slugs\n  - `limit?: number`\n  - `page?: number`\n  - `sort?: object[]`\n    Sort order as [{ slug: direction }]. Array order determines sort priority\n\n- `id?: string | string[]`\n\n- `boxes?: string[]`\n\n- `deleted?: boolean`\n\n- `sources?: string[]`\n\n### Returns\n\n- `{ data?: object[]; next_cursor?: string; total?: number; }`\n\n  - `data?: object[]`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nconst identities = await client.identities.list({ query: { select: ['string'] } });\n\nconsole.log(identities);\n```",
    perLanguage: {
      typescript: {
        method: 'client.identities.list',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst identities = await client.identities.list({ query: { select: ['string'] } });\n\nconsole.log(identities.data);",
      },
      python: {
        method: 'identities.list',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nidentities = client.identities.list(\n    query={\n        "select": ["string"]\n    },\n)\nprint(identities.data)',
      },
      go: {
        method: 'client.Identities.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tidentities, err := client.Identities.List(context.TODO(), micro.IdentityListParams{\n\t\tQuery: micro.F(micro.IdentityListParamsQuery{\n\t\t\tSelect: micro.F([]string{"string"}),\n\t\t}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", identities.Data)\n}\n',
      },
      cli: {
        method: 'identities list',
        example:
          "micro identities list \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --query '{select: [string]}'",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/query/$TEAM_ID/identity \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "query": {\n            "select": [\n              "string"\n            ]\n          }\n        }\'',
      },
    },
  },
  {
    name: 'import',
    endpoint: '/v2/prism/{teamId}/identity/import',
    httpMethod: 'post',
    summary: 'Import Identities',
    description: 'Import Identities',
    stainlessPath: '(resource) identities > (method) import',
    qualified: 'client.identities.import',
    params: [
      'teamId: string;',
      'objects: { id?: string; crm?: object; default?: object; extended?: object; }[];',
      'options?: { caseInsensitive?: boolean; crm_id?: string; dedupe_by?: string; };',
    ],
    response:
      "{ results?: { id?: string; created?: boolean; error?: string; existing?: boolean; }[]; status?: 'complete'; summary?: { created?: number; errors?: number; existing?: number; total?: number; }; }",
    markdown:
      "## import\n\n`client.identities.import(teamId: string, objects: { id?: string; crm?: object; default?: object; extended?: object; }[], options?: { caseInsensitive?: boolean; crm_id?: string; dedupe_by?: string; }): { results?: object[]; status?: 'complete'; summary?: object; }`\n\n**post** `/v2/prism/{teamId}/identity/import`\n\nImport Identities\n\n### Parameters\n\n- `teamId: string`\n\n- `objects: { id?: string; crm?: object; default?: object; extended?: object; }[]`\n  Array of objects to import with property values keyed by slug\n\n- `options?: { caseInsensitive?: boolean; crm_id?: string; dedupe_by?: string; }`\n  - `caseInsensitive?: boolean`\n    Whether deduplication should be case insensitive\n  - `crm_id?: string`\n    App/CRM ID for context (optional)\n  - `dedupe_by?: string`\n    Property slug to deduplicate on\n\n### Returns\n\n- `{ results?: { id?: string; created?: boolean; error?: string; existing?: boolean; }[]; status?: 'complete'; summary?: { created?: number; errors?: number; existing?: number; total?: number; }; }`\n\n  - `results?: { id?: string; created?: boolean; error?: string; existing?: boolean; }[]`\n  - `status?: 'complete'`\n  - `summary?: { created?: number; errors?: number; existing?: number; total?: number; }`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nconst response = await client.identities.import({ objects: [{}] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.identities.import',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.identities.import({ objects: [{}] });\n\nconsole.log(response.results);",
      },
      python: {
        method: 'identities.import_',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.identities.import_(\n    objects=[{}],\n)\nprint(response.results)',
      },
      go: {
        method: 'client.Identities.Import',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Identities.Import(context.TODO(), micro.IdentityImportParams{\n\t\tObjects: micro.F([]micro.PrismObjectPropertiesParam{{}}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Results)\n}\n',
      },
      cli: {
        method: 'identities import',
        example:
          "micro identities import \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --object '{}'",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/identity/import \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "objects": [\n            {}\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v2/prism/{teamId}/deal',
    httpMethod: 'post',
    summary: 'Create Deal',
    description: 'Create Deal',
    stainlessPath: '(resource) deals > (method) create',
    qualified: 'client.deals.create',
    params: ['teamId: string;', 'id?: string;', 'crm?: object;', 'default?: object;', 'extended?: object;'],
    response: '{ id?: string; }',
    markdown:
      "## create\n\n`client.deals.create(teamId: string, id?: string, crm?: object, default?: object, extended?: object): { id?: string; }`\n\n**post** `/v2/prism/{teamId}/deal`\n\nCreate Deal\n\n### Parameters\n\n- `teamId: string`\n\n- `id?: string`\n\n- `crm?: object`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null.\n\n- `extended?: object`\n\n### Returns\n\n- `{ id?: string; }`\n\n  - `id?: string`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nconst deal = await client.deals.create();\n\nconsole.log(deal);\n```",
    perLanguage: {
      typescript: {
        method: 'client.deals.create',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst deal = await client.deals.create();\n\nconsole.log(deal.id);",
      },
      python: {
        method: 'deals.create',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ndeal = client.deals.create()\nprint(deal.id)',
      },
      go: {
        method: 'client.Deals.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tdeal, err := client.Deals.New(context.TODO(), micro.DealNewParams{\n\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", deal.ID)\n}\n',
      },
      cli: {
        method: 'deals create',
        example:
          "micro deals create \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/deal \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/prism/{teamId}/deal/{dealId}',
    httpMethod: 'patch',
    summary: 'Update Deal',
    description: 'Update Deal',
    stainlessPath: '(resource) deals > (method) update',
    qualified: 'client.deals.update',
    params: [
      'teamId: string;',
      'dealId: string;',
      'id?: string;',
      'crm?: object;',
      'default?: object;',
      'extended?: object;',
    ],
    markdown:
      "## update\n\n`client.deals.update(teamId: string, dealId: string, id?: string, crm?: object, default?: object, extended?: object): void`\n\n**patch** `/v2/prism/{teamId}/deal/{dealId}`\n\nUpdate Deal\n\n### Parameters\n\n- `teamId: string`\n\n- `dealId: string`\n\n- `id?: string`\n\n- `crm?: object`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null.\n\n- `extended?: object`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nawait client.deals.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
    perLanguage: {
      typescript: {
        method: 'client.deals.update',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.deals.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');",
      },
      python: {
        method: 'deals.update',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.deals.update(\n    deal_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)',
      },
      go: {
        method: 'client.Deals.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Deals.Update(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.DealUpdateParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      cli: {
        method: 'deals update',
        example:
          "micro deals update \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --deal-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
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
    summary: 'Delete Deal',
    description: 'Delete Deal',
    stainlessPath: '(resource) deals > (method) delete',
    qualified: 'client.deals.delete',
    params: ['teamId: string;', 'dealId: string;'],
    markdown:
      "## delete\n\n`client.deals.delete(teamId: string, dealId: string): void`\n\n**delete** `/v2/prism/{teamId}/deal/{dealId}`\n\nDelete Deal\n\n### Parameters\n\n- `teamId: string`\n\n- `dealId: string`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nawait client.deals.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
    perLanguage: {
      typescript: {
        method: 'client.deals.delete',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.deals.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');",
      },
      python: {
        method: 'deals.delete',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.deals.delete(\n    deal_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)',
      },
      go: {
        method: 'client.Deals.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Deals.Delete(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.DealDeleteParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      cli: {
        method: 'deals delete',
        example:
          "micro deals delete \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --deal-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/deal/$DEAL_ID \\\n    -X DELETE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/prism/query/{teamId}/deal',
    httpMethod: 'post',
    summary: 'List Deals',
    description: 'List Deals',
    stainlessPath: '(resource) deals > (method) list',
    qualified: 'client.deals.list',
    params: [
      'teamId: string;',
      "query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; };",
      'id?: string | string[];',
      'boxes?: string[];',
      'deleted?: boolean;',
      'sources?: string[];',
    ],
    response: '{ data?: object[]; next_cursor?: string; total?: number; }',
    markdown:
      "## list\n\n`client.deals.list(teamId: string, query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; }, id?: string | string[], boxes?: string[], deleted?: boolean, sources?: string[]): { data?: object[]; next_cursor?: string; total?: number; }`\n\n**post** `/v2/prism/query/{teamId}/deal`\n\nList Deals\n\n### Parameters\n\n- `teamId: string`\n\n- `query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; }`\n  - `select: string[]`\n    Property slugs to select. Use dot notation for relationships (e.g. attendee.contact.first_name)\n  - `combinator?: 'AND' | 'OR'`\n    Logical operator for combining filters\n  - `crm_id?: string`\n  - `filter?: object[]`\n    Filters as [{ slug: { operator: value } }]. For select/multiselect properties, values must be option slugs\n  - `limit?: number`\n  - `page?: number`\n  - `sort?: object[]`\n    Sort order as [{ slug: direction }]. Array order determines sort priority\n\n- `id?: string | string[]`\n\n- `boxes?: string[]`\n\n- `deleted?: boolean`\n\n- `sources?: string[]`\n\n### Returns\n\n- `{ data?: object[]; next_cursor?: string; total?: number; }`\n\n  - `data?: object[]`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nconst deals = await client.deals.list({ query: { select: ['string'] } });\n\nconsole.log(deals);\n```",
    perLanguage: {
      typescript: {
        method: 'client.deals.list',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst deals = await client.deals.list({ query: { select: ['string'] } });\n\nconsole.log(deals.data);",
      },
      python: {
        method: 'deals.list',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ndeals = client.deals.list(\n    query={\n        "select": ["string"]\n    },\n)\nprint(deals.data)',
      },
      go: {
        method: 'client.Deals.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tdeals, err := client.Deals.List(context.TODO(), micro.DealListParams{\n\t\tQuery: micro.F(micro.DealListParamsQuery{\n\t\t\tSelect: micro.F([]string{"string"}),\n\t\t}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", deals.Data)\n}\n',
      },
      cli: {
        method: 'deals list',
        example:
          "micro deals list \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --query '{select: [string]}'",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/query/$TEAM_ID/deal \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "query": {\n            "select": [\n              "string"\n            ]\n          }\n        }\'',
      },
    },
  },
  {
    name: 'import',
    endpoint: '/v2/prism/{teamId}/deal/import',
    httpMethod: 'post',
    summary: 'Import Deals',
    description: 'Import Deals',
    stainlessPath: '(resource) deals > (method) import',
    qualified: 'client.deals.import',
    params: [
      'teamId: string;',
      'objects: { id?: string; crm?: object; default?: object; extended?: object; }[];',
      'options?: { caseInsensitive?: boolean; crm_id?: string; dedupe_by?: string; };',
    ],
    response:
      "{ results?: { id?: string; created?: boolean; error?: string; existing?: boolean; }[]; status?: 'complete'; summary?: { created?: number; errors?: number; existing?: number; total?: number; }; }",
    markdown:
      "## import\n\n`client.deals.import(teamId: string, objects: { id?: string; crm?: object; default?: object; extended?: object; }[], options?: { caseInsensitive?: boolean; crm_id?: string; dedupe_by?: string; }): { results?: object[]; status?: 'complete'; summary?: object; }`\n\n**post** `/v2/prism/{teamId}/deal/import`\n\nImport Deals\n\n### Parameters\n\n- `teamId: string`\n\n- `objects: { id?: string; crm?: object; default?: object; extended?: object; }[]`\n  Array of objects to import with property values keyed by slug\n\n- `options?: { caseInsensitive?: boolean; crm_id?: string; dedupe_by?: string; }`\n  - `caseInsensitive?: boolean`\n    Whether deduplication should be case insensitive\n  - `crm_id?: string`\n    App/CRM ID for context (optional)\n  - `dedupe_by?: string`\n    Property slug to deduplicate on\n\n### Returns\n\n- `{ results?: { id?: string; created?: boolean; error?: string; existing?: boolean; }[]; status?: 'complete'; summary?: { created?: number; errors?: number; existing?: number; total?: number; }; }`\n\n  - `results?: { id?: string; created?: boolean; error?: string; existing?: boolean; }[]`\n  - `status?: 'complete'`\n  - `summary?: { created?: number; errors?: number; existing?: number; total?: number; }`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nconst response = await client.deals.import({ objects: [{}] });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.deals.import',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.deals.import({ objects: [{}] });\n\nconsole.log(response.results);",
      },
      python: {
        method: 'deals.import_',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.deals.import_(\n    objects=[{}],\n)\nprint(response.results)',
      },
      go: {
        method: 'client.Deals.Import',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tresponse, err := client.Deals.Import(context.TODO(), micro.DealImportParams{\n\t\tObjects: micro.F([]micro.PrismObjectPropertiesParam{{}}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Results)\n}\n',
      },
      cli: {
        method: 'deals import',
        example:
          "micro deals import \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --object '{}'",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/deal/import \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "objects": [\n            {}\n          ]\n        }\'',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v2/prism/{teamId}/action',
    httpMethod: 'post',
    summary: 'Create Action',
    description: 'Create Action',
    stainlessPath: '(resource) actions > (method) create',
    qualified: 'client.actions.create',
    params: ['teamId: string;', 'id?: string;', 'crm?: object;', 'default?: object;', 'extended?: object;'],
    response: '{ id?: string; }',
    markdown:
      "## create\n\n`client.actions.create(teamId: string, id?: string, crm?: object, default?: object, extended?: object): { id?: string; }`\n\n**post** `/v2/prism/{teamId}/action`\n\nCreate Action\n\n### Parameters\n\n- `teamId: string`\n\n- `id?: string`\n\n- `crm?: object`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null.\n\n- `extended?: object`\n\n### Returns\n\n- `{ id?: string; }`\n\n  - `id?: string`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nconst action = await client.actions.create();\n\nconsole.log(action);\n```",
    perLanguage: {
      typescript: {
        method: 'client.actions.create',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst action = await client.actions.create();\n\nconsole.log(action.id);",
      },
      python: {
        method: 'actions.create',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\naction = client.actions.create()\nprint(action.id)',
      },
      go: {
        method: 'client.Actions.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\taction, err := client.Actions.New(context.TODO(), micro.ActionNewParams{\n\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", action.ID)\n}\n',
      },
      cli: {
        method: 'actions create',
        example:
          "micro actions create \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/action \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/prism/{teamId}/action/{actionId}',
    httpMethod: 'patch',
    summary: 'Update Action',
    description: 'Update Action',
    stainlessPath: '(resource) actions > (method) update',
    qualified: 'client.actions.update',
    params: [
      'teamId: string;',
      'actionId: string;',
      'id?: string;',
      'crm?: object;',
      'default?: object;',
      'extended?: object;',
    ],
    markdown:
      "## update\n\n`client.actions.update(teamId: string, actionId: string, id?: string, crm?: object, default?: object, extended?: object): void`\n\n**patch** `/v2/prism/{teamId}/action/{actionId}`\n\nUpdate Action\n\n### Parameters\n\n- `teamId: string`\n\n- `actionId: string`\n\n- `id?: string`\n\n- `crm?: object`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null.\n\n- `extended?: object`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nawait client.actions.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
    perLanguage: {
      typescript: {
        method: 'client.actions.update',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.actions.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');",
      },
      python: {
        method: 'actions.update',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.actions.update(\n    action_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)',
      },
      go: {
        method: 'client.Actions.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Actions.Update(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.ActionUpdateParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      cli: {
        method: 'actions update',
        example:
          "micro actions update \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --action-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
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
    summary: 'Delete Action',
    description: 'Delete Action',
    stainlessPath: '(resource) actions > (method) delete',
    qualified: 'client.actions.delete',
    params: ['teamId: string;', 'actionId: string;'],
    markdown:
      "## delete\n\n`client.actions.delete(teamId: string, actionId: string): void`\n\n**delete** `/v2/prism/{teamId}/action/{actionId}`\n\nDelete Action\n\n### Parameters\n\n- `teamId: string`\n\n- `actionId: string`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nawait client.actions.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
    perLanguage: {
      typescript: {
        method: 'client.actions.delete',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.actions.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');",
      },
      python: {
        method: 'actions.delete',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.actions.delete(\n    action_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)',
      },
      go: {
        method: 'client.Actions.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Actions.Delete(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.ActionDeleteParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      cli: {
        method: 'actions delete',
        example:
          "micro actions delete \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --action-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/action/$ACTION_ID \\\n    -X DELETE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/prism/query/{teamId}/action',
    httpMethod: 'post',
    summary: 'List Actions',
    description: 'List Actions',
    stainlessPath: '(resource) actions > (method) list',
    qualified: 'client.actions.list',
    params: [
      'teamId: string;',
      "query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; };",
      'id?: string | string[];',
      'boxes?: string[];',
      'deleted?: boolean;',
      'sources?: string[];',
    ],
    response: '{ data?: object[]; next_cursor?: string; total?: number; }',
    markdown:
      "## list\n\n`client.actions.list(teamId: string, query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; }, id?: string | string[], boxes?: string[], deleted?: boolean, sources?: string[]): { data?: object[]; next_cursor?: string; total?: number; }`\n\n**post** `/v2/prism/query/{teamId}/action`\n\nList Actions\n\n### Parameters\n\n- `teamId: string`\n\n- `query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; }`\n  - `select: string[]`\n    Property slugs to select. Use dot notation for relationships (e.g. attendee.contact.first_name)\n  - `combinator?: 'AND' | 'OR'`\n    Logical operator for combining filters\n  - `crm_id?: string`\n  - `filter?: object[]`\n    Filters as [{ slug: { operator: value } }]. For select/multiselect properties, values must be option slugs\n  - `limit?: number`\n  - `page?: number`\n  - `sort?: object[]`\n    Sort order as [{ slug: direction }]. Array order determines sort priority\n\n- `id?: string | string[]`\n\n- `boxes?: string[]`\n\n- `deleted?: boolean`\n\n- `sources?: string[]`\n\n### Returns\n\n- `{ data?: object[]; next_cursor?: string; total?: number; }`\n\n  - `data?: object[]`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nconst actions = await client.actions.list({ query: { select: ['string'] } });\n\nconsole.log(actions);\n```",
    perLanguage: {
      typescript: {
        method: 'client.actions.list',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst actions = await client.actions.list({ query: { select: ['string'] } });\n\nconsole.log(actions.data);",
      },
      python: {
        method: 'actions.list',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nactions = client.actions.list(\n    query={\n        "select": ["string"]\n    },\n)\nprint(actions.data)',
      },
      go: {
        method: 'client.Actions.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tactions, err := client.Actions.List(context.TODO(), micro.ActionListParams{\n\t\tQuery: micro.F(micro.ActionListParamsQuery{\n\t\t\tSelect: micro.F([]string{"string"}),\n\t\t}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", actions.Data)\n}\n',
      },
      cli: {
        method: 'actions list',
        example:
          "micro actions list \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --query '{select: [string]}'",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/query/$TEAM_ID/action \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "query": {\n            "select": [\n              "string"\n            ]\n          }\n        }\'',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/prism/query/{teamId}/event',
    httpMethod: 'post',
    summary: 'List Events',
    description: 'List Events',
    stainlessPath: '(resource) events > (method) list',
    qualified: 'client.events.list',
    params: [
      'teamId: string;',
      "query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; };",
      'id?: string | string[];',
      'boxes?: string[];',
      'deleted?: boolean;',
      'sources?: string[];',
    ],
    response: '{ data?: object[]; next_cursor?: string; total?: number; }',
    markdown:
      "## list\n\n`client.events.list(teamId: string, query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; }, id?: string | string[], boxes?: string[], deleted?: boolean, sources?: string[]): { data?: object[]; next_cursor?: string; total?: number; }`\n\n**post** `/v2/prism/query/{teamId}/event`\n\nList Events\n\n### Parameters\n\n- `teamId: string`\n\n- `query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; }`\n  - `select: string[]`\n    Property slugs to select. Use dot notation for relationships (e.g. attendee.contact.first_name)\n  - `combinator?: 'AND' | 'OR'`\n    Logical operator for combining filters\n  - `crm_id?: string`\n  - `filter?: object[]`\n    Filters as [{ slug: { operator: value } }]. For select/multiselect properties, values must be option slugs\n  - `limit?: number`\n  - `page?: number`\n  - `sort?: object[]`\n    Sort order as [{ slug: direction }]. Array order determines sort priority\n\n- `id?: string | string[]`\n\n- `boxes?: string[]`\n\n- `deleted?: boolean`\n\n- `sources?: string[]`\n\n### Returns\n\n- `{ data?: object[]; next_cursor?: string; total?: number; }`\n\n  - `data?: object[]`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nconst events = await client.events.list({ query: { select: ['string'] } });\n\nconsole.log(events);\n```",
    perLanguage: {
      typescript: {
        method: 'client.events.list',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst events = await client.events.list({ query: { select: ['string'] } });\n\nconsole.log(events.data);",
      },
      python: {
        method: 'events.list',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nevents = client.events.list(\n    query={\n        "select": ["string"]\n    },\n)\nprint(events.data)',
      },
      go: {
        method: 'client.Events.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tevents, err := client.Events.List(context.TODO(), micro.EventListParams{\n\t\tQuery: micro.F(micro.EventListParamsQuery{\n\t\t\tSelect: micro.F([]string{"string"}),\n\t\t}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", events.Data)\n}\n',
      },
      cli: {
        method: 'events list',
        example:
          "micro events list \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --query '{select: [string]}'",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/query/$TEAM_ID/event \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "query": {\n            "select": [\n              "string"\n            ]\n          }\n        }\'',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v2/prism/{teamId}/document',
    httpMethod: 'post',
    summary: 'Create Document',
    description: 'Create Document',
    stainlessPath: '(resource) documents > (method) create',
    qualified: 'client.documents.create',
    params: ['teamId: string;', 'id?: string;', 'crm?: object;', 'default?: object;', 'extended?: object;'],
    response: '{ id?: string; }',
    markdown:
      "## create\n\n`client.documents.create(teamId: string, id?: string, crm?: object, default?: object, extended?: object): { id?: string; }`\n\n**post** `/v2/prism/{teamId}/document`\n\nCreate Document\n\n### Parameters\n\n- `teamId: string`\n\n- `id?: string`\n\n- `crm?: object`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null.\n\n- `extended?: object`\n\n### Returns\n\n- `{ id?: string; }`\n\n  - `id?: string`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nconst document = await client.documents.create();\n\nconsole.log(document);\n```",
    perLanguage: {
      typescript: {
        method: 'client.documents.create',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst document = await client.documents.create();\n\nconsole.log(document.id);",
      },
      python: {
        method: 'documents.create',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ndocument = client.documents.create()\nprint(document.id)',
      },
      go: {
        method: 'client.Documents.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tdocument, err := client.Documents.New(context.TODO(), micro.DocumentNewParams{\n\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", document.ID)\n}\n',
      },
      cli: {
        method: 'documents create',
        example:
          "micro documents create \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/document \\\n    -X POST \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v2/prism/{teamId}/document/{documentId}',
    httpMethod: 'patch',
    summary: 'Update Document',
    description: 'Update Document',
    stainlessPath: '(resource) documents > (method) update',
    qualified: 'client.documents.update',
    params: [
      'teamId: string;',
      'documentId: string;',
      'id?: string;',
      'crm?: object;',
      'default?: object;',
      'extended?: object;',
    ],
    markdown:
      "## update\n\n`client.documents.update(teamId: string, documentId: string, id?: string, crm?: object, default?: object, extended?: object): void`\n\n**patch** `/v2/prism/{teamId}/document/{documentId}`\n\nUpdate Document\n\n### Parameters\n\n- `teamId: string`\n\n- `documentId: string`\n\n- `id?: string`\n\n- `crm?: object`\n\n- `default?: object`\n  Properties keyed by property slug. Values can be strings, numbers, booleans, arrays, or null.\n\n- `extended?: object`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nawait client.documents.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
    perLanguage: {
      typescript: {
        method: 'client.documents.update',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.documents.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');",
      },
      python: {
        method: 'documents.update',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.documents.update(\n    document_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)',
      },
      go: {
        method: 'client.Documents.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Documents.Update(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.DocumentUpdateParams{\n\t\t\tPrismObjectProperties: micro.PrismObjectPropertiesParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      cli: {
        method: 'documents update',
        example:
          "micro documents update \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --document-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
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
    summary: 'Delete Document',
    description: 'Delete Document',
    stainlessPath: '(resource) documents > (method) delete',
    qualified: 'client.documents.delete',
    params: ['teamId: string;', 'documentId: string;'],
    markdown:
      "## delete\n\n`client.documents.delete(teamId: string, documentId: string): void`\n\n**delete** `/v2/prism/{teamId}/document/{documentId}`\n\nDelete Document\n\n### Parameters\n\n- `teamId: string`\n\n- `documentId: string`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nawait client.documents.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
    perLanguage: {
      typescript: {
        method: 'client.documents.delete',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.documents.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');",
      },
      python: {
        method: 'documents.delete',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\nclient.documents.delete(\n    document_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)',
      },
      go: {
        method: 'client.Documents.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\terr := client.Documents.Delete(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\tmicro.DocumentDeleteParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      cli: {
        method: 'documents delete',
        example:
          "micro documents delete \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --document-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/$TEAM_ID/document/$DOCUMENT_ID \\\n    -X DELETE \\\n    -H "x-api-key: $MICRO_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/prism/query/{teamId}/document',
    httpMethod: 'post',
    summary: 'List Documents',
    description: 'List Documents',
    stainlessPath: '(resource) documents > (method) list',
    qualified: 'client.documents.list',
    params: [
      'teamId: string;',
      "query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; };",
      'id?: string | string[];',
      'boxes?: string[];',
      'deleted?: boolean;',
      'sources?: string[];',
    ],
    response: '{ data?: object[]; next_cursor?: string; total?: number; }',
    markdown:
      "## list\n\n`client.documents.list(teamId: string, query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; }, id?: string | string[], boxes?: string[], deleted?: boolean, sources?: string[]): { data?: object[]; next_cursor?: string; total?: number; }`\n\n**post** `/v2/prism/query/{teamId}/document`\n\nList Documents\n\n### Parameters\n\n- `teamId: string`\n\n- `query: { select: string[]; combinator?: 'AND' | 'OR'; crm_id?: string; filter?: object[]; limit?: number; page?: number; sort?: object[]; }`\n  - `select: string[]`\n    Property slugs to select. Use dot notation for relationships (e.g. attendee.contact.first_name)\n  - `combinator?: 'AND' | 'OR'`\n    Logical operator for combining filters\n  - `crm_id?: string`\n  - `filter?: object[]`\n    Filters as [{ slug: { operator: value } }]. For select/multiselect properties, values must be option slugs\n  - `limit?: number`\n  - `page?: number`\n  - `sort?: object[]`\n    Sort order as [{ slug: direction }]. Array order determines sort priority\n\n- `id?: string | string[]`\n\n- `boxes?: string[]`\n\n- `deleted?: boolean`\n\n- `sources?: string[]`\n\n### Returns\n\n- `{ data?: object[]; next_cursor?: string; total?: number; }`\n\n  - `data?: object[]`\n  - `next_cursor?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Micro from 'micro';\n\nconst client = new Micro();\n\nconst documents = await client.documents.list({ query: { select: ['string'] } });\n\nconsole.log(documents);\n```",
    perLanguage: {
      typescript: {
        method: 'client.documents.list',
        example:
          "import Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst documents = await client.documents.list({ query: { select: ['string'] } });\n\nconsole.log(documents.data);",
      },
      python: {
        method: 'documents.list',
        example:
          'import os\nfrom micro import Micro\n\nclient = Micro(\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\ndocuments = client.documents.list(\n    query={\n        "select": ["string"]\n    },\n)\nprint(documents.data)',
      },
      go: {
        method: 'client.Documents.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tdocuments, err := client.Documents.List(context.TODO(), micro.DocumentListParams{\n\t\tQuery: micro.F(micro.DocumentListParamsQuery{\n\t\t\tSelect: micro.F([]string{"string"}),\n\t\t}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", documents.Data)\n}\n',
      },
      cli: {
        method: 'documents list',
        example:
          "micro documents list \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --query '{select: [string]}'",
      },
      http: {
        example:
          'curl https://developers.micro.so/v2/prism/query/$TEAM_ID/document \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $MICRO_API_KEY" \\\n    -d \'{\n          "query": {\n            "select": [\n              "string"\n            ]\n          }\n        }\'',
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'cli',
    content:
      "# Micro CLI\n\nThe official CLI for the Micro REST API.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## Installation\n\n### Installing with Go\n\nTo test or install the CLI locally, you need [Go](https://go.dev/doc/install) version 1.22 or later installed.\n\n~~~sh\ngo install 'github.com/stainless-sdks/micro-cli/cmd/micro@latest'\n~~~\n\nOnce you have run `go install`, the binary is placed in your Go bin directory:\n\n- **Default location**: `$HOME/go/bin` (or `$GOPATH/bin` if GOPATH is set)\n- **Check your path**: Run `go env GOPATH` to see the base directory\n\nIf commands aren't found after installation, add the Go bin directory to your PATH:\n\n~~~sh\n# Add to your shell profile (.zshrc, .bashrc, etc.)\nexport PATH=\"$PATH:$(go env GOPATH)/bin\"\n~~~\n\n### Running Locally\n\nAfter cloning the git repository for this project, you can use the\n`scripts/run` script to run the tool locally:\n\n~~~sh\n./scripts/run args...\n~~~\n\n## Usage\n\nThe CLI follows a resource-based command structure:\n\n~~~sh\nmicro [resource] <command> [flags...]\n~~~\n\n~~~sh\nmicro contacts list \\\n  --api-key 'My API Key' \\\n  --team-id 'My Team ID' \\\n  --team-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e \\\n  --query '{select: [full_name, email]}'\n~~~\n\nFor details about specific commands, use the `--help` flag.\n\n### Environment variables\n\n| Environment variable | Required |\n| -------------------- | -------- |\n| `MICRO_API_KEY`      | yes      |\n\n### Global flags\n\n- `--api-key` (can also be set with `MICRO_API_KEY` env var)\n- `--team-id`\n- `--help` - Show command line usage\n- `--debug` - Enable debug logging (includes HTTP request/response details)\n- `--version`, `-v` - Show the CLI version\n- `--base-url` - Use a custom API backend URL\n- `--format` - Change the output format (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--format-error` - Change the output format for errors (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--transform` - Transform the data output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n- `--transform-error` - Transform the error output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n\n### Passing files as arguments\n\nTo pass files to your API, you can use the `@myfile.ext` syntax:\n\n~~~bash\nmicro <command> --arg @abe.jpg\n~~~\n\nFiles can also be passed inside JSON or YAML blobs:\n\n~~~bash\nmicro <command> --arg '{image: \"@abe.jpg\"}'\n# Equivalent:\nmicro <command> <<YAML\narg:\n  image: \"@abe.jpg\"\nYAML\n~~~\n\nIf you need to pass a string literal that begins with an `@` sign, you can\nescape the `@` sign to avoid accidentally passing a file.\n\n~~~bash\nmicro <command> --username '\\@abe'\n~~~\n\n#### Explicit encoding\n\nFor JSON endpoints, the CLI tool does filetype sniffing to determine whether the\nfile contents should be sent as a string literal (for plain text files) or as a\nbase64-encoded string literal (for binary files). If you need to explicitly send\nthe file as either plain text or base64-encoded data, you can use\n`@file://myfile.txt` (for string encoding) or `@data://myfile.dat` (for\nbase64-encoding). Note that absolute paths will begin with `@file://` or\n`@data://`, followed by a third `/` (for example, `@file:///tmp/file.txt`).\n\n~~~bash\nmicro <command> --arg @data://file.txt\n~~~\n\n## Linking different Go SDK versions\n\nYou can link the CLI against a different version of the Micro Go SDK\nfor development purposes using the `./scripts/link` script.\n\nTo link to a specific version from a repository (version can be a branch,\ngit tag, or commit hash):\n\n~~~bash\n./scripts/link github.com/org/repo@version\n~~~\n\nTo link to a local copy of the SDK:\n\n~~~bash\n./scripts/link ../path/to/micro-go\n~~~\n\nIf you run the link script without any arguments, it will default to `../micro-go`.\n",
  },
  {
    language: 'go',
    content:
      '# Micro Go API Library\n\n<a href="https://pkg.go.dev/github.com/stainless-sdks/micro-go"><img src="https://pkg.go.dev/badge/github.com/stainless-sdks/micro-go.svg" alt="Go Reference"></a>\n\nThe Micro Go library provides convenient access to the Micro REST API\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Micro MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=micro-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIm1pY3JvLW1jcCJdLCJlbnYiOnsiTUlDUk9fQVBJX0tFWSI6Ik15IEFQSSBLZXkiLCJNSUNST19URUFNX0lEIjoiTXkgVGVhbSBJRCJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22micro-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22micro-mcp%22%5D%2C%22env%22%3A%7B%22MICRO_API_KEY%22%3A%22My%20API%20Key%22%2C%22MICRO_TEAM_ID%22%3A%22My%20Team%20ID%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n\n\n```go\nimport (\n\t"github.com/stainless-sdks/micro-go" // imported as SDK_PackageName\n)\n```\n\n\n\nOr to pin the version:\n\n\n\n```sh\ngo get -u \'github.com/stainless-sdks/micro-go@v0.0.1\'\n```\n\n\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/micro-go"\n\t"github.com/stainless-sdks/micro-go/option"\n)\n\nfunc main() {\n\tclient := micro.NewClient(\n\t\toption.WithAPIKey("My API Key"), // defaults to os.LookupEnv("MICRO_API_KEY")\n\t\toption.WithTeamID("My Team ID"),\n\t)\n\tcontacts, err := client.Contacts.List(context.TODO(), micro.ContactListParams{\n\t\tQuery: micro.F(micro.ContactListParamsQuery{\n\t\t\tSelect: micro.F([]string{"full_name", "email"}),\n\t\t}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", contacts.Data)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Contacts.List(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/stainless-sdks/micro-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Contacts.List(context.TODO(), micro.ContactListParams{\n\tQuery: micro.F(micro.ContactListParamsQuery{\n\t\tSelect: micro.F([]string{"full_name", "email"}),\n\t}),\n})\nif err != nil {\n\tvar apierr *micro.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/v2/prism/query/{teamId}/contact": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Contacts.List(\n\tctx,\n\tmicro.ContactListParams{\n\t\tQuery: micro.F(micro.ContactListParamsQuery{\n\t\t\tSelect: micro.F([]string{"full_name", "email"}),\n\t\t}),\n\t},\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := micro.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Contacts.List(\n\tcontext.TODO(),\n\tmicro.ContactListParams{\n\t\tQuery: micro.F(micro.ContactListParamsQuery{\n\t\t\tSelect: micro.F([]string{"full_name", "email"}),\n\t\t}),\n\t},\n\toption.WithMaxRetries(5),\n)\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\ncontacts, err := client.Contacts.List(\n\tcontext.TODO(),\n\tmicro.ContactListParams{\n\t\tQuery: micro.F(micro.ContactListParamsQuery{\n\t\t\tSelect: micro.F([]string{"full_name", "email"}),\n\t\t}),\n\t},\n\toption.WithResponseInto(&response),\n)\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", contacts)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/stainless-sdks/micro-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'python',
    content:
      '# Micro Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/micro.svg?label=pypi%20(stable))](https://pypi.org/project/micro/)\n\nThe Micro Python library provides convenient access to the Micro REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Micro MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=micro-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIm1pY3JvLW1jcCJdLCJlbnYiOnsiTUlDUk9fQVBJX0tFWSI6Ik15IEFQSSBLZXkiLCJNSUNST19URUFNX0lEIjoiTXkgVGVhbSBJRCJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22micro-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22micro-mcp%22%5D%2C%22env%22%3A%7B%22MICRO_API_KEY%22%3A%22My%20API%20Key%22%2C%22MICRO_TEAM_ID%22%3A%22My%20Team%20ID%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\n The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from this staging repo\npip install git+ssh://git@github.com/stainless-sdks/micro-python.git\n```\n> [!NOTE]\n> Once this package is [published to PyPI](https://www.stainless.com/docs/guides/publish), this will become: `pip install micro`\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom micro import Micro\n\nclient = Micro(\n    team_id="My Team ID",\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\n\ncontacts = client.contacts.list(\n    query={\n        "select": ["full_name", "email"]\n    },\n)\nprint(contacts.data)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `MICRO_API_KEY="My API Key"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncMicro` instead of `Micro` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom micro import AsyncMicro\n\nclient = AsyncMicro(\n    team_id="My Team ID",\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  contacts = await client.contacts.list(\n      query={\n          "select": ["full_name", "email"]\n      },\n  )\n  print(contacts.data)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from this staging repo\npip install \'micro[aiohttp] @ git+ssh://git@github.com/stainless-sdks/micro-python.git\'\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom micro import DefaultAioHttpClient\nfrom micro import AsyncMicro\n\nasync def main() -> None:\n  async with AsyncMicro(\n    team_id="My Team ID",\n    api_key=os.environ.get("MICRO_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    contacts = await client.contacts.list(\n        query={\n            "select": ["full_name", "email"]\n        },\n    )\n    print(contacts.data)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom micro import Micro\n\nclient = Micro(\n    team_id="My Team ID",\n)\n\ncontacts = client.contacts.list(\n    query={\n        "select": ["string"]\n    },\n)\nprint(contacts.query)\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `micro.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `micro.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `micro.APIError`.\n\n```python\nimport micro\nfrom micro import Micro\n\nclient = Micro(\n    team_id="My Team ID",\n)\n\ntry:\n    client.contacts.list(\n        query={\n            "select": ["full_name", "email"]\n        },\n    )\nexcept micro.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept micro.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept micro.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom micro import Micro\n\n# Configure the default for all requests:\nclient = Micro(\n    team_id="My Team ID",\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).contacts.list(\n    query={\n        "select": ["full_name", "email"]\n    },\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom micro import Micro\n\n# Configure the default for all requests:\nclient = Micro(\n    team_id="My Team ID",\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = Micro(\n    team_id="My Team ID",\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).contacts.list(\n    query={\n        "select": ["full_name", "email"]\n    },\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `MICRO_LOG` to `info`.\n\n```shell\n$ export MICRO_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom micro import Micro\n\nclient = Micro(\n    team_id="My Team ID",\n)\nresponse = client.contacts.with_raw_response.list(\n    query={\n        "select": ["full_name", "email"]\n    },\n)\nprint(response.headers.get(\'X-My-Header\'))\n\ncontact = response.parse()  # get the object that `contacts.list()` would have returned\nprint(contact.data)\n```\n\nThese methods return an [`APIResponse`](https://github.com/stainless-sdks/micro-python/tree/main/src/micro/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/stainless-sdks/micro-python/tree/main/src/micro/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.contacts.with_streaming_response.list(\n    query={\n        "select": ["full_name", "email"]\n    },\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom micro import Micro, DefaultHttpxClient\n\nclient = Micro(\n    team_id="My Team ID",\n    # Or use the `MICRO_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom micro import Micro\n\nwith Micro(\n    team_id="My Team ID",\n) as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/stainless-sdks/micro-python/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport micro\nprint(micro.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Micro TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/micro.svg?label=npm%20(stable))](https://npmjs.org/package/micro) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/micro)\n\nThis library provides convenient access to the Micro REST API from server-side TypeScript or JavaScript.\n\n\n\nThe full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Micro MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=micro-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIm1pY3JvLW1jcCJdLCJlbnYiOnsiTUlDUk9fQVBJX0tFWSI6Ik15IEFQSSBLZXkiLCJNSUNST19URUFNX0lEIjoiTXkgVGVhbSBJRCJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22micro-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22micro-mcp%22%5D%2C%22env%22%3A%7B%22MICRO_API_KEY%22%3A%22My%20API%20Key%22%2C%22MICRO_TEAM_ID%22%3A%22My%20Team%20ID%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install git+ssh://git@github.com:stainless-sdks/micro-typescript.git\n```\n> [!NOTE]\n> Once this package is [published to npm](https://www.stainless.com/docs/guides/publish), this will become: `npm install micro`\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst contacts = await client.contacts.list({ query: { select: ['full_name', 'email'] } });\n\nconsole.log(contacts.data);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Micro from 'micro';\n\nconst client = new Micro({\n  teamID: 'My Team ID',\n  apiKey: process.env['MICRO_API_KEY'], // This is the default and can be omitted\n});\n\nconst params: Micro.ContactListParams = { query: { select: ['full_name', 'email'] } };\nconst contacts: Micro.ContactListResponse = await client.contacts.list(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst contacts = await client.contacts\n  .list({ query: { select: ['full_name', 'email'] } })\n  .catch(async (err) => {\n    if (err instanceof Micro.APIError) {\n      console.log(err.status); // 400\n      console.log(err.name); // BadRequestError\n      console.log(err.headers); // {server: 'nginx', ...}\n    } else {\n      throw err;\n    }\n  });\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Micro({\n  teamID: 'My Team ID',\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.contacts.list({ query: { select: ['full_name', 'email'] } }, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Micro({\n  teamID: 'My Team ID',\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.contacts.list({ query: { select: ['full_name', 'email'] } }, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Micro();\n\nconst response = await client.contacts\n  .list({ query: { select: ['full_name', 'email'] } })\n  .asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: contacts, response: raw } = await client.contacts\n  .list({ query: { select: ['full_name', 'email'] } })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(contacts.data);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `MICRO_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Micro from 'micro';\n\nconst client = new Micro({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Micro from 'micro';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Micro({\n  logger: logger.child({ name: 'Micro' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.contacts.list({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Micro from 'micro';\nimport fetch from 'my-fetch';\n\nconst client = new Micro({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Micro from 'micro';\n\nconst client = new Micro({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Micro from 'micro';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Micro({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Micro from 'micro';\n\nconst client = new Micro({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Micro from 'npm:micro';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Micro({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/stainless-sdks/micro-typescript/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
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
