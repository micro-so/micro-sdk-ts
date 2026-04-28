// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Micro from 'micro';

const client = new Micro({
  apiKey: 'My API Key',
  teamID: 'My Team ID',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource contacts', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.contacts.create();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.contacts.create({
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      crm: {},
      default: { foo: 'bar' },
      extended: {},
    });
  });

  // Mock server tests are disabled
  test.skip('create: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.contacts.create(
        {
          teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          crm: {},
          default: { foo: 'bar' },
          extended: {},
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Micro.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.contacts.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update: required and optional params', async () => {
    const response = await client.contacts.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      crm: {},
      default: { foo: 'bar' },
      extended: {},
    });
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.contacts.list({ query: { select: ['string'] } });
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
    const response = await client.contacts.list({
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

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.contacts.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete: required and optional params', async () => {
    const response = await client.contacts.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('delete: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.contacts.delete(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        { teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Micro.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('import: only required params', async () => {
    const responsePromise = client.contacts.import({ objects: [{}] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('import: required and optional params', async () => {
    const response = await client.contacts.import({
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      objects: [
        {
          id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          crm: {},
          default: { foo: 'bar' },
          extended: {},
        },
      ],
      options: {
        caseInsensitive: true,
        crm_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        dedupe_by: 'dedupe_by',
      },
    });
  });
});
