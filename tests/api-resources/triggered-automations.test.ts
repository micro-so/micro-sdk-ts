// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Micro from '@micro-so/sdk';

const client = new Micro({
  apiKey: 'My API Key',
  teamID: 'My Team ID',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource triggeredAutomations', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.triggeredAutomations.create('message', { kind: 'update', name: 'name' });
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
    const response = await client.triggeredAutomations.create('message', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      kind: 'update',
      name: 'name',
      id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      actions: [
        {
          type: 'agent',
          agent_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          cron_expression: 'cron_expression',
          delay_seconds: 0,
          recipient_email_prop_def_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          recipient_provider_prop_def_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          recipient_view_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          recipient_view_object_type: 'recipient_view_object_type',
          send_as_user_id: 'send_as_user_id',
          subject: 'subject',
          template_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          timezone: 'timezone',
          webhook_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        },
      ],
      changeset: { combinator: 'AND', filter: [{ foo: 'bar' }] },
      created_at: 'created_at',
      enabled: true,
      list_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      on_create: true,
      on_delete: true,
      state: { combinator: 'AND', filter: [{ foo: 'bar' }] },
      team_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      updated_at: 'updated_at',
      user_id: 'user_id',
      'Idempotency-Key': 'x',
    });
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.triggeredAutomations.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      automationObjectType: 'message',
      kind: 'update',
      name: 'name',
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
    const response = await client.triggeredAutomations.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      automationObjectType: 'message',
      kind: 'update',
      name: 'name',
      id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      actions: [
        {
          type: 'agent',
          agent_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          cron_expression: 'cron_expression',
          delay_seconds: 0,
          recipient_email_prop_def_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          recipient_provider_prop_def_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          recipient_view_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          recipient_view_object_type: 'recipient_view_object_type',
          send_as_user_id: 'send_as_user_id',
          subject: 'subject',
          template_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          timezone: 'timezone',
          webhook_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        },
      ],
      changeset: { combinator: 'AND', filter: [{ foo: 'bar' }] },
      created_at: 'created_at',
      enabled: true,
      list_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      on_create: true,
      on_delete: true,
      state: { combinator: 'AND', filter: [{ foo: 'bar' }] },
      team_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      updated_at: 'updated_at',
      user_id: 'user_id',
    });
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.triggeredAutomations.list('message');
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
    const response = await client.triggeredAutomations.list('message', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      cursor: 'cursor',
      kind: 'update',
      limit: 0,
      list_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      page: 1,
    });
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.triggeredAutomations.list(
        'message',
        {
          teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          cursor: 'cursor',
          kind: 'update',
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
    const responsePromise = client.triggeredAutomations.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      automationObjectType: 'message',
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
    const response = await client.triggeredAutomations.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      automationObjectType: 'message',
    });
  });

  // Mock server tests are disabled
  test.skip('get: only required params', async () => {
    const responsePromise = client.triggeredAutomations.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      automationObjectType: 'message',
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
    const response = await client.triggeredAutomations.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      teamId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      automationObjectType: 'message',
    });
  });
});
