# eIDAS Article 8(3) Implementing Acts and EHDS Assurance Levels

**Reference date:** 22 October 2026  
**Scope:** Summary of the analysis conducted in this Copilot session concerning Article 8(3) of Regulation (EU) No 910/2014 (eIDAS), its implementing acts, and the possible relevance of the eIDAS assurance levels to EHDS use cases.

## 1. Executive conclusion

The principal substantive implementing act under Article 8(3) eIDAS is **Commission Implementing Regulation (EU) 2015/1502**. It establishes the minimum technical specifications and procedures that an electronic identification scheme must satisfy to qualify at assurance level **Low**, **Substantial**, or **High**.

The act addresses:

- enrolment and identity proofing;
- issuance, delivery, activation, suspension, revocation, renewal, and replacement of electronic identification means;
- authentication mechanisms;
- management, organisation, information security, record keeping, staffing, technical controls, compliance, and audit.

It does **not** determine which assurance level must be required for a particular online service, transaction, or type of data. In particular, it does not state that health data automatically require assurance level High.

For an EHDS use case, two separate questions must therefore be distinguished:

1. **What does Low, Substantial, or High mean?**  
   This is governed by Article 8 eIDAS and Implementing Regulation (EU) 2015/1502.

2. **Which assurance level, if any, is required for a specific EHDS service or operation?**  
   This must be established from the EHDS Regulation, an EHDS implementing or delegated act, another applicable EU act, or national law. It should not be inferred merely from the sensitivity of health data.

## 2. Primary legal sources

### 2.1 eIDAS Regulation

- [Regulation (EU) No 910/2014, consolidated text of 18 October 2024](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02014R0910-20241018)
- Relevant provision: **Article 8**, especially **Article 8(3)**.

Article 8 establishes the assurance levels Low, Substantial, and High. Article 8(3) empowers the European Commission to adopt implementing acts setting minimum technical specifications, standards, and procedures by reference to matters including:

- identity proofing and verification;
- issuance of electronic identification means;
- authentication;
- the issuing entity;
- other bodies involved in issuance; and
- technical and security specifications of the electronic identification means.

### 2.2 2024 amendment to eIDAS

- [Regulation (EU) 2024/1183](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)

This act amended eIDAS and introduced the European Digital Identity Wallet framework. Wallet implementing acts adopted under provisions such as Article 5a must be distinguished from acts adopted under Article 8(3). A Wallet act should only be treated as an Article 8(3) act if it directly implements or amends Article 8(3), rather than merely referring to or using the assurance-level framework.

### 2.3 Main Article 8(3) implementing act

