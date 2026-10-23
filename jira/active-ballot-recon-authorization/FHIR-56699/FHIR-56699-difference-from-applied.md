# Difference From Applied Work for [FHIR-56699](https://jira.hl7.org/browse/FHIR-56699)

## Evidence Snapshot

- [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) is Open at head `c0e4af73c30331136bf3df722e988cfd3cc48d38`; no checks were reported.
- The specified local implementation worktree is at `61abb3938c0c8e05495ed2e27357bfa65204aa3f`, ahead of the PR head. Later local commits add an informative logging/audit page reference and clarify that technical roles do not determine GDPR party status. Those changes are not present in the current PR head.
- The local source also contains an uncommitted edit to `input/pagecontent/authorization.md` removing browser CORS guidance. It does not change the TLS requirement relevant to this ticket.
- These statements describe implementation evidence only; the Jira ticket remains Waiting for Input / Unresolved.

## Requested Work Compared With Current Source

| Ticket request | Current source / applied state | Difference remaining |
|---|---|---|
| Make IHE Consistent Time (CT) a recommendation and address the stated NTPv3 versus national NTPv4 issue. | `input/pagecontent/actors.md` identifies IHE CT as defining NTP for consistent time, but does not give its strength or discuss NTP versions. | The recommendation status and compatibility guidance are unspecified. No NTP version 3 or version 4 mention was found in the current IG source. |
| Clarify whether citing ATNA for secure transport requires the Authenticate Node [ITI-19] transaction. | `actors.md` refers to ATNA for TLS 1.2 with the BCP 195 option. `input/pagecontent/authorization.md` separately requires TLS 1.2 or later for token and protected-resource exchanges. The source diagrams `input/images-source/document-transactions-sequence.plantuml` and `input/images-source/resource-transactions-sequence.plantuml` label TLS as “ITI-19 ATNA Authenticate Node.” | The prose and diagrams do not clearly distinguish TLS as the transport requirement from whether ITI-19 is an in-scope required transaction. The diagrams and prose need reconciliation. |
| Clarify that Record Audit Event [ITI-20] is optional. | `input/pagecontent/regulatoryAnchors.md` says the referenced IHE profiles recommend but do not require ATNA grouping and places interoperable audit logging outside this IG's scope. `input/pagecontent/logging-audit-considerations.md` is informative and does not add logging conformance requirements. | Neither passage explicitly states whether ITI-20 is optional or outside the IG's requirements. |

## Overall Difference

The current source addresses parts of the ATNA concern by separating TLS security from optional ATNA grouping and by describing audit logging as out of scope or informative. However, the CT recommendation/NTP compatibility, the meaning of ITI-19 in the diagrams, and explicit ITI-20 optionality remain unresolved in the source reviewed. The local logging guidance is newer than the open PR head, but it does not close these ticket-specific gaps.

The public `/current-build/en/` pages checked for this analysis returned HTTP 404. The versioned 1.0.0-ballot pages resolve, but do not establish that the public publication reflects this local worktree.
