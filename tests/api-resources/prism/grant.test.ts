// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Micro from 'micro';

const client = new Micro({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource grant', () => {
  // Mock server tests are disabled
  test.skip('retrieveGrant: only required params', async () => {
    const responsePromise = client.prism.grant.retrieveGrant('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
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
  test.skip('retrieveGrant: required and optional params', async () => {
    const response = await client.prism.grant.retrieveGrant('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      objectType: 'deal',
    });
  });

  // Mock server tests are disabled
  test.skip('updateGrant: only required params', async () => {
    const responsePromise = client.prism.grant.updateGrant('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
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
  test.skip('updateGrant: required and optional params', async () => {
    const response = await client.prism.grant.updateGrant('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      objectType: 'deal',
      team_group_id: [{ foo: 'a' }],
      team_id: { foo: 'a' },
      user_id: [{ foo: 'a' }],
    });
  });
});
