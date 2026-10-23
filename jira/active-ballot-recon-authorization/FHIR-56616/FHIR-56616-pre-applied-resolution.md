# Pre-applied Resolution for [FHIR-56616](https://jira.hl7.org/browse/FHIR-56616)

## Evidence and PR State
- Ticket analysis: [FHIR-56616-resolution.md](./FHIR-56616-resolution.md) (refreshed against local source and live PR state on 2026-10-22; quality gate: PASS-WITH-NOTES).
- PR: [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) — Open, not merged; head `c0e4af73c30331136bf3df722e988cfd3cc48d38`. The current authorization-fork HEAD is `06f63608d7f01f5e96dc33835308f0567755f24b`; local commit `06f6360` removes the CORS requirements but is not included in the live PR head. `gh pr checks` reported no checks. The ticket and PR do not directly link to one another.
- Jira status in the local ticket record: Waiting for Input / Unresolved.

## Proposed Disposition
**Persuasive with Modification**

**Rationale:** The concern about adding requirements to an actor named as the IHE IUA Authorization Client is addressed by removing the IG-authored browser CORS requirement rather than creating a new actor solely to carry it. Current source keeps the protocol-neutral Health Data API Authorization Client distinct from the IHE IUA Authorization Client and assigns SMART Backend Services to a separate role and flow. The remaining IUA/MHD transaction-scope guidance is conditional on supported MHD transactions and corresponding IUA actor groupings. This modifies the requested remedy: no additional IUA-derived actor is proposed because the source no longer identifies a remaining extra actor-level CORS obligation. If the workgroup identifies a different concrete actor-level obligation beyond applicable IUA and integration requirements, that obligation should be assessed separately.

## Proposed Resolution Text
The concern is persuasive with modification. Remove the IG-authored browser CORS requirement and related CORS-specific CapabilityStatement descriptions and example declaration rather than defining a new IUA-derived actor solely to carry that requirement. Retain the protocol-neutral Health Data API Authorization Client separately from the IHE IUA Authorization Client and SMART roles. Keep MHD transaction-scope guidance conditional on supported ITI-65 through ITI-68 transactions whose MHD actors are grouped with IUA; this integration-specific scope guidance does not by itself redefine the IHE IUA Authorization Client. No separate browser-IUA actor is required for the removed CORS requirement. If another specific requirement is identified as exceeding the standard IUA Authorization Client role at the actor level, assess its conformance scope before deciding whether a distinct actor is needed.

## Proposed Change Category
**Category:** Clarification (proposed descriptive category; the local ticket record does not provide a controlled Change Category value).

**Rationale:** The change clarifies the boundary between the protocol-neutral client role, the standard IHE IUA Authorization Client, and conditional IUA/MHD integration. It also removes an IG-authored browser CORS requirement that created uncertainty about whether extra actor conformance was intended.

## Proposed Change Impact
**Impact:** Substantive conformance-scope clarification (proposed descriptive impact; the local ticket record does not provide a controlled Change Impact value).

**Rationale:** Removing a normative CORS requirement changes the published set of IG obligations for browser-IUA deployments. The change does not redefine the IHE IUA actor or remove the conditional MHD transaction-scope integration guidance.