- [Commission Implementing Regulation (EU) 2015/1502, Official Journal text](https://eur-lex.europa.eu/eli/reg_impl/2015/1502/oj)
- [Commission Implementing Regulation (EU) 2015/1502, consolidated version of 11 July 2022](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02015R1502-20220711)

**Title:** Commission Implementing Regulation (EU) 2015/1502 of 8 September 2015 on setting out minimum technical specifications and procedures for assurance levels for electronic identification means pursuant to Article 8(3) of Regulation (EU) No 910/2014.

**Adoption date:** 8 September 2015.

**Legal basis:** Regulation (EU) No 910/2014, in particular Article 8(3).

This is the substantive act containing the detailed requirements for Low, Substantial, and High.

### 2.4 Czech-language correction

- [Commission Implementing Regulation (EU) 2022/960](https://eur-lex.europa.eu/eli/reg_impl/2022/960/oj)

**Adoption date:** 20 June 2022.

**Function:** Corrects the Czech-language version of Implementing Regulation (EU) 2015/1502, concerning Annex section 2.1.2, assurance level High, point 1(c). It does not establish a new assurance-level framework.

**Legal basis:** Regulation (EU) No 910/2014, in particular Article 8(3).

### 2.5 European Commission overview

- [European Commission eIDAS policy page](https://digital-strategy.ec.europa.eu/en/policies/eidas-regulation)

This provides policy context for eIDAS and the European Digital Identity framework. The legally operative requirements remain those in the regulations published in the Official Journal and presented on EUR-Lex.

## 3. Legal status of Implementing Regulation (EU) 2015/1502

The session analysis concluded that Implementing Regulation (EU) 2015/1502 remains in force and that EUR-Lex provides a consolidated version dated 11 July 2022 reflecting the Czech-language correction made by Implementing Regulation (EU) 2022/960.

No substantive replacement or repeal of Implementing Regulation (EU) 2015/1502 was identified in the reviewed official material.

A Greek-language corrigendum was also identified in the earlier research. It was described as not affecting the English-language version. Corrigenda are textual corrections and should not be treated as new substantive Article 8(3) implementing acts.

For authoritative legal use, check the current EUR-Lex document-information page and the Official Journal versions, because a consolidated text is a documentation aid and not itself the authentic Official Journal act.

## 4. Where the detailed assurance-level requirements are found

The detailed requirements are in the **Annex** to Implementing Regulation (EU) 2015/1502. They are organised by process or control area, with separate requirements for Low, Substantial, and High within the relevant tables.

### 4.1 Section 2.1: Enrolment

- **2.1.1** Application and registration
- **2.1.2** Identity proofing and verification of a natural person
- **2.1.3** Identity proofing and verification of a legal person
- **2.1.4** Binding between the electronic identification means of natural and legal persons

Broadly:

- **Low** permits comparatively limited identity evidence and verification, aimed at decreasing identity misuse or alteration.
- **Substantial** requires stronger checking of recognised identity evidence, authoritative sources, an equivalent assessed procedure, or an existing suitable electronic identification means.
- **High** adds stronger evidence and binding between the claimed identity and the person, including stronger validation and, where applicable, comparison of physical or biometric characteristics.

The exact conditions and alternatives must be read directly in the applicable Annex row. The summaries above are not substitutes for the legal wording.

### 4.2 Section 2.2: Electronic identification means management

- **2.2.1** Characteristics and design
- **2.2.2** Issuance, delivery, and activation
- **2.2.3** Suspension, revocation, and reactivation
- **2.2.4** Renewal and replacement

Key distinctions include:

- Low generally requires at least one authentication factor.
- Substantial generally requires at least two authentication factors from different categories.
- High builds on Substantial and requires stronger protection against duplication, tampering, and attackers with high attack potential.

Delivery and activation controls also become progressively stronger from reasonable confidence that the means reaches the intended person to verification that it has come into that person's possession.

### 4.3 Section 2.3: Authentication

- **2.3.1** Authentication mechanism

The requirements become progressively stronger:

- Low addresses reliable authentication and resistance to an enhanced-basic attack potential.
- Substantial adds dynamic authentication and resistance to moderate attack potential.
- High requires resistance to high attack potential.

### 4.4 Section 2.4: Management and organisation

- **2.4.1** General provisions
- **2.4.2** Published notices and user information
- **2.4.3** Information security management
- **2.4.4** Record keeping
- **2.4.5** Facilities and staff
- **2.4.6** Technical controls
- **2.4.7** Compliance and audit

These sections address the organisational controls supporting the electronic identification scheme. Requirements include security governance, record keeping, appropriate personnel and facilities, protection of technical and cryptographic assets, and audit arrangements. Independence and rigour of audit and control measures generally increase with the assurance level.

## 5. What the Article 8(3) implementing acts do and do not determine

### They determine

The acts set the conditions under which an electronic identification means and its supporting scheme qualify as Low, Substantial, or High. They therefore define the required strength and reliability of:

- identity proofing;
- credential issuance and lifecycle management;
- authentication;
- technical security; and
- organisational governance.

### They do not determine

They do not establish a sector-by-sector or data-by-data mapping, such as:

| Use case or data type | Mandatory level under 2015/1502 |
|---|---|
| Access to an electronic health record | Not specified |
| Electronic prescription | Not specified |
| Medical imaging | Not specified |
| Laboratory results | Not specified |
| Health data generally | Not specified |

Implementing Regulation (EU) 2015/1502 answers: **What must a scheme satisfy to qualify at a given level?**

It does not answer: **Which level must a particular service require?**

## 6. Relationship with EHDS

### 6.1 Correct legal analysis

Do not infer that an EHDS service requires High simply because it gives access to sensitive health data. Sensitivity under data-protection or health law and assurance classification under eIDAS are related security considerations, but they are not legally interchangeable.

For each EHDS use case, look for an express requirement in:

1. the adopted EHDS Regulation;
2. an implementing act adopted under a specific EHDS empowerment;
3. a delegated act, if applicable;
4. another directly applicable EU act; or
5. applicable national legislation or rules governing the service.

### 6.2 Status of the EHDS-specific conclusion in this session

The earlier session analysis stated that EHDS refers to electronic identification and authentication under the eIDAS framework but does not generally contain a table assigning Low, Substantial, or High to each category of health data or EHDS use case.

However, that EHDS-specific conclusion was not accompanied in the session by a complete, source-verified article-by-article inventory of the final EHDS Regulation and all EHDS implementing acts adopted by 22 October 2026. It should therefore be treated as a **provisional conclusion requiring targeted verification** before being relied upon in formal legal, regulatory, product, or conformity documentation.

A definitive EHDS review should search for at least:

- `eIDAS`;
- `electronic identification`;
- `authentication`;
- `assurance level`;
- `low`;
- `substantial`;
- `high`;
- `European Digital Identity Wallet` or `EUDI Wallet`;
- requirements applicable to natural persons, health professionals, data holders, health data access bodies, and cross-border infrastructures.

## 7. Distinction from EUDI Wallet implementing acts

Regulation (EU) 2024/1183 created several separate implementing powers for the European Digital Identity Wallet. A Wallet implementing act may refer to Low, Substantial, or High, or may operationalise controls drawn from Implementing Regulation (EU) 2015/1502.

That does not automatically make it an Article 8(3) implementing act. The decisive points are:

- the legal basis cited in the act;
- whether it formally amends Implementing Regulation (EU) 2015/1502;
- whether it is adopted to implement Article 8(3); and
- whether it changes the general definitions or conditions for Low, Substantial, or High.

Wallet acts adopted only under another eIDAS provision should be analysed as Wallet-specific acts, even when they rely on the Article 8 assurance framework.

## 8. Practical checklist for a specific EHDS use case

For a proposed EHDS service, document the legal reasoning as follows:

1. **Define the use case precisely.**  
   Example: patient access to electronic health data, healthcare-professional access, cross-border prescription retrieval, or secondary-use researcher access.

2. **Identify the actor and access channel.**  
   Determine whether the user is a natural person, healthcare professional, representative, data holder, health data access body employee, or authorised secondary user.

3. **Locate the applicable EHDS provision.**  
   Record the exact article, paragraph, and any relevant implementing-act empowerment.

4. **Check for express eIDAS terminology.**  
   Look for a direct reference to Article 8, Implementing Regulation (EU) 2015/1502, Low, Substantial, High, or another defined authentication standard.

5. **Check applicable implementing acts and national law.**  
   Do not stop at the basic EHDS Regulation if the provision delegates technical or security details.

6. **Only then assign a required assurance level.**  
   If no source expressly establishes a level, state that no explicit level was identified. A risk-based recommendation may still be made, but it must be labelled as a security or architecture recommendation rather than presented as an EHDS legal mandate.

## 9. Short conclusion

- **Implementing Regulation (EU) 2015/1502** is the main substantive act implementing Article 8(3) eIDAS.
- **Implementing Regulation (EU) 2022/960** corrects the Czech-language version and does not create a new assurance regime.
- The detailed requirements are in Annex sections **2.1 to 2.4**.
- These requirements define how an eID means qualifies as **Low**, **Substantial**, or **High**.
- They do not prescribe which level a healthcare or EHDS service must use.
- Any EHDS-specific level must be established from an express EHDS, other EU, or national legal requirement.
- The EHDS-specific conclusion in this session should be verified through a focused review of the final EHDS Regulation and all relevant acts in force on the date of use.

## 10. Source list

1. [Regulation (EU) No 910/2014, consolidated text](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02014R0910-20241018)
2. [Regulation (EU) 2024/1183](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)
3. [Commission Implementing Regulation (EU) 2015/1502, Official Journal text](https://eur-lex.europa.eu/eli/reg_impl/2015/1502/oj)
4. [Commission Implementing Regulation (EU) 2015/1502, consolidated version of 11 July 2022](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02015R1502-20220711)
5. [Commission Implementing Regulation (EU) 2022/960](https://eur-lex.europa.eu/eli/reg_impl/2022/960/oj)
6. [European Commission eIDAS policy page](https://digital-strategy.ec.europa.eu/en/policies/eidas-regulation)
