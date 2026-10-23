# Pre-applied Resolution for [FHIR-56838](https://jira.hl7.org/browse/FHIR-56838)

## Evidence and PR State
- Ticket analysis: [FHIR-56838-resolution.md](./FHIR-56838-resolution.md) (verified against current source and PR state on 2026-10-22)
- PR: [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) — Open; targets `main` and has head `c0e4af73c30331136bf3df722e988cfd3cc48d38`. For this proposed resolution, the PR changes are treated as applied. It includes `input/pagecontent/authorization.md`; the corresponding Authorization source in the specified local worktree matches that PR head. The ticket snapshot remains Waiting for Input / Unresolved.

## Proposed Disposition
**Persuasive with Modification**

**Rationale:** The current Authorization source responds to the terminology concern by naming SMART and IUA separately, selecting profiles by environment and flow, and distinguishing recommendations from some specific requirements. It also cites EHDS provisions and describes conditional eIDAS-recognized identification. However, IUA remains an active option rather than only a reference framework; the page does not authorize any unspecified alternative framework, and some SHOULD/SHALL wording remains inconsistent. The eIDAS/Wallet discussion is scoped rather than a universal duty. A modified disposition recognizes the clarification and regulatory context in PR #99 without treating the entire request as implemented or accepted.

## Proposed Resolution Text
This ticket is persuasive with modification. The changes in [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) revise the Authorization page to identify SMART App Launch and IHE IUA separately and select their use by environment and flow. The page cites relevant EHDS provisions and describes eIDAS-recognized electronic identification as a conditional requirement where applicable, without imposing a universal Wallet integration or assurance level. The resolution does not treat IUA as merely background, establish SMART as the globally preferred mechanism, or permit unspecified alternative authorization frameworks. The source still contains recommendation/obligation strength inconsistencies, including different SHOULD/RECOMMENDED and SHALL formulations for interactive SMART access, which should be reconciled before claiming full resolution. This proposal does not update the Jira status.

## Proposed Change Category
**Category:** Clarification

**Rationale:** The proposed category is Clarification, an established category in the local ticket artifacts. The page explains how the selected SMART and IUA profiles, environment-specific flows, and EHDS/eIDAS context relate without replacing authorization with a new framework.

## Proposed Change Impact
**Impact:** Compatible, substantive

**Rationale:** The source retains the SMART and IUA profile model and does not introduce a conflicting protocol, while clarifying which flows apply and including conditional requirements. Those choices can affect implementation and conformance, so the impact is substantive rather than editorial only.
