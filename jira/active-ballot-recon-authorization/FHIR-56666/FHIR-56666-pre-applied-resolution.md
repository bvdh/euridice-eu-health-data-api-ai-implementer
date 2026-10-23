# Pre-applied Resolution for [FHIR-56666](https://jira.hl7.org/browse/FHIR-56666)

## Evidence and PR State
- Ticket analysis: [FHIR-56666-resolution.md](./FHIR-56666-resolution.md) (verified against current source and PR state on 2026-10-22)
- PR: [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) — Open; head `c0e4af73c30331136bf3df722e988cfd3cc48d38`, targeting `main`. For this proposed resolution, the PR changes are treated as applied. No PR checks were reported. The local implementation fork is two commits ahead of this PR head; the ticket-specific edits described below are present at the PR head.

## Proposed Disposition
**Persuasive with Modification**

**Rationale:** The current PR source makes the token heading and Patient Lookup link corrections and removes the stale Issue 12 citation from the Patient Summary example. However, it still uses XDS `SUMMARIES` in `DocumentReference.category` without a coding-specific explanation. The May 13 ticket comment tables that category decision pending the Category & Type Framing decision for [FHIR-56632](https://jira.hl7.org/browse/FHIR-56632). Accept the three supported corrections, but do not treat the category request or the ticket as fully resolved until that decision is applied.

## Proposed Resolution Text
This ticket is persuasive with modification. The changes in [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) change the Step 2 heading to “Obtain Access Token,” label the Step 3 link “Patient Lookup,” and remove the stale Issue 12 citation from the Patient Summary example. The link leads to the Patient Matching page, consistent with the May 13 ticket comment. The example still uses XDS `SUMMARIES` in `DocumentReference.category` without a coding-specific explanation. Defer that part of the request until the Category & Type Framing decision for [FHIR-56632](https://jira.hl7.org/browse/FHIR-56632), then update the example consistently. This proposal addresses the first three corrections only; it does not claim that the category request is implemented or that Jira has been resolved.

## Proposed Change Category
**Category:** Editorial correction (proposed descriptor; no controlled change-category value is recorded for this ticket).

**Rationale:** The changes proposed for acceptance correct the access-token label, Patient Lookup link label, and stale issue citation in an example. They do not introduce a new capability or alter the API contract. The unresolved category change is excluded from this proposed category pending the FHIR-56632 decision.

## Proposed Change Impact
**Impact:** Non-substantive (proposed; no controlled change-impact value is recorded for this ticket).

**Rationale:** The accepted edits clarify example wording and navigation only; they do not change normative requirements, API behavior, or interoperability expectations. This impact assessment does not cover any later change to `DocumentReference.category`, which remains undecided.
