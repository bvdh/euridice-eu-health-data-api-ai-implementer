---
name: "EU Health Data API Authorization Requirements"
description: "Use when updating or reviewing authentication, authorization, SMART Backend Services, IHE IUA, OAuth discovery, scopes, actors, token handling, or security CapabilityStatements in the ballot authorization reconciliation worktree."
applyTo: "{eu-health-data-api-ballot-recon-auth/input/pagecontent/**,eu-health-data-api-ballot-recon-auth/input/fsh/**,eu-health-data-api-ballot-recon-auth/doc/ehds-auth-summary.md,eu-health-data-api-ballot-recon-auth/doc/smart-vs-iua.md,eu-health-data-api-ballot-recon-auth/sushi-config.yaml}"
---

# Authorization Requirements

**AUTH-GEN-001:** The specification needs to address the authorization and authentication aspects
of the API.

This file is the evolving source of truth for the authorization reconciliation. Keep requirements
stable and traceable by ID. Change normative meaning only after recording the rationale and obtaining
user approval.

## Goals And Boundaries

- **AUTH-GEN-002:** SMART and IHE IUA are the only authorization specifications considered by this
  IG. For each environment defined in "4.0.1 The European Interoperability Landscape," state whether
  SMART, IUA, or both are recommended or required and define the resulting conformance target.
- **AUTH-GEN-003:** Keep client authentication, user authentication, token issuance, authorization
  decisions, resource-server enforcement, consent, patient matching, audit, and local policy as
  distinct concerns.
- **AUTH-GEN-004:** State the supported usage context for each environment and classify every SMART
  use case as Patient Access, Clinician Access, Backend Services, or an explicit combination of
  separately defined flows. SMART Backend Services applies only when the client is pre-authorized,
  supports asymmetric confidential-client authentication, and no runtime end-user authorization is
  required. A backend client may have user interaction unrelated to access authorization.
- **AUTH-GEN-005:** Do not imply that a valid token proves consent, treatment relationship, patient
  identity, or access entitlement beyond its granted scope and applicable local policy.
- **AUTH-GEN-006:** Identify out-of-band responsibilities, including client registration, identity
  proofing, trust establishment, key lifecycle, pre-authorization, policy administration, revocation,
  and federation where applicable.

## Standards And Conformance

- **AUTH-STD-001:** Where SMART applies, each use case SHALL explicitly select interactive SMART App
  Launch, SMART Backend Services, or both as separate flows. Interactive clinician and patient flows
  use the authorization-code grant with PKCE and the applicable Patient Access or Clinician Access
  capability set. Backend Services uses pre-authorized access, the client-credentials grant,
  asymmetric client authentication, and normally `system/` scopes. Requirements from one profile
  SHALL NOT be inherited by the other unless SMART App Launch 2.2 explicitly makes them common.
- **AUTH-STD-002:** Where IUA applies, identify the required actors, transactions, options, metadata,
  claims, transaction scopes, and FHIR security-service codings for that environment.
- **AUTH-STD-003:** Where both apply, define their relationship and precedence topic by topic. Satisfy
  both sets of requirements or document an explicit resolution for every conflict; do not treat
  conceptual alignment as dual conformance.
- **AUTH-STD-004:** Use the latest officially released versions as of September 30, 2026:
  - HL7 SMART App Launch 2.2.0 (STU 2.2), published April 30, 2024, package
    `hl7.fhir.uv.smart-app-launch#2.2.0`, with permanent publication at
    `https://hl7.org/fhir/smart-app-launch/STU2.2/`;
  - IHE ITI Technical Framework Supplement, Internet User Authorization (IUA), Revision 2.5,
    Trial Implementation, published June 18, 2026, at
    `https://profiles.ihe.net/ITI/IUA/index.html`.
  Use these released publications for conformance requirements, not mutable CI or working-group
  renderings. A future version change requires explicit review and an update to this requirement.
- **AUTH-STD-005:** Label SMART token exchange steps as SMART operations unless the specification
  adopts every applicable requirement of the cited IUA transaction.
- **AUTH-STD-006:** Treat "4.0.1 The European Interoperability Landscape" as the authority for
  environment classification. If the section is absent, inaccessible, or ambiguous, flag the gap and
  do not invent environment categories.
