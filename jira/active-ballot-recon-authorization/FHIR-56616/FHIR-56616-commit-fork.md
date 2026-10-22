FHIR-56616: Remove CORS requirements from authorization guidance

Summary:
- Remove the IG-authored CORS requirement and related CORS claims from authorization content as there is no identified requirement for its inclusion.

Changes:
- `input/pagecontent/authorization.md` (Modified): remove the SMART/IUA CORS text.
- `input/fsh/capabilitystatements/CapabilityStatementDocumentAccessProvider.fsh` (Modified):
  remove CORS-specific description text.
- `input/fsh/capabilitystatements/CapabilityStatementDocumentConsumer.fsh` (Modified):
  remove CORS-specific description text.
- `input/fsh/capabilitystatements/CapabilityStatementDocumentPublisher.fsh` (Modified):
  remove CORS-specific description text.
- `input/fsh/capabilitystatements/CapabilityStatementDocumentPublisherAccessProvider.fsh`
  (Modified): remove CORS-specific description text.
- `input/fsh/capabilitystatements/CapabilityStatementResourceAccessProvider.fsh` (Modified):
  remove CORS-specific description text.
- `input/fsh/capabilitystatements/CapabilityStatementResourceConsumer.fsh` (Modified):
  remove CORS-specific description text.
- `input/fsh/examples/Example-CapabilityStatement-DocumentAccessProvider.fsh` (Modified):
  remove the CORS declaration and its explanatory text.

Breaking changes:
- Removes published CORS-specific authorization guidance and the example CapabilityStatement's
  explicit CORS declaration.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
