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
**Ticket-linked implementation evidence/status: Pending.** The source ticket remains `Waiting for Input` / `Unresolved`. Its description and 2026-04-24 comment request or discuss alternatives; neither supplies an implementation PR or commit. The comment's linked build page is publication context only. PR #99 was found through the implementation branch, not linked from the ticket, and does not change the Jira status or resolution.

**Current implementation branch and PR evidence (verified 2026-10-22):** GitHub PR [#99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) is **Open**, targets `main`, and its current head is `c0e4af73c30331136bf3df722e988cfd3cc48d38`. The branch's local checkout is at `1638e75b81a8c43126ab44eb2f3bba92b15190b2`, two commits ahead of the PR head; those commits do not change the Authorization page or the relevant Document Access Provider CapabilityStatement sources, so the FHIR-56388 findings below match the verified PR head. The checkout also has uncommitted changes to authorization todo/consolidated-resolution include files; those are not treated as implementation evidence for this ticket.

At the PR head, the Authorization page specifies SMART Backend Services for pre-authorized access using `client_credentials`, `private_key_jwt`, and normally `system/` scopes. It specifies client assertion fields `typ`, `alg`, `kid`, `iss`, `sub`, `aud`, `exp`, and `jti`, with Authorization Server signature, expiry, audience, and replay validation. It describes short-lived bearer access tokens and TLS 1.2 or later. It does **not** specify RFC 8705, mTLS client authentication, `tls_client_auth`, or certificate-bound access tokens.

The current abstract Document Access Provider CapabilityStatement requires each concrete deployment to declare exactly one authorization security-service coding, selected from SMART-on-FHIR or IUA, and does not advertise a fixed security service itself. The example deployment selects SMART Backend Services. Thus the inspected sources do not impose SMART Backend Services universally across every transaction; the example's selection is deployment-specific. Neither source defines mTLS as a security-service coding or authentication option. These findings describe source at the PR head and do not imply that the PR has merged or that the ticket has been resolved.

### Current Build References
- [Authorization](https://build.fhir.org/ig/euridice-org/eu-health-data-api/en/authorization.html) — current build page identified by the ticket; relevant to the requested client authentication and access-token behavior. A build page is publication context, not evidence that PR #99 has merged.
- [Document Access Provider CapabilityStatement](https://build.fhir.org/ig/euridice-org/eu-health-data-api/en/CapabilityStatement-EEHRxF-DocumentAccessProvider.html) — the page linked in the ticket comment; relevant to the separate concern about whether SMART Backend Services is mandatory for every transaction.

### PR-Head Source References
- [Authorization source at PR head](https://github.com/euridice-org/eu-health-data-api/blob/c0e4af73c30331136bf3df722e988cfd3cc48d38/input/pagecontent/authorization.md) — grant, client authentication, assertion requirements, discovery, and bearer-token language.
- [Document Access Provider CapabilityStatement source at PR head](https://github.com/euridice-org/eu-health-data-api/blob/c0e4af73c30331136bf3df722e988cfd3cc48d38/input/fsh/capabilitystatements/CapabilityStatementDocumentAccessProvider.fsh) — abstract requirements statement requiring one deployment-selected security-service coding; describes IUA, SMART Backend Services, and interactive SMART cases.
- [Example Document Access Provider CapabilityStatement source at PR head](https://github.com/euridice-org/eu-health-data-api/blob/c0e4af73c30331136bf3df722e988cfd3cc48d38/input/fsh/examples/Example-CapabilityStatement-DocumentAccessProvider.fsh) — one example deployment selects SMART Backend Services and advertises `SMART-on-FHIR`; it does not establish a universal all-transactions mandate.
- [CapabilityStatement security-service ValueSet source at PR head](https://github.com/euridice-org/eu-health-data-api/blob/c0e4af73c30331136bf3df722e988cfd3cc48d38/input/fsh/capabilitystatements/CapabilityStatementSecurityService.fsh) — permits selection of SMART-on-FHIR or IUA, not an mTLS authentication method.

The ticket comment's “all transactions” quotation is not a requirement in the inspected abstract CapabilityStatement source. The linked example selects SMART for that concrete deployment; it does not set a universal requirement.

## Related Tickets
No related Jira ticket keys are identified in the ticket. The 2026-04-24 comment's CapabilityStatement link is recorded above as ticket evidence, not as implementation evidence.

## Disposition Analysis
The ticket raises a valid security and interoperability question, but “mTLS” can refer to TLS client authentication, certificate-bound access tokens, or both. RFC 8705 support for certificate-bound tokens requires the Authorization Server to bind issuance to the authenticated certificate and the Resource Server to verify proof of possession against that binding; adding a token-endpoint authentication method alone would not establish that behavior. PR #99's current source specifies `private_key_jwt` for SMART Backend Services and short-lived bearer tokens, with no mTLS or certificate-bound-token option. Its abstract CapabilityStatement uses one security-service selection per concrete deployment, while the example specifically selects SMART; this addresses the comment's blanket-mandate concern only in the limited sense that the example is not universal. The sources do not express mTLS as a supported alternative. Profile, discovery, conformance, and resource-server behavior therefore need review before asserting equivalent support.

The ticket's comment alone does not establish that the ballot branch requires SMART Backend Services for every transaction. Preserve the branch's environment-specific authorization selection while the workgroup decides whether a fully specified mTLS option belongs in a later revision.

## Proposed Dispositions
### Disposition A: Accept As Requested
#### Proposal
Add RFC 8705 mutual TLS as an optional SMART Backend Services alternative at the same conformance level as `private_key_jwt`, including client authentication and certificate-bound access-token support.

#### Justification
This directly addresses the ticket's request and could reduce the risk of intercepted bearer tokens. However, it expands the selected profile's conformance surface before the IG has established profile compatibility, token-binding behavior, discovery metadata, certificate lifecycle, or Authorization Server and Resource Server validation requirements. It must not be represented as supported by the current ballot text without resolving those matters.

### Disposition B: Alternative Approach
#### Proposal
Make no normative change to the current ballot requirements. Record RFC 8705 mTLS as a candidate for future work; consider adoption only after standards/profile review confirms compatibility with SMART Backend Services and defines the required client-authentication, certificate-binding, discovery, certificate lifecycle, and Resource Server validation behavior. Require explicit HL7 Europe workgroup approval before adding it as a supported option. Until then, retain the PR's current `private_key_jwt` and bearer-token direction without implying mTLS support.

#### Justification
This keeps the current published conformance claims accurate and avoids conflating mutual-TLS client authentication with certificate-bound tokens. It responds to the higher-assurance use case without weakening or silently broadening the selected profile. The trade-off is that mTLS is not an available IG conformance option in this release; any later addition depends on interoperability analysis and workgroup decision.

### Disposition C: Decline
#### Proposal
Decline adding RFC 8705 mTLS to the IG and close the request without scheduling profile review; retain the current SMART Backend Services and bearer-token requirements.

#### Justification
This avoids adding another authorization mechanism and its certificate-management requirements to the current IG. It is distinct from deferral, but leaves the requested higher-assurance option unexamined and does not resolve whether it can interoperate with the selected profile.

### Recommendation
**Recommended disposition:** B

Defer any mTLS conformance claim to a future, explicitly approved change after profile review. At PR #99's verified open head, the Authorization page specifies `private_key_jwt` and short-lived bearer access tokens, while the abstract CapabilityStatement requires one deployment-selected SMART or IUA security service; the example selects SMART. None of the inspected sources specifies mTLS or certificate-bound tokens. Separately, the ticket remains `Waiting for Input` / `Unresolved`; PR #99 is implementation-branch evidence, not a Jira-linked implementation reference or a merged change. Option B preserves the current direction while avoiding a claim that either mTLS client authentication alone or RFC 8705 certificate-bound tokens are supported. Option A would assert an unreviewed conformance alternative; C would close the question without the requested profile review.

## Next Steps
- Keep the current ballot text and conformance claims unchanged pending an explicit workgroup disposition.
- If HL7 Europe wishes to pursue the request, review RFC 8705 and SMART Backend Services 2.2 compatibility, distinguishing TLS client authentication from certificate-bound access-token validation.
- Define and assess discovery metadata, certificate trust and rotation/revocation responsibilities, Authorization Server token binding, Resource Server proof-of-possession validation, and interoperability test cases before proposing normative text.
- Obtain explicit workgroup approval before adding mTLS as a supported option in a later IG revision.
- Treat the ticket comment's “all transactions” CapabilityStatement statement as a separate conformance-scope question; reconcile it against the intended environment-specific requirements rather than using it as evidence of mTLS support.

## Verification Checklist
- [x] Ticket metadata, description, and available comment reviewed.
- [x] Ticket-linked implementation status is distinguished from the current implementation branch evidence; PR #99 is verified as open and not represented as merged.
- [x] Authorization and relevant CapabilityStatement sources are verified against PR head `c0e4af73c30331136bf3df722e988cfd3cc48d38` on 2026-10-22; two local commits ahead do not change these sources.
- [x] Selected SMART Backend Services grant, client authentication, assertion claims, bearer-token model, and absence of RFC 8705/mTLS/certificate-bound tokens are stated explicitly.
- [x] The ticket comment's “all transactions” claim is checked against current abstract and example CapabilityStatement sources and not treated as a universal requirement.
- [x] Current build references for Authorization and the Document Access Provider CapabilityStatement are included and distinguished from PR evidence.
- [x] Dispositions A, B, and C specify distinct actions and trade-offs.
- [x] Recommendation is explicit and grounded in the current source and ticket evidence.
- [x] No specification, Jira status, or consolidated include changes are proposed as part of this artifact.