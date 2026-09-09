// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Micro from '@micro-so/sdk';

const client = new Micro({
  apiKey: 'My API Key',
  teamID: 'My Team ID',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource options', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.prism.properties.options.create('2fdcD1Dc-bbDb-2BBD-0Afa-1A3C33cFaADc', {
      objectType: 'comment',
      type: 'num',
      value: 'value',
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
  test.skip('create: required and optional params', async () => {
    const response = await client.prism.properties.options.create('2fdcD1Dc-bbDb-2BBD-0Afa-1A3C33cFaADc', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      objectType: 'comment',
      type: 'num',
      value: 'value',
      color_scheme: 'color_scheme',
      description: 'description',
      icon: 'icon',
      list_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      option_group: 'option_group',
      slug: 'slug',
      sort_index: 0,
      'Idempotency-Key': 'x',
    });
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.prism.properties.options.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      objectType: 'comment',
      propertyId: '2fdcD1Dc-bbDb-2BBD-0Afa-1A3C33cFaADc',
      type: 'num',
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
    const response = await client.prism.properties.options.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      objectType: 'comment',
      propertyId: '2fdcD1Dc-bbDb-2BBD-0Afa-1A3C33cFaADc',
      type: 'num',
      color_scheme: 'color_scheme',
      description: 'description',
      enabled: true,
      icon: 'icon',
      list_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      option_group: 'option_group',
      slug: 'slug',
      sort_index: 0,
      value: 'value',
      'Idempotency-Key': 'x',
    });
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.prism.properties.options.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      objectType: 'comment',
      propertyId: '2fdcD1Dc-bbDb-2BBD-0Afa-1A3C33cFaADc',
      type: 'num',
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
    const response = await client.prism.properties.options.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      objectType: 'comment',
      propertyId: '2fdcD1Dc-bbDb-2BBD-0Afa-1A3C33cFaADc',
      type: 'num',
      list_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });
});
