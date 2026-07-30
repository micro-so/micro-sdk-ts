// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Micro from '@micro-so/sdk';

const client = new Micro({
  apiKey: 'My API Key',
  teamID: 'My Team ID',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource events', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.prism.objects.events.create();
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
    const response = await client.prism.objects.events.create({
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      default: { foo: 'bar' },
      list: {},
      'Idempotency-Key': 'x',
    });
  });

  // Mock server tests are disabled
  test.skip('create: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.prism.objects.events.create(
        {
          teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          default: { foo: 'bar' },
          list: {},
          'Idempotency-Key': 'x',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Micro.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.prism.objects.events.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
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
    const response = await client.prism.objects.events.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      default: { foo: 'bar' },
      list: {},
      'Idempotency-Key': 'x',
      'If-Match': 'If-Match',
    });
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.prism.objects.events.list();
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
    const response = await client.prism.objects.events.list({
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      cursor: 'cursor',
      deleted: true,
      include_total: true,
      limit: 1,
      list_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      select: 'select',
      sort: 'sort',
    });
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.prism.objects.events.list(
        {
          teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          cursor: 'cursor',
          deleted: true,
          include_total: true,
          limit: 1,
          list_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          select: 'select',
          sort: 'sort',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Micro.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.prism.objects.events.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
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
    const response = await client.prism.objects.events.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      'If-Match': 'If-Match',
    });
  });

  // Mock server tests are disabled
  test.skip('delete: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.prism.objects.events.delete(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        { teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', 'If-Match': 'If-Match' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Micro.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('count: only required params', async () => {
    const responsePromise = client.prism.objects.events.count();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('count: required and optional params', async () => {
    const response = await client.prism.objects.events.count({
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      list_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('count: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.prism.objects.events.count(
        { teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', list_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Micro.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('duplicate: only required params', async () => {
    const responsePromise = client.prism.objects.events.duplicate('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('duplicate: required and optional params', async () => {
    const response = await client.prism.objects.events.duplicate('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      'Idempotency-Key': 'x',
    });
  });

  // Mock server tests are disabled
  test.skip('duplicate: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.prism.objects.events.duplicate(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        { teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', 'Idempotency-Key': 'x' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Micro.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('find: only required params', async () => {
    const responsePromise = client.prism.objects.events.find('value', { slug: 'slug' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('find: required and optional params', async () => {
    const response = await client.prism.objects.events.find('value', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      slug: 'slug',
      list_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('get: only required params', async () => {
    const responsePromise = client.prism.objects.events.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('get: required and optional params', async () => {
    const response = await client.prism.objects.events.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      select: 'select',
    });
  });

  // Mock server tests are disabled
  test.skip('get: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.prism.objects.events.get(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        { teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', select: 'select' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Micro.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('query: only required params', async () => {
    const responsePromise = client.prism.objects.events.query({ query: { select: ['string'] } });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('query: required and optional params', async () => {
    const response = await client.prism.objects.events.query({
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      query: {
        select: ['string'],
        combinator: 'AND',
        cursor: 'cursor',
        filter: [{ foo: { '=': 'string' } }],
        limit: 1,
        list_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        page: 0,
        sort: [{ foo: 'asc' }],
      },
      id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      boxes: ['string'],
      cursor: 'cursor',
      deleted: true,
      include_total: true,
      sources: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
    });
  });

  // Mock server tests are disabled
  test.skip('restore: only required params', async () => {
    const responsePromise = client.prism.objects.events.restore('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('restore: required and optional params', async () => {
    const response = await client.prism.objects.events.restore('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      'Idempotency-Key': 'x',
    });
  });

  // Mock server tests are disabled
  test.skip('restore: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.prism.objects.events.restore(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        { teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', 'Idempotency-Key': 'x' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Micro.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('upsert: only required params', async () => {
    const responsePromise = client.prism.objects.events.upsert('value', { slug: 'slug' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('upsert: required and optional params', async () => {
    const response = await client.prism.objects.events.upsert('value', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      slug: 'slug',
      list_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      default: { foo: 'bar' },
      list: {},
      'Idempotency-Key': 'x',
    });
  });
});