- **AUTH-STD-007:** Every reference to IHE IUA or SMART App Launch in narrative, ActorDefinitions,
  CapabilityStatements, diagrams with linkable captions, and examples SHALL include an authoritative
  link to the released specification or the specific relevant section. Prefer the narrowest stable
  target that supports the statement:
  - SMART App Launch 2.2 publication:
    `https://hl7.org/fhir/smart-app-launch/STU2.2/`;
  - SMART Backend Services:
    `https://hl7.org/fhir/smart-app-launch/STU2.2/backend-services.html`;
  - SMART app launch flows:
    `https://hl7.org/fhir/smart-app-launch/STU2.2/app-launch.html`;
  - SMART scopes and launch context:
    `https://hl7.org/fhir/smart-app-launch/STU2.2/scopes-and-launch-context.html`;
  - SMART conformance and discovery:
    `https://hl7.org/fhir/smart-app-launch/STU2.2/conformance.html`;
  - SMART asymmetric client authentication:
    `https://hl7.org/fhir/smart-app-launch/STU2.2/client-confidential-asymmetric.html`;
  - IHE IUA Revision 2.5 publication:
    `https://profiles.ihe.net/ITI/IUA/index.html`;
  - IUA transaction pages, such as ITI-71, ITI-72, ITI-102, and ITI-103:
    `https://profiles.ihe.net/ITI/TF/Volume2/ITI-71.html`,
    `https://profiles.ihe.net/ITI/TF/Volume2/ITI-72.html`,
    `https://profiles.ihe.net/ITI/TF/Volume2/ITI-102.html`, and
    `https://profiles.ihe.net/ITI/TF/Volume2/ITI-103.html`.
  Use the released specification root only when no stable section or transaction link is available.
  Do not cite mutable CI or working-group renderings as normative evidence.
- **AUTH-STD-008:** A citation SHALL support the specific adjacent claim. A general specification link
  does not adequately support a detailed statement about an actor, transaction, grant, discovery
  mechanism, scope, claim, token rule, or CORS behavior when a stable section-level link exists.

## Required Authorization Page Content

`input/pagecontent/authorization.md` SHALL contain the following sections in this order. Headings may
be refined for readability, but the content, normative strength, and traceability SHALL be preserved.

### Introduction

- **AUTH-PAGE-INTRO-001:** State that authentication and authorization are important and required by
  the EHDS.
- **AUTH-PAGE-INTRO-002:** State that this specification uses IHE IUA, SMART App Launch, or both,
  depending on the environment, and refer to "4.0.1 The European Interoperability Landscape."
- **AUTH-PAGE-INTRO-003:** Provide a short roadmap of the page covering EHDS requirements, the
  SMART/IUA comparison, environment-specific requirements, each specification's actors and
  requirements, and potential future work.

### EHDS Requirements

- **AUTH-PAGE-EHDS-001:** Summarize what the EHDS states about identification, authentication,
  the European Digital Identity Wallet and eIDAS identification means, authorization, proxy or
  representation, security, and logging. Provide direct links to the relevant enacted Article,
  Recital, and Annex text in Regulation (EU) 2025/327 on EUR-Lex and to eIDAS Article 6 where
  describing the Wallet's identification-means basis. Do not imply that the EHDS establishes a
  separate operative Wallet authorization protocol.
- **AUTH-PAGE-EHDS-002:** Use `doc/ehds-auth-summary.md` as the maintained source for checking the
  rendered EHDS summary. Do not link to or render that local maintenance document in the IG;
  `authorization.md` SHALL cite the corresponding enacted EUR-Lex provisions directly.
- **AUTH-PAGE-EHDS-003:** The page summary SHALL remain concise while directly linking every relevant
  Article, Recital, and Annex provision identified by `doc/ehds-auth-summary.md`. Preserve the note
  that this is a factual summary rather than legal advice and that some details depend on future
  implementing acts.

### IHE IUA And SMART App Launch

- **AUTH-PAGE-COMPARE-001:** Explain the overlap, differences, strengths, weaknesses, and architectural
  tradeoffs of IHE IUA and SMART App Launch without presenting either as a subset of the other.
- **AUTH-PAGE-COMPARE-002:** Include the comparison table from `doc/smart-vs-iua.md` in the generated
  IG. Treat that document as the maintained table source and keep the rendered table synchronized.
- **AUTH-PAGE-COMPARE-003:** Conclude that SMART App Launch best suits situations requiring:
  - context-aware application launch; or
  - authorization endpoint discovery based on the FHIR server URL.
- **AUTH-PAGE-COMPARE-004:** Conclude that IHE IUA best suits situations requiring:
  - communication in established environments where actor locations, including the Authorization
    Server, are preconfigured; or
  - user and patient information to be carried with the access token.
- **AUTH-PAGE-COMPARE-005:** State that this specification recommends or requires one of these
  specifications for each environment. Future versions may explore hybrid deployments.
- **AUTH-PAGE-COMPARE-006:** State that SMART App Launch deployments SHOULD use IUA-formatted JWT
  access tokens. Define or reference the exact selected IUA JWT claim profile so this recommendation
  is implementable, and do not imply full IUA protocol conformance from token formatting alone.

### Environment-Specific Requirements

