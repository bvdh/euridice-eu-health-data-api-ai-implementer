FHIR-56699: Clarify CT grouping and NTPv4 guidance

Summary:
- Recommend CT Time Client grouping for SMART server roles in interactive
  and Backend Services modes without extending it to client roles.
- Preserve IUA-required CT grouping and encourage NTPv4 as informative
  deployment guidance without introducing a separate NTPv4 requirement.

Changes:
- input/pagecontent/authorization.md (Modified): define SMART server CT guidance, retain IUA grouping obligations, and centralize NTPv4 compatibility and deployment guidance with specification links.
- input/fsh/Actors.fsh (Modified): summarize CT grouping for SMART and IUA server roles and link to the shared time-synchronization guidance.
- input/pagecontent/actors.md (Modified): link the foundational CT reference to the SMART server recommendation.
- input/fsh/capabilitystatements/CapabilityStatementDocumentAccessProvider.fsh (Modified): link the security description to the SMART server CT recommendation.
- input/fsh/capabilitystatements/CapabilityStatementResourceAccessProvider.fsh (Modified): link the security description to the SMART server CT recommendation.
- input/fsh/capabilitystatements/CapabilityStatementDocumentPublisherAccessProvider.fsh (Modified): link the security description to the SMART server CT recommendation.

Validation:
- SUSHI: 0 errors, 0 warnings.
- Publisher: 0 errors, 12 warnings, 45 information messages, 0 broken links;
  counts unchanged from the recorded local baseline.
- Rendered guidance and server cross-links verified.

This is the CT/NTP portion only. The proposed ITI-20 clarification and
ITI-19 diagram alignment are not implemented by these changes.
Generated output and unrelated working-tree changes are excluded.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
