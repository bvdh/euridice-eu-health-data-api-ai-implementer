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

**No explicit ticket-specific sentence in the current target source.** The
published ballot flow's discovery list says Resource Servers SHOULD advertise
`scopes_supported`; if they support `private_key_jwt`, they SHOULD advertise
`token_endpoint_auth_methods_supported` including that method and
`token_endpoint_auth_signing_alg_values_supported` including at least one of
`RS384` or `ES384`. Those are server-published metadata fields. Consumers
request scopes; they do not supply the server's authentication-method or
signing-algorithm metadata.

A prior implementation commit,
[`92e259c`](https://github.com/euridice-org/eu-health-data-api/commit/92e259ce77532c913744974f7dd044850bb73079),
on the separate `ballot-recon-authorization` branch explicitly said clients
(Consumers) MAY rely on advertised capabilities and MAY request scopes listed
in `scopes_supported`. That commit is not in the specified
`eu-health-data-api-ballot-recon-auth` worktree or PR #99. The current target
source instead separates SMART and IUA profiles, distinguishes requested from
granted scopes, requires Resource Servers to enforce granted scopes and
applicable policy, and identifies the SMART `patient/`, `user/`, and
`system/` scope families ([authorization][branch-authorization],
[resource access][resource-access],
[Provider CapabilityStatement][provider-capability]).

PR [#99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99)
is **Open**, with head `c0e4af73c30331136bf3df722e988cfd3cc48d38` and base
`main`; it changes the authorization page, resource-access page, and abstract
Resource Access Provider CapabilityStatement. The target worktree is at
`06f63608d7f01f5e96dc33835308f0567755f24b`, five commits ahead of the PR
head. PR #99 is broad authorization work, but its discussion does not identify
FHIR-56650 and it does not contain the prior ticket-specific Consumer MAY
sentence. The ticket remains `Waiting for Input` with `Unresolved` resolution;
the ticket file has no PR, commit, or comment evidence. The prior branch commit
and broader open PR do not establish current-branch implementation or Jira
acceptance.

## Related Tickets

No parent key, grouping, or related ticket keys are stated in the supplied
ticket.

## Current Build References

- [Authorization current-build candidate][current-build] - checked on
  2026-10-22; returned HTTP 404. No reliable public current-build page or
  parameter-specific anchor could be confirmed. The ballot worktree canonical
  is `http://hl7.eu/fhir/health-data-api`, which does not establish that this
  current-build URL is published.
- [SMART Backend Services 2.2.0][smart-backend] - released profile reference
  used for the SMART system-to-system requirements and the requested-scope /
  granted-scope model.
- [SMART Client Confidential Asymmetric discovery requirements][smart-asym]
  - identifies the metadata associated with advertising support for
  `private_key_jwt`, including authentication methods and signing algorithms.
- [IUA Authorization Client][iua-client] and [IUA Authorization Server][iua-server]
  - released actor sections linked by the current source. They establish
  separate roles, not a shared set of parameters that Consumers supply.
- [Historical Authorization Flow discovery text][historical-flow] - contains
  the Provider metadata SHOULDs that most likely prompted this ticket. The
  ticket's Related URL points instead to the separate “IUA and SMART Backend
  Services” section; the ticket does not confirm that the discovery fields
  were the intended parameters.
- [Historical IUA and SMART Backend Services section][historical-section] -
  context for the ticket's supplied Related URL; not the current branch source.
- **Mapping gap:** the current-build candidate is unavailable, and neither
  the current source nor the ticket establishes which parameters are intended.
  No parameter-specific current-build anchor can be mapped reliably.

## Disposition Analysis

The ticket may refer to the ballot Authorization Flow discovery metadata
SHOULDs, but its placeholder does not name the parameters and its Related URL
points to a different section. The likely discovery items are
`scopes_supported` and, conditionally, the supported `private_key_jwt`
authentication method and signing algorithms. These are Provider-published
metadata, not a shared set of parameters that a Consumer supplies. A Consumer
requests scopes; it does not publish the Provider's discovery metadata.

A prior commit on another branch did state that Consumers MAY rely on
advertised capabilities and MAY request advertised scopes. That is not present
in the specified target branch, and the current IG does not copy that sentence.
The current source instead distinguishes requested from granted scopes and
requires enforcement of granted scopes. PR #99 clarifies actor roles, profile
selection, and authorization responsibilities, but does not implement the
prior explicit Consumer MAY sentence. The remaining ticket/source distinction
is:

- The Healthcare Provider use-case statements select SMART App Launch or
  SMART Backend Services for particular flows, with environment-specific
  SHALL/SHOULD strengths ([source][provider-flow]).
- SMART Backend Services separately requires pre-authorization,
  `client_credentials`, `private_key_jwt`, and normally `system/` scopes.
  Assertion claims and Authorization Server validation are stated as SHALLs;
  discovery metadata is separately addressed in the [SMART discovery
  requirements][discovery-rules] and [asymmetric-client
  profile][smart-asym] ([source][smart-requirements]). These are not one
  Provider parameter list.
- IUA separately describes Authorization Client, Authorization Server, and
  Resource Server responsibilities. The client requests least-privilege
  scopes and the Authorization Server applies issuance policy; the text does
  not map those duties to the ticket's unspecified parameter set
  ([source][iua-roles], [responsibilities][iua-duties]).

The SMART 2.2.0 base profile already defines the backend client's requested
scopes and the server's pre-authorization and scope enforcement
responsibilities. The ballot's discovery metadata SHOULDs concern what a
Provider advertises; they do not imply that a Consumer supplies those same
metadata fields. Because the ticket does not identify its parameters and its
suggested blanket formulation conflates Provider metadata with Consumer scope
requests, the proposed change should be declined without adding new IG
wording. The current source's profile-specific scope model remains in force.

## Proposed Dispositions

### Disposition A: Accept As Requested

#### Proposal - A

Add a separate Consumer statement corresponding to each Provider SHOULD/MAY
parameter in the authorization discovery list, using the ticket's proposed
general formulation.

#### Justification - A

This would make the roles explicit if the list represented parameters that
Consumers actually supply. However, the likely discovery fields are published
by Providers, and the ticket does not identify a Consumer operation for each
field.

### Disposition B: Alternative Approach

#### Proposal - B

Keep the Provider discovery metadata requirements as server responsibilities;
where needed, describe only the distinct Consumer behavior of requesting
scopes that are advertised and supported, without saying Consumers supply
authentication-method or signing-algorithm metadata.

#### Justification - B

This accurately distinguishes metadata publication from scope requests, and
is consistent with SMART Backend Services. It would still add wording to the
IG; the user has directed that no such refinement be made.

### Disposition C: Decline

#### Proposal - C

Make no change to the authorization content and disposition the ticket as not
persuasive. Treat the discovery SHOULDs as Provider metadata publication
requirements and Consumer scope requests as a separate behavior governed by
the selected SMART profile.

#### Justification - C

The ticket's linked parameters are unspecified, and its proposed blanket
Consumer MAY is not technically parallel to the Provider discovery metadata
SHOULDs. The current source states profile-specific scope behavior and granted
scope enforcement. Declining avoids adding a misleading or redundant normative
statement. A limitation is that the current local prose does not repeat the
prior explicit sentence that Consumers MAY request advertised scopes.

### Recommendation

**Recommended disposition:** C

Decline the requested blanket wording. The discovery SHOULDs govern Provider
publication of metadata, while Consumers request scopes; authentication-method
and signing-algorithm metadata are not Consumer-supplied parameters. SMART
Backend Services already defines the client/server scope-request model, and
the current IG distinguishes requested from granted scope. This is more
accurate than Option A's actor conflation. Option B is conceptually sound but
would add a redundant clarification where the SMART profile already defines
the relevant Consumer scope request.

## Next Steps

- If the work group does not accept the proposed decline, ask the reporter to
  identify exactly which parameters and Consumer operations they intended.
- Do not add the proposed blanket wording to the IG; the user has directed no
  specification update for these refinements.
- The public current-build candidate returned HTTP 404 on 2026-10-22, so the
  source comparison uses the specified local implementation worktree and the
  separately cited published 1.0.0-ballot page.

## Verification Checklist

- [x] Ticket metadata, description, and available evidence reviewed; comments
  and implementation references are absent.
- [x] Published ballot discovery SHOULDs and the cited SMART 2.2.0 requirements
  checked; distinguish Provider metadata from Consumer scope requests.
- [x] Prior ticket-specific commit on `ballot-recon-authorization` recorded
  separately from the current target branch and PR evidence.
- [x] Current target source and PR #99 state checked on 2026-10-22; PR remains
  open, does not contain the prior Consumer MAY sentence, and is five commits
  behind the target worktree.
- [x] Current-build candidate returned HTTP 404 on 2026-10-22; the mapping gap
  and source basis are stated.
- [x] Dispositions A/B/C are distinct, with a justified recommendation.
- [x] Resolution quality check completed on 2026-10-22: PASS-WITH-NOTES. The
  ticket's parameter list remains unspecified, the likely discovery parameters
  are not all Consumer-supplied, and the current-build page returned HTTP 404.

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
[smart-asym]:
  https://hl7.org/fhir/smart-app-launch/STU2.2/client-confidential-asymmetric.html#discovery-requirements
[historical-flow]:
  https://hl7.eu/fhir/health-data-api/1.0.0-ballot/en/authorization.html#authorization-flow
[iua-client]:
  https://profiles.ihe.net/ITI/IUA/index.html#34111-authorization-client
[iua-server]:
  https://profiles.ihe.net/ITI/IUA/index.html#34112-authorization-server
[provider-flow]:
  ../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#L254
[smart-requirements]:
  ../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#L300
[discovery-rules]:
  ../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#L304
[iua-roles]:
  ../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#L308
[iua-duties]:
  ../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#L310
[branch-authorization]:
  ../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md
[resource-access]:
  ../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/resource-access.md
[provider-capability]:
  ../../../eu-health-data-api-ballot-recon-auth/input/fsh/capabilitystatements/CapabilityStatementResourceAccessProvider.fsh
