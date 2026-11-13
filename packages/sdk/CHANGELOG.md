# @cueframe/sdk

## 0.18.0-mcf28-local20261113.0

### Minor Changes

- 651f987: Align the generated API contract and client types with the current account, pagination and response schemas. The SDK removes generated query-limit constants and exposes unknown pagination parser outputs; brand-color response types now match existing hex/label/usage values. The API contract makes those published schema corrections in a major version while preserving the existing HTTP and SSE wire behavior. See the SDK 0.18 migration guide.

## 0.17.2

### Patch Changes

- 7c78ca9: Refresh compatible CLI dependencies and SDK generation, and correct hosted skill guidance to use the served tool catalog.
