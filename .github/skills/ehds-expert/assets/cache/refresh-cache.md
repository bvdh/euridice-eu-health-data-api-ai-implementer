# Refreshing the EHDS Cache

Run these commands from this `assets/cache/` folder to regenerate the offline snapshots.

## Full regulation (Regulation (EU) 2025/327)

```bash
curl -sL -A "Mozilla/5.0" -H "Accept: application/pdf,*/*" \
  -o ehds-regulation-2025-327.pdf \
  "http://data.europa.eu/eli/reg/2025/327/oj/eng/pdf"
pdftotext -layout ehds-regulation-2025-327.pdf ehds-regulation-2025-327.txt
# Rebuild the structural line-number index after re-extracting the text:
python3 ../../scripts/build-index.py
```

Note: the direct EUR-Lex `legal-content/.../PDF` endpoint blocks scripted downloads (returns empty). Use the `data.europa.eu` ELI URL above.

## Official FAQ (DG SANTE)

```bash
curl -sL -A "Mozilla/5.0" \
  -o ehds-faq.pdf \
  "https://health.ec.europa.eu/document/download/4dd47ec2-71dd-49fc-b036-ad7c14f6ed68_en?filename=ehealth_ehds_qa_en.pdf"
pdftotext -layout ehds-faq.pdf ehds-faq.txt
```

The FAQ download link is published on the FAQ landing page: https://health.ec.europa.eu/publications/frequently-asked-questions-european-health-data-space_en — update the document GUID if the link changes.

## Portal page snapshots

`ehds-policy-page.md` and `myhealth-eu-page.md` are hand-curated markdown summaries of the EC policy and MyHealth@EU pages. Refresh manually if the live pages change materially.
