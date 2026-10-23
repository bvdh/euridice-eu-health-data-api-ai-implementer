# Proposed Resolution for [FHIR-56581](https://jira.hl7.org/browse/FHIR-56581)

## Ticket Summary
| Field | Value |
|-------|-------|
| Key | [FHIR-56581](https://jira.hl7.org/browse/FHIR-56581) |
| Issue Type | Change Request |
| Status | Waiting for Input |
| Resolution | Unresolved |
| Reporter | [Reinhard Egelkraut](https://jira.hl7.org/secure/ViewProfile.jspa?name=Egelkraut) |
| Assignee | [Bas van den Heuvel](https://jira.hl7.org/secure/ViewProfile.jspa?name=bvdh) |
| Created | 2026-04-28 |
| Priority | Medium |
| Grouping | Not provided in the ticket record |
| Related Section | Authorization |
| Related URL | [Authorization, 1.0.0-ballot](https://hl7.eu/fhir/health-data-api/1.0.0-ballot/en/authorization.html#iua-and-smart-backend-services) |

## Description
Chapter 3.2.8, “IUA and SMART Backend Services,” states that where IUA and SMART Backend Services requirements differ, the IG follows SMART, and then gives one example. The requester asks that all differences relevant to this IG be added.

## Implementation Status
**Pending (Jira status and ticket-specific attribution).** The local ticket record remains Waiting for Input and Unresolved and contains no comments, PR links, or commit references. PR #99 is an open, authorization-focused umbrella PR, but its description does not identify FHIR-56581. The authorization source on the specified branch contains a substantially expanded comparison. This verifies branch content, not that the work was formally accepted or applied specifically in response to this ticket.

## Related Tickets
No related ticket keys are listed in the local ticket record. No Jira comments are included in the available local ticket record.

## Current Build References
- [Authorization, current CI build](https://build.fhir.org/ig/euridice-org/eu-health-data-api/en/authorization.html) — relevant page; inspected build content is older and does not reflect the current PR branch, so it is context only, not the implementation baseline.
- [Authorization, 1.0.0-ballot section](https://hl7.eu/fhir/health-data-api/1.0.0-ballot/en/authorization.html#iua-and-smart-backend-services) — the ticket's cited section and original reported content.

## Current Source Baseline
- Inspected source: [authorization.md](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md), on branch `eu-health-data-api-ballot-recon-auth`.
- The source file is unchanged from PR #99 head `c0e4af73c30331136bf3df722e988cfd3cc48d38` (2026-10-21); its latest affecting commit is that merge commit. Local branch HEAD is `1638e75b81a8c43126ab44eb2f3bba92b15190b2`, two commits ahead of the tracked branch, but those commits do not change `authorization.md`. The worktree has unrelated modifications in `input/includes/auth-todo.md` and `input/includes/proposed-ticket-resolutions.md`; neither changes the inspected authorization page.
- [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) is **Open**, targets `main`, and has head `c0e4af73c30331136bf3df722e988cfd3cc48d38`. GitHub reports no merged/closed date, review decision, or status checks. Its description says it relates to authorization-related IG tickets but does not name FHIR-56581.
- The “IHE IUA And SMART App Launch” comparison table has five rows: **Discovery**, **Scope model**, **Context**, **Interactive use**, and **System-to-system use**. The surrounding text explains that the specifications are not subsets of one another, distinguishes IUA JWT claims from other token options, and states that the IG selects one profile per endpoint rather than claiming dual conformance on the same endpoint.
- The page's detailed SMART and IUA sections also describe client authentication, discovery metadata, token validation/format and introspection, and CORS differences. The environment sections distinguish deployments and access patterns, including SMART interactive use and backend/system-to-system use, and IUA recommendations in applicable national infrastructure. The page does not place every one of these details in the comparison table, but it discusses them in their owning sections.

## Published Context (Not the Source Baseline)
- The current CI page above still shows older authorization content and does not represent PR #99's source. The ballot publication is also the historical context cited by the ticket. Neither publication is evidence that the current branch work has been merged or released.

## Disposition Analysis
The ticket asks for the relevant IUA/SMART differences to be added, not specifically for every difference to appear in one table. Compared with the reported one-example treatment, the current branch now provides a five-aspect summary plus detailed protocol sections covering client authentication, token behavior, and CORS, and clarifies profile selection and environment applicability. This is substantive coverage of the request across the authorization page. The table itself remains a summary rather than an exhaustive side-by-side inventory; the work group may still decide that explicit table cross-references would improve discoverability. The source does not prove ticket-specific implementation, Jira acceptance, or formal resolution: the ticket remains Waiting for Input / Unresolved, and PR #99's broad description does not identify this ticket.

## Proposed Dispositions
### Disposition A: Accept As Requested
#### Proposal
Accept the expanded authorization-page comparison and its accompanying SMART- and IUA-specific details as meeting the request to describe the differences relevant to this IG. Keep the table as a concise summary and retain the details in their protocol-specific sections.
#### Justification
The current source covers discovery, scopes, context, interactive and system-to-system use in the comparison table, with separate details for client authentication, token behavior, and CORS. This answers the request without duplicating normative requirements or implying that one protocol is universally superior.

### Disposition B: Alternative Approach
#### Proposal
Accept the expanded page with a modification: add concise links from the five-row comparison table to the detailed client-authentication, token, and CORS sections, without expanding the table into a second copy of those requirements.
#### Justification
This improves the traceability of the differences while keeping protocol-specific requirements in their owning sections. It is appropriate if the work group considers the additional navigation needed to make the expanded coverage readily discoverable.

### Disposition C: Decline
#### Proposal
Decline the request for further comparison content because the current authorization page already gives a multi-aspect comparison and details the protocols separately.
#### Justification
This avoids further page maintenance, but gives less weight to the request for all relevant differences and may leave readers to assemble the comparison across sections.

### Recommendation
**Recommended disposition:** A

Accept the expanded page as responsive to the request: the five-row table summarizes the main differences, while the detailed sections address authentication, token handling, and CORS without conflating profile-specific rules. B remains a reasonable usability refinement if the work group wants those details linked directly from the table. This recommendation is based on current source coverage; it does not imply that PR #99 is merged, that the PR explicitly resolves FHIR-56581, or that the Jira issue has been accepted or closed.

## Next Steps
- Confirm the work-group disposition in Jira; the local ticket remains Waiting for Input / Unresolved.
- If the work group selects Disposition B, add and verify cross-references from the summary table to the existing detailed sections.
- Do not treat PR #99's open state or general authorization scope as ticket-specific acceptance or completion evidence.

## Verification Checklist
- [x] Ticket metadata and description checked against the local ticket record; no comments or ticket-linked implementation references are present in that record.
- [x] Current source file, branch, file-specific history, local HEAD, and relevant worktree modifications checked.
- [x] PR #99 state, base, head, description, review decision, and status checks verified with `gh` on 2026-10-22.
- [x] Current CI and ballot publication references included and labeled as non-baseline context.
- [x] Dispositions A/B/C are concrete and distinct.
- [x] Recommendation is explicit, grounded in current source, and does not imply ticket acceptance, PR merge, or Jira resolution.
