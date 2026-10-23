# Proposed Resolution for [FHIR-56639](https://jira.hl7.org/browse/FHIR-56639)

## Ticket Summary
| Field | Value |
|-------|-------|
| Key | [FHIR-56639](https://jira.hl7.org/browse/FHIR-56639) |
| Issue Type | Change Request |
| Summary | Add explanantions to the scopes section |
| Status | Triaged |
| Resolution | Unresolved |
| Reporter | [Giorgio Cangioli](https://jira.hl7.org/secure/ViewProfile.jspa?name=giorgio) |
| Assignee | Unassigned |
| Created | 2026-04-29 |
| Updated | 2026-07-16 |
| Priority | Medium |
| Specification / Raised In | EU Health Data API (R4) (FHIR) / 1.0.0-ballot |
| Work Group | HL7 Europe |
| Parent Key | Not provided |
| Related Page | Resource Access |
| Grouping | Not provided |

## Description
The ticket says the Resource Access Scopes section is unclear because it lists scopes such as `system/AllergyIntolerance.rs` and `system/Condition.rs` without sufficient explanation.

## Implementation Status
**Applied in the current source; local Jira metadata remains Triaged / Unresolved.** The local ticket record contains no comments or PR/commit links, but the Resource Access source includes an editorial note identifying the FHIR-56639 resolution as “Remove ‘Scopes’ section since applicable resources are now listed above.” The current page has no standalone Scopes section or list of scope strings; resources are listed by priority data category and described in the supported-resource sections. PR [#99](https://github.com/euridice-org/eu-health-data-api/pull/99) is open and unmerged, but it did not remove the list: the removal predates the PR. It adds flow-specific context about SMART scope families, which is supporting clarification rather than the implementation of the removal.

## Related Tickets
No related ticket keys are identified in the local ticket record.

## Current Build References
These published current-build links are related-page references only; their content is not evidence of the unmerged branch source.

- [Resource Access](https://hl7.eu/fhir/health-data-api/current-build/en/resource-access.html) — related page for the supported-resource inventory.
- [Authorization — Tokens, scopes, enforcement, and errors](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#tokens-scopes-enforcement-and-errors) — linked authorization context.

## Implementation Evidence
- Ticket source: [FHIR-56639.md](./FHIR-56639.md) — status Triaged, resolution Unresolved, with no comments or implementation links.
- Current implementation worktree: `eu-health-data-api-ballot-recon-auth`, local `HEAD` `1638e75b81a8c43126ab44eb2f3bba92b15190b2`.
- Current PR: [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) — Open, unmerged; remote PR head `c0e4af73c30331136bf3df722e988cfd3cc48d38` as checked 2026-10-22.
- The local worktree's `input/pagecontent/resource-access.md` matches the PR-head version. PR #99 changes this page by adding explanatory text that interactive access uses applicable `patient/` or `user/` scopes, Backend Services uses applicable `system/` scopes, and these SMART scopes are distinct from generic FHIR scopes and IUA transaction scopes. It links to Authorization for further detail.
- Neither the current source nor the PR-head source has a standalone Scopes heading or the former `system/AllergyIntolerance.rs` / `system/Condition.rs` list. The page retains the supported-resource inventory, while the provider CapabilityStatement separately documents supported resource scopes and conditions.
- The PR head is behind the local worktree by two commits overall; only the cited Resource Access source file was confirmed identical between the local `HEAD` and PR head. Do not infer that the entire local branch is included in PR #99.

## Disposition Analysis
The requested outcome is to remove the Scopes section because its resource entries are already listed in the Resource Access content. The current source does this: the section and its scope-string list are absent, and the editorial note explicitly records that as the FHIR-56639 resolution. This avoids maintaining a duplicate resource inventory in scope-string form. It also means that explaining `.rs` beside the removed list is no longer needed to resolve this ticket.

The page separately provides useful context about scope families by authorization flow and distinguishes SMART resource scopes from IUA transaction scopes. PR #99 adds that context, but is open and unmerged and is not the change that removed the Scopes section. The local ticket record still shows Triaged / Unresolved; source implementation does not establish that Jira has been formally updated or closed.

## Proposed Dispositions
### Disposition A: Accept As Requested
#### Proposal
Remove the standalone Scopes section and its scope-string list from Resource Access because the applicable resources are already listed in the page content.
#### Justification
This matches the explicit FHIR-56639 source note and the current page structure. It avoids duplicating the resource inventory and removes the need to explain `.rs` in a list that is no longer present.

### Disposition B: Alternative Approach
#### Proposal
Keep the standalone Scopes list removed and add a compact SMART-versus-IUA and flow-specific explanation (`patient/`, `user/`, and `system/`) with a link to Authorization.
#### Justification
This preserves the requested removal while adding useful authorization context. The paragraph is present in the current source and in PR #99, but it is supplementary and not necessary to the core requested resolution. This option is more than the ticket requires.

### Disposition C: Decline
#### Proposal
Make no change to the Resource Access content and leave the Scopes list in place.
#### Justification
This does not implement the requested removal and retains the duplicate list that motivated the ticket.

### Recommendation
**Recommended disposition:** A

Accept as requested: remove the redundant Scopes section because its applicable resources are already listed in the page. The source note explicitly records this as the FHIR-56639 resolution, and the current content reflects that removal. The flow-specific SMART/IUA paragraph is useful supplementary material, but is not required to achieve the disposition. This recommends a workgroup resolution; it does not imply that Jira status has already been updated.

## Next Steps
- Confirm or record the workgroup disposition as Persuasive / remove the Scopes section, then update Jira status through the normal process.
- Do not characterize PR #99 as having removed the list; the removal predates that open PR.

## Verification Checklist
- [x] Ticket metadata and local status reviewed
- [x] Current local source and current PR state/head verified on 2026-10-22
- [x] PR and local source distinction documented; no merge claim made
- [x] Current page and source comment confirm the Scopes list removal requested for FHIR-56639
- [x] PR #99 is distinguished from the earlier source change removing that list
- [x] Dispositions A, B, and C are specific and meaningfully distinct
- [x] Recommendation is explicit and grounded in current source and PR evidence
- [x] Current-build references included and explicitly labeled as context only
