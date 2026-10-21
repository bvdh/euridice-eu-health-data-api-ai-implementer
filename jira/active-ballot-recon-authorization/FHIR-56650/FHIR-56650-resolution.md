# Proposed Resolution for [FHIR-56650](https://jira.hl7.org/browse/FHIR-56650)

## Ticket Summary

| Field | Value |
| --- | --- |
| Key | [FHIR-56650](https://jira.hl7.org/browse/FHIR-56650) |
| Issue Type | Technical Correction |
| Summary | Authorization parameter SHOULDs: clarify Consumers MAY supply |
| Summary (continued) | the same parameters Providers SHOULD support |
| Status | Waiting for Input |
| Resolution | Unresolved |
| Priority | Low |
| Specification | EU Health Data API (R4) (FHIR) |
| Raised in Version | 1.0.0-ballot |
| Work Group | HL7 Europe |
| Reporter | [JoshPriebe][reporter] (ticket also says Aaron Mahr, Epic) |
| Assignee | [Bas van den Heuvel][assignee] |
| Created | 2026-04-29 |
| Updated | 2026-06-10 |
| Related URL | [Authorization ballot section][historical-section] |
| Related Page(s) | Authorization |
| Related Section(s) | Section 4.x: IUA and SMART Backend Services |
| Parent | Not stated |
| Grouping | Not stated |
| Related tickets | Not stated |

## Description

The ticket says the IUA and SMART Backend Services SHOULD list states Provider
obligations while corresponding Consumer obligations are implied. It asks if
the wording should identify parameters Providers MAY or SHOULD support and
explicitly say Consumers MAY supply those parameters.

The proposed resolution is to separate Consumer and Provider obligations and
explicitly state that Consumers MAY supply the same parameters Providers
SHOULD/MAY support. The ticket does not name the parameters or provide an actual
link for the placeholder "[linked parameters]".

## Implementation Status

**Pending.** The ballot reconciliation source snapshot was verified on
2026-10-08 at commit
`019276d397944036d1e502a2acddb3d5e56e158c` (`eu-health-data-api-ballot-recon-auth`);
the worktree was clean. In that snapshot, `authorization.md`,
`resource-access.md`, and the abstract Resource Access Provider
CapabilityStatement contain no matching Provider authorization-parameter list
with corresponding Consumer MAY-supply behavior ([authorization][branch-authorization],
[resource access][resource-access], [Provider CapabilityStatement][provider-capability]).
The resource-scope lists and FHIR search parameters are distinct and do not
identify the ticket's unnamed parameter set; individual `private_key_jwt`
requirements or discovery fields are not inferred as matches. This verifies source-snapshot coverage only: the
commit is not ticket-linked implementation evidence. The Jira ticket remains
`Waiting for Input` with `Unresolved` resolution, and the supplied ticket has
no comments, PRs, commits, or other implementation references. Public
current-build and historical pages and released-standard references below are
publication/profile context only, not the implementation source.

## Related Tickets

No parent key, grouping, or related ticket keys are stated in the supplied
ticket.

## Current Build References

- [Authorization current-build candidate][current-build] - checked on
  2026-10-08; returned HTTP 404. No reliable public current-build page or
  parameter-specific anchor could be confirmed. The ballot worktree canonical
  is `http://hl7.eu/fhir/health-data-api`, which does not establish that this
  current-build URL is published.
- [SMART Backend Services 2.2.0][smart-backend] - released profile reference
  linked by the current authorization source. It does not establish the
  ticket's unspecified cross-protocol parameter set.
- [IUA Authorization Client][iua-client] and [IUA Authorization Server][iua-server]
  - released actor sections linked by the current source. They establish
  separate roles, not the unidentified shared parameter list.
- [Historical IUA and SMART Backend Services ballot section][historical-section]
  - checked; it discusses actor alignment and the `private_key_jwt` example,
  but does not show the parameter SHOULD/MAY list described by this ticket.
  It is historical context, not current normative authority.
- **Mapping gap:** the current-build candidate is unavailable, and neither
  the current source nor the ticket establishes which parameters are intended.
  No parameter-specific current-build anchor can be mapped reliably.

## Disposition Analysis

The current ballot-reconciliation source does not contain a distinct IUA/SMART
Backend Services parameter list assigning Provider SHOULD/MAY support and
corresponding Consumer MAY supply behavior. Its nearby requirements are
separate and must not be merged into such a list:

- The Healthcare Provider use-case statements select SMART App Launch or
  SMART Backend Services for particular flows, with existing SHALL/SHOULD
  strengths ([source][provider-flow]).
- SMART Backend Services separately requires pre-authorization,
  `client_credentials`, `private_key_jwt`, and normally `system/` scopes.
  Assertion claims and Authorization Server validation are stated as SHALLs;
  discovery metadata fields have their own [publication rules][discovery-rules]
  ([source][smart-requirements]). These are not one Provider parameter list.
- IUA separately describes Authorization Client, Authorization Server, and
  Resource Server responsibilities. The client requests least-privilege
  scopes and the Authorization Server applies issuance policy; the text does
  not map those duties to the ticket's unspecified parameter set
  ([source][iua-roles], [responsibilities][iua-duties]).

The released SMART and IUA references provide relevant profile and actor
context, but the ticket supplies neither parameter names nor a normative source
assigning the intended Consumer and Provider behaviors. The historical ballot
section also does not resolve that omission. The parameter set, profile,
endpoint, and actor mapping need confirmation before normative wording is
adopted. Existing keyword strength and scope must be preserved.

## Proposed Dispositions

### Disposition A: Accept As Requested

#### Proposal - A

Once the exact parameter set and sources are confirmed, state Consumer and
Provider behavior separately: Consumers MAY supply the identified parameters,
while Providers retain the ticket's stated SHOULD or MAY support level for each
corresponding parameter. Apply this only to the confirmed set and profile or
endpoint.

#### Justification - A

This directly addresses the reported ambiguity while keeping the actors'
behaviors explicit. It cannot be applied faithfully until the missing parameter
list and normative mapping are supplied.

### Disposition B: Alternative Approach

#### Proposal - B

Before adding normative prose, establish a parameter-by-parameter mapping for
the affected profile(s). Record each parameter, endpoint/message direction,
Consumer or Authorization Client behavior, Provider or Authorization Server
behavior, source section, and existing normative strength. Then clarify each
mapped row or sentence; do not introduce a blanket cross-protocol Consumer MAY
or Provider SHOULD/MAY statement.

#### Justification - B

The current IG has distinct SMART Backend Services flow, assertion, discovery,
and IUA actor requirements rather than the single list described in the ticket.
A sourced mapping can resolve the role ambiguity without transferring a
keyword, actor duty, or scope across requirements. Until that mapping exists,
this is a candidate wording clarification, not an adopted edit.

### Disposition C: Decline

#### Proposal - C

Make no change to the authorization content and close the ticket as not
persuasive because its parameter set and normative source are not identified.

#### Justification - C

This avoids introducing an unsupported rule. However, it leaves the reported
Consumer/Provider ambiguity unresolved if the requester can supply the intended
parameter list and source.

### Recommendation

**Recommended disposition:** B

Use a parameter-by-parameter, source-backed clarification after the requester
or work group identifies the intended set. This is preferable to accepting a
blanket statement now: the available current and historical text does not
identify the claimed list, and adjacent SMART discovery fields, JWT assertion
claims, scopes, and IUA responsibilities have different roles and normative
strengths. Option A remains viable when those details are confirmed; declining
now would avoid unsupported wording but leave the question unresolved.

## Next Steps

- Ask the requester or work group for the parameter names/links and originating
  paragraph or released-standard section.
- Confirm each parameter's profile, endpoint/message, Consumer/Authorization
  Client behavior, Provider/Authorization Server behavior, and strength.
- Revisit current-build mapping when the public authorization page is
  available. Until then, released-standard references provide context, not
  proof of the missing list.
- Do not change the specification or treat this candidate clarification as
  adopted wording under this proposal.

## Verification Checklist

- [x] Ticket metadata, description, and available evidence reviewed; comments
  and implementation references are absent.
- [x] Current authorization text and cited historical ballot section checked;
  no matching Provider parameter list was found.
- [x] Released SMART Backend Services and IUA actor references included
  without treating them as authority for an unidentified mapping.
- [x] Current-build mapping gap recorded; candidate page returned HTTP 404 on
  2026-10-08.
- [x] Dispositions A/B/C are distinct, with a justified recommendation.
- [x] Resolution quality check completed: PASS-WITH-NOTES. The parameter set
  remains unidentified, and the candidate current-build page returned HTTP 404.

[reporter]:
  https://jira.hl7.org/secure/ViewProfile.jspa?name=jpriebe%40epic.com
[assignee]:
  https://jira.hl7.org/secure/ViewProfile.jspa?name=bvdh
[historical-section]:
  https://hl7.eu/fhir/health-data-api/1.0.0-ballot/en/authorization.html#iua-and-smart-backend-services
[current-build]:
  https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html
[smart-backend]:
  https://hl7.org/fhir/smart-app-launch/STU2.2/backend-services.html
[iua-client]:
  https://profiles.ihe.net/ITI/IUA/index.html#34111-authorization-client
[iua-server]:
  https://profiles.ihe.net/ITI/IUA/index.html#34112-authorization-server
[provider-flow]:
  ../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#L155
[smart-requirements]:
  ../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#L175
[discovery-rules]:
  ../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#L179
[iua-roles]:
  ../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#L185
[iua-duties]:
  ../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#L187
[branch-authorization]:
  ../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md
[resource-access]:
  ../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/resource-access.md
[provider-capability]:
  ../../../eu-health-data-api-ballot-recon-auth/input/fsh/capabilitystatements/CapabilityStatementResourceAccessProvider.fsh
