# Execution Summary: [FHIR-56699](https://jira.hl7.org/browse/FHIR-56699)

## Scope and Status

| Field | Value |
|-------|-------|
| Ticket | [FHIR-56699: Foundational IHE Profiles CT, ATNA](https://jira.hl7.org/browse/FHIR-56699) |
| Issue type | Change Request |
| Local Jira record | Waiting for Input / Unresolved; no live Jira status update asserted |
| Proposed workgroup disposition | Persuasive with Modification; not an adopted disposition |
| Evidence checked | 2026-10-23 |
| Outer branch | `main` |
| Implementation worktree / branch | `eu-health-data-api-ballot-recon-auth` |
| Local implementation HEAD | `06f63608d7f01f5e96dc33835308f0567755f24b` |
| Implemented CT/NTP scope | **PASSED** local source/rendering verification |
| Full proposed ticket resolution | **BLOCKED** pending ATNA clarification and diagram alignment |

This is a retrospective execution record requested by the user, derived from the
current branch/worktree differences and persisted build evidence. No standalone
ticket implementation-plan file exists in this active ticket directory. The
implementation mapping below records the user-approved CT/NTP changes; it does
not claim that the entire [resolution proposal](FHIR-56699-resolution.md) was
executed. That proposal predates the final shared NTP guidance refinement;
the current source and generated output were checked directly for this summary.

## Implemented Changes

Paths in the following table are relative to the explicit implementation worktree.
All six source changes were uncommitted at verification time.

| Source | Implemented change | Result |
|--------|--------------------|--------|
| [Authorization](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md) | Add an IG-level CT Time Client grouping `SHOULD` for SMART Authorization Server and SMART FHIR Resource Server roles in both interactive and Backend Services modes. Exclude client roles solely acting as clients. Retain required IUA server CT grouping. Centralize informative NTPv4 encouragement, compatibility, interoperability checks, and CT conformance caveats under Time Synchronization. | Done |
| [ActorDefinitions](../../../eu-health-data-api-ballot-recon-auth/input/fsh/Actors.fsh) | Summarize CT grouping in both SMART server and both IUA server definitions; link shared time guidance, the SMART recommendation, and IUA required-grouping evidence as applicable. | Done |
| [Actors and Transactions](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/actors.md) | Link the foundational IHE CT reference to the SMART server recommendation. | Done |
| [Document Access Provider](../../../eu-health-data-api-ballot-recon-auth/input/fsh/capabilitystatements/CapabilityStatementDocumentAccessProvider.fsh) | Link the security description to the IG-level SMART server CT recommendation. | Done |
| [Resource Access Provider](../../../eu-health-data-api-ballot-recon-auth/input/fsh/capabilitystatements/CapabilityStatementResourceAccessProvider.fsh) | Link the security description to the same recommendation. | Done |
| [Document Publisher Access Provider](../../../eu-health-data-api-ballot-recon-auth/input/fsh/capabilitystatements/CapabilityStatementDocumentPublisherAccessProvider.fsh) | Link the security description to the same recommendation. | Done |

The related outer-repository
[authorization policy](../../../.github/instructions/authorization-requirements.instructions.md)
adds CT/RFC references, SMART server CT guidance, actor and CapabilityStatement
cross-link requirements, and a corresponding conformance check. This is tooling
policy, not published IG source.

The recommendation is additional IG guidance, not a SMART-defined conformance
requirement. IUA obligations are not weakened. NTPv4 is encouraged informatively,
without a separate NTPv4 `SHOULD` or `SHALL`, and NTPv4 use alone does not establish
full CT conformance. Existing protocol actors are retained.

## Validation Evidence

### Existing build

The earlier completed build used the explicit worktree:

```sh
cd eu-health-data-api-ballot-recon-auth
./_build.sh build
```

- Prior execution recorded SUSHI: **0 errors / 0 warnings**. This summary does not
  claim a newly captured SUSHI run.
- Persisted [Publisher QA JSON](../../../eu-health-data-api-ballot-recon-auth/output/qa.json):
  **0 errors / 12 warnings / 45 information messages**.
- Persisted [QA HTML](../../../eu-health-data-api-ballot-recon-auth/output/qa.html):
  **0 broken links**.
- QA build timestamp: `2026-10-23T10:28:58+02:00`; QA JSON was written at
  approximately 10:30 local time. The final Authorization and ActorDefinition
  source edits have timestamps around 10:28:45, preceding that build.
- These diagnostic counts match the previously recorded local baseline. The
  build is not warning-free.

### Fresh pre-commit build

The commit workflow reran `./_build.sh build` in the explicit worktree on
2026-10-23. It exited successfully, with QA timestamp
`2026-10-23T11:31:50+02:00` and completion around 11:33 local time.
SUSHI reported **0 errors / 0 warnings**; Publisher reported **0 errors /
12 warnings / 45 information messages / 0 broken links**. Both QA time-report
artifacts were generated.

The log also contains a non-fatal combined-package generation diagnostic about
`output/package.tgz` not existing at that intermediate step. The package exists
after completion, the final ZIP was built, and Publisher completed successfully.
This diagnostic is recorded rather than treated as a QA error or silently omitted.

### Read-back and source checks

- Verified the rendered [Authorization page](../../../eu-health-data-api-ballot-recon-auth/output/en/authorization.html)
  contains the SMART server section, shared NTPv4 guidance, RFC hyperlink, and CT
  conformance caveats.
- Verified both SMART server and both IUA server rendered ActorDefinitions
  contain CT summaries and the shared Time Synchronization link.
- Verified all three rendered provider CapabilityStatements link to SMART Server
  Time Synchronization.
- Ran `git diff --check` in both repositories: **passed**.
- Generated output was inspected, not manually edited.

## PR and Publication State

Verified using `gh pr view 99 --repo euridice-org/eu-health-data-api` on 2026-10-23:

- [euridice-org/eu-health-data-api#99](https://github.com/euridice-org/eu-health-data-api/pull/99):
  **OPEN**, not merged (`mergedAt: null`).
- PR head branch: `eu-health-data-api-ballot-recon-auth`.
- PR head commit: `c0e4af73c30331136bf3df722e988cfd3cc48d38`.
- Local HEAD is five commits ahead of that PR head; the CT/NTP changes summarized
  here are additional uncommitted worktree changes.
- GitHub returned an empty status-check rollup; no CI pass is asserted.

Local build success is not evidence that these changes are included in the PR,
merged, or published. The resolution proposal records unavailable current-build
URLs; those URLs are not used as verified publication evidence here.

## Acceptance Review and Outstanding Work

- [x] SMART server CT recommendation covers interactive and Backend Services modes.
- [x] SMART client roles are not assigned CT grouping solely by their client role.
- [x] Required IUA server CT grouping is retained.
- [x] Shared informative NTPv4 encouragement links to IHE CT and RFC 5905.
- [x] ActorDefinitions and provider descriptions link to the guidance.
- [x] Local rendered output and persisted Publisher QA checked.
- [ ] Explicit IG-scoped ITI-20 Record Audit Event clarification implemented.
- [ ] ITI-19 diagram labels aligned so TLS alone does not imply ATNA conformance.
- [ ] CT/NTP changes committed and included in the PR.
- [ ] Entire proposed resolution verified in merged/published source.

The informative [logging page](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/logging-audit-considerations.md)
does not mandate a logging technology/profile or cross-system interoperability,
but does not explicitly name ITI-20.
The [document sequence](../../../eu-health-data-api-ballot-recon-auth/input/images-source/document-transactions-sequence.plantuml)
and [resource sequence](../../../eu-health-data-api-ballot-recon-auth/input/images-source/resource-transactions-sequence.plantuml)
still label TLS exchanges as `ITI-19 ATNA Authenticate Node (TLS)`.
These material gaps remain pending user/workgroup direction; no ATNA source
changes are authorized by this summary request.

National time-service interoperability has not been tested. Separately adopted
profiles, applicable law, and deployment policy may impose additional obligations.
The proposed change category remains **Clarification**, with proposed impact
**Compatible, substantive**, subject to workgroup confirmation.

## Artifact and Commit Boundaries

The [resolution proposal](FHIR-56699-resolution.md), earlier
[difference inventory](FHIR-56699-difference-from-applied.md), and accepted
[outer](FHIR-56699-commit-outer.md) /
[fork](FHIR-56699-commit-fork.md) commit-message drafts already exist.
The difference inventory is historical, not a current implementation assessment.
This summary does not refresh or overwrite those artifacts.

The summary-creation request changed only this artifact. During subsequent
pre-commit preparation, the user approved adding this summary and both retained
message files to the outer message's file list. The five ticket artifacts and
authorization policy were staged in the outer repository; the six source files
above were staged in the fork. Unrelated staged outer files are excluded using
an explicit-path commit. No IG source, Jira metadata, or consolidated report was
changed during commit preparation.

This record describes the validated pre-commit state; resulting commit hashes
are reported separately. No push is authorized. No pre-applied-resolution
artifact was created: the full proposed resolution is not yet implemented.
