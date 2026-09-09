// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Micro from '@micro-so/sdk';

const client = new Micro({
  apiKey: 'My API Key',
  teamID: 'My Team ID',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource views', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.views.create('comment', { name: 'name', view_type: 'view_type' });
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
    const response = await client.views.create('comment', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      name: 'name',
      view_type: 'view_type',
      id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      aggregation_prop_def_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      aggregation_type: 'aggregation_type',
      column_layout: { foo: 'bar' },
      combinator: 'AND',
      created_at: 'created_at',
      filter: [{ foo: 'bar' }],
      group_by: 'group_by',
      group_hidden_option_ids: [{}],
      group_hide_empty: true,
      group_sort: 'group_sort',
      icon: 'icon',
      list_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      select: ['string'],
      sort: [{ foo: 'bar' }],
      sort_order: 0,
      team_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      updated_at: 'updated_at',
      user_id: 'user_id',
      'Idempotency-Key': 'x',
    });
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.views.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      objectType: 'comment',
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
  test.skip('update: required and optional params', async () => {
    const response = await client.views.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      objectType: 'comment',
      aggregation_prop_def_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      aggregation_type: 'aggregation_type',
      column_layout: { foo: 'bar' },
      combinator: 'AND',
      filter: [{ foo: 'bar' }],
      group_by: 'group_by',
      group_hidden_option_ids: [{}],
      group_hide_empty: true,
      group_sort: 'group_sort',
      icon: 'icon',
      list_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      name: 'name',
      select: ['string'],
      sort: [{ foo: 'bar' }],
      sort_order: 0,
      team_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      user_id: 'user_id',
      view_type: 'view_type',
      'Idempotency-Key': 'x',
    });
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.views.list('comment');
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
    const response = await client.views.list('comment', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      cursor: 'cursor',
      limit: 0,
      list_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      page: 1,
    });
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.views.list(
        'comment',
        {
          teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          cursor: 'cursor',
          limit: 0,
          list_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          page: 1,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Micro.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.views.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      objectType: 'comment',
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
  test.skip('delete: required and optional params', async () => {
    const response = await client.views.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      objectType: 'comment',
    });
  });

  // Mock server tests are disabled
  test.skip('get: only required params', async () => {
    const responsePromise = client.views.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      objectType: 'comment',
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
  test.skip('get: required and optional params', async () => {
    const response = await client.views.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      objectType: 'comment',
      cursor: 'cursor',
      include: 'records',
      limit: 0,
      page: 1,
    });
  });
});
