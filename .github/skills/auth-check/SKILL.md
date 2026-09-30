---
name: auth-check
description: 'Update or review authentication and authorization content consistently across the EU Health Data API authorization reconciliation worktree. Use for auth changes, SMART Backend Services, IHE IUA alignment, OAuth discovery, scopes, actors, CapabilityStatements, token handling, and pre-PR authorization conformance checks.'
argument-hint: '[review | update | refine] [topic or requirement]'
---

# Authorization Check

Apply the authorization requirements consistently across narrative, computable artifacts, diagrams,
and rendered output in `eu-health-data-api-ballot-recon-auth`.

## Required Input

Before reviewing or editing, load
`.github/instructions/authorization-requirements.instructions.md`. Treat it as the source of truth
for goals, required topics, information ownership, checks, and acceptance criteria.

## Modes

- **Review**: assess existing content and report satisfied, missing, conflicting, or ambiguous
  requirements. Do not edit unless asked.
- **Update**: implement a stated authorization change everywhere affected, then validate it.
- **Refine**: assess whether the requirements remain accurate and sufficient. Propose requirement
  changes separately from specification changes so the user can approve altered policy or scope.

If no mode is supplied, infer it from the request. Use **review** for check/audit questions and
**update** when the user asks to change the specification.

## Procedure

1. Resolve the target worktree and confirm it is
   `eu-health-data-api-ballot-recon-auth`. Preserve unrelated working-tree changes.
2. Read the instruction file and identify the requirement IDs relevant to the requested topic.
3. Establish the current behavior from the owning source first:
   - authorization protocol and policy in `input/pagecontent/authorization.md`;
  - EHDS evidence in `doc/ehds-auth-summary.md`;
  - SMART/IUA comparison evidence and table in `doc/smart-vs-iua.md`;
   - architecture and role groupings in `input/pagecontent/actors.md` and `input/fsh/Actors.fsh`;
   - FHIR and OAuth discovery boundaries in `input/pagecontent/capability-discovery.md`;
   - resource access and scopes in `input/pagecontent/resource-access.md`;
   - workflow application in use-case and exchange pages;
   - computable interactions and security declarations in `input/fsh/capabilitystatements/`.
   - CapabilityStatement human-readable introductions in matching
     `input/pagecontent/CapabilityStatement-<id>-intro.md` files.
4. Build a small impact map from each applicable requirement to its owning source and all dependent
   representations. Do not duplicate normative rules into pages that should only link or summarize.
  Classify every affected CapabilityStatement as an abstract `kind = requirements` artifact or a
  concrete `kind = instance` deployment declaration.
5. In **review** mode, classify each applicable requirement as:
   - `MET`: present, correctly placed, and consistent;
   - `PARTIAL`: present but incomplete or inconsistent;
   - `MISSING`: absent;
   - `CONFLICT`: contradicts another requirement, artifact, or adopted standard;
   - `ADJUST`: the requirement itself needs clarification or revision.
6. In **update** mode, edit the smallest set of source files that makes every dependent
   representation consistent. Never edit generated `output/` by hand.
7. In **refine** mode, separate findings about the specification from proposed edits to the
   instruction file. Ask for approval before changing a requirement's normative meaning.
8. Run focused text and structure checks for actor names, transaction labels, discovery endpoints,
   grants, client authentication, token validation, scope strings, security service codings, and
  requirement keywords (`SHALL`, `SHOULD`, `MAY`). Verify the required `authorization.md` section
  order, every environment-specific flow, all EHDS provisions against `doc/ehds-auth-summary.md`,
  direct EUR-Lex citations for the enacted Article, Recital, and Annex evidence, including Recital 7
  and eIDAS Article 6 for the European Digital Identity Wallet, and inclusion of the maintained
  SMART/IUA comparison table. Classify each SMART use case as Patient Access for Standalone Apps,
  Patient Access for EHR Launch, Clinician Access for Standalone, Clinician Access for EHR Launch,
  or Backend Services. For interactive use cases, verify the complete released capability set,
  authorization-code flow, PKCE, client type, launch handling, and applicable `patient/` and `user/`
  scopes. For Backend Services, separately verify pre-authorization, client credentials, asymmetric
  authentication, and applicable `system/` scopes. Inventory every selected IUA and SMART role,
  confirm it has one ActorDefinition, and verify its introduction in the corresponding protocol
  section. Compare CORS declarations with supported client architectures. Separate SMART scopes from
  IUA MHD transaction scopes and map each scope to an interaction supported by that
  CapabilityStatement. Verify that abstract statements do not fix a protocol service coding and that
  concrete instances advertise exactly their selected `IUA` or `SMART-on-FHIR` coding. Do not invent
  separate security-service codes for SMART Backend Services, Patient Access, or Clinician Access;
  verify those modes through SMART discovery capabilities, grants, client authentication, launch
  context, and scope families. For every IUA or SMART reference, verify an authoritative released-
  specification link is present; detailed claims must use the applicable actor, transaction, flow,
  discovery, scope, token, or CORS section rather than only a generic specification link. The local
  EHDS maintenance document SHALL NOT be linked or rendered in the IG. Verify each top-level
  CapabilityStatement FSH `Description` is concise; verify its matching Publisher-discovered intro
  note contains the detailed human-readable narrative, while `rest.documentation` and
  `rest.security.description` remain in FSH.