- **AUTH-PAGE-ENV-001:** Provide a subsection for every environment defined by "4.0.1 The European
  Interoperability Landscape." Add environment-specific regulatory requirements where applicable and
  distinguish `SHALL`, `SHOULD`, recommendations, and cases where this IG gives no explicit guidance.
- **AUTH-PAGE-ENV-002:** For **MyHealth@EU**, recommend IHE IUA and state that this specification gives
  no additional explicit authorization guidance.
- **AUTH-PAGE-ENV-003:** For the **National Interoperability Infrastructure**, recommend IHE IUA
  because it supports carrying user and patient context or claims. Use IUA terminology accurately;
  do not describe those token claims as OAuth scopes.
- **AUTH-PAGE-ENV-004:** For **Wellness Applications**, require SMART (`SHALL`) and cover these flows:
  - Wellness Application to HDAS: require SMART App Launch because authorization endpoint discovery
    is derived from the FHIR endpoint;
  - Wellness Application to a healthcare-provider-hosted EHR system, when preconfigured: use SMART
    Backend Services only when all Backend Services applicability conditions are met, including
    pre-authorization, asymmetric confidential-client authentication, and no runtime end-user
    authorization;
  - clinician-launched Wellness Application: use SMART App Launch for a clinician, with the FHIR
    server hosted by the Wellness Application so information can be retrieved into the EHR, and
    support launch in the context of the current patient; select the Clinician Access for EHR Launch
    capability set when launched from an EHR and the Clinician Access for Standalone capability set
    for standalone access;
  - patient-launched Wellness Application: use SMART App Launch for a patient, with the FHIR server
    provided by the EHR system, allowing information to be uploaded to the EHR; refer to Argonaut
    Write and its successor or follow-up specification; select the applicable Patient Access for EHR
    Launch or Patient Access for Standalone Apps capability set.
- **AUTH-PAGE-ENV-005:** For the **Healthcare Provider** environment, require SMART (`SHALL`) and cover:
  - system-to-system upload from provider systems through the gateway to the National
    Interoperability Infrastructure: SMART Backend Services;
  - clinician access: SMART App Launch using the Clinician Access for Standalone or Clinician Access
    for EHR Launch capability set, as applicable;
  - the applicable SMART subset is selected per use case and SHALL be stated for each use case.
- **AUTH-PAGE-ENV-006:** For every flow, identify the client, Authorization Server, Resource Server,
  FHIR server, user type where applicable, launch mode, data direction, and whether endpoints are
  discovered or preconfigured. Resolve naming ambiguities such as HDAS before asserting conformance.

### SMART App Launch

- **AUTH-PAGE-SMART-001:** Introduce and link every SMART `ActorDefinition` used by this IG: SMART App,
  SMART Backend Service, SMART FHIR Resource Server, SMART Authorization Server, and SMART Launching
  System. List the requirements applicable to each selected SMART mode, including Backend Services,
  standalone launch, EHR launch, clinician context, patient context, discovery, registration, client
  authentication, grant, scopes, token response, launch context, and Resource Server enforcement.
- **AUTH-PAGE-SMART-002:** Make the selected SMART subset explicit for each environment and use case;
  do not apply Backend Services restrictions to interactive launch flows or vice versa.
- **AUTH-PAGE-SMART-003:** Include a CORS subsection. State that SMART Backend Services uses
  confidential server-side clients and does not by itself require browser CORS. Where the same
  deployment supports purely browser-based SMART Apps, require the SMART App Launch 2.2 CORS rules:
  public `metadata` and `.well-known/smart-configuration` discovery endpoints are accessible from any
  origin, while token and protected FHIR endpoints allow the client's registered origin or origins.
  Distinguish this conditional browser-app requirement from SMART Backend Services.
- **AUTH-PAGE-SMART-004:** For every interactive clinician or patient use case, name and require the
  applicable released SMART App Launch 2.2 capability set from
  `https://hl7.org/fhir/smart-app-launch/STU2.2/conformance.html`:
  - **Patient Access for Standalone Apps:** `launch-standalone`; at least one of `client-public` or
    `client-confidential-symmetric` (and MAY support `client-confidential-asymmetric`);
    `context-standalone-patient`; `permission-patient`;
  - **Patient Access for EHR Launch:** `launch-ehr`; at least one of `client-public` or
    `client-confidential-symmetric` (and MAY support `client-confidential-asymmetric`);
    `context-ehr-patient`; `permission-patient`;
  - **Clinician Access for Standalone:** `launch-standalone`; at least one of `client-public` or
    `client-confidential-symmetric` (and MAY support `client-confidential-asymmetric`);
    `permission-user`; `permission-patient`;
  - **Clinician Access for EHR Launch:** `launch-ehr`; at least one of `client-public` or
    `client-confidential-symmetric` (and MAY support `client-confidential-asymmetric`);
    `context-ehr-patient`; `context-ehr-encounter`; `permission-user`; `permission-patient`.
  Do not silently add optional capabilities such as `sso-openid-connect`, `permission-v2`, or refresh
  token support to a released capability set; identify each additional IG requirement separately.
