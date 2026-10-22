# Syslog, ATNA, and BALP Analysis for [FHIR-56584](https://jira.hl7.org/browse/FHIR-56584)

Analysis date: 2026-10-22.

## Question and conclusion

Syslog is not a direct alternative to ATNA or BALP: these specifications address
different layers. Syslog can form part of an ATNA audit-reporting implementation.
A deployment may choose general-purpose syslog infrastructure without adopting
ATNA or BALP, but that choice alone does not supply standardized healthcare audit
semantics or establish conformance to either profile.

## Specification roles

| Specification | Role | Important boundary |
|---------------|------|--------------------|
| Syslog | General-purpose message format and event-reporting framework. RFC 5424 defines the protocol; separate specifications define transports such as TLS. | Does not itself define healthcare audit-event content. |
| IHE ATNA | Security and audit profile covering node authentication, user authentication, audit reporting, and secure communications. ITI-20 defines syslog-based reporting with DICOM-schema audit content. | Syslog delivery alone does not satisfy the profile's content, actor, or other security requirements. |
| IHE BALP | Content profile defining reusable FHIR AuditEvent patterns, including FHIR REST operation patterns. | Does not itself specify a logging transport or a complete audit infrastructure. |

Traditional ATNA audit reporting uses DICOM-schema audit messages carried through
syslog. RESTful ATNA adds FHIR AuditEvent support. It is therefore inaccurate to
describe ATNA and BALP together simply as FHIR AuditEvent content profiles.

For example, sending the free-text message "user accessed patient record" over
syslog does not establish ATNA or BALP conformance. ATNA's syslog transaction
constrains the healthcare audit payload as well as its reporting mechanism.
BALP instead supplies constraints and patterns for FHIR AuditEvent resources.

## Implications for the informative IG page

The [informative-page draft](./FHIR-56584-logging-informative-page-draft.md)
now acknowledges syslog-based collectors and distinguishes general logging
infrastructure, healthcare audit reporting, and FHIR audit content.

The page does not select a mandatory log format or transport, require adoption
of ATNA or BALP, or establish cross-system log exchange or correlation. These
are separate deployment or profiling decisions. This analysis does not assess
whether any particular logging design satisfies EHDS or other legal duties.

The distinction between a source EHR's API release event and later user access
in a receiving system remains applicable regardless of the chosen logging
technology. Neither choosing syslog nor adopting a content pattern automatically
makes both systems observe the same events or establishes a correlation scheme.

Only the ticket-directory draft was updated. This analysis does not claim that
the proposed page has been implemented or published in the IG.

## Verified specification references

The following IHE pages were consulted on 2026-10-22:

- [ATNA profile](https://profiles.ihe.net/ITI/TF/Volume1/ch-9.html):
  security scope, actor requirements, and the RESTful ATNA extension.
- [Record Audit Event, ITI-20](https://profiles.ihe.net/ITI/TF/Volume2/ITI-20.html):
  section 3.20.4.1 describes the RFC 5424 syslog interaction and its
  DICOM-schema message-content constraints.
- [BALP 1.1.4](https://profiles.ihe.net/ITI/BALP/index.html):
  describes BALP as a content profile with reusable FHIR AuditEvent patterns.

Related protocol references:

- [RFC 5424: The Syslog Protocol](https://www.rfc-editor.org/rfc/rfc5424).
- [RFC 5425: Transport Layer Security (TLS) Transport Mapping for Syslog](https://www.rfc-editor.org/rfc/rfc5425).
