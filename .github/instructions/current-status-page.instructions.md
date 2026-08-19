---
description: "Guidance for maintaining the public changes/status page for the EU Health Data API IG."
applyTo: "eu-health-data-api/input/pagecontent/changes.md"
---

# Changes / Status Page

`eu-health-data-api/input/pagecontent/changes.md` is the public-facing changes and status page for
the EU Health Data API IG. Its audience is IG readers and Euridice website visitors.

## Required Content

- State the page purpose as a public status/changes record.
- Summarize the current publication and reconciliation status of the IG.
- Keep the described version/release status aligned with the version declared in
  `eu-health-data-api/sushi-config.yaml`.
- List notable changes since the previous release in a readable, chronological form.

## Rules

- Keep the content public-facing, concise, and factual — no internal implementation detail.
- After editing, rebuild the IG (`cd eu-health-data-api && ./_build.sh build`) so the rendered
  history matches the source.
- Validate with the `current-status-page-check` skill.