- **AUTH-PAGE-SMART-005:** Interactive Patient Access and Clinician Access flows SHALL use the
  authorization-code grant and PKCE as defined by
  `https://hl7.org/fhir/smart-app-launch/STU2.2/app-launch.html`. All SMART Apps SHALL support PKCE;
  servers SHALL support `S256` and SHALL NOT support `plain`. Public clients do not authenticate at
  the token endpoint. Confidential interactive clients use their registered symmetric or asymmetric
  authentication method and are not universally required to use `private_key_jwt`.

### IHE IUA

- **AUTH-PAGE-IUA-001:** Introduce and link the `ActorDefinition` for each formal IHE IUA actor:
  Authorization Client, Authorization Server, and Resource Server. List the requirements applicable
  to each selected IUA mode, including required transactions, selected options, metadata, client and
  user authentication, claims, token handling, introspection where selected, enforcement, and
  relevant audit obligations.
- **AUTH-PAGE-IUA-002:** Distinguish core IUA requirements from transaction-specific integration
  requirements and from this IG's additional recommendations.
- **AUTH-PAGE-IUA-003:** Include a CORS subsection. State that IHE IUA does not define a universal CORS
  requirement. System-to-system IUA transactions do not require CORS. Deployments supporting
  browser-based IUA Authorization Clients SHALL define an explicit CORS policy: public metadata may
  be retrieved cross-origin, while token and protected-resource endpoints allow only explicitly
  authorized client origins. Identify this as an additional requirement of this IG, not an inherited
  IUA requirement.

### Potential Future Work

- **AUTH-PAGE-FUTURE-001:** Include an IHE IUA/SMART App Launch refinement item covering possible
  hybrid deployments, claim and scope mappings, discovery precedence, token-context precedence, and
  other unresolved dual-conformance decisions. Do not make future work normative for this release.

## Actors And Responsibilities

- **AUTH-ACTOR-000:** Represent every IHE IUA and SMART App Launch actor or conformance role selected
  by this IG as a separate FHIR `ActorDefinition` resource. Introduce and link those ActorDefinitions
  from the corresponding **IHE IUA** and **SMART App Launch** sections of `authorization.md`.
- **AUTH-ACTOR-001:** The Authorization Client authenticates to the Authorization Server, requests
  least-privilege scopes, and presents the resulting bearer access token to the Resource Server.
- **AUTH-ACTOR-002:** The Authorization Server authenticates the client, validates its client
  assertion, applies issuance policy, constrains requested scopes to authorized scopes, prevents
  assertion replay, and issues access tokens.
- **AUTH-ACTOR-003:** The Resource Server validates access-token activity, expiry, issuer/signature or
  introspection result, audience or resource binding where applicable, granted scope, request/claim
  consistency, and local access policy.
- **AUTH-ACTOR-004:** Do not assign client-assertion validation to a standalone Resource Server or
  access-token enforcement to the Authorization Client.
- **AUTH-ACTOR-005:** Describe internal and external Authorization Server deployments consistently.
  Grouping with an Authorization Server is conditional wherever an external server is permitted.
- **AUTH-ACTOR-006:** Show the Authorization Server as a distinct flow participant even when SMART
  discovery begins at the protected FHIR base URL.
- **AUTH-ACTOR-007:** Define separate `ActorDefinition` resources for the three formal IHE IUA actors:
  **Authorization Client**, **Authorization Server**, and **Resource Server**. Their descriptions SHALL
  state their IUA transactions and responsibilities without assigning token issuance to the Resource
  Server or protected-resource enforcement to the Authorization Server.
- **AUTH-ACTOR-008:** Define separate `ActorDefinition` resources for the SMART roles used by this IG:
  **SMART App**, **SMART Backend Service**, **SMART FHIR Resource Server**, **SMART Authorization
  Server**, and **SMART Launching System**. Clearly state which roles apply only to interactive launch,
  Backend Services, or EHR launch. Add further roles only when a use case gives them independent
  conformance responsibilities.
- **AUTH-ACTOR-009:** A protected server-side API actor, including Document Access Provider and
  Resource Access Provider, SHALL be grouped with the applicable **IHE IUA Resource Server** or
  **SMART FHIR Resource Server**. It SHALL NOT be inherently grouped with an Authorization Server.
