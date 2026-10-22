FHIR-56616: Remove CORS requirements from authorization guidance

Remove CORS-specific requirements and review criteria from the authorization-maintenance
guidance after removing CORS requirements from the IG source.

Changes:
- `.github/instructions/authorization-requirements.instructions.md`: remove CORS-specific
  normative requirements, checks, and acceptance criteria.
- `.github/skills/auth-check/SKILL.md`: remove CORS-specific review and decision guidance.
- `jira/active-ballot-recon-authorization/FHIR-56616/FHIR-56616-execution-summary.md`:
  record the implementation scope, unchanged Jira status, and passing build validation.
- `jira/active-ballot-recon-authorization/FHIR-56616/FHIR-56616-commit-outer.md` and
  `FHIR-56616-commit-fork.md`: retain the messages used for the outer and IG commits.

IG source changes are recorded separately in `FHIR-56616-commit-fork.md`.
`FHIR-56616-resolution.md` is intentionally excluded because it still describes the now-removed
CORS requirement and needs its analysis refreshed before being committed.

Related: FHIR-56616

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
