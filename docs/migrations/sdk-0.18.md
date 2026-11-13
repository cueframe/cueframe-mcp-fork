# Migrating to SDK 0.18

SDK 0.18 is a breaking release of `@cueframe/sdk` while the package is below 1.0.
It regenerates client types and Zod schemas from the current API projection.
The current API contract correction is proposed as 8.0.0; the CLI bundles the updated SDK
in a patch release because its commands, flags and public output are unchanged.
The CLI remains on the 0.12 installation line.

## Removed generated constants

The following named exports are no longer available from `@cueframe/sdk/zod`.
Remove these imports before upgrading. If application UI needs a page-size cap,
keep the endpoint's documented cap in application configuration instead of
importing a constant emitted by the schema generator. The service still applies
its documented endpoint-specific defaults and clamping.

| Removed export | Documented cap |
| --- | ---: |
| `getUsageQueryLimitMax` | 100 |
| `listBrandKitsQueryLimitMax` | 100 |
| `listBriefsQueryLimitMax` | 100 |
| `listCheckpointsQueryLimitMax` | 100 |
| `listMediaSuggestionsQueryLimitMax` | 100 |
| `listCatalogQueryLimitMax` | 100 |
| `listMediaQueryLimitMax` | 100 |
| `listProjectsQueryLimitMax` | 100 |
| `listProjectRendersQueryLimitMax` | 100 |
| `listSessionsQueryLimitMax` | 100 |
| `listTemplatesQueryLimitMax` | 100 |
| `listWebhooksQueryLimitMax` | 100 |

For example, an application importing `listProjectsQueryLimitMax` must replace
that import with its own project page-size configuration (the documented cap
is 100). Do not restore exports by editing generated SDK files.

## Pagination parser output types

Several generated pagination `limit` fields and their Zod parser outputs now
have type `unknown` instead of `number`. The projection describes the API's
existing tolerant query input; generated parsing does not promise a numeric
output for an arbitrary query value. Code that performs arithmetic on a parsed
limit must first validate or narrow it to a number. Prefer an application-owned
numeric input validator for a page-size control, or pass the query value to the
service and use its documented defaults and clamping. Never cast an unvalidated
value to `number` to bypass this change.

The response-side account model also includes `userId`; update locally
constructed `AccountResponse` fixtures accordingly. These changes do not add or
remove REST operations or change the scene schema and examples.

## Brand colors and streaming

Brand-kit `extraColors` entries use `{ hex, label, usage? }`. Replace accesses to
`name` and `value` with `label` and `hex`. These fields describe the values the
service already stores and returns; this release corrects the published types,
not the response writer. Checkout `interval` is optional, matching the existing
monthly default.

`streamRender` continues returning raw SSE text (`Promise<string>`).
Use `iterRenderEvents` to consume parsed `progress`, `complete` and `error`
events as they arrive. The public contract describes those parsed events; the
fetch generator projects `text/event-stream` back to its raw text transport
through `tools/sdk-wire-spec.mjs`. Neither helper changes the server framing.

The associated API-contract release is now proposed as **8.0.0** for the
current-main projection, replacing the older graph’s 7.0.3 proposal. See
[API contract 8 migration](api-contract-8.md) for the exact source and release
prerequisites. No client pin should move before the corresponding registry
versions are actually published.
