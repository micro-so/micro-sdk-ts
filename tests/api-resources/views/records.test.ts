// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Micro from '@micro-so/sdk';

const client = new Micro({
  apiKey: 'My API Key',
  teamID: 'My Team ID',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource records', () => {
  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.views.records.list('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      viewObjectType: 'action',
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
  test.skip('list: required and optional params', async () => {
    const response = await client.views.records.list('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      viewObjectType: 'action',
      cursor: 'cursor',
      limit: 0,
      page: 1,
    });
  });

  // Mock server tests are disabled
  test.skip('pin: only required params', async () => {
    const responsePromise = client.views.records.pin('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      viewObjectType: 'action',
      viewId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
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
  test.skip('pin: required and optional params', async () => {
    const response = await client.views.records.pin('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      viewObjectType: 'action',
      viewId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      'Idempotency-Key': 'x',
    });
  });

  // Mock server tests are disabled
  test.skip('reorder: only required params', async () => {
    const responsePromise = client.views.records.reorder('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      viewObjectType: 'action',
      object_ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
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
  test.skip('reorder: required and optional params', async () => {
    const response = await client.views.records.reorder('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      viewObjectType: 'action',
      object_ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
      'Idempotency-Key': 'x',
    });
  });

  // Mock server tests are disabled
  test.skip('unpin: only required params', async () => {
    const responsePromise = client.views.records.unpin('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      viewObjectType: 'action',
      viewId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
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
  test.skip('unpin: required and optional params', async () => {
    const response = await client.views.records.unpin('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      viewObjectType: 'action',
      viewId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });
});