- **AUTH-ACTOR-010:** Remove the Authorization Server from required provider groupings. Model IUA and
  SMART Authorization Servers as independent actors. A co-located Authorization Server MAY be shown
  only as an explicitly optional deployment grouping and SHALL remain responsibility-separated.
- **AUTH-ACTOR-011:** A client-side API actor that obtains and presents tokens SHALL be grouped with
  the applicable IUA Authorization Client, SMART App, or SMART Backend Service role. Do not group a
  client actor with a Resource Server unless it independently hosts a protected endpoint.
- **AUTH-ACTOR-012:** Apply the client-side rule to the Document Publisher, Document Consumer, and
  Resource Consumer. Apply the protected-server rule to the Document Access Provider and Resource
  Access Provider. For a grouped Publisher/Access Provider, apply the Resource Server role to its
  externally exposed protected endpoint; internal publication does not create another externally
  advertised authorization role.

## Discovery And Client Authentication

- **AUTH-DISC-001:** Distinguish FHIR capability discovery at `[base]/metadata` from SMART discovery
  at `[base]/.well-known/smart-configuration` and from any adopted IUA metadata transaction.
- **AUTH-DISC-002:** SMART discovery publishes absolute endpoint URLs and the supported grant,
  capabilities, client authentication methods, signing algorithms, and applicable scopes. At minimum,
  align `token_endpoint`, `grant_types_supported`, `capabilities`,
  `token_endpoint_auth_methods_supported`, signing algorithms, and `scopes_supported` with every
  selected SMART mode. Interactive flows additionally align `authorization_endpoint`,
  `authorization_code`, PKCE metadata, launch capabilities, and Patient or Clinician Access
  capability-set declarations; Backend Services aligns `client_credentials`, asymmetric client
  authentication, and its applicable system scopes.
- **AUTH-DISC-003:** Do not use CapabilityStatement security extensions or prose as the sole source
  for OAuth endpoint metadata.
- **AUTH-DISC-004:** Use `jwks_uri` only for its server-key discovery meaning. Client public keys are
  registered out of band as JWKS or a protected client JWKS URL.
- **AUTH-CLIENT-001:** Require the `client_credentials` grant and `private_key_jwt` asymmetric client
  authentication for the normative backend flow.
- **AUTH-CLIENT-002:** For Backend Services and any interactive confidential client selecting
  asymmetric authentication, define client assertion requirements consistently, including `typ`,
  `alg`, `kid`, `iss`, `sub`, `aud`, `exp`, `jti`, signature validation, short expiry, and replay
  prevention. Do not apply client-assertion requirements to public interactive clients.
- **AUTH-CLIENT-003:** Do not introduce `patient/`, `user/`, `openid`, `fhirUser`, `launch`, or
  `launch/*` requirements into the normative backend flow without explicit out-of-band context
  establishment. Interactive Patient and Clinician Access are current supported SMART modes and
  SHALL define authorization code, PKCE, launch context, applicable `patient/` and `user/` scopes,
  and user identity requirements separately from Backend Services.

## Tokens, Enforcement, And Errors

- **AUTH-TOKEN-001:** Use TLS 1.2 or later for token and protected-resource exchanges.
- **AUTH-TOKEN-002:** Access tokens are short-lived bearer tokens. Do not require JWT access tokens
  unless the adopted standard or selected IUA option requires that format; introspection may be used
  where supported.
- **AUTH-TOKEN-003:** Distinguish requested scopes from granted scopes and require enforcement of the
  granted scopes at the Resource Server.
- **AUTH-TOKEN-004:** Define `401 Unauthorized`, `403 Forbidden`, and any deliberate `404 Not Found`
  concealment behavior consistently. Do not call every authorization failure "unauthorized."
- **AUTH-TOKEN-005:** Keep consent and audit responsibilities explicit and separate; authorization
  protocol conformance is not consent management or complete audit policy.

## Scopes And Protected Operations

- **AUTH-SCOPE-001:** Use SMART v2 FHIR Resource Scope syntax:
  `<patient|user|system>/<ResourceType>.<ordered-subset-of-cruds>`. Select `patient/` and `user/`
  scopes according to the applicable interactive Patient or Clinician Access capability set and use
  case. Apply `system/` scopes to Backend Services or another explicitly defined direct-system
  authorization use case; do not impose them on clinician or patient interactive launches.
- **AUTH-SCOPE-002:** Every required or optional FHIR interaction has a matching least-privilege
  scope, and every advertised scope maps to an implemented interaction.
- **AUTH-SCOPE-003:** Keep client and server CapabilityStatements aligned on scope names, interaction
  semantics, and required-versus-optional resources.
- **AUTH-SCOPE-004:** Keep resource access scope lists aligned with the resource types and operations
  selected in `resource-access.md`.
