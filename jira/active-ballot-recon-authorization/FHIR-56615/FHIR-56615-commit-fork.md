FHIR-56615: Clarify SMART scope and GDPR boundaries

Summary:
- Preserve environment-specific SMART/IUA selection and add informative GDPR boundaries without changing protocol requirements.

Changes:
- `input/pagecontent/authorization.md` (Modified): clarify that technical authentication and API authorization do not determine the GDPR Article 6 lawful basis or Article 9(2) condition.
- `input/pagecontent/usecase-health-data-portal.md` (Modified): clarify that service preferences are separate from the processing legal basis, which the IG does not define.
- `input/pagecontent/actors.md` (Modified): clarify that technical actor roles are not intended to determine GDPR controller/processor status.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
