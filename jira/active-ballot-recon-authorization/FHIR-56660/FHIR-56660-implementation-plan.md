# Implementation Plan for [FHIR-56660](https://jira.hl7.org/browse/FHIR-56660)

## Ticket Summary

| Field | Value |
|-------|-------|
| Key | [FHIR-56660](https://jira.hl7.org/browse/FHIR-56660) |
| Issue Type | Change Request |
| Status | Triaged |
| Resolution Source | Proposed Resolution File |
| Resolution/Disposition | Proposed Disposition A: Accept As Requested |
| Summary | Acknowledge direct patient-to-EHR access alongside the broker model, with consent-enforcement implications |

The ticket remains `Triaged` / `Unresolved`; this plan follows a proposed workgroup disposition, not a recorded Jira decision.

## Resolution Interpretation

The recommended proposal is to add an informative note to the Health Data Access Service (HDAS) page describing direct patient authentication to a provider EHR, using interactive SMART Patient Access where applicable, as a possible Member State architecture alongside the broker model. Keep existing environment-specific authorization requirements and the broker workflow intact. Distinguish patient authentication, API authorization/token issuance, and consent policy/enforcement, and avoid asserting that one authentication method guarantees consent enforcement or that the reported deployment pattern is universal.

Do not update the Health Professional Access Service (HPAS) page unless the workgroup identifies a concrete patient-facing HPAS scenario. The current HPAS use case concerns professional access.

## Scope and Impact

### Affected Artifacts
- Health Data Access Service use case — add the informative architecture alternative and consent-boundary clarification requested by the ticket.
- Health Professional Access Service use case — assess applicability; no edit is currently supported by the proposal or page content.
- Generated English IG page — regenerate and inspect the HDAS rendering after the source change.

### Candidate Files
- `input/pagecontent/usecase-health-data-portal.md` — add the informative direct-EHR alternative alongside the existing broker workflow.
- `input/pagecontent/usecase-health-professional-portal.md` — inspect for a concrete patient-facing scenario; leave unchanged unless the workgroup decides one applies.
- `output/en/usecase-health-data-portal.html` — generated validation target; do not edit directly.
- `output/en/usecase-health-professional-portal.html` — generated comparison target to confirm no unintended HPAS change.

### Impact Notes
- IG impact: Informative narrative clarification; no new conformance requirements or changes to environment-specific protocol selection.
- Breaking change risk: Low — the proposal preserves the existing broker model and normative authorization requirements.

## Implementation Tasks

1. **Add the direct-EHR alternative to the HDAS use case**
   - File: `input/pagecontent/usecase-health-data-portal.md`
   - Action: Add a concise informative paragraph acknowledging direct patient-to-provider-EHR access as a possible alternative to the broker model. Distinguish direct EHR login and retrieval from the access-service-mediated workflow. State that authentication, API authorization/token issuance, and consent policy/enforcement are separate responsibilities; keep consent implications deployment-specific and do not claim that direct login itself guarantees enforcement.
   - Acceptance: The page describes both architectures without preferring one, retains the broker workflow and existing authorization guidance, and makes no unverified universal deployment or legal claim.

2. **Confirm whether HPAS has applicable patient-facing scope**
   - File: `input/pagecontent/usecase-health-professional-portal.md`
   - Action: Compare the page's professional-access scenario with the workgroup's interpretation of the ticket. Make no text change unless a concrete patient-facing HPAS scenario is identified and approved.
   - Acceptance: No unsupported patient flow is added to the professional access use case; any decision to extend the page is recorded before editing.

## Validation Plan

- [ ] Source update is limited to the approved narrative scope in the correct `input/pagecontent/` file.
- [ ] Run `./_build.sh build` from the selected IG worktree (`eu-health-data-api-ballot-recon-auth`); if terminology connectivity is unstable, also run `./_build.sh notx`.
- [ ] Inspect `output/en/usecase-health-data-portal.html` for the new informative paragraph, links, and retained broker workflow.
- [ ] Inspect `output/en/usecase-health-professional-portal.html` to confirm no unintended HPAS change.
- [ ] Check for unresolved placeholders, broken links, and unintended normative wording.
- [ ] Confirm the ticket request is addressed without asserting universal deployment or consent behavior.

## Open Questions

- The ticket record remains `Triaged` / `Unresolved`, while the analysis recommends Disposition A; formal workgroup adoption is still required.
- Does the workgroup identify a concrete patient-facing scenario within HPAS? If not, leave HPAS unchanged.
- The ticket reports direct EHR authentication as a deployed pattern and describes consent-enforcement practices; the local source does not independently establish those generalizations. Keep them qualified unless evidence is provided.

## Repo Drift Check

- In-plan changes detected: None yet; current HDAS source still describes the access-service workflow and environment-specific EHR-facing authorization.
- Related but out-of-plan changes detected: `input/includes/proposed-ticket-resolutions.md` has an uncommitted ticket summary marking FHIR-56660 partially addressed and recommending cross-references to existing Wellness and SMART Patient Access content. Per user confirmation, retain this report edit outside the plan; it does not substitute for the direct-EHR retrieval acknowledgement in the HDAS narrative.
- Unrelated changes excluded from scope: Existing `input/includes/auth-todo.md` and generated `FHIR-eu-health-data-api.xml` edits, along with other active-ticket/Jira artifacts in the outer repository.
- Plan/resolution adjustment required: No. The proposed plan reflects Disposition A and keeps the confirmed related report drift out of scope.
- User confirmation on deviations: Confirmed — retain the report, auth-todo, and generated XML edits outside this plan; plan the HDAS page change only.

## Branch Context

The branch-context resolver maps the active directory to `ballot-recon-authorization`, but its expected fork worktree is absent and the topology check fails because the base fork is on `main`. The user previously explicitly selected `eu-health-data-api-ballot-recon-auth` on branch `eu-health-data-api-ballot-recon-auth` for this ticket. The plan uses that worktree; source evidence was checked at local HEAD `06f63608d7f01f5e96dc33835308f0567755f24b` (2026-10-22).
