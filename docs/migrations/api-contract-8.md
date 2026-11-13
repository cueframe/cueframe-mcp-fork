# API contract 8 migration proposal

Contract **8.0.0**, SDK **0.18.0** and CLI **0.12.2** are proposed together through
Changesets. The API-contract major records incompatible published schema
changes; the SDK minor follows the repository’s rule for breaking changes below
1.0. CLI commands, flags and output stay on the 0.12 line, so its bundled SDK
refresh is a patch. This proposal does not authorize a release.

## Source and consumer impact

The source is private integration `afaf99728203a0f765e8b0f356385d86cd0a5efb`,
which retains accepted private PR197 and main `ccd3894d` (PR198). Its projection
is `71ede0e104db3703eab89b58a5047289080baa0bf8513783840ed856ad828930`.
The generator verifies the installed kernel against its recorded archive.
The earlier accepted toolkit PR74/7.0.3 preview retains its own source and
projection; its acceptance does not apply to this newer graph.

Published contract 7.0.2 projects `5fa6321b…`; downloaded SDK 0.17.2 declares
brand colors as `{ name, value }`. Existing storage and the unchanged HTTP
projection already use `{ hex, label, usage? }`. PR198 corrects the response
metadata to match those values. Consumers compiling against the old generated
properties must migrate even though the service writer is unchanged.

The render response remains `text/event-stream`, with `event:` and JSON `data:`
lines separated by a blank line. PR198 adds parsed-event schema metadata for
`progress`, `complete` and `error`; it does not replace the SSE response writer.
Code generators must distinguish that parsed-event model from the raw HTTP
body. The SDK fetch generator projects SSE responses to text, matching its
existing mutator. `streamRender` stays `Promise<string>`; `iterRenderEvents`
remains the parsed-event interface. No runtime alias or response rewrite is
introduced to make the schema comparison pass.

Other consumer changes from PR74 remain documented in the SDK 0.18 guide:
removed generated query-limit constants, unknown query-parser outputs and the
account model’s `userId`. The current projection also makes checkout `interval`
optional, matching the existing monthly default.

## Required release sequence

1. Independently review the retained private integration and this toolkit
   delta, including the major contract Changesets classification. Integrate
   through the existing PR197/PR74 source owners and holds; do not open duplicate
   schema-repair PRs or merge the historical preview as this release.
2. Resolve the existing live-drift release gate through the release owner’s
   normal reviewed procedure. Against the current live document it reports
   nine errors: eight removed required brand-color response properties and one
   SSE schema change. A major changeset does **not** suppress those findings.
   This proposal changes no baseline, severity, ignore rule or CI condition.
   It is not ready to merge/publish while required gates remain unresolved.
3. The normal workflow generates its Version packages PR. Verify it produces
   contract 8.0.0, SDK 0.18.0 and CLI 0.12.2 and restamps the manifest without
   changing the source hash. Founder-held source/version merges and publication
   retain their existing authority. No package identity is edited by hand.
4. After successful publication and registry availability, move the private
   API-contract override and catalog to 8.0.0, SDK override and catalog to
   0.18.0, and `API_CONTRACT_VERSION` to 8.0.0. Generate the actual registry-backed
   lockfile with pnpm; never fabricate integrity metadata or consume a new local
   archive. Keep the installed public source graph and unrelated packages fixed.
5. Verify frozen install, advertised version, source ancestry, installed-byte
   lockstep, pin audit and maintained startup. Existing unrelated pin-audit
   failures remain explicit failures, not waived prerequisites. Penelope then
   exercises both PR215/216 backend journeys on the official Multica environment.

Source fixtures and generated/client checks qualify this proposal only.
Installed compatibility, service startup, release and both real journeys
remain outstanding until their actual receipts exist.
