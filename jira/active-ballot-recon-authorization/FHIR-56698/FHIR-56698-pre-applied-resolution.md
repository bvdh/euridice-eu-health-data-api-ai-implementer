# Pre-applied Resolution for [FHIR-56698](https://jira.hl7.org/browse/FHIR-56698)

## Evidence and PR State
- Ticket analysis: [FHIR-56698-resolution.md](./FHIR-56698-resolution.md) (verified against current source and PR state on 2026-10-22)
- PR: [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) — **Open**; GitHub reports head `c0e4af73c30331136bf3df722e988cfd3cc48d38`, targeting `main`. For this proposed resolution, the PR changes are treated as applied. The local authorization source matches the PR-head file version; the ticket record does not link the PR.

## Proposed Disposition
**Persuasive with Modification**

**Rationale:** The current branch clarifies the rationale and limits for using SMART Backend Services and IHE IUA, including their per-endpoint selection and distinct scope models. This addresses the request for clearer authorization guidance, but does not adopt the suggested general OAuth-reference-only approach or replace SMART resource scopes with a universal national regulatory grouping. The disposition therefore accepts the clarification with that modification and boundary. The Jira record remains Waiting for Input / Unresolved; this is a proposal, not a claim of formal acceptance.

## Proposed Resolution Text
The ticket is addressed with modification by clarifying when the EU Health Data API recommends IHE IUA for preconfigured national system-to-system endpoints, when SMART Backend Services may be used, and how these profiles and their scopes are selected for each endpoint. Interactive Wellness Application access continues to use SMART App Launch. IUA MHD transaction scopes apply only to the relevant supported transactions and grouped actors, while SMART endpoints use the applicable SMART FHIR resource scopes. These changes are in [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99). The ticket's suggested replacement with generic OAuth references and a general national coarse-grained scope vocabulary is not adopted by this change; such a model would require separate definition and workgroup agreement.

## Proposed Change Category
**Category:** Authorization guidance clarification (proposed descriptive category; the local ticket record does not provide a controlled category value).

**Rationale:** The source clarifies the selection and applicability of existing SMART and IUA profiles and separates their scope models. It does not introduce a new authorization protocol or define a replacement national scope vocabulary.

## Proposed Change Impact
**Impact:** Clarifies authorization-profile selection and scope applicability; does not replace SMART resource scopes with national regulatory groupings (proposed descriptive impact; the local ticket record does not provide a controlled impact value).

**Rationale:** Implementers receive clearer guidance about which authorization profile applies to an endpoint and when IUA transaction scopes or SMART FHIR resource scopes are relevant. The existing protocol-specific scope semantics remain, so the ticket's broader scope-granularity concern is not resolved by this change.