- **AUTH-SCOPE-005:** If IUA conformance is claimed for protected IHE transactions, include required
  IUA transaction scopes in addition to any SMART refinement. Treat authorization for transactions
  without an IUA-defined scope as an explicit IG-defined SMART rule.
- **AUTH-SCOPE-006:** Retain existing required `system/...` scope lists only for CapabilityStatements
  and use cases classified as SMART Backend Services or another explicit direct-system flow. Label
  them as **SMART App Launch 2.2 FHIR Resource Scopes**. For interactive CapabilityStatements, define
  the applicable `patient/...` and `user/...` scopes instead. Do not present any SMART scopes as
  generic FHIR scopes or IUA scopes.
- **AUTH-SCOPE-007:** For an actor grouped with IUA actors and supporting IHE MHD transactions, list
  only the IUA MHD transaction scopes applicable to transactions represented by that
  CapabilityStatement. Use the exact mappings: ITI-65 to `ITI-65`, ITI-66 to `ITI-66`, ITI-67 to
  `ITI-67`, and ITI-68 to `ITI-68`.
- **AUTH-SCOPE-008:** ITI-105 Simplified Publish has no IUA-defined transaction scope. Do not label an
  ITI-105 scope as inherited from IUA. Continue to use the applicable SMART resource scope where
  SMART applies, or clearly identify any future authorization scope as an IG-defined extension.
- **AUTH-SCOPE-009:** Client and server CapabilityStatements for the same MHD transaction SHALL expose
  matching protocol-specific scope requirements. Combined actors advertise the union of only their
  externally supported transactions; internal transactions do not create externally required scopes.

## CapabilityStatement Security Requirements

- **AUTH-CAP-001:** Every applicable CapabilityStatement SHALL contain a `rest.security` declaration
  stating that authorization support is selected according to the use case and environment: IHE IUA,
  SMART App Launch, or both only where dual conformance is fully defined.
- **AUTH-CAP-002:** Each security description SHALL link to the corresponding environment-specific and
  protocol-specific sections of `authorization.md`; it SHALL not duplicate or weaken those normative
  rules.
- **AUTH-CAP-003:** A server CapabilityStatement for a protected FHIR endpoint SHALL state that its IG
  actor is grouped with the applicable IHE IUA Resource Server or SMART FHIR Resource Server. Remove
  the Authorization Server from that required grouping.
- **AUTH-CAP-004:** A client CapabilityStatement SHALL instead state the applicable client grouping:
  IUA Authorization Client, SMART App, or SMART Backend Service. It SHALL not claim Resource Server
  grouping unless that actor also exposes a protected endpoint.
- **AUTH-CAP-005:** Use the IUA security-service coding only when IUA conformance applies and the
  SMART-on-FHIR coding only when SMART conformance applies. Advertising both on one endpoint requires
  the hybrid rules identified by this IG; environment alternatives alone do not establish dual
  endpoint conformance.
- **AUTH-CAP-006:** Security descriptions SHALL preserve role boundaries. Authorization Servers
  authenticate clients when required, validate client assertions only when asymmetric client
  authentication is selected, apply issuance policy, and issue tokens. Public interactive clients do
  not authenticate at the token endpoint. Resource Servers validate or introspect access tokens and
  enforce granted authorization.
- **AUTH-CAP-007:** Where a CapabilityStatement applies to multiple environments or use cases, its
  security section SHALL provide an unambiguous mapping from each environment or use case to IUA,
  SMART App Launch mode, or an explicitly defined dual-conformance profile.
- **AUTH-CAP-008:** Structure each security description by protocol and SMART mode. Preserve current
  SMART `system/...` scopes only for Backend Services or explicit direct-system use cases. Use the
  applicable `patient/...` and `user/...` scopes for Patient or Clinician Access. Add a separate IUA
  subsection containing only the applicable IHE MHD transaction scopes for transactions supported by
  that actor. Do not merge scope families or SMART modes into an unlabeled list.
- **AUTH-CAP-009:** Keep `CapabilityStatement.rest.security.cors` aligned with the deployment modes
  described in `authorization.md`. A backend-only or system-to-system statement may declare CORS
  unsupported. A statement claiming support for purely browser-based clients SHALL declare and
  describe the required CORS behavior; a boolean alone does not replace the protocol-section rules.
- **AUTH-CAP-010:** A `kind = requirements` CapabilityStatement that applies across environments SHALL
  describe the environment-selected IUA or SMART alternative in `rest.security.description` without
  advertising both alternatives as simultaneous endpoint conformance. It SHALL omit a fixed
  `rest.security.service` coding when no single protocol applies to every conforming deployment.
