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
**Pending (ticket-linked evidence).** The Jira record is Waiting for Input and Unresolved. Its local markdown contains no comments, PR links, commit references, or other implementation evidence linking the current source text to this ticket. The ballot source worktree is nevertheless the implementation baseline for this review: its authorization page contains a multi-aspect SMART/IUA comparison and environment-specific profile selections. This verifies current source coverage, not ticket attribution or formal resolution.

## Related Tickets
No related ticket keys are listed in the local ticket record.

## Current Source Baseline
- The inspected implementation is the clean `ballot-recon-authorization` source worktree at commit `019276d397944036d1e502a2acddb3d5e56e158c`, dated 2026-10-08: [authorization.md](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md). This branch snapshot, not upstream CI or published content, is the basis for the implementation assessment below.
- The “IHE IUA And SMART App Launch” table has five comparison rows: **Discovery**, **Scope model**, **Context**, **Interactive use**, and **System-to-system use**.
- The “Environment-Specific Requirements” section selects authorization by deployment: **MyHealth@EU** is outside this IG's authorization scope, with IUA alignment recommended; **National Interoperability Infrastructure** recommends IUA where user or patient claims are needed; **Wellness Applications** SHALL use SMART App Launch, with SMART Backend Services limited to the separately described preconfigured server-to-server flow; and **Healthcare Provider** deployments SHALL use SMART App Launch, with Backend Services for system-to-system uploads and interactive SMART App Launch for clinician access.
- **Remaining comparison gap:** the table does not have dedicated side-by-side rows for interactive client authentication, access-token representation/validation, or CORS. The page discusses client authentication and CORS in later protocol sections, and the table's Context row compares launch context with optional IUA claims, but these points are not all compared directly in the table. Whether “all differences” requires a self-contained table or can be met by the table plus those detailed sections remains a workgroup decision.

## Published Context (Older, Not the Baseline)
- [Upstream CI authorization page](https://build.fhir.org/ig/euridice-org/eu-health-data-api/en/authorization.html#iua-and-smart-backend-services) is older published context and retains the ticket's one-example treatment. It does not represent the current ballot source snapshot and is not evidence that the current branch text was published or linked to this ticket.

## Disposition Analysis
The request is to enumerate differences relevant to this IG, not to select one protocol universally. The current branch has a substantive five-aspect comparison and separate environment-specific selections, so it goes materially beyond the single example described by the ticket. However, the comparison table itself is not exhaustive: it does not juxtapose interactive client authentication, token representation/validation, or CORS. Some of these topics are covered in later sections, but the ticket's request can reasonably be read as asking for their differences to be made explicit together. The current source therefore **partially addresses** the requested table-level completeness; the exact exhaustive scope should be settled by the work group. Do not conflate this source assessment with Jira state: the ticket remains Waiting for Input / Unresolved and has no ticket-linked implementation evidence. IUA scopes, SMART scopes, and environment-specific conformance are not interchangeable.

## Proposed Dispositions
### Disposition A: Accept With Targeted Table Expansion
#### Proposal
Expand the maintained comparison table with concise side-by-side rows for interactive client authentication, access-token representation/validation (including relevant IUA claims), and CORS, cross-referencing the detailed SMART, IUA, and environment-specific requirements rather than duplicating them.
#### Justification
This directly closes the remaining table-level gap while respecting that much of the normative detail already lives in later sections. Keeping additions concise and linked limits duplication and makes “all differences relevant for this IG” auditable in one comparison.

### Disposition B: Alternative Approach
#### Proposal
Treat the existing five-row comparison together with its detailed protocol sections as satisfying the request; add only navigation cross-references from the table to client-authentication, token, CORS, and environment-specific content, without adding comparison rows.
#### Justification
This avoids enlarging a summary table and keeps normative requirements in their owning sections. Its trade-off is that readers still must synthesize some relevant differences across separate sections rather than compare them in one place.

### Disposition C: Decline
#### Proposal
Decline further specification changes because the existing five-row comparison, detailed protocol requirements, and environment-specific selections are sufficient when read together.
#### Justification
This avoids additional maintenance because the current page already covers these topics across its comparison and protocol sections. It gives less weight to the request's apparent preference for an explicit comparison of all relevant differences and relies on readers to combine the sections.

### Recommendation
**Recommended disposition:** A

Accept a targeted expansion of the maintained comparison table. The current branch already provides five useful comparison dimensions and states which authorization approach applies in each environment, but it does not directly compare interactive client authentication, token representation/validation, or CORS in the table. A concise expansion with links to the owning detailed sections best matches the request while avoiding duplicated normative text. B is a defensible lower-impact alternative if the work group considers the table plus prose sufficient; C would decline the request despite the identified comparison gap. The ticket itself remains unresolved and has no linked implementation evidence, so this recommendation is proposed and does not imply that Jira status has changed.

## Next Steps
- Decide whether the table itself must enumerate client authentication, token representation/validation, and CORS, or whether cross-references to the detailed sections are sufficient.
- If Disposition A is accepted, update the maintained comparison source and its rendered table, then verify the table and cross-references in the ballot IG build.
- Record the work-group disposition in Jira; do not treat the current branch content as proof that the ticket was implemented in response to this request.

## Verification Checklist
- [x] Ticket metadata and current source snapshot checked independently; no ticket-linked comments, PRs, or commits are present in the local ticket record.
- [x] Source worktree, branch, clean state, commit, and date identified; older upstream CI is labeled context only.
- [x] Exact five comparison rows and all four environment-specific selections verified against the branch authorization page.
- [x] Remaining table-level comparison gap and its distinction from Jira's unresolved status are explicit.
- [x] Dispositions A/B/C are concrete and distinct.
- [x] Recommendation is explicit and justified against the alternatives.