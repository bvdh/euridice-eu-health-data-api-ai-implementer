# Pre-applied Resolution for [FHIR-56386](https://jira.hl7.org/browse/FHIR-56386)

## Evidence and PR State
- Ticket analysis: [FHIR-56386-resolution.md](./FHIR-56386-resolution.md) (refreshed and quality-checked against current source and PR state on 2026-10-22)
- Implementation source: `eu-health-data-api-ballot-recon-auth` at [commit `1638e75`](https://github.com/euridice-org/eu-health-data-api/commit/1638e75b81a8c43126ab44eb2f3bba92b15190b2); the HPAS authorization text identifies SMART and IUA roles according to environment and API boundary.
- PR: [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) — Open at head `c0e4af73c30331136bf3df722e988cfd3cc48d38` when checked on 2026-10-22. For this proposed resolution, the PR-contained changes are treated as applied. The local branch is two commits ahead; the latest HPAS-flow clarification remains a local-only change outside the PR head.

## Proposed Disposition
**Persuasive**

**Rationale:** The ticket asks for IHE IUA to be included alongside SMART in the HPAS authorization flow. The current local source addresses that request by supporting both protocols, selected according to the EHR system's deployment environment and the applicable API boundary: SMART for the relevant Healthcare Provider flows and IUA for qualifying National Interoperability Infrastructure endpoints. It does not imply that both protocols apply to every environment or that one endpoint must conform to both. The latest HPAS clarification is a local-only change outside PR #99 and is not attributed to that PR.

## Proposed Resolution Text
This ticket is addressed by supporting both SMART and IHE IUA, with the applicable protocol selected according to the environment where the EHR system is deployed and the specific EHR-facing API boundary. The current implementation branch describes SMART App Launch for applicable interactive Healthcare Provider flows, SMART Backend Services for qualifying pre-authorized server-to-server flows, and IHE IUA roles for qualifying National Interoperability Infrastructure endpoints. This environment-specific approach does not require IUA in every deployment or require SMART and IUA together on one endpoint. The clarification is present in the current local source at [commit `1638e75`](https://github.com/euridice-org/eu-health-data-api/commit/1638e75b81a8c43126ab44eb2f3bba92b15190b2) and is a local-only change outside [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99). The ticket remains Waiting for Input / Unresolved pending workgroup disposition.

## Proposed Change Category
**Category:** Clarification (proposed; the ticket record does not specify a category)

**Rationale:** The source makes the relationship between SMART and IUA roles explicit for the relevant HPAS environments and API boundaries without replacing the selected profiles or introducing a universal requirement. Clarification is an established local category.

## Proposed Change Impact
**Impact:** Non-substantive (proposed; the ticket record does not specify an impact)

**Rationale:** The clarification improves discoverability and makes existing environment-specific protocol selection explicit, but does not add a new normative protocol obligation or require dual conformance on an endpoint. Non-substantive is consistent with the local vocabulary for clarifications that do not change conformance.
