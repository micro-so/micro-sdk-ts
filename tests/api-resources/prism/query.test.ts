// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Micro from 'micro';

const client = new Micro({
  apiKey: 'My API Key',
  teamID: 'My Team ID',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource query', () => {
  // Mock server tests are disabled
  test.skip('executeQuery: only required params', async () => {
    const responsePromise = client.prism.query.executeQuery('deal', { query: {} });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('executeQuery: required and optional params', async () => {
    const response = await client.prism.query.executeQuery('deal', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      query: {
        combinator: 'AND',
        crm_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        team_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      },
      id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      all: true,
      boxes: ['string'],
      deleted: true,
      limit: 0,
      page: 0,
      sources: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
    });
  });

  // Mock server tests are disabled
  test.skip('executeQueryV2: only required params', async () => {
    const responsePromise = client.prism.query.executeQueryV2('deal', { query: { select: ['string'] } });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('executeQueryV2: required and optional params', async () => {
    const response = await client.prism.query.executeQueryV2('deal', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      query: {
        select: ['string'],
        combinator: 'AND',
        crm_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        filter: [{ foo: { foo: 'string' } }],
        limit: 0,
        page: 0,
        sort: [{ foo: 'asc' }],
      },
      id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      boxes: ['string'],
      deleted: true,
      sources: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
    });
  });
});
