---
name: current-status-page-check
description: Validate the changes/status page guidance and content against the required public-facing status criteria.
---

# Current Status Page Check

Use this skill when reviewing or validating `eu-health-data-api/input/pagecontent/changes.md`.

## Preconditions

- Confirm the IG has been built after the latest `input/` changes.
- Confirm the generated `output/` tree is up to date with `input/`.
- Use the current version declared in `eu-health-data-api/sushi-config.yaml` as the source of truth for the page version check.

## Check Criteria

- The page states its purpose as a public status/changes page.
- The page clearly identifies the audience as IG readers and Euridice website visitors.
- The version or release status described on the page matches the version declared in `eu-health-data-api/sushi-config.yaml`.
- The rendered history/changes reflect the same release/version state as the built IG output.
- The page summarizes the current publication and reconciliation status.
- The page remains concise and factual, with no internal implementation detail.

## Pass/Fail Guidance

- Pass if all criteria are present, the version/history checks agree with the built IG output, and the wording is suitable for a public-facing page.
- Fail if any required status item, audience statement, or version note is missing.
- Fail if the build has not been refreshed after the latest `input/` change, or if the page version/history text is out of sync with the generated IG artifacts.