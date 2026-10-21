# Formal Legal Links Between eIDAS, the EUDI Wallet ARF, and the EUDI Wallet Implementing Acts

## Executive conclusion

**The EUDI Wallet Architecture and Reference Framework (ARF) as a whole is not legally mandated or incorporated wholesale into EU law.** The binding sources are:

1. [Regulation (EU) No 910/2014, current consolidated eIDAS text](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02014R0910-20240520), as amended principally by [Regulation (EU) 2024/1183](https://eur-lex.europa.eu/eli/reg/2024/1183/oj/eng); and
2. the Commission implementing regulations adopted under the specific empowerments in eIDAS.

The ARF is legally relevant in a more limited way:

- It originates in the non-binding Union Toolbox process established by Commission Recommendation (EU) 2021/946.
- The implementing acts repeatedly state in their recitals that their technical specifications “rely on” work under that Recommendation, “in particular the Architecture and Reference Framework”.
- Some implementing acts also mention the ARF in their operative Article 1, but only as a body of work with which the legally binding regulation is to be kept aligned or updated.
- The binding obligations remain the requirements actually enacted in the articles and annexes of the implementing regulations. A requirement appearing only in the ARF does not become binding merely because an implementing act says that it relied on the ARF.

The decisive statement in [ARF §1.2](https://eudi.dev/1.4.0/arf/) is that the document:

> “presents a state-of-play of ongoing work of the eIDAS Expert Group and does not imply any formal agreement regarding its content.”

ARF §1.2 also describes most of the main document as descriptive, with only identified annexes serving as references for technical specifications and standards.

A current-law qualification is necessary: Regulations 2024/2977, 2024/2979, 2024/2980 and 2024/2982 were amended by [Commission Implementing Regulation (EU) 2026/1731](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202601731), applicable from 11 August 2026. It says that the ARF had “evolved significantly” and therefore amends the regulations themselves to align their legally binding standards, specifications and procedures. That supports the distinction between the evolving ARF and the law: **ARF evolution did not by itself alter legal requirements; a further implementing regulation was needed.**

---

## 1. Status and function of the ARF

### ARF §1.2: purpose, but not legal incorporation

The ARF describes its purpose as establishing high-level requirements that serve as a reference for creating uniform implementation conditions and for identifying technical specifications, standards and procedures to be developed by the Commission. The topics expressly include:

- wallet core functionalities, Article 5a;
- relying parties, Article 5b;
- wallet certification, Article 5c;
- the list of certified wallets, Article 5d;
- wallet security breaches, Article 5e;
- cross-border identity matching;
- qualified and public-sector electronic attestations of attributes.

However, §1.2 then contains the decisive qualification:

> “The document presents a state-of-play of ongoing work of the eIDAS Expert Group and does not imply any formal agreement regarding its content.”

It further says that the document is to be complemented and updated and that, while the main document is descriptive, certain annexes are intended as references for technical specifications and standards.

This language is incompatible with treating every ARF high-level requirement as independently binding law.

### ARF §1.3: document structure

Section 1.3 explains how the architectural description, requirements and annexes are organised. Its function is documentary and technical. No wording was identified in §1.3 that purports to give the ARF legal force, nor could the eIDAS Expert Group itself confer such force. Legal force must come from eIDAS or an adopted legal act.

### Formal legal bridge

The formal legal chain is:

> eIDAS empowerment → Commission implementing regulation → binding articles and annexes.

The ARF sits alongside that chain as technical preparation, explanation and maintenance input:

> Recommendation (EU) 2021/946 → Toolbox/ARF work → source material for implementing acts.

That is an important formal connection, but it is **not equivalent to incorporation of the entire ARF**.

---

## 2. Article 5a(23): core wallet implementation

### Empowerment

[Article 5a(23) of eIDAS](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02014R0910-20240520) requires the Commission, by implementing acts, to:

> “establish a list of reference standards and, where necessary, establish specifications and procedures”

for requirements in Article 5a(4), (5), (8) and (18), concerning implementation of European Digital Identity Wallets. The acts are adopted under the Article 48(2) examination procedure.

The four initial Article 5a(23) acts are:

- Regulation 2024/2977: PID and attestations issued to wallets;
- Regulation 2024/2979: wallet integrity and core functionalities;
- Regulation 2024/2980: notifications concerning the wallet ecosystem;
- Regulation 2024/2982: wallet protocols and interfaces.

Each is a binding regulation. Their operative articles and annexes, rather than the ARF standing alone, impose the requirements.

### Regulation 2024/2977: PID and electronic attestations

[Commission Implementing Regulation (EU) 2024/2977](https://eur-lex.europa.eu/eli/reg_impl/2024/2977/oj/eng) expressly identifies Article 5a(23) as its legal basis. It states that the set of four implementing regulations gives effect to that empowerment and that Regulation 2024/2977 lays down requirements for person identification data and electronic attestations of attributes issued to wallets.

#### Binding effect

The act imposes binding requirements on, among others:

- wallet providers and wallet solutions;
- PID providers;
- providers and issuers of electronic attestations of attributes;
- the data formats, validation information and issuance arrangements covered by its articles and annexes.

#### ARF relationship

The act’s ARF references explain the technical provenance of its specifications. They do not state that the entire ARF applies as an external body of binding rules.

Following the 2026 amendment, the legally applicable standards and specifications are those actually inserted into or referenced by the regulation as amended. The amendment recital says that the regulations needed to be amended because the ARF had evolved.

**Characterisation:** binding obligation through the regulation; selected standards and specifications become binding where the articles or annexes require them; ARF as a whole not incorporated.

### Regulation 2024/2979: integrity and core functionalities

[Commission Implementing Regulation (EU) 2024/2979](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX%3A32024R2979) is also based on Article 5a(23). Its recitals identify it as the member of the four-act package dealing with integrity and core functionalities.

Its decisive ARF wording is in recital 4:

> “the technical specifications set out in this Regulation rely on the work carried out on the basis of Commission Recommendation (EU) 2021/946 … and in particular the architecture and reference framework.”

That wording says that the **specifications set out in the regulation** rely on the ARF. It does not say that all ARF requirements are incorporated.

#### Actors and requirements

The act principally regulates:

- wallet providers;
- wallet solutions, wallet units and wallet instances;
- wallet secure cryptographic applications and devices;
- PID and attestation issuance and presentation support;
- authentication, user control, selective disclosure, logging, revocation and other core functionality covered by its operative provisions.

**Characterisation:** binding functional and integrity obligations. The ARF provides input and context; only the requirements enacted in the regulation are legally mandatory.

### Regulation 2024/2980: notifications concerning the ecosystem

[Commission Implementing Regulation (EU) 2024/2980](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2980) is based on Article 5a(23). It lays down requirements for Member State notifications of trusted entities relevant to the wallet ecosystem.

Its recital 4 states:

> “the technical specifications set out in this Regulation rely on the work carried out on the basis of Commission Recommendation (EU) 2021/946 … and in particular the architecture and reference framework.”

#### Actors and requirements

The act covers:

- Member States submitting notifications;
- the Commission’s notification mechanism;
- wallet providers;
- PID providers;
- wallet-relying-party access-certificate providers and other trusted entities identified in the annexes;
- publication and machine-processable exchange of the notified information.

#### ARF relationship

The reference is to the technical origin of the regulation’s own specifications. No provision was identified that makes every ARF notification model or requirement independently mandatory.

**Characterisation:** binding notification formats and procedures; contextual and technical reliance on the ARF; no wholesale incorporation.

### Regulation 2024/2982: protocols and interfaces

[Commission Implementing Regulation (EU) 2024/2982](https://eur-lex.europa.eu/eli/reg_impl/2024/2982/oj) is based on Article 5a(23) and establishes the protocols and interfaces that wallet solutions must support.

Its Article 1 covers protocols and interfaces for:

1. issuance of PID and electronic attestations to wallet units;
2. presentation of attributes to wallet-relying parties;
3. communication of data-erasure requests;
4. reporting wallet-relying parties to data-protection supervisory authorities.

The [current consolidated text of Regulation 2024/2982](https://eur-lex.europa.eu/eli/reg_impl/2024/2982/2026-08-11/eng) says that these rules are:

> “to be updated on a regular basis to keep in line with technology and standards developments and with the work carried out on the basis of Recommendation (EU) 2021/946, and in particular the Architecture and Reference Framework.”

#### Legal significance

This is an **operative ARF reference**, but its scope is limited. It directs the maintenance of the legal rules in light of ARF work. It does not say:

- that wallet providers must comply with every current or future ARF requirement;
- that an ARF update automatically amends the regulation; or
- that the ARF prevails over the regulation’s articles or annexes.

**Characterisation:** binding protocol and interface obligations; operative acknowledgement of ARF work as an update reference; no dynamic incorporation of the entire ARF.

---

## 3. Article 5b(11): wallet-relying parties

### Empowerment

[Article 5b(11) of eIDAS](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02014R0910-20240520) requires the Commission to establish technical specifications and procedures for the requirements in Article 5b(2), (5) and (6) to (9). Those provisions concern relying-party registration, identification, authentication, declared intended use, requested data and associated controls.

### Regulation 2025/848

[Commission Implementing Regulation (EU) 2025/848](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ%3AL_202500848) was adopted specifically under Article 5b(11). Its subject is the registration of wallet-relying parties.

Its recital 2 states:

> “the technical specifications set out in this Regulation rely on the work carried out on under Commission Recommendation (EU) 2021/946 and in particular the Architecture and Reference Framework which is part of it.”

It further says that the Commission should review and, if necessary, update the regulation to keep it in line with global developments and the ARF.

#### Actors and requirements

The act covers:

- Member States establishing and maintaining national relying-party registers;
- wallet-relying parties registering their identity, contact details, intended wallet use and requested data;
- national registrars and registration interfaces;
- providers of wallet-relying-party access certificates;
- providers of registration certificates, where applicable;
- human-readable and machine-readable access to registration information.

#### ARF relationship

The direct legal obligations are the registration rules, interfaces, certificate requirements and annexed specifications in Regulation 2025/848. The recital does not independently incorporate the complete ARF.

**Characterisation:** binding registration regime; ARF-informed technical specifications; no general obligation to conform to every ARF relying-party requirement.

---

## 4. Article 5c(6): wallet certification

### Empowerment

[Article 5c(6) of eIDAS](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02014R0910-20240520) requires the Commission to establish a list of reference standards and, where necessary, specifications and procedures for certification under Article 5c(1) to (3).

### Regulation 2024/2981

[Commission Implementing Regulation (EU) 2024/2981](https://eur-lex.europa.eu/eli/reg_impl/2024/2981/oj/eng) is expressly based on Article 5c(6). It establishes the certification framework for wallet solutions.

Its recital 3 says:

> “the technical specifications set out in this Regulation rely on the work carried out on the basis of Commission Recommendation (EU) 2021/946 … and in particular the Architecture and Reference Framework which is part of it.”

Its Article 1 goes further by stating:

> “This Regulation sets out reference standards and establishes specifications and procedures to build a robust framework for the certification of wallets to be updated on a regular basis to keep in line with technology and standards developments and with the work carried out on the basis of Recommendation (EU) 2021/946 … and in particular the Architecture and Reference Framework.”

#### Actors and requirements

The regulation covers:

- Member States and national certification schemes;
- scheme owners;
- wallet providers and electronic identification schemes under which wallets are provided;
- certification bodies and their subcontractors;
- national accreditation and supervisory bodies;
- the Cooperation Group;
- certification, surveillance, vulnerability management, recertification and recordkeeping;
- functional, cybersecurity and data-protection requirements in its annexes.

#### ARF relationship

This is one of the strongest formal ARF references. Nevertheless, Article 1 still says that **the regulation** sets out the applicable standards, specifications and procedures and is to be updated in light of the ARF. It does not declare the ARF itself to be the certification scheme or a directly applicable body of certification requirements.

**Characterisation:** binding certification framework, standards and annexed requirements; ARF used as an alignment and maintenance reference; no wholesale incorporation.

---

## 5. Article 5d(7): list of certified wallets

### Empowerment

[Article 5d(7) of eIDAS](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02014R0910-20240520) requires implementing acts establishing the formats and procedures applicable to Article 5d(1), (4) and (5). Those provisions concern information on certified wallets, submission and updating by Member States and the Commission-maintained list.

### Regulation 2025/849

The corresponding adopted act is **not Regulation 2025/848**, but [Commission Implementing Regulation (EU) 2025/849](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202500849). It is explicitly based on Article 5d(7).

Its purpose is to establish formats and procedures for Member States to submit and update information used by:

- the Commission;
- the European Digital Identity Cooperation Group; and
- the public through the published list of certified wallets.

The required information includes descriptions of wallet solutions, the electronic identification schemes under which they are provided, responsible authorities, supervision and certification-related information.

#### ARF relationship

In the material reviewed, the operative focus is submission formats and procedures. No operative clause was identified that incorporates the ARF or makes ARF list requirements directly binding.

**Characterisation:** binding information-submission and list-maintenance procedures; no verified wholesale or specific normative incorporation of ARF content.

---

## 6. Article 5e(5): reactions to wallet security breaches

### Empowerment

[Article 5e(5) of eIDAS](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02014R0910-20240520) requires implementing acts establishing reference standards and, where necessary, specifications and procedures for the measures in Article 5e(1) to (3). These concern compromise or suspected compromise, suspension and restoration or revocation-related reactions.

### Regulation 2025/847

The corresponding act is [Commission Implementing Regulation (EU) 2025/847](https://eur-lex.europa.eu/eli/reg_impl/2025/847/oj/eng/pdf), adopted expressly under Article 5e(5).

Its recital 3 states:

> “the technical specifications set out in this Regulation rely on the work carried out under Commission Recommendation (EU) 2021/946 and in particular the Architecture and Reference Framework which is part of it.”

It also says the regulation should be reviewed and, if necessary, updated to remain aligned with global developments and the ARF.

#### Actors and requirements

The act covers, within the scope of its operative provisions:

- Member States and competent authorities;
- wallet providers;
- relevant supervisory and certification actors;
- identification and assessment of security breaches;
- suspension and restoration measures;
- communication of breach-related information;
- interaction with GDPR and EU-institution personal-data-breach obligations.

#### ARF relationship

The reference is evidence that ARF work informed the technical rules. The binding duties are those enacted in Regulation 2025/847. The recital preserves separate GDPR and Regulation 2018/1725 breach obligations rather than replacing them with ARF processes.

**Characterisation:** binding security-breach procedures; ARF relied upon as technical input; no wholesale incorporation.

---

## 7. Consolidated mapping

| eIDAS empowerment | Implementing act | Binding subject | Principal actors | ARF effect |
|---|---|---|---|---|
| Article 5a(23) | 2024/2977 | PID and electronic attestations issued to wallets | Wallet providers, PID and attestation providers | Technical provenance; selected enacted requirements binding |
| Article 5a(23) | 2024/2979 | Integrity and core wallet functionality | Wallet providers, wallet solutions, issuers and relying-party-facing components | Recital says specifications “rely on” ARF |
| Article 5a(23) | 2024/2980 | Notifications of trusted ecosystem entities | Member States, Commission, trusted providers and registers | Recital-level reliance on ARF |
| Article 5a(23) | 2024/2982 | Protocols and interfaces | Wallet providers, issuers, relying parties and supervisory interfaces | Operative update/alignment reference, not wholesale incorporation |
| Article 5b(11) | 2025/848 | Relying-party registration | Member States, registrars, relying parties, certificate providers | Recital-level reliance and future alignment |
| Article 5c(6) | 2024/2981 | Wallet certification | Member States, scheme owners, wallet providers, certification bodies | Operative update/alignment reference plus recital reliance |
| Article 5d(7) | 2025/849 | Submission and publication of certified-wallet information | Member States, Commission, Cooperation Group | No specific normative ARF incorporation verified |
| Article 5e(5) | 2025/847 | Reactions to wallet security breaches | Member States, wallet providers, competent and supervisory authorities | Recital-level reliance and future alignment |

---

## Final legal assessment

### What is legally mandated

The following are legally binding:

- the wallet outcomes, functions, controls, certification and ecosystem duties laid down directly in eIDAS;
- the specific standards, formats, protocols, interfaces, procedures and other requirements enacted in the articles and annexes of an implementing regulation;
- an external standard or specification where a binding provision of an implementing regulation identifies it and requires compliance with it;
- later amendments to those regulations, including Regulation 2026/1731.

### What is not legally mandated merely by being in the ARF

The following are not automatically binding:

- the ARF as a complete document;
- an ARF high-level requirement that has not been enacted or normatively referenced by a binding act;
- an ARF explanation, architecture diagram, use case or recommendation;
- a later ARF change that has not been reflected in an amendment to the applicable implementing regulation.

### Bottom line

> **The ARF is an important, officially recognised technical reference and source for the EUDI Wallet implementing acts, but it is not, as a whole, a legally binding specification. Legal obligations arise from eIDAS and from the particular requirements, standards and specifications enacted or normatively referenced in adopted implementing acts. References to keeping an implementing regulation aligned with the ARF do not make every current or future ARF requirement directly applicable.**

The 2026 amendment is particularly persuasive: when the ARF evolved, the Commission amended the binding regulations to align them. That would not have been necessary if ARF updates were already self-executing legal amendments.

## Verification limitation

The legal bases, subject matter and ARF references above were checked against EUR-Lex. No language was identified in Regulations 2025/849 or 2025/847 that incorporates a particular numbered ARF high-level requirement verbatim. Their ARF relationship should therefore not be described more strongly than the verified recital-level technical reliance unless a specific article or annex cross-reference is identified.

## Sources

- [eID.AS implementing-acts discovery index](https://www.eid.as/implementing-acts/), used only as a secondary discovery source.
- [Consolidated Regulation (EU) No 910/2014](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02014R0910-20240520).
- [Regulation (EU) 2024/1183](https://eur-lex.europa.eu/eli/reg/2024/1183/oj/eng).
- [EUDI Wallet Architecture and Reference Framework](https://eudi.dev/1.4.0/arf/).
- [Commission Implementing Regulation (EU) 2024/2977](https://eur-lex.europa.eu/eli/reg_impl/2024/2977/oj/eng).
- [Commission Implementing Regulation (EU) 2024/2979](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX%3A32024R2979).
- [Commission Implementing Regulation (EU) 2024/2980](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2980).
- [Commission Implementing Regulation (EU) 2024/2981](https://eur-lex.europa.eu/eli/reg_impl/2024/2981/oj/eng).
- [Commission Implementing Regulation (EU) 2024/2982](https://eur-lex.europa.eu/eli/reg_impl/2024/2982/oj).
- [Consolidated Commission Implementing Regulation (EU) 2024/2982](https://eur-lex.europa.eu/eli/reg_impl/2024/2982/2026-08-11/eng).
- [Commission Implementing Regulation (EU) 2025/847](https://eur-lex.europa.eu/eli/reg_impl/2025/847/oj/eng/pdf).
- [Commission Implementing Regulation (EU) 2025/848](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ%3AL_202500848).
- [Commission Implementing Regulation (EU) 2025/849](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202500849).
- [Commission Implementing Regulation (EU) 2026/1731](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202601731).
