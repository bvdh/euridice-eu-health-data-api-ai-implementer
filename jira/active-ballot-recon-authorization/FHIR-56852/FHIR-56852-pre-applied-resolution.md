# Pre-applied Resolution for [FHIR-56852](https://jira.hl7.org/browse/FHIR-56852)

## Evidence and PR State
- Ticket analysis: [FHIR-56852-resolution.md](./FHIR-56852-resolution.md) (verified against current source and PR state on 2026-10-22; quality gate: PASS-WITH-NOTES)
- PR: [euridice-org/eu-health-data-api#99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) — Open; targets `main`, head `c0e4af73c30331136bf3df722e988cfd3cc48d38`; `mergeStateStatus` is `DIRTY`. For this proposed resolution, the PR changes are treated as applied. It includes the Authorization, Functional, and relevant CapabilityStatement sources. The local ticket-relevant source matches that PR head; the ticket itself does not cite this branch-level PR.

## Proposed Disposition
**Persuasive with Modification**

**Rationale:** The concern about requiring SMART Backend Services for every transaction is addressed by requiring authorization for all transactions while selecting SMART or IHE IUA, with the applicable flow, according to the environment and use case. Backend Services therefore is not a universal requirement; it applies to the pre-authorized system-to-system mode. This preserves authorization requirements and avoids adopting an unrestricted alternative-framework provision not present in the current IG.

## Proposed Resolution Text
This ticket is addressed by the authorization approach in [euridice-org/eu-health-data-api#99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99). The IG requires authorization for all transactions and specifies SMART or IHE IUA, as selected for the environment and use case, with the applicable flow. SMART Backend Services applies to pre-authorized system-to-system use; it is not required for every transaction. Requirements of the selected authorization specification remain applicable. This addresses the concern with the blanket SMART Backend Services requirement without adding unrestricted authorization mechanisms. The Jira ticket's Waiting for Input / Unresolved status is unchanged by this proposal.

## Proposed Change Category
**Category:** Technical correction (proposed; consistent with the ticket's Issue Type, but the controlled Change Category value is not available in the local ticket record).

**Rationale:** The change corrects the scope of the blanket Backend Services requirement by tying applicable authorization behavior to the selected environment and flow. It does not remove authorization.

## Proposed Change Impact
**Impact:** Authorization conformance-scope clarification (proposed descriptive value; the controlled Change Impact vocabulary is not available in the local ticket record).

**Rationale:** Implementations use the authorization profile and flow applicable to their environment and use case, rather than supporting Backend Services for every transaction. Existing requirements within the selected specification remain in force; no additional authorization framework is introduced.
