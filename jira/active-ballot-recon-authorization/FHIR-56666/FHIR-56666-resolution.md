# Proposed Resolution for [FHIR-56666](https://jira.hl7.org/browse/FHIR-56666)

## Ticket Summary
| Field | Value |
|-------|-------|
| Key | [FHIR-56666](https://jira.hl7.org/browse/FHIR-56666) |
| Issue Type | Technical Correction |
| Status | Triaged |
| Resolution | Unresolved |
| Reporter | JoshPriebe (ticket metadata); Aaron Mahr and Isaac Vetter (description) |
| Assignee | Unassigned |
| Created | 2026-04-29 |
| Grouping | euapi-blockvote1-editorial (per May 11 comment) |

## Description
The ticket requests four corrections to the worked Patient Summary example:

1. Rename the Step 2 heading from "Obtain Authorization Token" to "Obtain Access Token."
2. Correct the Step 3 "Patient Match" link, either by changing its label or linking to a `$match` example.
3. Verify the "Issue 12" reference and reconcile it with the open-issues list.
4. Explain the XDS `classCode` used in `DocumentReference.category`, or remove that category from the example.

## Implementation Status
The specified implementation fork is on branch `eu-health-data-api-ballot-recon-auth`. The local fork HEAD is `1638e75b81a8c43126ab44eb2f3bba92b15190b2`; the current head of [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) is `c0e4af73c30331136bf3df722e988cfd3cc48d38`. The local fork is two commits ahead of the PR head. The ticket-specific example edits described below are present at the PR head; the unpushed local commits do not change those edits.

The current example source at the PR head:

- Uses the heading "Step 2: Obtain Access Token."
- Labels the Step 3 link "Patient Lookup" and links to the Patient Matching page, consistent with the May 13 ticket comment.
- Contains no stale "Issue 12" citation in the Patient Summary example. The open-issues page identifies Issue 12 as "MADO Dual-Encoding for Imaging Manifests" and links to GitHub issue 50; it is not an identifier for the Patient Summary example.
- Still includes XDS `SUMMARIES` in `DocumentReference.category` without a coding-specific explanation.

The current PR state was checked with `gh` on 2026-10-22: PR #99 is **Open**, targeting `main`, and has not merged or closed. No PR checks were reported. The local source report also describes the ticket as partially addressed and records the category framing as undecided pending [FHIR-56632](https://jira.hl7.org/browse/FHIR-56632). The ticket remains formally Triaged / Unresolved; source changes and an open PR do not resolve the Jira issue.

**Current disposition state:** Pending. The first three requested corrections are present in the PR source, but the category request remains undecided and the Jira ticket is unresolved.

## Related Tickets
- [FHIR-56387](https://jira.hl7.org/browse/FHIR-56387) — cited in the May 13 comment as the related Patient Lookup page rename.
- [FHIR-56632](https://jira.hl7.org/browse/FHIR-56632) — category framing decision that the May 13 comment says should guide the `DocumentReference.category` example.

## Current Build References
- [Retrieve a European Patient Summary](https://hl7.eu/fhir/health-data-api/current-build/en/example-patient-summary.html) — contains the Step 2/3 labels, Patient Lookup link, and illustrative `DocumentReference` JSON.
- [Patient Matching](https://hl7.eu/fhir/health-data-api/current-build/en/patient-match.html) — target of the revised Patient Lookup link.
- [Open Issues](https://hl7.eu/fhir/health-data-api/current-build/en/open-issues.html) — lists Issue 12 as the MADO dual-encoding issue linked to GitHub issue 50.

## Disposition Analysis
The request is supported for the access-token terminology and the Patient Lookup link: the current PR source uses those labels, and the May 13 comment explicitly proposes them. The example no longer cites Issue 12, while the open-issues source shows that Issue 12 is a separate MADO issue; the stale citation is therefore absent from the example. The final category request cannot yet be treated as implemented or decided: the example still uses XDS `SUMMARIES`, and the May 13 comment tables the issue pending the Category & Type Framing decision for FHIR-56632. The earlier May 11 proposal to remove the category does not establish that this option was adopted.

## Proposed Dispositions
### Disposition A: Accept As Requested
#### Proposal
Accept all four corrections and remove `DocumentReference.category` from the example.
#### Justification
This would eliminate the unexplained coding and accept the three editorial corrections already reflected in source. Removal is one of the remedies in the ticket, but selecting it before the category-framing decision would be premature.

### Disposition B: Alternative Approach
#### Proposal
Accept the corrected access-token heading, Patient Lookup label/link, and removal of the stale issue citation. Defer the `DocumentReference.category` treatment until the Category & Type Framing decision for FHIR-56632, then update this example consistently by either explaining the XDS coding or removing it.
#### Justification
This matches the current source and the May 13 comment while avoiding a premature decision on the one unresolved request element. It acknowledges the useful corrections without implying that the remaining category issue has been addressed.

### Disposition C: Decline
#### Proposal
Decline the requested corrections and retain the current example, including its existing heading, Patient Lookup link, and XDS `SUMMARIES` category.
#### Justification
The category may be illustrative and the ticket is editorial, but this would leave the identified terminology/link concerns and unexplained coding in place. It is less clear than accepting the supported editorial corrections and separately deciding the category.

### Recommendation
**Recommended disposition:** B

Recommend the alternative approach, corresponding to **Persuasive with Modification** in the workgroup disposition vocabulary. Accept the three corrections present in the current PR source, but leave the category point open until FHIR-56632 determines its framing. Do not represent the ticket as fully addressed or resolved until that remaining decision is made and the Jira record is updated through the normal process.

## Next Steps
- Confirm the Category & Type Framing decision for FHIR-56632 and apply it to the Patient Summary example.
- After the category treatment is settled, confirm the final disposition with the workgroup and update the Jira ticket through the normal process.

## Verification Checklist
- [x] Ticket description, metadata, and comments reviewed
- [x] Implementation source compared with the current PR head
- [x] Current PR state and head verified with `gh`
- [x] Current build references included for impacted/relevant pages
- [x] Dispositions are specific and distinguishable
- [x] Recommendation is justified and delimits the unresolved category request
