# Proposed Resolution for [FHIR-56367](https://jira.hl7.org/browse/FHIR-56367)

## Ticket Summary

| Field | Value |
| --- | --- |
| Key | [FHIR-56367](https://jira.hl7.org/browse/FHIR-56367) |
| Issue Type | Change Request |
| Status | Waiting for Input |
| Resolution | Unresolved |
| Reporter | [Giorgio Cangioli](https://jira.hl7.org/secure/ViewProfile.jspa?name=giorgio) |
| Assignee | [Bas van den Heuvel](https://jira.hl7.org/secure/ViewProfile.jspa?name=bvdh) |
| Created | 2026-04-16 |
| Priority | Medium |
| Specification | EU Health Data API (R4) (FHIR) |
| Related Page(s) | Regulatory Anchors |
| Grouping | Not recorded in the ticket source |

## Description

The ticket asks for an eIDAS and EU Digital Identity Wallet note for Access
Providers. Its suggested wording is: “Access mechanisms SHALL comply with the
eIDAS Regulation and, where applicable, the EU Digital Identity Wallet
requirements.” It also suggests citing the relevant regulations or
specifications.

A ticket comment from KatieReynolds (2026-05-13) cautions that the proposed
wording is too broad: the EHDS requirements concern health professional and
natural-person access services and cross-border exchange, not every EHR vendor
or API. The comment refers to EHDS Articles 12 and 16, future implementing acts
under Article 16(2), and proxy alignment in Recital 21; it notes that some EHR
deployments will operate the relevant services. It points to potential future
work for details not settled in this version.

The current authorization page also summarizes EHDS Recital 7 and eIDAS
Article 6, and describes a Wallet as a possible source of an
electronic-identification result. It does not select a Wallet presentation
format or define a Wallet-to-Authorization-Server profile.

## Implementation Status

**Ticket disposition: Pending.** The Jira source says Waiting for
Input / Unresolved. Its comments contain no PR, commit, or other Jira-linked
implementation evidence. The ballot branch below is authoritative for the
current implementation snapshot, but its content alone does not establish
that Jira has resolved this ticket.

**Ballot branch implementation snapshot:**

- Logical branch: `ballot-recon-authorization`.
- Fork Git branch: `eu-health-data-api-ballot-recon-auth`.
- Commit: `019276d397944036d1e502a2acddb3d5e56e158c`, dated 2026-10-08.
- Fork worktree: clean at that commit.
- Source: [authorization.md](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md) and [actors.md](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/actors.md).

**Verified branch coverage:**

- In [Using eIDAS for User Authorization](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#using-eidas-for-user-authorization), an Authorization Server SHALL use an eIDAS-recognized electronic-identification means to authenticate an end user where the selected environment requires electronic identification under the EHDS. This applies to interactive SMART or IUA authorization-code flows, not pre-authorized SMART Backend Services using `client_credentials`.
- The Wallet can provide that identification result where applicable. The branch does not require every deployment to use a Wallet or specify a Wallet presentation format or Wallet-to-Authorization-Server profile. Its Wallet notes also distinguish voluntary user-requested use and the Authorization Server's Wallet Relying Party role when it requests Wallet attributes.
- The [Document Access Provider](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/actors.md#document-access-provider) and [Resource Access Provider](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/actors.md#resource-access-provider) group with the selected IUA Resource Server or SMART FHIR Resource Server. The Authorization Server is independent; it MAY be co-located but is not a required provider grouping. The actor page links generally to environment-specific Authorization requirements, but does not directly cross-reference the eIDAS section or impose a universal eIDAS/Wallet duty on Access Providers.

This is substantive branch coverage of the ticket's regulatory intent, subject to environment and service applicability. It is not evidence that the ticket itself was implemented or resolved; the Jira record still has no ticket-linked implementation evidence.

## Related Tickets

No parent ticket or related-ticket link is recorded in the source ticket. The
consolidated proposed-resolution analysis lists this request as partially
addressed and suggests keeping the obligation scoped to applicable access
services, with an Access Provider cross-reference as a possible clarification.
That analysis is secondary context; the ticket and current specification
control this proposal.

## Published Current-Build Context (Not Implementation Evidence)

The following links provide published context only. They are not evidence of
the branch snapshot or of ticket-linked implementation.

<!-- markdownlint-disable MD013 -->
- [Authorization — EHDS Requirements](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#ehds-requirements) — summarizes the enacted EHDS provisions, eIDAS Article 6, and the Wallet context.
- [Authorization — Using eIDAS for User Authorization](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#using-eidas-for-user-authorization) — states the environment-conditioned electronic-identification rule and describes the Wallet as a possible identification means.
- [Actors and Transactions — Document Access Provider](https://hl7.eu/fhir/health-data-api/current-build/en/actors.html#document-access-provider) and [Resource Access Provider](https://hl7.eu/fhir/health-data-api/current-build/en/actors.html#resource-access-provider) — define the provider roles and selected protocol-specific Resource Server groupings.
<!-- markdownlint-enable MD013 -->

**Candidate mapping clarification:** The actor entries already link to the
general environment-specific Authorization requirements. A direct
Access-Provider-to-eIDAS-section cross-reference is absent and may be considered
as an informative candidate only. The branch does not define a universal
Access Provider eIDAS/Wallet obligation. Public availability of the published
links above was not independently verified in this session.

## Disposition Analysis

The ballot branch already represents the regulatory intent in its
environment-conditioned Authorization rule and Wallet discussion; the
Access-Provider-specific framing is not present. A blanket SHALL on all Access
Providers or access mechanisms would risk applying electronic-identification
and Wallet requirements to deployments that do not provide the EHDS access
services to which the cited requirements apply. It could also conflate
eIDAS-recognized identification with a requirement to deploy or support a
particular Wallet protocol.

The remaining decision is whether to add an informative actor-page
cross-reference to the existing rule; this is a candidate for workgroup
consideration, not a statement that the cross-reference currently exists. Any
new normative provider obligation should await an explicit determination of
the applicable service/deployment boundary and supporting legal or
implementing-act requirements.

## Proposed Dispositions

### Disposition A: Accept As Requested

#### Proposal (A)

Add the suggested statement that access mechanisms SHALL comply with eIDAS and,
where applicable, EU Digital Identity Wallet requirements, with citations to
the relevant regulations.

#### Justification (A)

This makes the requested regulatory context prominent for implementers.
However, as phrased, “access mechanisms” may be read to cover every Access
Provider or API deployment, and the Wallet clause may be read as a Wallet
conformance mandate. The ticket comment and current authorization model do not
support that universal interpretation.

### Disposition B: Alternative Approach

#### Proposal (B)

Accept the request's narrower regulatory intent as represented by the current
ballot branch: retain its environment-conditioned eIDAS and Wallet discussion
in Authorization, and consider a direct informative cross-reference from each
relevant Access Provider actor description to that section. Treat the
cross-reference as a candidate, not existing branch content or a new
conformance requirement. It must not imply that every Access Provider operates
an Authorization Server, performs end-user authentication, or must implement
a Wallet protocol. Any additional normative provider-level obligation is a
separate workgroup decision requiring support from applicable EHDS provisions
or implementing acts.

#### Justification (B)

This preserves the ticket’s regulatory intent while matching the existing
separation between provider/resource-server responsibilities and Authorization
Server responsibilities. It avoids broadening the environment-specific
authorization model and reflects the ticket comment that requirements apply to
certain access services and deployments. The existing page already explains
that Wallet use may be applicable without defining a universal Wallet
integration profile. The trade-off is that an actor cross-reference would
improve discoverability but would not create a new provider-level conformance
requirement.

### Disposition C: Decline

#### Proposal (C)

Make no change: rely on the current Authorization page and do not add an Access
Provider cross-reference or new requirement.

#### Justification (C)

The current page already contains the eIDAS/Wallet context and a conditional
electronic-identification requirement, while the actor page appropriately
avoids assigning those responsibilities to all providers. Declining avoids
duplication and scope ambiguity. The drawback is that readers entering through
the Access Provider actor may not readily find the relevant
environment-conditioned text.

### Recommendation

Recommended disposition: **B**

The ballot branch already covers the regulatory basis and Wallet context for
applicable deployments, so the broad SHALL requested in A is not supported as a
universal Access Provider obligation. B preserves that environment-specific
model and makes a direct actor cross-reference a candidate for workgroup
decision to address discoverability. The branch coverage does not resolve the
Jira ticket: the ticket remains Waiting for Input / Unresolved absent
ticket-linked implementation evidence and a disposition decision. No new
normative provider obligation should be introduced without a decision on
service applicability and legal basis.

## Next Steps

1. Decide whether an informative direct eIDAS cross-reference from relevant provider actors is useful; treat it as a candidate only.
2. Confirm scope against EHDS Articles 12/16 and preserve the separation between Access Provider and Authorization Server responsibilities.
3. Avoid universal Wallet or EHR conformance without a workgroup decision.
4. Keep Jira status unresolved unless the workgroup records a disposition; this branch snapshot alone does not establish ticket resolution.

## Verification Checklist

- [x] Ticket metadata, description, and comments reviewed.
- [x] Ballot branch, commit, date, and clean worktree are recorded separately from Jira-linked implementation evidence.
- [x] Authorization and actor coverage are checked against the branch source files; branch coverage is distinguished from ticket resolution.
- [x] Published build links are labeled as context only; any direct actor cross-reference is identified as a candidate only.
- [x] Dispositions A, B, and C are concrete and distinct.
- [x] Recommendation is explicit and compares the scope and discoverability trade-offs.