- **AUTH-CAP-011:** A concrete `kind = instance` CapabilityStatement SHALL advertise exactly the
  selected security service: `SMART-on-FHIR` from the FHIR restful-security-service code system for
  any SMART mode, or `IUA` from
  `http://profiles.ihe.net/fhir/ihe.securityTypes/CodeSystem/securityTypes` for IHE IUA. It SHALL
  advertise both only when it implements a dual-conformance profile explicitly defined by this IG.
  Its description, CORS declaration, scopes, and SMART discovery metadata SHALL match that selection.
- **AUTH-CAP-012:** FHIR R4 defines one `SMART-on-FHIR` security-service code and no separate codes for
  SMART Backend Services, Patient Access, or Clinician Access. Distinguish SMART modes through
  `.well-known/smart-configuration` capabilities, grant types, client authentication methods, launch
  context, and applicable `system/`, `patient/`, or `user/` scopes. Do not invent subtype codes.

## Information Ownership

- **AUTH-PLACE-001:** `input/pagecontent/authorization.md` owns the normative authorization model,
  SMART/IUA precedence, discovery requirements, grant and client assertion behavior, token semantics,
  scopes, enforcement, errors, deployment variants, the required page structure, and the
  environment-specific recommendations and requirements.
- **AUTH-PLACE-002:** `input/pagecontent/actors.md` and `input/fsh/Actors.fsh` own role boundaries,
  actor groupings, transaction participation, and internal/external Authorization Server grouping.
  They define the protocol-role ActorDefinitions and link to detailed protocol rules rather than
  duplicating them.
- **AUTH-PLACE-003:** `input/pagecontent/capability-discovery.md` owns the distinction and relationship
  between FHIR `/metadata` discovery and SMART `.well-known` discovery.
- **AUTH-PLACE-004:** `input/pagecontent/resource-access.md` owns selectable clinical resource access,
  resource-specific operations, and the corresponding resource scope inventory.
- **AUTH-PLACE-005:** Document exchange and use-case pages show participants, prerequisites, and which
  normative authorization flow applies. They do not create new authorization rules.
- **AUTH-PLACE-006:** CapabilityStatements own computable REST interactions, required and optional
  resources, `rest.security.service`, applicable Resource Server or client-role grouping, and concise
  security descriptions linking to the environment and protocol sections of the normative narrative.
  They do not replace SMART discovery metadata.
- **AUTH-PLACE-006A:** A CapabilityStatement's top-level FSH `Description` SHALL be a concise
  resource-level summary. Detailed human-readable actor grouping, transaction, deployment, option,
  and resource-flexibility narrative SHALL be placed in the Publisher-discovered
  `input/pagecontent/CapabilityStatement-<id>-intro.md` file. Do not move computable
  `rest.documentation`, `rest.security.description`, interaction, resource, scope, or grouping
  declarations from FSH into the intro note.
- **AUTH-PLACE-007:** ActorDefinitions own actor identity and links to applicable capabilities; they
  do not duplicate detailed OAuth protocol requirements.
- **AUTH-PLACE-008:** Worked examples illustrate existing requirements completely and accurately but
  do not introduce additional normative behavior.
- **AUTH-PLACE-009:** `doc/ehds-auth-summary.md` owns the detailed EHDS evidence inventory used by the
  authorization page. It SHALL be included in the IG or transformed into an included IG source
  without losing article coverage, links, caveats, or provenance.
- **AUTH-PLACE-010:** `doc/smart-vs-iua.md` owns the detailed SMART/IUA comparison table and supporting
  analysis. Its table SHALL be included in the IG or transformed into an included IG source without
  introducing divergent copies.

## Cross-Specification Checks And Balances

- **AUTH-CHECK-001:** Actor names, grouping optionality, and transaction labels agree across narrative,
  ActorDefinitions, CapabilityStatements, diagrams, and examples.
- **AUTH-CHECK-002:** Scope strings agree across `authorization.md`, `resource-access.md`, client and
  server CapabilityStatements, and rendered examples.
- **AUTH-CHECK-003:** Protected operation, transaction, FHIR interaction, and scope mappings are
  traceable in both directions.
- **AUTH-CHECK-004:** Concrete server CapabilityStatements claiming SMART use the SMART-on-FHIR
  security-service coding. Concrete IUA deployments use an IUA coding only when genuine IUA Resource
  Server conformance is established. Cross-environment `kind = requirements` statements omit a fixed
  coding rather than implying one protocol or unsupported dual conformance.
- **AUTH-CHECK-005:** CapabilityStatement `instantiates` references and descriptions do not imply a
  stronger conformance claim than the artifact implements.
- **AUTH-CHECK-006:** Internal and external Authorization Server variants produce coherent discovery,
  token acquisition, token validation, and sequence diagrams.
- **AUTH-CHECK-007:** Normative keywords are consistent with the adopted standards and do not weaken
  inherited `SHALL` requirements without an explicit rationale.
