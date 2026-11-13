# @cueframe/api-contract

## 8.0.0-mcf28-local20261113.0

### Major Changes

- 651f987: Align the generated API contract and client types with the current account, pagination and response schemas. The SDK removes generated query-limit constants and exposes unknown pagination parser outputs; brand-color response types now match existing hex/label/usage values. The API contract makes those published schema corrections in a major version while preserving the existing HTTP and SSE wire behavior. See the SDK 0.18 migration guide.
