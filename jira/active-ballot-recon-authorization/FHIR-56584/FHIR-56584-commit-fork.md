FHIR-56584: Explain informative logging considerations

Summary:
- Explain source API access/release events and later user access at a receiving system without adding logging conformance requirements.
- Place the informative guidance under Implementation and link it from Regulatory Anchors.

Changes:
- input/pagecontent/logging-audit-considerations.md (Added): Explain API and user event boundaries, deployment-dependent identity context, and optional syslog, IHE ATNA, or IHE BALP use.
- input/pagecontent/regulatoryAnchors.md (Modified): Link to the informative logging guidance while preserving the IG's logging scope boundary.
- sushi-config.yaml (Modified): Register the page and its Implementation menu entry after EHR System Composition Patterns.