- **AUTH-CHECK-008:** Navigation and cross-links expose the authorization, capability discovery,
  actor, resource access, and applicable workflow pages without broken links.
- **AUTH-CHECK-009:** Every environment in the European Interoperability Landscape maps to an
  unambiguous SMART/IUA recommendation or requirement, and its narrative, diagrams, actors,
  transactions, scopes, discovery, and CapabilityStatements implement that selection consistently.
- **AUTH-CHECK-010:** `authorization.md` contains every required page section and environment flow,
  and each item is traceable to the corresponding `AUTH-PAGE-*` requirement.
- **AUTH-CHECK-011:** The generated IG contains the EHDS detail and SMART/IUA comparison table from
  their maintained source documents, with no stale duplicate or broken article/specification links.
- **AUTH-CHECK-012:** Environment-specific statements use normative language consistently: MyHealth@EU
  and National Interoperability Infrastructure are recommendations, while Wellness Applications and
  Healthcare Provider environments require SMART (`SHALL`).
- **AUTH-CHECK-013:** Every IUA and SMART role selected by the IG has exactly one discoverable
  ActorDefinition, is introduced in the corresponding `authorization.md` section, and has consistent
  names and responsibilities in narrative, diagrams, groupings, and CapabilityStatements.
- **AUTH-CHECK-014:** Provider actor groupings and server CapabilityStatement security descriptions
  include the applicable Resource Server role and do not require Authorization Server grouping.
- **AUTH-CHECK-015:** Every CapabilityStatement security section maps its use cases and environments
  to IUA, SMART, or an explicitly defined dual profile and links to the corresponding
  `authorization.md` sections.
- **AUTH-CHECK-016:** SMART resource scopes and IUA MHD transaction scopes are separately labeled and
  exactly match each CapabilityStatement's supported interactions. ITI-105 is never presented as an
  IUA-defined scope.
- **AUTH-CHECK-017:** CORS declarations in CapabilityStatements agree with the SMART Backend Services
  and IUA sections and with each supported client architecture. Browser-facing requirements are not
  incorrectly imposed on system-to-system-only deployments.
- **AUTH-CHECK-018:** Every IUA or SMART reference has a released, authoritative citation, and detailed
  claims use the relevant section or transaction link rather than only a generic specification link.
  No normative citation points to a CI build or mutable working-group rendering.
- **AUTH-CHECK-019:** Every CapabilityStatement is classified as an abstract requirement or concrete
  deployment instance. Abstract artifacts describe environment-selected alternatives; concrete
  instances advertise exactly one selected protocol unless an explicit hybrid profile applies.
- **AUTH-CHECK-020:** Every CapabilityStatement has a concise generated `description`; where detailed
  human-readable narrative is needed, its matching Publisher-discovered intro note renders that
  narrative without duplicating or removing computable FSH requirements.

## Acceptance Criteria

- **AUTH-ACCEPT-001:** Each applicable requirement is evidenced as met, partial, missing, conflicting,
  or needing adjustment.
- **AUTH-ACCEPT-002:** There are no unexplained contradictions between narrative, diagrams, FSH,
  generated JSON, or rendered pages.
- **AUTH-ACCEPT-003:** Record the existing QA baseline before changes. SUSHI and the IG Publisher
  complete, and no new authorization-related errors, warnings, or broken links remain. Pre-existing
  unrelated findings may remain only when identified explicitly in the result.
- **AUTH-ACCEPT-004:** Rendered pages and generated CapabilityStatement and ActorDefinition resources
  preserve the intended normative meaning.
- **AUTH-ACCEPT-005:** Proposed requirement adjustments identify the affected IDs, rationale,
  consequences, and replacement wording, and are not applied without user approval.
- **AUTH-ACCEPT-006:** The rendered authorization page contains the required ordered sections, all
  environment subsections and flows, the EHDS article summary and detail reference, and the maintained
  SMART/IUA comparison table.
- **AUTH-ACCEPT-007:** Generated ActorDefinition resources exist for all selected IUA and SMART roles;
  generated provider definitions and CapabilityStatements group only with the applicable Resource
  Server role by default, and Authorization Server remains independent.
- **AUTH-ACCEPT-008:** Every generated CapabilityStatement preserves the scopes applicable to each
  selected mode, labels SMART resource scopes and IUA MHD transaction scopes distinctly, and has a
  CORS declaration consistent with its supported deployment modes. Abstract requirement statements
  do not advertise a fixed protocol coding; concrete instances advertise exactly their selected one.
- **AUTH-ACCEPT-009:** All rendered references to IHE IUA and SMART App Launch resolve to the released
  specification or an applicable stable subsection, with zero broken citation links.