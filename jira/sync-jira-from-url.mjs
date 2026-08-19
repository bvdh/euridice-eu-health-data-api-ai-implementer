#!/usr/bin/env node
// Sync Jira ticket markdown from the Jira full-content HTML export (URL or local file).
// Renders expanded ticket markdown into jira/{open,closed,active}/FHIR-XXXXX/FHIR-XXXXX.md
// and moves ticket folders between open/ and closed/ to match their current status.
import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";

const KEY_PATTERN = /^FHIR-\d+$/i;

// Default search: EU Health Data API (R4) specification, full content.
const DEFAULT_URL =
  "https://jira.hl7.org/sr/jira.issueviews:searchrequest-fullcontent/temp/SearchRequest.html" +
  "?jqlQuery=project+%3D+FHIR+AND+Specification+%3D+%22EU+Health+Data+API+%28R4%29+%28FHIR%29+" +
  "%5BFHIR-eu-health-data-api%5D%22&tempMax=1000";

const CLOSED_STATUSES = new Set([
  "Applied",
  "Duplicate",
  "Resolved - No Change",
  "Resolved - change required",
  "Deferred"
]);

function isClosedStatus(status) {
  return CLOSED_STATUSES.has((status || "").trim());
}

function getArg(name, defaultValue = "") {
  const idx = process.argv.indexOf(name);
  if (idx === -1 || idx + 1 >= process.argv.length) {
    return defaultValue;
  }
  return process.argv[idx + 1];
}

function readBranchFromFile(branchFilePath) {
  if (!fs.existsSync(branchFilePath)) {
    return "";
  }
  const lines = fs
    .readFileSync(branchFilePath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
  if (lines.length === 0) {
    return "";
  }
  const first = lines[0];
  const match = first.match(/^[Bb]ranch:\s*(.+)$/);
  return (match ? match[1] : first).trim();
}

function resolveActiveDirName(outDir, activeDirArg) {
  if (activeDirArg) {
    return activeDirArg;
  }
  const repoRoot = path.resolve(outDir, "..");
  const branchFilePath = path.join(repoRoot, "current-branch.md");
  const branch = readBranchFromFile(branchFilePath);
  if (!branch) {
    return "active";
  }
  return `active-${branch.replaceAll("/", "-")}`;
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
      Accept: "text/html,application/xhtml+xml"
    }
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url}`);
  }
  return await res.text();
}

// --- HTML -> Markdown helpers -------------------------------------------------

function nodeToMarkdown($, node) {
  if (!node) {
    return "";
  }
  if (node.type === "text") {
    return node.data || "";
  }
  if (node.type !== "tag") {
    return "";
  }
  const inner = (node.children || []).map((c) => nodeToMarkdown($, c)).join("");
  switch (node.name) {
    case "a": {
      const href = node.attribs && node.attribs.href ? node.attribs.href : "";
      const text = inner.trim() || href;
      if (href && !/^javascript:/i.test(href)) {
        return `[${text}](${href})`;
      }
      return text;
    }
    case "br":
      return "\n";
    case "p":
      return `\n\n${inner}\n\n`;
    case "li":
      return `- ${inner.trim()}\n`;
    case "ul":
    case "ol":
      return `\n${inner}\n`;
    case "div":
      // Skip hidden metadata helper divs.
      if (node.attribs && /nfeed-field/.test(node.attribs.class || "")) {
        return "";
      }
      return `${inner}\n`;
    default:
      return inner;
  }
}

function cleanupBlock(text) {
  return text
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function htmlBlockToMarkdown($, el) {
  if (!el || el.length === 0) {
    return "";
  }
  const raw = el
    .contents()
    .map((i, c) => nodeToMarkdown($, c))
    .get()
    .join("");
  return cleanupBlock(raw);
}

function inlineValue($, el) {
  const md = htmlBlockToMarkdown($, el);
  return md.replace(/\s+/g, " ").trim();
}

// --- Parsing ------------------------------------------------------------------

function parseIssueFragment(fragment) {
  const $ = cheerio.load(fragment, { decodeEntities: true });
  const h3 = $("h3.formtitle").first();
  if (h3.length === 0) {
    return null;
  }

  const headerText = h3.text();
  const keyMatch = headerText.match(/FHIR-\d+/i);
  if (!keyMatch) {
    return null;
  }
  const key = keyMatch[0].toUpperCase();
  const summary = h3.find("a").first().text().trim();

  const subText = h3.find(".subText").first().text().replace(/\s+/g, " ").trim();
  const created = (subText.match(/Created:\s*([0-9-]+)/) || [])[1] || "";
  const updated = (subText.match(/Updated:\s*([0-9-]+)/) || [])[1] || "";
  const resolved = (subText.match(/Resolved:\s*([0-9-]+)/) || [])[1] || "";

  // Collect every "<b>Label:</b>" -> next cell value pair across all field tables.
  const fields = {};
  $("td > b").each((i, b) => {
    const labelRaw = $(b).text().trim();
    if (!labelRaw.endsWith(":")) {
      return;
    }
    const label = labelRaw.slice(0, -1).trim();
    if (!label || label === "Description" || label === "Comments") {
      return;
    }
    const valueTd = $(b).closest("td").next("td");
    if (valueTd.length === 0) {
      return;
    }
    const value = inlineValue($, valueTd);
    if (value && !(label in fields)) {
      fields[label] = value;
    }
  });

  const description = htmlBlockToMarkdown($, $("#descriptionArea").first());

  const comments = [];
  $('tr[id^="comment-header-"]').each((i, headerRow) => {
    const id = ($(headerRow).attr("id") || "").replace("comment-header-", "");
    const author = $(headerRow).find("a.user-hover").first().text().trim();
    const date = $(headerRow).find('font[color="#336699"]').first().text().trim();
    const bodyRow = $(`#comment-body-${id}`);
    const body = htmlBlockToMarkdown($, bodyRow.find("td").first());
    if (author || body) {
      comments.push({ author, date, body });
    }
  });

  return {
    key,
    summary,
    description,
    created,
    updated,
    resolved,
    status: fields["Status"] || "",
    issueType: fields["Type"] || "",
    priority: fields["Priority"] || "",
    reporter: fields["Reporter"] || "",
    assignee: fields["Assignee"] || "",
    resolution: fields["Resolution"] || "",
    specification: fields["Specification"] || "",
    raisedInVersion: fields["Raised in Version"] || "",
    workGroup: fields["Work Group"] || "",
    relatedUrl: fields["Related URL"] || "",
    relatedPages: fields["Related Page(s)"] || "",
    relatedSections: fields["Related Section(s)"] || "",
    relatedArtifacts: fields["Related Artifact(s)"] || "",
    grouping: fields["Grouping"] || "",
    parentKey: fields["Parent"] || fields["Parent key"] || "",
    resolutionDescription: fields["Resolution Description"] || "",
    resolutionVote: fields["Resolution Vote"] || "",
    voteDate: fields["Vote Date"] || "",
    changeCategory: fields["Change Category"] || "",
    changeImpact: fields["Change Impact"] || "",
    appliedForVersion: fields["Applied for Version"] || "",
    preApplied: fields["Pre Applied"] || "",
    comments
  };
}

