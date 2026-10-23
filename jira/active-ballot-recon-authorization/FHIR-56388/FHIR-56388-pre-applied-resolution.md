# Pre-applied Resolution for [FHIR-56388](https://jira.hl7.org/browse/FHIR-56388)

## Evidence and PR State
- Ticket analysis: [FHIR-56388-resolution.md](./FHIR-56388-resolution.md) (refreshed against the current source and PR state on 2026-10-22; quality gate: PASS-WITH-NOTES)
- PR: [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) — Open; targets `main`; verified head `c0e4af73c30331136bf3df722e988cfd3cc48d38`. For this proposed resolution, the PR changes are treated as applied.

## Proposed Disposition
**Not Persuasive with Modification**

**Rationale:** The main request—to add RFC 8705 mTLS and certificate-bound access tokens as a supported alternative to `private_key_jwt`—is not implemented in the current PR source. The source continues to specify `private_key_jwt` for SMART Backend Services and short-lived bearer access tokens. However, the ticket comment also objects to making SMART Backend Services mandatory in every CapabilityStatement. The PR's abstract Document Access Provider CapabilityStatement requires each concrete deployment to select exactly one supported security service, SMART-on-FHIR or IUA; its example selects SMART for that deployment. This supports a modified response to the comment, but does not establish mTLS support or resolve the ticket as a whole. Defer any mTLS conformance claim until the profile compatibility, token binding, discovery, certificate lifecycle, and Resource Server validation questions are reviewed.

## Proposed Resolution Text
The CapabilityStatement concern raised in the ticket comment is addressed in part by the deployment-specific security-service selection in [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99). A concrete deployment declares one selected security service, SMART-on-FHIR or IUA; the example deployment selects SMART Backend Services. This does not make SMART Backend Services mandatory for every deployment. 

We will not add RFC 8705 mutual-TLS client authentication or certificate-bound access tokens alongside `private_key_jwt`, as that would break compatibility with existing IUA and SMART libraries. Please raise this issue in IHE and HL7, once they have accepted this change we will re-address when we evaluate whether the specification needs to be updated to refer to a newer release of those base-specifications.

## Proposed Change Category
**Category:** Authorization and CapabilityStatement clarification (proposed; the ticket record does not identify the Jira controlled-category values).

**Rationale:** The implemented source clarifies how a concrete deployment declares its selected authorization service. It does not add the requested mTLS mechanism or change the SMART Backend Services client-authentication method.

## Proposed Change Impact
**Impact:** Localized conformance clarification; no new mTLS behavior (proposed; confirm the applicable Jira impact value).

**Rationale:** The change affects which security-service coding a concrete CapabilityStatement declares, while retaining separate SMART and IUA choices. Implementations are not required to add mTLS or certificate-bound token validation by this PR. The value is provisional because the ticket record does not expose the controlled impact vocabulary.
