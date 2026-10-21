# Proposed Resolution for [FHIR-56388](https://jira.hl7.org/browse/FHIR-56388)

## Ticket Summary
| Field | Value |
|-------|-------|
| Key | [FHIR-56388](https://jira.hl7.org/browse/FHIR-56388) |
| Issue Type | Change Request |
| Status | Waiting for Input |
| Resolution | Unresolved |
| Priority | Medium |
| Reporter | [maelpriour](https://jira.hl7.org/secure/ViewProfile.jspa?name=mael.priour%40esante.gouv.fr) |
| Assignee | [Bas van den Heuvel](https://jira.hl7.org/secure/ViewProfile.jspa?name=bvdh) |
| Created | 2026-04-17 |
| Raised in Version | 1.0.0-ballot |
| Work Group | HL7 Europe |
| Grouping | Not provided |
| Parent | Not provided |

## Description
The ticket asks the IG to add RFC 8705 mutual TLS as an optional client-authentication and certificate-bound-token mechanism alongside `private_key_jwt` for SMART Backend Services. Its rationale is to prevent an intercepted access token from being usable without the client's certificate, while preserving `private_key_jwt` for deployments that do not need the additional mechanism.

### Ticket-Traceable Evidence
- Ticket description proposes an explicit RFC 8705/mTLS option “on equal footing with private_key_jwt.”
- Comment by maelpriour (2026-04-24) says SMART Backend Services should not be mandatory in CapabilityStatements, mentions “MTLS, IUA, etc.” as other possible mechanisms, and links an [EEHRxF-DocumentAccessProvider CapabilityStatement](https://build.fhir.org/ig/euridice-org/eu-health-data-api/en/CapabilityStatement-EEHRxF-DocumentAccessProvider.html). The comment quotes: “Systems SHALL support SMART Backend Services authorization for all transactions.” This is evidence of the submitter's concern and a publication-page reference, not a PR, commit, or proof of implementation in the ballot branch.
- The ticket is `Waiting for Input` with `Unresolved` resolution. The ticket contains no PR, commit, or other implementation link.

## Implementation Status
**Ticket-linked implementation evidence/status: Pending.** The source ticket remains `Waiting for Input` / `Unresolved`. Its description and 2026-04-24 comment request or discuss alternatives; neither supplies an implementation PR or commit. The comment's linked build page is publication context only. No implementation status is inferred from that link.

**Pinned ballot-branch implementation snapshot:** The logical branch `ballot-recon-authorization` is inspected at commit `019276d397944036d1e502a2acddb3d5e56e158c` (2026-10-08). Its Authorization page selects SMART Backend Services using the `client_credentials` grant, `private_key_jwt`, and applicable `system/` scopes. The `private_key_jwt` client assertion includes `typ`, `alg`, `kid`, `iss`, `sub`, `aud`, `exp`, and `jti`; the Authorization Server validates the signature, expiry, audience, and replay protection. Access tokens are short-lived bearer tokens; the page does not require SMART access tokens to be JWTs or define additional SMART access-token claims (IUA JWT claims apply only where that separate option is selected). The branch does **not** specify RFC 8705, mTLS client authentication, `tls_client_auth`, or certificate-bound access tokens. This describes the pinned branch source only; it does not change the ticket's Pending status.

### Pinned Branch Sources
- [Authorization source](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md) — grant, client authentication, assertion requirements, discovery, and bearer-token language.
- [Document Access Provider CapabilityStatement source](../../../eu-health-data-api-ballot-recon-auth/input/fsh/capabilitystatements/CapabilityStatementDocumentAccessProvider.fsh) — defines an abstract requirements statement with one security-service coding selected by each concrete deployment; describes IUA, SMART Backend Services, and interactive SMART cases.
- [Example Document Access Provider CapabilityStatement source](../../../eu-health-data-api-ballot-recon-auth/input/fsh/examples/Example-CapabilityStatement-DocumentAccessProvider.fsh) — one example deployment selects SMART Backend Services and advertises `SMART-on-FHIR`; it is not a universal all-transactions mandate.
- [CapabilityStatement security-service ValueSet source](../../../eu-health-data-api-ballot-recon-auth/input/fsh/capabilitystatements/CapabilityStatementSecurityService.fsh) — permits selection of SMART-on-FHIR or IUA, not an mTLS authentication method.

The ticket's “all transactions” quotation is not present in the inspected branch CapabilityStatement sources. The upstream `build.fhir.org` links in the ticket are publication context only and are not used to establish the pinned branch's implementation.

## Related Tickets
No related Jira ticket keys are identified in the ticket. The 2026-04-24 comment's CapabilityStatement link is recorded above as ticket evidence, not as implementation evidence.

## Disposition Analysis
The ticket raises a valid security and interoperability question, but “mTLS” can refer to TLS client authentication, certificate-bound access tokens, or both. RFC 8705 support for certificate-bound tokens requires the Authorization Server to bind issuance to the authenticated certificate and the Resource Server to verify proof of possession against that binding; adding a token-endpoint authentication method alone would not establish that behavior. The pinned branch selects SMART Backend Services for the pre-authorized server-to-server case and its example CapabilityStatement selects SMART for one concrete deployment. The branch sources do not make SMART Backend Services mandatory across every transaction or express mTLS as a supported alternative. Profile, discovery, conformance, and resource-server behavior therefore need review before asserting equivalent support.

The ticket's comment alone does not establish that the ballot branch requires SMART Backend Services for every transaction. Preserve the branch's environment-specific authorization selection while the workgroup decides whether a fully specified mTLS option belongs in a later revision.

## Proposed Dispositions
### Disposition A: Accept As Requested
#### Proposal
Add RFC 8705 mutual TLS as an optional SMART Backend Services alternative at the same conformance level as `private_key_jwt`, including client authentication and certificate-bound access-token support.

#### Justification
This directly addresses the ticket's request and could reduce the risk of intercepted bearer tokens. However, it expands the selected profile's conformance surface before the IG has established profile compatibility, token-binding behavior, discovery metadata, certificate lifecycle, or Authorization Server and Resource Server validation requirements. It must not be represented as supported by the current ballot text without resolving those matters.

### Disposition B: Alternative Approach
#### Proposal
Make no normative change to the current ballot requirements. Record RFC 8705 mTLS as a candidate for future work; consider adoption only after standards/profile review confirms compatibility with SMART Backend Services and defines the required client-authentication, certificate-binding, discovery, certificate lifecycle, and Resource Server validation behavior. Require explicit HL7 Europe workgroup approval before adding it as a supported option. Until then, retain the pinned branch's `private_key_jwt` and bearer-token direction without implying mTLS support.

#### Justification
This keeps the current published conformance claims accurate and avoids conflating mutual-TLS client authentication with certificate-bound tokens. It responds to the higher-assurance use case without weakening or silently broadening the selected profile. The trade-off is that mTLS is not an available IG conformance option in this release; any later addition depends on interoperability analysis and workgroup decision.

### Disposition C: Decline
#### Proposal
Decline adding RFC 8705 mTLS to the IG and close the request without scheduling profile review; retain the current SMART Backend Services and bearer-token requirements.

#### Justification
This avoids adding another authorization mechanism and its certificate-management requirements to the current IG. It is distinct from deferral, but leaves the requested higher-assurance option unexamined and does not resolve whether it can interoperate with the selected profile.

### Recommendation
**Recommended disposition:** B

Defer any mTLS conformance claim to a future, explicitly approved change after profile review. At the pinned ballot-branch commit, the Authorization page selects `private_key_jwt` and describes short-lived bearer access tokens, while the CapabilityStatement sources distinguish deployment-selected SMART and IUA options; none specifies mTLS or certificate-bound tokens. Separately, the ticket remains `Waiting for Input` / `Unresolved` and has no linked implementation PR or commit. Option B preserves the branch's environment-specific direction while avoiding a claim that either mTLS client authentication alone or RFC 8705 certificate-bound tokens are supported. Option A would assert an unreviewed conformance alternative; C would close the question without the requested profile review.

## Next Steps
- Keep the current ballot text and conformance claims unchanged pending an explicit workgroup disposition.
- If HL7 Europe wishes to pursue the request, review RFC 8705 and SMART Backend Services 2.2 compatibility, distinguishing TLS client authentication from certificate-bound access-token validation.
- Define and assess discovery metadata, certificate trust and rotation/revocation responsibilities, Authorization Server token binding, Resource Server proof-of-possession validation, and interoperability test cases before proposing normative text.
- Obtain explicit workgroup approval before adding mTLS as a supported option in a later IG revision.
- Treat the ticket comment's “all transactions” CapabilityStatement statement as a separate conformance-scope question; reconcile it against the intended environment-specific requirements rather than using it as evidence of mTLS support.

## Verification Checklist
- [x] Ticket metadata, description, and available comment reviewed.
- [x] Ticket-linked implementation status is distinguished from the pinned branch source snapshot; no PR or commit is inferred from publication pages.
- [x] Authorization and relevant CapabilityStatement source links point to the logical branch `ballot-recon-authorization` at commit `019276d397944036d1e502a2acddb3d5e56e158c` (2026-10-08).
- [x] Selected SMART Backend Services grant, client authentication, assertion claims, bearer-token model, and absence of RFC 8705/mTLS/certificate-bound tokens are stated explicitly.
- [x] The ticket comment's “all transactions” claim is checked against branch CapabilityStatement sources and not treated as a branch requirement.
- [x] Dispositions A, B, and C specify distinct actions and trade-offs.
- [x] Recommendation is explicit and grounded in the current source and ticket evidence.
- [x] No specification, Jira status, or consolidated include changes are proposed as part of this artifact.