# Pre-applied Resolution for [FHIR-56650](https://jira.hl7.org/browse/FHIR-56650)

## Evidence and PR State

- Ticket analysis: [FHIR-56650-resolution.md](./FHIR-56650-resolution.md) (verified against current target source on 2026-10-22 and live PR state on 2026-10-23)
- SMART normative analysis: [FHIR-56650-smart-normative-language-analysis.md](./FHIR-56650-smart-normative-language-analysis.md)
- PR: [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) — **Open** as of 2026-10-23; head `c0e4af73c30331136bf3df722e988cfd3cc48d38`, base `main`, updated 2026-10-21. It includes broad authorization source changes but does not identify FHIR-56650 or contain its requested explicit Consumer MAY sentence.
- Target implementation worktree: `eu-health-data-api-ballot-recon-auth` at `06f63608d7f01f5e96dc33835308f0567755f24b2`, five commits ahead of PR #99. Its authorization text distinguishes requested from granted scopes and requires enforcement of granted scopes; it does not repeat the earlier explicit Consumer MAY sentence.
- Historical context: commit [`92e259c`](https://github.com/euridice-org/eu-health-data-api/commit/92e259ce77532c913744974f7dd044850bb73079) on the separate `ballot-recon-authorization` branch said Consumers MAY rely on advertised capabilities and MAY request advertised scopes. This commit is not part of the target implementation branch.

## Proposed Disposition

**Not Persuasive**

**Rationale:** The ticket does not identify the parameters it means. The likely SHOULDs are Provider discovery metadata: `scopes_supported`, and conditionally the supported `private_key_jwt` method and signing algorithms. Consumers do not supply the Provider's authentication-method or signing-algorithm metadata. Under SMART Backend Services, a client requests scopes at the token endpoint and the Authorization Server evaluates that request against the client's pre-authorized access and returns the granted scope. Thus, Consumer scope requests are distinct from Provider discovery publication. The requested blanket statement that Consumers MAY supply the same parameters conflates these roles. No additional IG wording is proposed.

## Proposed Resolution Text

No change is proposed. The Provider SHOULDs in the ballot Authorization Flow concern publication of SMART discovery metadata, including supported scopes and, conditionally, client authentication methods and signing algorithms. Consumers do not supply those discovery fields. In SMART Backend Services, the client requests scopes at the token endpoint; the Authorization Server evaluates the request against the client's pre-authorized access and returns the granted scope. Requesting scopes is not the same behavior as supplying Provider metadata. The current authorization changes in [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) clarify authorization actors and protocol responsibilities but do not establish the ticket's unspecified blanket Consumer MAY statement. The request is not persuasive as written, and no specification change is proposed.

## Proposed Change Category

**Category:** Not applicable — no specification change is proposed.

**Rationale:** The recommendation is to make no change to the authorization content. The local ticket record does not provide a controlled Jira change-category value for a no-change disposition.

## Proposed Change Impact

**Impact:** Not applicable — no specification change is proposed.

**Rationale:** This proposal adds no conformance requirement and changes no existing behavior. The prior Consumer MAY sentence was committed on a different branch, not the target implementation branch.
