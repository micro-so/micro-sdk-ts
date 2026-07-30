# Micro TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

The MCP server is not yet published to npm or available as a hosted endpoint. To run it today, clone and build this repository locally.

```sh
git clone https://github.com/micro-so/micro-sdk-ts.git
cd micro-sdk-ts
pnpm install
pnpm build
pnpm --filter @micro-so/mcp build
```

### Direct invocation

Set your Micro credentials, then start the built server:

```sh
export MICRO_API_KEY="My API Key"
export MICRO_TEAM_ID="My Team ID"
node "$(pwd)/packages/mcp-server/dist/index.js"
```

### Via MCP Client

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, configure it to run the locally built server. Replace `/absolute/path/to/micro-sdk-ts` below with the path to your clone.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "micro_so_sdk_api": {
      "command": "node",
      "args": ["/absolute/path/to/micro-sdk-ts/packages/mcp-server/dist/index.js"],
      "env": {
        "MICRO_API_KEY": "My API Key",
        "MICRO_TEAM_ID": "My Team ID"
      }
    }
  }
}
```

### Cursor

In Cursor Settings > Tools & MCP > New MCP Server, add this to `mcp.json`:

```json
{
  "mcpServers": {
    "micro_so_sdk_api": {
      "command": "node",
      "args": ["/absolute/path/to/micro-sdk-ts/packages/mcp-server/dist/index.js"],
      "env": {
        "MICRO_API_KEY": "My API Key",
        "MICRO_TEAM_ID": "My Team ID"
      }
    }
  }
}
```

### VS Code

In VS Code, open the Command Palette, choose **MCP: Open User Configuration**, and add:

```json
{
  "servers": {
    "micro_so_sdk_api": {
      "command": "node",
      "args": ["/absolute/path/to/micro-sdk-ts/packages/mcp-server/dist/index.js"],
      "env": {
        "MICRO_API_KEY": "My API Key",
        "MICRO_TEAM_ID": "My Team ID"
      }
    }
  }
}
```

### Claude Code

Run the following command from any directory, replacing the path with the path to your clone:

```sh
claude mcp add micro_so_mcp_api \
  --env MICRO_API_KEY="My API Key" \
  --env MICRO_TEAM_ID="My Team ID" \
  -- node /absolute/path/to/micro-sdk-ts/packages/mcp-server/dist/index.js
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