9. Build from the target worktree with `./_build.sh build`. Confirm SUSHI results, Publisher
   completion, QA counts, and broken links. Inspect the rendered authorization, actor, capability
  discovery, resource access, ActorDefinition, and CapabilityStatement pages affected by the change.
  Confirm the generated IG exposes the EHDS summary with working primary EUR-Lex links and renders
  the comparison table from its maintained source.
10. Report requirement coverage, files changed, validation evidence, unresolved conflicts, and any
    proposed requirement adjustments.

## Decision Rules

- SMART and IHE IUA are the only authorization specifications considered by this IG. Determine the
  applicable environment from "4.0.1 The European Interoperability Landscape" before selecting
  SMART, IUA, or both. If that definition is unavailable or does not classify the target environment,
  report a blocked conformance decision rather than assuming one protocol globally.
- Apply each selected specification's complete requirements for that environment. Do not infer IUA
  conformance from actor names alone or SMART conformance from a security-service code alone.
- Keep authentication, authorization, consent, patient matching, audit, and local policy distinct.
- A valid access token does not by itself establish consent, treatment relationship, patient
  identity, or entitlement to every matching resource.
- Do not assign authorization-server duties, such as validating a client assertion, to a standalone
  FHIR resource server. Do not require a JWT access-token format unless the adopted specification
  requires it.
- Protected provider actors group with the applicable IUA or SMART Resource Server role. Authorization
  Server is independent unless a deployment explicitly selects optional co-location. Client actors
  group with the applicable authorization-client, app, or backend-service role. This client rule
  includes Document Publisher, Document Consumer, and Resource Consumer; a grouped Publisher/Access
  Provider applies the Resource Server role to its externally protected endpoint.
- Do not equate SMART App Launch with Backend Services. Interactive clinician and patient flows use
  their applicable released capability sets, authorization code, PKCE, and `user/` or `patient/`
  scopes. Backend Services separately uses pre-authorization, client credentials, asymmetric client
  authentication, and normally `system/` scopes.
- Preserve existing SMART scopes only where they match the classified use case. Add IUA MHD
  transaction scopes only for supported ITI-65 through ITI-68 transactions. IUA defines no scope for
  ITI-105.
- Apply CORS according to client architecture: SMART Backend Services and system-to-system IUA do not
  inherently require it; browser-based clients require the protocol or IG-defined CORS behavior.
- Cite only released IUA and SMART publications as normative evidence. Prefer stable section or
  transaction links over publication-root links, and never use mutable CI builds for conformance.
- Where standards or requirements conflict, stop normative edits, cite the conflict, and request a
  decision. Do not silently choose a stronger conformance claim.

## Completion Criteria

- Every applicable requirement has a status and evidence.
- Normative statements live in the correct owning source and summaries do not contradict them.
- `authorization.md` contains all required sections in order, including each environment and flow.
- EHDS details are checked against the maintained source, cite the enacted EUR-Lex provisions directly,
  and do not link or render the local maintenance document. The SMART/IUA comparison table is included
  from its maintained source without a stale divergent copy.
- Every selected IUA and SMART role has an ActorDefinition and is introduced in its protocol section.
- Every SMART use case names its applicable Patient Access, Clinician Access, or Backend Services
  profile; interactive use cases satisfy the complete released capability set and Backend Services
  requirements are not applied to them.
- Every CapabilityStatement security section maps environments and use cases to IUA, SMART, or a fully
  defined dual profile, links to `authorization.md`, and states the correct protocol-role grouping.
  Abstract requirement statements omit a fixed service coding; concrete deployment instances
  advertise exactly the selected coding unless a defined dual profile applies.
- CapabilityStatement scope lists retain and label SMART resource scopes separately from applicable
  IUA MHD transaction scopes, and CORS declarations match the supported client architecture.
- Every IUA and SMART reference has an authoritative released-specification citation appropriate to
  the adjacent claim, and all citation links render without breakage.
- Actor, transaction, flow, discovery, scope, and CapabilityStatement content agree.
- Internal and external Authorization Server deployment descriptions agree across all artifacts.
- The IG build completes with no new authorization-related errors, warnings, or broken links compared
  with the recorded baseline. Pre-existing unrelated findings are documented.
- Any requirement needing adjustment is listed separately with rationale and proposed wording.

## Output Format

1. **Verdict**: `PASS`, `NEEDS CHANGES`, or `BLOCKED`.
2. **Requirement coverage**: requirement ID, status, evidence, and affected files.
3. **Consistency findings**: contradictions or misplaced information.
4. **Changes**: source files changed, or proposed edits in review mode.
5. **Validation**: focused checks, build result, QA counts, and rendered-page checks.
6. **Requirement adjustments**: proposed changes requiring user approval.

## Related Skills

- `build-ig` for the full Publisher lifecycle and failure triage.
- `ig-qa-check` for broader narrative and link quality.
- `branch-context-management` for logical branch and worktree resolution.