function parseExport(html) {
  const fragments = html.split(/<hr class=['"]fullcontent['"]\s*\/?>/i);
  const tickets = new Map();
  for (const fragment of fragments) {
    if (!/formtitle/.test(fragment) || !/FHIR-\d+/.test(fragment)) {
      continue;
    }
    const ticket = parseIssueFragment(fragment);
    if (ticket && KEY_PATTERN.test(ticket.key) && !tickets.has(ticket.key)) {
      tickets.set(ticket.key, ticket);
    }
  }
  return tickets;
}

// --- Rendering ----------------------------------------------------------------

function renderTicketMarkdown(ticket) {
  const lines = [];
  lines.push(`# ${ticket.key}: ${ticket.summary || "(no summary)"}`);
  lines.push("");

  if (ticket.description) {
    lines.push("## Description");
    lines.push("");
    lines.push(ticket.description);
    lines.push("");
  }

  lines.push("## Metadata");
  lines.push("");
  const meta = [
    ["Issue Type", ticket.issueType],
    ["Key", ticket.key],
    ["Summary", ticket.summary],
    ["Status", ticket.status],
    ["Priority", ticket.priority],
    ["Specification", ticket.specification],
    ["Raised in Version", ticket.raisedInVersion],
    ["Work Group", ticket.workGroup],
    ["Reporter", ticket.reporter],
    ["Assignee", ticket.assignee],
    ["Related URL", ticket.relatedUrl],
    ["Related Page(s)", ticket.relatedPages],
    ["Related Section(s)", ticket.relatedSections],
    ["Related Artifact(s)", ticket.relatedArtifacts],
    ["Created", ticket.created],
    ["Updated", ticket.updated],
    ["Resolved", ticket.resolved],
    ["Change Category", ticket.changeCategory],
    ["Change Impact", ticket.changeImpact],
    ["Applied for Version", ticket.appliedForVersion],
    ["Pre Applied", ticket.preApplied]
  ];
  meta.forEach(([label, value]) => {
    // Key/Summary/Status always render (even if empty) to preserve stable structure.
    if (value || label === "Key" || label === "Summary" || label === "Status") {
      lines.push(`- ${label}: ${value || ""}`);
    }
  });
  lines.push("");

  lines.push("## Resolution");
  lines.push("");
  lines.push(`- Status: ${ticket.status || ""}`);
  lines.push(`- Resolution: ${ticket.resolution || ""}`);
  if (ticket.resolutionVote) {
    lines.push(`- Resolution Vote: ${ticket.resolutionVote}`);
  }
  if (ticket.voteDate) {
    lines.push(`- Vote Date: ${ticket.voteDate}`);
  }
  if (ticket.resolutionDescription) {
    lines.push("");
    lines.push(ticket.resolutionDescription);
  }
  lines.push("");

  if (ticket.parentKey || ticket.grouping) {
    lines.push("## Related");
    lines.push("");
    if (ticket.parentKey) {
      lines.push(`- Parent: ${ticket.parentKey}`);
    }
    if (ticket.grouping) {
      lines.push(`- Grouping: ${ticket.grouping}`);
    }
    lines.push("");
  }

  if (ticket.comments.length > 0) {
    lines.push("## Comments");
    lines.push("");
    ticket.comments.forEach((comment) => {
      const heading = [comment.author, comment.date].filter(Boolean).join(" — ");
      lines.push(`### ${heading || "Comment"}`);
      lines.push("");
      if (comment.body) {
        lines.push(comment.body);
        lines.push("");
      }
    });
  }

  return `${lines.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd()}\n`;
}

// --- File system --------------------------------------------------------------

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function discoverActiveTicketDirs(outDir) {
  const owners = new Map();
  if (!fs.existsSync(outDir)) {
    return owners;
  }
  fs.readdirSync(outDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("active-"))
    .sort((left, right) => left.name.localeCompare(right.name))
    .forEach((entry) => {
      const activeDir = path.join(outDir, entry.name);
      fs.readdirSync(activeDir, { withFileTypes: true })
        .filter((ticket) => ticket.isDirectory() && KEY_PATTERN.test(ticket.name))
        .forEach((ticket) => {
          const key = ticket.name.toUpperCase();
          if (owners.has(key)) {
            console.warn(`Warning: ${key} appears in multiple active directories; keeping ${owners.get(key)}`);
            return;
          }
          owners.set(key, entry.name);
        });
    });
  return owners;
}

function moveTicketDir(fromDir, toDir) {
  // Move the entire ticket directory, preserving any extra per-ticket files.
  ensureDir(path.dirname(toDir));
  fs.renameSync(fromDir, toDir);
}

function mergeTicketDir(fromDir, toDir, key) {
  // Merge extra per-ticket files from a wrongly-placed dir into the correct one,
  // then remove the emptied source. The generated <key>.md is left to be rewritten.
  ensureDir(toDir);
  fs.readdirSync(fromDir).forEach((name) => {
    if (name === `${key}.md`) {
      return; // stale generated file; the correct copy is rewritten in toDir
    }
    const target = path.join(toDir, name);
    if (!fs.existsSync(target)) {
      fs.renameSync(path.join(fromDir, name), target);
    }
  });
  fs.rmSync(fromDir, { recursive: true, force: true });
}

function hasExtraFiles(dir, key) {
  // True if the directory contains anything other than the generated <key>.md.
  return fs
    .readdirSync(dir)
    .some((name) => name !== `${key}.md`);
}

function pruneState(stateDir, keepKeys, { protectExtras = false } = {}) {
  if (!fs.existsSync(stateDir)) {
    return;
  }
  fs.readdirSync(stateDir, { withFileTypes: true }).forEach((entry) => {
    if (!entry.isDirectory() || !KEY_PATTERN.test(entry.name)) {
      return;
    }
    const key = entry.name.toUpperCase();
    if (keepKeys.has(key)) {
      return;
    }
    const dir = path.join(stateDir, entry.name);
    // Never delete a directory that holds unique work (resolutions, plans, etc.).
    if (protectExtras && hasExtraFiles(dir, entry.name)) {
      console.warn(`Keeping ${entry.name} in ${path.basename(stateDir)}/ (contains extra files; not pruned)`);
      return;
    }
    fs.rmSync(dir, { recursive: true, force: true });
  });
}

function syncTickets({ tickets, outDir, activeDirName, prune }) {
  const openDir = path.join(outDir, "open");
  const closedDir = path.join(outDir, "closed");
  const activeDir = path.join(outDir, activeDirName);
  ensureDir(openDir);
  ensureDir(closedDir);
  ensureDir(activeDir);

  const activeTicketOwners = discoverActiveTicketDirs(outDir);

  const openKeys = new Set();
  const closedKeys = new Set();
  const activeWritten = new Set();
  let moved = 0;

  const keys = [...tickets.keys()].sort();
  keys.forEach((key) => {
    const ticket = tickets.get(key);
    const closed = isClosedStatus(ticket.status);
    const targetDir = path.join(closed ? closedDir : openDir, key);
    const otherDir = path.join(closed ? openDir : closedDir, key);

    if (fs.existsSync(otherDir)) {
      if (!fs.existsSync(targetDir)) {
        moveTicketDir(otherDir, targetDir);
        moved += 1;
      } else {
        // Ticket exists in both folders: consolidate extra files into the target.
        mergeTicketDir(otherDir, targetDir, key);
        moved += 1;
      }
    }

    ensureDir(targetDir);
    const content = renderTicketMarkdown(ticket);
    fs.writeFileSync(path.join(targetDir, `${key}.md`), content, "utf8");

    if (closed) {
      closedKeys.add(key);
    } else {
      openKeys.add(key);
    }

    if (activeTicketOwners.has(key)) {
      const activeTicketDir = path.join(outDir, activeTicketOwners.get(key), key);
      ensureDir(activeTicketDir);
      fs.writeFileSync(path.join(activeTicketDir, `${key}.md`), content, "utf8");
      activeWritten.add(key);
    }
  });

  const missingActive = [...activeTicketOwners.keys()].filter((key) => !tickets.has(key));
  if (missingActive.length > 0) {
    console.warn(
      `Warning: ${missingActive.length} active ticket(s) not found in export: ${missingActive.join(", ")}`
    );
  }

  if (prune) {
    pruneState(openDir, openKeys, { protectExtras: true });
    pruneState(closedDir, closedKeys, { protectExtras: true });
    const activeKeySet = new Set(
      [...activeTicketOwners.entries()]
        .filter(([, owner]) => owner === activeDirName)
        .map(([key]) => key)
    );
    pruneState(activeDir, activeKeySet, { protectExtras: true });
  }

  return {
    total: keys.length,
    open: openKeys.size,
    closed: closedKeys.size,
    active: activeWritten.size,
    moved
  };
}

// --- Main ---------------------------------------------------------------------

async function main() {
  const url = getArg("--url", DEFAULT_URL);
  const htmlFile = getArg("--html");
  const savePath = getArg("--save");
  const outArg = getArg("--out");
  const activeDirArg = getArg("--active-dir");
  const prune = process.argv.includes("--prune");

  const outDir = outArg
    ? path.resolve(outArg)
    : path.dirname(new URL(import.meta.url).pathname);

  let html;
  if (htmlFile) {
    console.log(`Reading local HTML: ${htmlFile}`);
    html = fs.readFileSync(htmlFile, "utf8");
  } else {
    console.log(`Fetching Jira export: ${url}`);
    html = await fetchHtml(url);
    if (savePath) {
      fs.writeFileSync(savePath, html, "utf8");
      console.log(`Saved fetched HTML to ${savePath}`);
    }
  }

  const tickets = parseExport(html);
  if (tickets.size === 0) {
    throw new Error("No tickets parsed from the export. The HTML structure may have changed.");
  }

  const activeDirName = resolveActiveDirName(outDir, activeDirArg);
  const result = syncTickets({ tickets, outDir, activeDirName, prune });
  console.log(
    `Synced ${result.total} tickets -> open: ${result.open}, closed: ${result.closed}, ` +
      `active(${activeDirName}): ${result.active}, moved: ${result.moved}`
  );
}

main().catch((err) => {
  console.error(`ERROR: ${err.message}`);
  process.exit(1);
});
