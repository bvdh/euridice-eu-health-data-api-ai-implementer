FHIR-56699: Clarify CT grouping and NTPv4 guidance

Record the ticket analysis and supporting authorization policy for the
CT/NTP portion of the request. Distinguish local implementation from the
open PR and retain the outstanding ATNA work as proposed, not completed.

Changes:
- jira/active-ballot-recon-authorization/FHIR-56699/FHIR-56699-resolution.md (Added): document disposition options, current source/PR evidence, and the proposed Persuasive with Modification resolution.
- jira/active-ballot-recon-authorization/FHIR-56699/FHIR-56699-difference-from-applied.md (Added): retain the earlier gap-analysis snapshot, which predates the CT implementation.
- jira/active-ballot-recon-authorization/FHIR-56699/FHIR-56699-execution-summary.md (Added): record implemented CT/NTP changes, validation evidence, PR state, and pending ATNA work.
- jira/active-ballot-recon-authorization/FHIR-56699/FHIR-56699-commit-outer.md (Added): retain this outer commit message.
- jira/active-ballot-recon-authorization/FHIR-56699/FHIR-56699-commit-fork.md (Added): retain the source-only fork commit message.
- .github/instructions/authorization-requirements.instructions.md (Modified): record SMART server CT grouping, client exclusions, linked artifact requirements, and validation checks.

This commit covers ticket artifacts and supporting tooling policy only.
IG source changes are committed separately to euridice-org/eu-health-data-api
(see FHIR-56699-commit-fork.md).

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>

Related: FHIR-56699
