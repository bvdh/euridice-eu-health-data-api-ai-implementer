# GDPR implications for authentication and authorization in the EU Health Data API IG

**Research date: 22 October 2026**

This review assesses the publicly accessible authentication and authorization material for the EU Health Data API Implementation Guide against the GDPR, the EHDS Regulation, the amended eIDAS Regulation, and relevant EDPB guidance. It identifies issues the workgroup may wish to clarify, but it does **not** conclude that the IG or any implementation is legally compliant or non-compliant and does not constitute legal advice.

## 1. Executive conclusions

1. **The IG’s system-to-system OAuth design is not itself a GDPR lawful basis.**  
   SMART Backend Services, IHE IUA, scopes, client identities, and access tokens provide technical authentication and access-control mechanisms. The controller must separately establish a lawful basis under GDPR Article 6 and, for health data, an applicable Article 9(2) condition.

2. **The IG is appropriately cautious about user authentication.**  
   The reviewed material places patient authentication, consent management, and Member State routing outside the EHR-facing API and gives national eID and the European Digital Identity Wallet as examples rather than mandates. This is consistent with the fact that neither GDPR nor the EHDS generally prescribes one OAuth profile or one authentication technology.

3. **The IG should distinguish three concepts more emphatically:**
   - identity authentication;
   - technical authorization to invoke an API;
   - legal authority or lawful basis to process the returned health data.

   An access token establishes the second and may convey facts relevant to the first or third, but does not by itself prove GDPR lawfulness.

4. **Consent should not be presented as the default legal basis for healthcare processing.**  
   Depending on the processing, relevant bases may include GDPR Articles 6(1)(c), 6(1)(e), 6(1)(d), or occasionally 6(1)(a), together with Article 9(2)(h), 9(2)(i), 9(2)(g), or 9(2)(a). Member State law can be decisive. A patient’s direction to share data, access-service preference, or OAuth grant is not automatically GDPR consent.

5. **The selected claims, scopes, and logged data need deployment-specific minimization.**  
   The IG need not prescribe a universal claim set, but should make clear that implementers must justify each identity attribute, purpose/role claim, patient identifier, scope, audience, and logged token attribute under GDPR Articles 5, 25 and 32.

6. **Controller and processor roles cannot reliably be assigned from SMART/IUA actor names.**  
   “Authorization Server”, “Resource Server”, “Authorization Client”, and “Health Data Access Service” are technical roles. GDPR status follows who actually determines the purposes and essential means of each processing operation. An external authorization service could be a processor, independent controller, joint controller, or part of the same controller, depending on law and deployment.

7. **The public-version position needs explicit treatment.**  
   The stable published ballot says that user-level authorization and audit logging formats are outside scope. The accessible CI search results contain newer authorization and access-service language. The exact branch/build URLs supplied did not consistently produce retrievable public content through the public web interface, while an indexed CI build is available under a shorter `ballot-recon-authorization` branch path. Therefore, this analysis should not be read as covering unpushed local edits.

---

## 2. Public-source and version status

