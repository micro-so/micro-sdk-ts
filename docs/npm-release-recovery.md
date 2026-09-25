# Recovering a partial npm release

The SDK and MCP package publish independently. A green SDK job does not mean the MCP package is available.
The workflow verifies the exact public version in a temporary clean project after each publish. It exercises an SDK
fixture query or initializes the MCP server and lists its tools. It does not make authenticated Micro API calls.

## First MCP publication

The August 23 MCP release failed with `ENEEDAUTH`; the workflow already requests an OIDC token and uses npm 11.6.2.
An npm package owner must check the npm-side setup before retrying:

1. If `@micro-so/mcp` does not exist, bootstrap its first public version using an authorized npm account with
   publication access to the `micro-so` organization. Build from the intended release commit, then publish the
   built `packages/mcp-server/dist` package. Do not publish the source directory.
2. Configure its npm trusted publisher for GitHub Actions: organization `micro-so`, repository `micro-sdk-ts`,
   workflow `publish-npm.yml`. Check any configured environment matches the workflow. Configure SDK and MCP separately.
3. Run **Publish NPM** manually with `packages/mcp-server` to recover only a missing MCP release. Do not republish
   an existing version: npm versions are immutable. If bootstrap already published that exact version, run the
   verifier directly instead.
4. Verify the registry artifact with `node scripts/verify-published-package.mjs @micro-so/mcp VERSION`.

Do not add a long-lived npm token to the repository or logs. Missing npm organization permissions or trusted-publisher
configuration require an npm owner; a GitHub workflow edit cannot grant them. Before announcing MCP availability,
also run a real fixture read in an authorized disposable workspace with the documented credentials.

See [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/) and
[scoped public packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages/) for owner setup.
