// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Micro from 'micro';

const client = new Micro({
  apiKey: 'My API Key',
  teamID: 'My Team ID',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource prism', () => {
  // Mock server tests are disabled
  test.skip('createObject: only required params', async () => {
    const responsePromise = client.prism.createObject('deal', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('createObject: required and optional params', async () => {
    const response = await client.prism.createObject('deal', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      crm: {},
      default: {},
      extended: {},
    });
  });

  // Mock server tests are disabled
  test.skip('deleteObject: only required params', async () => {
    const responsePromise = client.prism.deleteObject('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      objectType: 'deal',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('deleteObject: required and optional params', async () => {
    const response = await client.prism.deleteObject('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      objectType: 'deal',
    });
  });

  // Mock server tests are disabled
  test.skip('duplicateObject: only required params', async () => {
    const responsePromise = client.prism.duplicateObject('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      objectType: 'deal',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('duplicateObject: required and optional params', async () => {
    const response = await client.prism.duplicateObject('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      objectType: 'deal',
    });
  });

  // Mock server tests are disabled
  test.skip('importObjects: only required params', async () => {
    const responsePromise = client.prism.importObjects('identity', { objects: [{}] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('importObjects: required and optional params', async () => {
    const response = await client.prism.importObjects('identity', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      objects: [
        {
          id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          crm: {},
          default: {},
          extended: {},
        },
      ],
      options: {
        caseInsensitive: true,
        crm_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        dedupe_by: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        dedupe_type: 'str',
      },
    });
  });

  // Mock server tests are disabled
  test.skip('patchObject: only required params', async () => {
    const responsePromise = client.prism.patchObject('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      objectType: 'deal',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('patchObject: required and optional params', async () => {
    const response = await client.prism.patchObject('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      objectType: 'deal',
      id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      crm: {},
      default: {},
      extended: {},
    });
  });

  // Mock server tests are disabled
  test.skip('restoreObject: only required params', async () => {
    const responsePromise = client.prism.restoreObject('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      objectType: 'deal',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('restoreObject: required and optional params', async () => {
    const response = await client.prism.restoreObject('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      objectType: 'deal',
    });
  });
});
