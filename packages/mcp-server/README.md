# Micro TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Direct invocation

You can run the MCP Server directly via `npx`:

```sh
export MICRO_API_KEY="My API Key"
export MICRO_TEAM_ID="My Team ID"
npx -y @micro-so/mcp@latest
```

### Via MCP Client

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "micro_so_sdk_api": {
      "command": "npx",
      "args": ["-y", "@micro-so/mcp"],
      "env": {
        "MICRO_API_KEY": "My API Key",
        "MICRO_TEAM_ID": "My Team ID"
      }
    }
  }
}
```

### Cursor

If you use Cursor, you can install the MCP server by using the button below. You will need to set your environment variables
in Cursor's `mcp.json`, which can be found in Cursor Settings > Tools & MCP > New MCP Server.

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40micro-so%2Fmcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBtaWNyby1zby9tY3AiXSwiZW52Ijp7Ik1JQ1JPX0FQSV9LRVkiOiJNeSBBUEkgS2V5IiwiTUlDUk9fVEVBTV9JRCI6Ik15IFRlYW0gSUQifX0)

### VS Code

If you use MCP, you can install the MCP server by clicking the link below. You will need to set your environment variables
in VS Code's `mcp.json`, which can be found via Command Palette > MCP: Open User Configuration.

[Open VS Code](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40micro-so%2Fmcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40micro-so%2Fmcp%22%5D%2C%22env%22%3A%7B%22MICRO_API_KEY%22%3A%22My%20API%20Key%22%2C%22MICRO_TEAM_ID%22%3A%22My%20Team%20ID%22%7D%7D)

### Claude Code

If you use Claude Code, you can install the MCP server by running the command below in your terminal. You will need to set your
environment variables in Claude Code's `.claude.json`, which can be found in your home directory.

```
claude mcp add micro_so_mcp_api --env MICRO_API_KEY="My API Key" MICRO_TEAM_ID="My Team ID" -- npx -y @micro-so/mcp
```

## Code Mode

This MCP server is built on the "Code Mode" tool scheme. In this MCP Server,
your agent will write code against the TypeScript SDK, which will then be executed in an
isolated sandbox. To accomplish this, the server will expose two tools to your agent:

- The first tool is a docs search tool, which can be used to generically query for
  documentation about your API/SDK.

- The second tool is a code tool, where the agent can write code against the TypeScript SDK.
  The code will be executed in a sandbox environment without web or filesystem access. Then,
  anything the code returns or prints will be returned to the agent as the result of the
  tool call.

Using this scheme, agents are capable of performing very complex tasks deterministically
and repeatably.

## Execution and credentials

By default, code execution uses a Stainless-hosted sandbox. The MCP server sends your Micro API key and
team ID to Stainless so the sandbox can call Micro. Documentation searches also use the Stainless-hosted
search service. These defaults apply even when you start the MCP process locally with `npx`.

To keep execution and documentation search on the machine running this server, select both local modes:

```sh
npx -y @micro-so/mcp --code-execution-mode=local --docs-search-mode=local
```

Local mode still makes API requests to Micro. Code can perform writes allowed by the supplied API key;
the sandbox is an execution boundary, not a read-only permission boundary. Use an appropriately limited key.

## Running remotely

Launching the client with `--transport=http` launches the server as a remote server using Streamable HTTP transport. The `--port` setting can choose the port it will run on, and the `--socket` setting allows it to run on a Unix socket.

Authorization can be provided via the following headers:
| Header | Equivalent client option | Security scheme |
| ----------- | ------------------------ | --------------- |
| `x-api-key` | `apiKey` | apiKey |

A configuration JSON for this server might look like this, assuming the server is hosted at `http://localhost:3000`:

```json
{
  "mcpServers": {
    "micro_so_sdk_api": {
      "url": "http://localhost:3000",
      "headers": {
        "x-api-key": "My API Key"
      }
    }
  }
}
```
