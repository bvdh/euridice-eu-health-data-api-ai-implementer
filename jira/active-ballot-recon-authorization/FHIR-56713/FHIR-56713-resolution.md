# Proposed Resolution for [FHIR-56713](https://jira.hl7.org/browse/FHIR-56713)

## Ticket Summary
| Field | Value |
|-------|-------|
| Key | [FHIR-56713](https://jira.hl7.org/browse/FHIR-56713) |
| Issue Type | Change Request |
| Status | Triaged |
| Resolution | Unresolved |
| Reporter | [Giorgio Cangioli](https://jira.hl7.org/secure/ViewProfile.jspa?name=giorgio) |
| Assignee | Unassigned |
| Created | 2026-04-30 |
| Grouping | Not recorded |

## Description
The ticket says that the Authorization page presents SMART App Launch and SMART Backend Services as authoritative over IUA when they differ, while continuing to refer broadly to IUA. It asks that the page name SMART where SMART is the mechanism actually profiled or recommended, make clear when IUA is only a reference or background specification, and indicate that SMART is not mandatory. The ticket's recorded Related Page is Authorization.

The local ticket record contains no comment section or additional comment text. It records the Jira status as Triaged and resolution as Unresolved; no formal Jira disposition is inferred from the implementation evidence.

## Implementation Status
**Applied in source; not merged.** The current `input/pagecontent/authorization.md` distinguishes SMART App Launch and IHE IUA, compares their respective uses, and selects a profile by environment and endpoint. It explicitly says that the IG's SMART choice for interactive third-party access is not an EHDS-wide requirement to use SMART. It also retains IUA as an active, environment-specific option rather than describing it solely as background: IUA alignment is recommended for MyHealth@EU, and IUA is recommended for qualifying preconfigured national-infrastructure endpoints, with SMART Backend Services allowed as an alternative when applicable.

The same authorization-page content is present at the current head of [PR #99](https://github.com/euridice-org/eu-health-data-api/pull/99), `c0e4af73c30331136bf3df722e988cfd3cc48d38`. The PR is **Open**, targets `main`, has no merge timestamp, and currently reports merge state `DIRTY`; `gh pr checks` reported no checks. The local implementation branch `eu-health-data-api-ballot-recon-auth` is at `1638e75b81a8c43126ab44eb2f3bba92b15190b2`, two commits ahead of the PR head. Those later commits change other use-case/example files and do not change `input/pagecontent/authorization.md`; this analysis therefore bases the ticket's direct implementation claim on the authorization content verifiable at the PR head, while noting that the local branch is ahead.

Compared with the PR base, the page removes the prior statement that SMART Backend Services is authoritative over grouped IUA requirements when they differ. It replaces this with separate profile descriptions, endpoint/environment selection, and flow-specific recommendations and requirements. Because some of the resulting text uses normative `SHOULD` and `SHALL` language for applicable interactive and system-to-system flows, the change may affect conformance expectations; it is more than a typographical or purely editorial correction.

## Related Tickets
The ticket record contains no explicit related-ticket links.

## Current Build References
- [IHE IUA And SMART App Launch](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#ihe-iua-and-smart-app-launch) — directly addresses the distinction between the two specifications and when each is suited.
- [Environment-Specific Requirements](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#environment-specific-requirements) — explains that authorization selections depend on environment.
- [National Interoperability Infrastructure](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#national-interoperability-infrastructure) — retains IUA as a bounded recommendation and describes SMART Backend Services as an alternative for qualifying endpoints.
- [Wellness Applications](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#wellness-applications) and [Healthcare Provider](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#healthcare-provider) — identify the contexts where interactive SMART App Launch is recommended and clarify the scope of that choice.

## Disposition Analysis
The ticket requests protocol-specific terminology and a clear statement that SMART is not universally mandatory. The current source names both specifications, explains their differing use cases, selects one profile per endpoint according to environment and flow, and states that the interactive SMART choice is not an EHDS requirement. IUA is not only background material: it remains recommended for the stated MyHealth@EU alignment and qualifying national-infrastructure cases. The page also removes the prior blanket precedence statement and introduces flow-specific normative guidance, so the clarification has potential conformance impact. The ticket is therefore addressed by the authorization-page wording present in the open PR, subject to the PR remaining unmerged and Jira remaining unresolved.

## Proposed Dispositions
### Disposition A: Accept As Requested
#### Proposal
Accept the revision to the Authorization page: use SMART terminology where SMART App Launch or SMART Backend Services is selected, describe IUA by its actual role and scope, and state that the environment-specific SMART choice does not make SMART universally mandatory.
#### Justification
The current page distinguishes the protocols, assigns their use by environment and flow, and explicitly says SMART is not an EHDS-wide requirement. It also avoids mischaracterizing IUA as merely background by retaining the contexts where IUA is recommended. This directly addresses the ticket without implying that SMART and IUA are interchangeable or jointly required on one endpoint. The workgroup should consider the flow-specific normative guidance as part of the change's conformance impact, not treat the revision as editorial only.

### Disposition B: Alternative Approach
#### Proposal
Accept with modification by adding a concise endpoint decision table that names, for each environment and flow, the selected profile and applicable conformance requirements, and state explicitly that the IG does not require deployments to adopt SMART universally.
#### Justification
The current page already explains the protocol distinction and environment-specific choices, but a decision table could make those choices easier to apply across all environments and flows. This would add structure beyond the requested terminology correction and should be chosen only if the workgroup considers the existing narrative insufficiently scannable.

### Disposition C: Decline
#### Proposal
Decline the requested change and retain the prior broad IUA terminology and precedence statement without the environment-specific SMART clarification.
#### Justification
This would avoid introducing protocol-specific distinctions into the page, but it would leave the ambiguity identified in the ticket and would not clearly explain that the SMART choice is limited to the relevant environments.

### Recommendation
**Recommended disposition:** A

Accept as requested. The source makes the terminology and applicability distinctions the ticket seeks, while accurately retaining IUA for its selected contexts. This is supported by the authorization-page content at [PR #99](https://github.com/euridice-org/eu-health-data-api/pull/99), whose current state is Open, not merged. The branch being ahead of the PR is disclosed above; the direct Authorization page content is unchanged between the PR head and local branch head. Jira remains Triaged / Unresolved pending formal workgroup disposition.

## Next Steps
- Workgroup to confirm the proposed disposition.
- PR #99 remains open and has a `DIRTY` merge state with no checks reported; merge and CI status are not established by this analysis.
- No additional ticket comments were present in the local ticket record reviewed.

## Verification Checklist
- [x] Evidence reviewed
- [x] Current build references included for impacted/relevant sections
- [x] Dispositions are specific
- [x] Recommendation is justified