| Source | Verified public status | Consequence for this review |
|---|---|---|
| [GitHub authorization branch](https://github.com/euridice-org/eu-health-data-api/tree/eu-health-data-api-ballot-recon-authorization) | The repository is public. However, the exact supplied branch page did not expose indexable file content during the review. | File-specific conclusions are limited to content visible in public builds and indexed repository material. No assumption is made about local or unpushed changes. |
| [Supplied authorization CI build](https://build.fhir.org/ig/euridice-org/eu-health-data-api/branches/eu-health-data-api-ballot-recon-authorization/en/authorization.html) | The exact URL did not consistently return retrievable content during the review. Public search located a closely related access-service build under `branches/ballot-recon-authorization`, without the `eu-health-data-api-` prefix. | There may be a branch-path rename, deployment lag, unavailable build, or search-index difference. The two branch names should not be assumed to identify identical builds without repository confirmation. |
| Authorization, published ballot | The published ballot defines system-to-system authorization using SMART Backend Services and IHE IUA actors. It says user-level authentication is not required at the API level and user-level authorization is outside the initial scope. | This is a stable comparison point, but may be older than the supplied reconciliation branch. |
| Health Data Access Service, indexed CI build | The accessible build says the access service authenticates the patient, may use national eID or the European Digital Identity Wallet, manages consent preferences, and makes EHR-facing calls as an authorized system-to-system caller. It identifies authentication and consent management as Member State concerns outside the IG’s API scope. | Useful evidence of reconciliation direction, but it should not be treated as proof of the exact content at the supplied branch URL. |
| EU Health Data API v1.0.0-ballot | The published home page says the IG covers authorization but excludes user-level authorization and audit-logging formats. | Out-of-scope treatment is not necessarily a gap, provided responsibility and trust-boundary implications are clear. |

---

## 3. Authentication and identity verification

| Legal or guidance source | What it requires or recommends | What the current public IG says | Possible gap, ambiguity, or deployment question |
|---|---|---|---|
| **Binding:** [GDPR, Articles 5(1)(c), 5(1)(f), 25 and 32](https://eur-lex.europa.eu/eli/reg/2016/679/oj) | Controllers must limit identity data to what is necessary, implement data protection by design/default, and apply security appropriate to the risk. GDPR does not prescribe a particular identity provider, wallet, assurance level, OAuth profile, or authentication factor. | The access-service page gives national eID and the European Digital Identity Wallet as examples. Patient authentication is outside the EHR-facing system-to-system API. The authorization page requires client authentication using SMART Backend Services and `private_key_jwt`. | Clarify that the selected patient and professional identity attributes, authenticators and assurance levels are deployment decisions subject to risk, applicable law, and Member State infrastructure. `private_key_jwt` authenticates a client, not the patient or health professional behind the transaction. |
| **Binding:** [EHDS Regulation, Articles 3, 4, 11, 12 and 16](https://eur-lex.europa.eu/eli/reg/2025/327/oj) | The EHDS establishes health-data access services, health-professional access services and identification-management requirements for primary use. The precise identification architecture depends on EHDS implementation, Member State systems and applicable implementing acts. The EHDS gives individuals strengthened access and control rights. | The access-service use case distinguishes patient-facing identity establishment from EHR-facing system authorization and leaves the infrastructure country-specific. | The IG could cross-reference EHDS Articles 4, 12 and 16 and say that the client-credential exchange does not replace identification obligations at the access-service boundary. It could also identify where verified patient context enters the downstream flow, without requiring a universal token claim. |
| **Binding:** [eIDAS Regulation, Articles 6 and 8](https://eur-lex.europa.eu/eli/reg/2014/910/oj) | eIDAS regulates mutual recognition and assurance levels for notified electronic-identification schemes in specified cross-border public-service situations. Recognition obligations are linked to levels equal to or higher than the level required by the online service. It does not establish one universal assurance level for all health-data APIs. | The IG mentions national eID and the European Digital Identity Wallet as possible patient-authentication methods but does not select an eIDAS assurance level. | This is not automatically a defect. The applicable relying party, public/private status, national service classification, risk assessment and Member State law must first be established. A statement that “the IG does not prescribe an assurance level” would prevent implementers from inferring one from SMART or IUA. |
| **Binding:** [Regulation (EU) 2024/1183](https://eur-lex.europa.eu/eli/reg/2024/1183/oj), particularly amended eIDAS Articles 5a and following | The European Digital Identity Framework supports user-controlled authentication, selective disclosure and electronic attestations of attributes. It applies GDPR principles, including minimization, purpose limitation and data protection by design/default. Wallet usage must remain voluntary, with appropriate alternatives; relying-party registration and disclosure of requested data and purpose are part of the framework. | The IG uses the Wallet only as an example and does not define Wallet presentation or attribute-exchange protocols. | If future text profiles Wallet use, it should define the relying-party boundary, requested attributes and purpose, while avoiding collection of a full legal identity where a pseudonym, professional entitlement, representation mandate, or narrower attribute would suffice. |
| **Guidance:** [EDPB Guidelines 4/2019 on Data Protection by Design and by Default](https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_201904_dataprotection_by_design_and_by_default_v2.0_en.pdf), sections 2 and 3 and Article 5 principle examples | Identity design should be driven by necessity, effectiveness, risks, state of the art, cost, context and purpose, with regular review throughout the lifecycle. The EDPB says Article 25 applies to existing as well as new processing. | The IG selects a strong standards-based client-authentication pattern but does not state identity-data minimization criteria. | Consider a non-normative privacy note stating that each deployment should document why each client, user, professional, organization and patient identity attribute is needed at each trust boundary. |

### Assessment

The lack of a prescribed eIDAS assurance level is **not, by itself, evidence of a GDPR or EHDS gap**. A universal level could be inappropriate because patient access, professional access, background system exchange, emergency access, representation and cross-border services may have different legal and risk contexts.

The more important clarification is that:

> Client authentication under SMART Backend Services establishes the identity of the calling software client. It does not, by itself, authenticate the patient or professional, establish a representation mandate, or demonstrate a lawful basis for processing health data.

---

## 4. Authorization, roles, claims and scopes

| Legal or guidance source | What it requires or recommends | What the current public IG says | Possible gap, ambiguity, or deployment question |
|---|---|---|---|
| **Binding:** [GDPR, Articles 5(1)(a)–(c), 6, 9, 24, 25 and 32](https://eur-lex.europa.eu/eli/reg/2016/679/oj) | Processing must be lawful, fair, transparent, purpose-limited and minimized. Controllers must implement and demonstrate appropriate controls. Article 32 requires risk-appropriate confidentiality, integrity, availability, resilience and testing. | The IG requires authorization for all API transactions, profiles SMART Backend Services, and maps document/resource consumers and publishers to IUA Authorization Clients. Access Providers act as Resource Servers and may use an internal or external Authorization Server. | Add an explicit statement that token validity and scope sufficiency are technical access-control decisions and do not establish a GDPR Article 6 basis or Article 9(2) condition. |
| **Binding:** [EHDS Regulation, Articles 3–12, 16 and 17](https://eur-lex.europa.eu/eli/reg/2025/327/oj) | The EHDS establishes particular rights and access paths for natural persons and health professionals, plus restrictions, opt-out possibilities and information about access. Technical implementation must preserve those legal controls. | The reconciliation-direction material says patient identity and authorization are established at the access service, while the access service appears to the EHR-facing API as a system caller. Consent preferences may be enforced by the access service and/or EHR system under Member State policy. | “Authorization is established at the access service” could be read too broadly. The Resource Server may still need enough trusted context to enforce restrictions, organizational policy, patient matching, opt-out, break-glass, purpose or category limitations. Which component enforces which rule is deployment-specific. |
| **Guidance:** [EDPB Guidelines 4/2019](https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_201904_dataprotection_by_design_and_by_default_v2.0_en.pdf), sections on purpose limitation, data minimization and integrity/confidentiality | Default processing should be limited in amount, extent, storage period and accessibility. Access control should reflect actual need rather than granting broad access by default. | The IG inherits SMART Backend Services and requires support for protected transactions, but the available text does not establish one EU-wide role model, purpose-of-use vocabulary, patient-context claim or category-specific scope set. | This omission may be reasonable because these concepts depend on national infrastructure. The IG could nevertheless require or recommend that deployments document: audience, client identity, granted resource categories, patient-context binding, purpose/role information if used, token lifetime, delegation, and enforcement point. |
| **Technical IG material:** Resource Access Provider CapabilityStatement | The public CI CapabilityStatement says SMART Backend Services authorization is required for all transactions and allows servers to support only the resources appropriate to their capabilities and use cases, with Patient required for lookup context. | Authorization is uniform at the transaction-security level, while supported clinical-resource coverage remains flexible. | A capability declaration indicates what a server can expose, not what a given caller is legally or operationally allowed to receive. The IG could explicitly distinguish capability discovery from authorization policy. |

### Key distinction suggested for the IG

| Concept | Suggested meaning |
|---|---|
| **Authentication** | Establishing confidence in the identity of a client, natural person, professional, organization or device. |
| **Technical authorization** | Deciding whether an authenticated caller may invoke a particular API operation under the deployed access-control policy. |
| **GDPR lawfulness** | Establishing the applicable Article 6 lawful basis, Article 9(2) condition, and compliance with all other applicable data-protection requirements. |
| **Clinical or statutory authority** | Establishing that a professional, representative, access service or other actor is entitled under applicable healthcare and Member State law to act in the relevant context. |

---

## 5. Consent and other lawful bases for health-data processing

| Legal or guidance source | What it requires or recommends | What the current public IG says | Possible gap, ambiguity, or deployment question |
|---|---|---|---|
| **Binding:** [GDPR, Articles 4(11), 6, 7 and 9](https://eur-lex.europa.eu/eli/reg/2016/679/oj) | Every processing operation needs an Article 6 basis. Processing health data is prohibited unless an Article 9(2) condition applies. Explicit consent under Article 9(2)(a) is only one option. Healthcare commonly relies on Article 9(2)(h), subject to Union or Member State law and Article 9(3) safeguards. Public health may involve Article 9(2)(i); substantial public interest may involve Article 9(2)(g). | The access-service page says patients review and manage “consent preferences” and that consent management is governed by Member State requirements and outside the API’s scope. | “Consent preferences” could be mistaken for GDPR consent. It may instead mean an access restriction, EHDS choice, app-linking instruction, portal preference, authorization policy or national healthcare consent. The IG should use qualified terminology or define the term. |
| **Guidance:** [EDPB Guidelines 05/2020 on consent](https://www.edpb.europa.eu/system/files/documents/files/file1/edpb_guidelines_202005_consent_en.pdf), sections 3–6, especially paragraphs 11–16, 24–35, 38–41, 60–68 and 91–93 | Valid consent must be freely given, specific, informed and unambiguous; explicit consent requires an express statement. Consent must be demonstrable and as easy to withdraw as to give. An imbalance or detriment may make consent invalid. Consent is one of several lawful bases and should only be used where the controller can actually offer choice and withdrawal. | The IG does not define a GDPR consent flow and does not state that OAuth authorization is GDPR consent. | This is broadly appropriate. Consider adding: “The IG’s authorization protocol does not define or imply GDPR consent. Where a deployment relies on consent, the controller is responsible for satisfying GDPR Articles 4(11), 7 and 9(2)(a).” |
| **Binding:** [EHDS Regulation, Articles 3–10](https://eur-lex.europa.eu/eli/reg/2025/327/oj) | The EHDS gives individuals statutory rights concerning access, portability, insertion, restrictions, access information and opt-out. Exercising such a statutory right is not necessarily the same as giving GDPR consent to all processing required to provide the service. | The access-service workflow combines patient authentication, consent-preference management and retrieval of records. | The IG could distinguish: (a) exercise of an EHDS right, (b) access-control preference, (c) permission to link an application, and (d) GDPR consent as lawful basis. |
| **Guidance:** [EDPB Guidelines 01/2022 on the right of access](https://www.edpb.europa.eu/system/files/2023-04/edpb_guidelines_202201_data_subject_rights_access_v2_en.pdf), executive summary and sections 2–4 | GDPR Article 15 access is a data-subject right and does not require the person to justify the request. The controller must assess identity and scope, provide access to the data, and provide information about processing. | The IG describes an EHDS health-data access service, not specifically a GDPR Article 15 request-handling workflow. | Avoid describing all patient portal access as “consent”. It may implement statutory EHDS access, ordinary care access, GDPR access, or several mechanisms side by side. |

### Suggested terminology change

Where the IG does not specifically mean GDPR consent, use language such as:

- “patient access preferences”;
- “patient-established access restrictions”;
- “application-linking authorization”;
- “Member State consent or authorization rules, where applicable”; or
- “consent, where relied upon as a GDPR lawful basis”.

---

## 6. Data minimization, purpose limitation, privacy by design/default and security

| Legal or guidance source | What it requires or recommends | What the current public IG says | Possible gap, ambiguity, or deployment question |
|---|---|---|---|
| **Binding:** [GDPR, Article 5(1)(b), (c), (e) and (f)](https://eur-lex.europa.eu/eli/reg/2016/679/oj) | Personal data must be collected for specified purposes, limited to what is necessary, retained no longer than necessary, and protected against unauthorized or unlawful processing and accidental loss. | The IG mandates authorization for API transactions and limits its normative authorization scope to system-to-system exchange. | There is no universal minimum claim set because different calls and national architectures need different context. The workgroup could still identify privacy-sensitive fields and require deployment profiling or justification. |
| **Binding:** [GDPR, Article 25](https://eur-lex.europa.eu/eli/reg/2016/679/oj) | Controllers must implement effective technical and organizational measures by design and by default, considering state of the art, cost, processing context and risks. By default, only data necessary for each specific purpose may be processed. | The IG adopts established SMART and IHE specifications and separates patient-facing from EHR-facing concerns. | Specification reuse supports interoperability but does not by itself demonstrate Article 25 compliance. Deployment profiles should avoid broad default scopes and unnecessary replication of patient/user identifiers across trust domains. |
| **Binding:** [GDPR, Article 32](https://eur-lex.europa.eu/eli/reg/2016/679/oj) | Security measures must be proportionate to risk and may include pseudonymization, encryption, resilience, restoration and regular testing. | The IG requires SMART Backend Services, signed JWT client authentication and bearer access tokens, and requires authorization for all transactions. | The IG could identify, without over-prescribing, security considerations such as short token lifetimes, audience restriction, key rotation, replay protection, TLS configuration, token confidentiality, incident handling and regular authorization-policy testing. Some are inherited from SMART and should not be redundantly restated if normative references are clear. |
| **Guidance:** [EDPB Guidelines 4/2019](https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_201904_dataprotection_by_design_and_by_default_v2.0_en.pdf), sections 2.1–2.3 and 3 | Controllers should implement privacy requirements before and throughout processing, regularly review effectiveness, and design defaults around necessity. Producers and processors should support controllers in meeting these obligations. | The IG defines reusable actors and CapabilityStatements but does not provide a privacy threat model or a data-flow-specific minimization checklist. | Consider non-normative implementation guidance covering trust boundaries, identity propagation, token contents, query granularity, response filtering, caching, diagnostics and observability. |
| **Binding, conditional:** [GDPR, Articles 35 and 36](https://eur-lex.europa.eu/eli/reg/2016/679/oj) | A DPIA is required where processing is likely to result in high risk, including circumstances enumerated in Article 35(3). Prior consultation may be required if residual high risk remains. | The IG does not prescribe a DPIA. | Correctly, not every conformance implementation can be declared subject to the same DPIA outcome. However, large-scale health-data access, national access infrastructure, systematic monitoring or novel cross-domain identity processing are strong deployment-level DPIA considerations. |

### Privacy-sensitive information that deployments should examine

The IG could identify the following as a non-exhaustive checklist:

- legal-person and software-client identifiers;
- organization and professional-role claims;
- professional registration or entitlement attributes;
- patient identifiers and cross-domain identifier mappings;
- representation or delegation information;
- purpose-of-use and emergency-access indicators;
- scopes and requested resource categories;
- audience, issuer and authorization-server identifiers;
- IP address, device information and session identifiers;
- token identifiers and token-validation results;
- search parameters, URLs and error messages that can reveal conditions or document categories.

This would not require the IG to prescribe one token structure.

---

## 7. Audit and logging data

| Legal or guidance source | What it requires or recommends | What the current public IG says | Possible gap, ambiguity, or deployment question |
|---|---|---|---|
| **Binding:** [GDPR, Articles 5(1)(b), (c), (e), 24, 25, 30 and 32](https://eur-lex.europa.eu/eli/reg/2016/679/oj) | Logs containing identifiers, access events, URLs, patient context or actions are personal data when linked or linkable to a person. Logging must have a defined purpose, lawful basis, minimized content, access controls, retention policy and security. Accountability and security can justify logging, but not unlimited collection or retention. | The published IG explicitly excludes audit-logging formats. | Excluding a format is not the same as excluding the legal obligation to maintain appropriate logs. The IG could distinguish “audit format is out of scope” from “deployments remain responsible for legally and operationally required logging.” |
| **Binding:** [EHDS Regulation, Article 9](https://eur-lex.europa.eu/eli/reg/2025/327/oj) | Natural persons have a right to obtain information on access to their personal electronic health data. This creates downstream requirements for access-event capture and availability, although implementation details and retention may depend on EHDS implementing acts and Member State architecture. | The reviewed public pages do not define the logging model through which an access service or EHR system supplies Article 9 access information. | The IG could identify Article 9 as a regulatory integration point and state that actors must preserve sufficient access-event information according to the architecture, without selecting an audit-event format unless that becomes in scope. |
| **Binding:** [GDPR, Article 32](https://eur-lex.europa.eu/eli/reg/2016/679/oj) | Monitoring and security logging can support confidentiality, integrity, resilience and testing. Security controls must themselves be risk-appropriate. | The authorization flow shows token acquisition and API calls but does not describe security-monitoring events. | Implementers should determine how to detect failed client authentication, invalid audience, replay, abnormal query volumes, key misuse and unauthorized patient-context changes without logging full tokens or unnecessary clinical payloads. |
| **Guidance/evidence resource:** [EDPB thematic document on security of processing and breach notification](https://www.edpb.europa.eu/system/files/2024-01/one_stop_shop_case_digest_security_data_breach_en.pdf), sections 2 and 3 | The document summarizes supervisory-authority enforcement concerning Article 32 and breach obligations. It is an enforcement digest, not binding legislation or a technology profile. It reinforces that security measures must be effective in the actual environment. | No IG-level operational-log requirements are visible. | A non-normative security section could recommend testing whether logs are sufficient for incident investigation while remaining minimized and protected against unauthorized access and alteration. |

### Retention analysis

Neither GDPR nor the reviewed IG establishes one universal audit-log retention period for all EU Health Data API implementations.

A controller should instead document:

1. the purpose of each log category;
2. the lawful basis;
3. whether health or other sensitive information appears in the log;
4. legal retention obligations under EHDS, healthcare, cybersecurity or Member State law;
5. the period needed for Article 9 EHDS access information, incident investigation and accountability;
6. whether identifiers can be pseudonymized or separated;
7. who may access the logs;
8. deletion or irreversible anonymization rules.

Token bodies, full bearer tokens and full clinical URLs should generally not be logged merely for convenience. The precise rule remains deployment-specific.

---

## 8. Responsibilities of access services, Authorization Servers and Resource Servers

| Legal or guidance source | What it requires or recommends | What the current public IG says | Possible gap, ambiguity, or deployment question |
|---|---|---|---|
| **Binding:** [GDPR, Articles 4(7), 4(8), 24, 26, 28 and 29](https://eur-lex.europa.eu/eli/reg/2016/679/oj) | A controller determines purposes and essential means; a processor acts on documented instructions. Joint controllers jointly determine purposes and means and need an Article 26 arrangement. Processors require an Article 28-compliant contract or other legal act. Labels in technical architecture are not determinative. | The IG defines Authorization Server, Resource Server and Authorization Client as IUA roles. The Authorization Server may be internal or external, and the IG does not impose requirements on external authorization infrastructure. | “External” should not be read as “outside GDPR responsibility”. The deploying organization must determine the external server’s role, instructions, permitted reuse, telemetry, sub-processors, security duties, deletion and assistance obligations. |
| **Guidance:** [EDPB Guidelines 07/2020 on controller and processor concepts](https://www.edpb.europa.eu/system/files/documents/2023-10/EDPB_guidelines_202007_controllerprocessor_final_en.pdf), paragraphs 15–26, 35–52, 54–70, 161–170 and Part II | Controller and processor are functional, autonomous concepts. The analysis follows actual decision-making, not merely contracts or access to data. Joint control can arise through common or converging decisions. Processors may determine non-essential technical means but not pursue their own incompatible purposes. | The authorization architecture is modular and permits authorization infrastructure at hospital, regional or national level. | Add a note that IUA/SMART actor assignment does not allocate GDPR roles. A deployment-specific data-governance assessment is required per processing operation. |
| **Binding:** [EHDS Regulation, Articles 4, 12, 16, 19, 22 and 23](https://eur-lex.europa.eu/eli/reg/2025/327/oj) | The EHDS establishes patient and professional access services, identification management, digital-health authorities, coordination with GDPR supervisory authorities and MyHealth@EU functions. Some roles may be assigned by Union or Member State law. | The access service acts as a document/resource consumer and, where patient-provided data is supported, potentially as a publisher. Patient authentication and routing are Member State concerns. | The access service may be legally established as a public service and have statutory purposes, while an EHR provider may have separate healthcare and record-keeping responsibilities. The IG should not imply that one is automatically processor for the other. |
| **Technical IG material:** Document Access Provider CapabilityStatement | The published CapabilityStatement groups the Document Access Provider with the IUA Resource Server and Authorization Server and requires SMART Backend Services for transactions. | Newer authorization text appears to make the Authorization Server optional when external. The original grouping was already the subject of a public architecture issue. | Ensure CapabilityStatements and narrative use the same grouping rules. More importantly for GDPR, avoid suggesting that bundling components makes them one controller, or that separation necessarily creates a processor relationship. |

## Illustrative, non-determinative role scenarios

| Deployment | Possible GDPR characterization |
|---|---|
| Hospital operates the EHR, Resource Server and Authorization Server for care delivery | Often one controller operating several technical components, although separate processing purposes within the organization still need documentation. |
| National access service retrieves records from independent healthcare providers under statutory EHDS arrangements | Could involve several independent controllers with legally allocated duties, or joint control for some operations. The answer depends on legislation and actual decision-making. |
| Cloud vendor operates an Authorization Server solely under a hospital’s documented instructions | Potential processor, subject to Article 28, security, confidentiality, subprocessor and deletion/return terms. |
| Authorization provider reuses authentication telemetry for its own fraud intelligence or product analytics | It may be a controller for that separate processing, even if it is a processor for token issuance. |
| EHR vendor supplies Resource Server software but does not operate it or receive data | Supplying software alone does not necessarily make the vendor a processor. Remote support, telemetry or hosted operations may change the analysis. |

---

## 9. Evidence-backed clarifications for the IG workgroup

These are specification clarifications rather than findings of non-compliance.

### High priority

1. **Add a clear legal/technical separation statement**

   Suggested wording:

   > Authentication and authorization mechanisms defined by this guide are technical security controls. Successful authentication, possession of an access token, or satisfaction of a scope does not by itself establish a lawful basis for processing personal data under GDPR Article 6, a condition for processing health data under GDPR Article 9(2), or legal authority under applicable Union or Member State healthcare law.

2. **Clarify what SMART Backend Services authenticates**

   > SMART Backend Services authenticates and authorizes the calling client system at the API boundary. Authentication and authorization of a patient, health professional or representative, and establishment of the relevant patient context, are responsibilities of the deployed access infrastructure and applicable law unless another IG profile explicitly defines them.

3. **Qualify “consent preferences”**

   > References to patient consent or consent preferences do not necessarily refer to consent as a GDPR lawful basis. Depending on the deployment, they may represent access restrictions, application-linking choices, EHDS rights, healthcare-consent requirements, or GDPR consent. Controllers remain responsible for identifying the applicable legal basis and, where relying on GDPR consent, meeting Articles 4(11), 7 and 9(2)(a).

4. **Clarify distributed enforcement**

   Avoid implying that once the access service has authorized a caller, the Resource Server has no remaining responsibility. Suggested wording:

   > Authorization policy may be distributed across the access service, Authorization Server, Resource Server and Member State infrastructure. Deployments shall identify which component enforces patient restrictions, opt-out rules, professional entitlements, purpose or role constraints, patient-context binding, emergency access and other applicable policies.

5. **State that actor names do not allocate GDPR roles**

   > IUA and SMART actor names describe technical functions and do not determine whether an entity is a controller, joint controller or processor under the GDPR. Those roles must be assessed for each processing operation based on applicable law and actual determination of purposes and means.

### Medium priority

6. **Add privacy considerations for claims and scopes**

   The guidance could recommend documenting:

   - why each claim is necessary;
   - whether it exposes patient, user or professional identity;
   - whether a narrower role, entitlement or pseudonymous identifier would suffice;
   - intended audience;
   - scope granularity;
   - patient-context binding;
   - token lifetime;
   - onward disclosure and logging.

7. **Address EHDS Article 9 without selecting an audit format**

   > Although audit-event formats are outside the scope of this guide, deployments remain responsible for capturing and retaining sufficient access-event information to support EHDS Article 9, security monitoring, accountability and applicable Member State requirements. Logged data should be minimized and protected, and retention should be purpose-specific.

8. **Separate CapabilityStatement support from permission**

   > A CapabilityStatement declares what a server is technically capable of providing. It does not indicate that every authenticated client is entitled to access every declared resource or operation.

9. **Add an eIDAS neutrality statement**

   > This guide does not prescribe an eIDAS assurance level. The required identity-assurance level and applicability of notified electronic identification schemes or the European Digital Identity Wallet depend on the service, relying party, applicable Union and Member State law, risk assessment and relevant implementing acts.

10. **Mention deployment-level DPIA assessment**

   > Implementers should assess whether the deployed processing is likely to result in high risk under GDPR Article 35, taking account of the scale and sensitivity of health data, systematic monitoring, identity federation, cross-organizational access and vulnerable data subjects.

---

## 10. Overall conclusion

The reviewed public IG material takes a defensible standards-layer approach: it profiles established system-to-system authorization technology, permits internal or external authorization infrastructure, and leaves patient authentication and Member State consent/access-service arrangements outside the core EHR-facing API. The GDPR, EHDS and eIDAS sources reviewed do **not** support requiring the IG to prescribe one universal OAuth scope model, token claim set, consent flow, European Digital Identity Wallet flow or eIDAS assurance level.

The most material GDPR-related issue is therefore **not that the IG lacks a particular protocol feature**. It is the risk that readers may conflate:

- a successfully authenticated client;
- a technically valid access token;
- a patient or professional identity;
- a healthcare entitlement;
- an EHDS access right;
- a patient preference;
- GDPR consent; and
- a lawful basis and Article 9 condition.

A concise set of scope, terminology and responsibility clarifications would substantially reduce that risk while preserving the IG’s intended separation between interoperable API security and national legal/organizational policy.

---

## Primary sources

- [GDPR, Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [EHDS, Regulation (EU) 2025/327](https://eur-lex.europa.eu/eli/reg/2025/327/oj)
- [eIDAS, Regulation (EU) No 910/2014](https://eur-lex.europa.eu/eli/reg/2014/910/oj)
- [European Digital Identity Framework, Regulation (EU) 2024/1183](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)
- [EDPB Guidelines index](https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines_en)
- [EDPB Guidelines 4/2019 on Data Protection by Design and by Default](https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_201904_dataprotection_by_design_and_by_default_v2.0_en.pdf)
- [EDPB Guidelines 05/2020 on consent](https://www.edpb.europa.eu/system/files/documents/files/file1/edpb_guidelines_202005_consent_en.pdf)
- [EDPB Guidelines 01/2022 on the right of access](https://www.edpb.europa.eu/system/files/2023-04/edpb_guidelines_202201_data_subject_rights_access_v2_en.pdf)
- [EDPB Guidelines 07/2020 on controller and processor concepts](https://www.edpb.europa.eu/system/files/documents/2023-10/EDPB_guidelines_202007_controllerprocessor_final_en.pdf)
- [EDPB thematic document on security of processing and breach notification](https://www.edpb.europa.eu/system/files/2024-01/one_stop_shop_case_digest_security_data_breach_en.pdf)
- [EU Health Data API GitHub authorization branch](https://github.com/euridice-org/eu-health-data-api/tree/eu-health-data-api-ballot-recon-authorization)
- [EU Health Data API Authorization CI page](https://build.fhir.org/ig/euridice-org/eu-health-data-api/branches/eu-health-data-api-ballot-recon-authorization/en/authorization.html)
