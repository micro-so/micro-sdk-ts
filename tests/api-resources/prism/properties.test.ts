// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Micro from '@micro-so/sdk';

const client = new Micro({
  apiKey: 'My API Key',
  teamID: 'My Team ID',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource properties', () => {
  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.prism.properties.list('comment');
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
    const response = await client.prism.properties.list('comment', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      autofill: true,
      include_options: 'true',
      list_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      term: 'term',
    });
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.prism.properties.list(
        'comment',
        {
          teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          autofill: true,
          include_options: 'true',
          list_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          term: 'term',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Micro.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('listAll: only required params', async () => {
    const responsePromise = client.prism.properties.listAll();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listAll: required and optional params', async () => {
    const response = await client.prism.properties.listAll({
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      autofill: true,
      include_options: 'true',
      list_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      term: 'term',
    });
  });

  // Mock server tests are disabled
  test.skip('listAll: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.prism.properties.listAll(
        {
          teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          autofill: true,
          include_options: 'true',
          list_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          term: 'term',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Micro.NotFoundError);
  });
});
