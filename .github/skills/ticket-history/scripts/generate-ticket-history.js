#!/usr/bin/env node
/**
 * Weekly ticket lifecycle history for the EU Health Data API IG Jira tickets.
 *
 * Reads ticket markdown from jira/open, jira/closed and jira/active* buckets,
 * derives a per-ticket lifecycle timeline, and emits weekly stacked-bar artifacts:
 *   jira/ticket-history.csv  weekly counts
 *   jira/ticket-history.svg  stacked bar chart
 *   jira/ticket-history.md   report (chart + table + methodology)
 *
 * Zero runtime dependencies (plain Node).
 */

const fs = require('fs');
const path = require('path');

const JIRA_DIR = path.join(process.cwd(), 'jira');
const STAGES = ['Submitted', 'Triaged', 'UnderVote', 'ToBeApplied', 'Done'];
const JQL_SPEC_SCOPE = 'project = FHIR AND Specification = "EU Health Data API (R4) (FHIR) [FHIR-eu-health-data-api]"';
const STAGE_COLORS = {
  Submitted: '#9aa0a6',
  Triaged: '#4285f4',
  UnderVote: '#ea8060',
  ToBeApplied: '#f9ab00',
  Done: '#34a853',
};

// Current-status -> furthest lifecycle stage reached.
// ToBeApplied: tickets with an agreed disposition (voted) that is not yet marked Done.
const STATUS_STAGE = {
  'submitted': 'Submitted',
  'waiting for input': 'Triaged',
  'triaged': 'Triaged',
  'deferred': 'Triaged',
  'resolved - change required': 'ToBeApplied',
  'resolved - no change': 'Done',
  'duplicate': 'Done',
  'applied': 'Done',
};

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const CUTOFF = arg('--cutoff', null) ? parseDate(arg('--cutoff', null)) : null;
const HISTORY_DIR = path.join(JIRA_DIR, 'history');
const OUT_CSV = arg('--output-csv', path.join(HISTORY_DIR, 'ticket-history.csv'));
const OUT_SVG = arg('--output-svg', path.join(HISTORY_DIR, 'ticket-history.svg'));
const OUT_MD = arg('--output-md', path.join(HISTORY_DIR, 'ticket-history.md'));

function parseDate(value) {
  if (!value) return null;
  const v = String(value).trim();
  let m = v.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  m = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (m) {
    const year = +m[3] < 100 ? 2000 + +m[3] : +m[3];
    return new Date(Date.UTC(year, +m[1] - 1, +m[2]));
  }
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
}

function mondayOf(date) {
  const d = new Date(date.getTime());
  const dow = (d.getUTCDay() + 6) % 7; // Monday = 0
  d.setUTCDate(d.getUTCDate() - dow);
  return d;
}

function isoWeekLabel(monday) {
  const d = new Date(monday.getTime());
  d.setUTCDate(d.getUTCDate() + 3); // Thursday of the ISO week
  const year = d.getUTCFullYear();
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const week = 1 + Math.round(((d - jan4) / 86400000 - 3 + ((jan4.getUTCDay() + 6) % 7)) / 7);
  return `${year}-W${String(week).padStart(2, '0')}`;
}

function ticketFiles() {
  const files = [];
  if (!fs.existsSync(JIRA_DIR)) return files;
  for (const bucket of fs.readdirSync(JIRA_DIR)) {
    const bucketDir = path.join(JIRA_DIR, bucket);
    if (!fs.statSync(bucketDir).isDirectory()) continue;
    if (!/^(open|closed|active.*)$/.test(bucket)) continue;
    for (const ticketDir of fs.readdirSync(bucketDir)) {
      if (!/^FHIR-\d+$/.test(ticketDir)) continue;
      const full = path.join(bucketDir, ticketDir, `${ticketDir}.md`);
      if (fs.existsSync(full)) files.push(full);
    }
  }
  return files;
}

function parseTicket(file) {
  const text = fs.readFileSync(file, 'utf-8');
  const metaBlock = text.split(/^##\s+Metadata\s*$/m)[1] || '';
  const meta = metaBlock.split(/^##\s+/m)[0] || '';
  const resolutionBlock = text.split(/^##\s+Resolution\s*$/m)[1] || '';
  const resolutionSection = resolutionBlock.split(/^##\s+/m)[0] || '';
  const field = (name) => {
    const m = meta.match(new RegExp(`^-\\s*${name}\\s*:\\s*(.+)$`, 'mi'));
    return m ? m[1].trim() : '';
  };
  const resolutionField = (name) => {
    const m = resolutionSection.match(new RegExp(`^-\\s*${name}\\s*:\\s*(.+)$`, 'mi'));
    return m ? m[1].trim() : '';
  };
  const key = field('Key') || path.basename(file, '.md');
  return {
    key,
    status: field('Status'),
    resolution: resolutionField('Resolution') || field('Resolution') || 'Unresolved',
    created: parseDate(field('Created')),
    updated: parseDate(field('Updated')),
    resolved: parseDate(field('Resolved')),
    voteDate: parseDate(resolutionField('Vote Date') || field('Vote Date')),
    file,
  };
}

function jiraIssuesLink(jql, label) {
  return `[${label}](https://jira.hl7.org/issues/?jql=${encodeURIComponent(jql)})`;
}

function escapeJqlValue(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function buildCurrentStatusMatrix(tickets) {
  const statuses = [...new Set(tickets.map((t) => t.status || 'Unknown'))].sort((a, b) => a.localeCompare(b));
  const resolutions = [...new Set(tickets.map((t) => t.resolution || 'Unresolved'))].sort((a, b) => a.localeCompare(b));
  const matrix = {};
  for (const r of resolutions) {
    matrix[r] = {};
    for (const s of statuses) matrix[r][s] = 0;
  }
  for (const t of tickets) {
    const r = t.resolution || 'Unresolved';
    const s = t.status || 'Unknown';
    if (!(r in matrix)) matrix[r] = {};
    if (!(s in matrix[r])) matrix[r][s] = 0;
    matrix[r][s] += 1;
  }

  const rowTotals = {};
  const colTotals = {};
  for (const r of resolutions) {
    rowTotals[r] = statuses.reduce((sum, s) => sum + (matrix[r][s] || 0), 0);
  }
  for (const s of statuses) {
    colTotals[s] = resolutions.reduce((sum, r) => sum + (matrix[r][s] || 0), 0);
  }

  return { statuses, resolutions, matrix, rowTotals, colTotals, total: tickets.length };
}

function renderCurrentStatusTable(tickets) {
  const { statuses, resolutions, matrix, rowTotals, colTotals, total } = buildCurrentStatusMatrix(tickets);
  const cutoffClause = CUTOFF ? ` AND created >= "${CUTOFF.toISOString().slice(0, 10)}"` : '';
  const baseJql = `${JQL_SPEC_SCOPE}${cutoffClause}`;

  const lines = [];
  lines.push('## Current Status');
  lines.push('');
  lines.push(`| Resolution \\ Status | ${statuses.join(' | ')} | Total |`);
  lines.push(`|---|${statuses.map(() => ':---:').join('|')}|---:|`);

  for (const r of resolutions) {
    const rowCells = statuses.map((s) => String(matrix[r][s] || 0));
    const rowJql = `${baseJql} AND resolution = "${escapeJqlValue(r)}"`;
    const rowTotalLink = jiraIssuesLink(rowJql, String(rowTotals[r] || 0));
    lines.push(`| ${r} | ${rowCells.join(' | ')} | ${rowTotalLink} |`);
  }

  const colTotalLinks = statuses.map((s) => {
    const colJql = `${baseJql} AND status = "${escapeJqlValue(s)}"`;
    return jiraIssuesLink(colJql, String(colTotals[s] || 0));
  });
  lines.push(`| **Total** | ${colTotalLinks.join(' | ')} | ${jiraIssuesLink(baseJql, String(total))} |`);
  lines.push('');
  return lines;
}

/**
 * Timestamps per stage. Jira exports carry Created/Resolved/Updated and Vote Date, so
 * intermediate transitions are approximated (see the skill's Methodology).
 * UnderVote is detected when a ticket has a Resolved date and its vote has not happened
 * (i.e., Vote Date is absent or later than Resolved).
 */
function stageTimeline(t) {
  const stage = STATUS_STAGE[(t.status || '').toLowerCase()] || 'Submitted';
  const timeline = { Submitted: t.created };
  const reached = STAGES.indexOf(stage);
  if (reached >= 1) timeline.Triaged = t.resolved || t.updated || t.created;
  // UnderVote starts on Resolved and ends on Vote Date. A missing Vote Date means
  // the ticket remains UnderVote until a vote is recorded or a later stage is reached.
  if (t.resolved && (!t.voteDate || t.voteDate > t.resolved)) {
    timeline.UnderVote = t.resolved;
  }

  if (reached >= 3) timeline.ToBeApplied = t.voteDate || t.resolved || t.updated || t.created;
  if (reached >= 4) timeline.Done = t.updated || t.resolved || t.created;
  // Enforce monotonic, non-decreasing transition dates.
  let prev = t.created;
  for (const s of STAGES) {
    if (!timeline[s]) continue;
    if (timeline[s] < prev) timeline[s] = prev;
    prev = timeline[s];
  }
  return timeline;
}

function stageAt(timeline, weekEnd) {
  let current = null;
  for (const s of STAGES) {
    const d = timeline[s];
    if (d && d <= weekEnd) current = s;
  }
  return current;
}

function buildWeeks(tickets) {
  const dates = tickets.map((t) => t.created).filter(Boolean);
  if (!dates.length) return [];
  const start = mondayOf(new Date(Math.min(...dates.map((d) => d.getTime()))));
  const end = mondayOf(new Date());
  const weeks = [];
  for (let d = new Date(start.getTime()); d <= end; d.setUTCDate(d.getUTCDate() + 7)) {
    const monday = new Date(d.getTime());
    const weekEnd = new Date(d.getTime());
    weekEnd.setUTCDate(weekEnd.getUTCDate() + 6);
    weeks.push({ monday, weekEnd, label: isoWeekLabel(monday) });
  }
  return weeks;
}

function renderSvg(rows) {
  const W = Math.max(900, 60 + rows.length * 26 + 60);
  const H = 480;
  const padL = 60, padR = 170, padT = 40, padB = 90;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const maxTotal = Math.max(1, ...rows.map((r) => r.total));
  const step = plotW / rows.length;
  const barW = Math.max(4, step * 0.7);
  const y = (v) => padT + plotH - (v / maxTotal) * plotH;
  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  const parts = [];
  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Helvetica, Arial, sans-serif" font-size="11">`);
  parts.push(`<rect width="${W}" height="${H}" fill="#ffffff"/>`);
  parts.push(`<text x="${padL}" y="24" font-size="15" font-weight="bold">Jira ticket lifecycle by week (cumulative)</text>`);

  const ticks = 5;
  for (let i = 0; i <= ticks; i++) {
    const v = Math.round((maxTotal / ticks) * i);
    parts.push(`<line x1="${padL}" y1="${y(v)}" x2="${padL + plotW}" y2="${y(v)}" stroke="#e0e0e0"/>`);
    parts.push(`<text x="${padL - 8}" y="${y(v) + 4}" text-anchor="end" fill="#5f6368">${v}</text>`);
  }

  rows.forEach((r, i) => {
    const x = padL + i * step + (step - barW) / 2;
    let acc = 0;
    for (const s of STAGES) {
      const v = r[s];
      if (!v) continue;
      const h = (v / maxTotal) * plotH;
      parts.push(`<rect x="${x.toFixed(1)}" y="${(y(acc) - h).toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" fill="${STAGE_COLORS[s]}"><title>${esc(r.week)} ${s}: ${v}</title></rect>`);
      acc += v;
    }
    if (rows.length <= 60 || i % 2 === 0) {
      const cx = x + barW / 2;
      parts.push(`<text x="${cx.toFixed(1)}" y="${padT + plotH + 14}" text-anchor="end" fill="#5f6368" transform="rotate(-60 ${cx.toFixed(1)} ${padT + plotH + 14})">${esc(r.week)}</text>`);
    }
  });

  parts.push(`<line x1="${padL}" y1="${padT + plotH}" x2="${padL + plotW}" y2="${padT + plotH}" stroke="#5f6368"/>`);
  parts.push(`<text x="${padL - 44}" y="${padT + plotH / 2}" text-anchor="middle" fill="#5f6368" transform="rotate(-90 ${padL - 44} ${padT + plotH / 2})">Tickets</text>`);

  const lx = padL + plotW + 20;
  STAGES.forEach((s, i) => {
    const ly = padT + i * 22;
    parts.push(`<rect x="${lx}" y="${ly}" width="12" height="12" fill="${STAGE_COLORS[s]}"/>`);
    parts.push(`<text x="${lx + 18}" y="${ly + 11}" fill="#202124">${s}</text>`);
  });
  const last = rows[rows.length - 1];
  if (last) {
    parts.push(`<text x="${lx}" y="${padT + STAGES.length * 22 + 18}" fill="#5f6368">Total (latest): ${last.total}</text>`);
  }
  parts.push('</svg>');
  return parts.join('\n');
}

function main() {
  for (const outFile of [OUT_CSV, OUT_SVG, OUT_MD]) {
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
  }

  const tickets = [];
  const seen = new Set();
  const skipped = [];
  for (const file of ticketFiles()) {
    const t = parseTicket(file);
    if (seen.has(t.key)) continue;
    seen.add(t.key);
    if (!t.created) {
      skipped.push(t);
      continue;
    }
    if (CUTOFF && t.created < CUTOFF) continue;
    tickets.push(t);
  }

  if (!tickets.length) {
    console.error('No tickets with a parseable Created date were found under jira/.');
    process.exit(1);
  }

  const timelines = tickets.map((t) => ({ key: t.key, timeline: stageTimeline(t) }));
  const weeks = buildWeeks(tickets);
  const rows = weeks.map((w) => {
    const row = { week: w.label, weekStart: w.monday.toISOString().slice(0, 10), total: 0 };
    for (const s of STAGES) row[s] = 0;
    for (const { timeline } of timelines) {
      const s = stageAt(timeline, w.weekEnd);
      if (!s) continue;
      row[s] += 1;
      row.total += 1;
    }
    return row;
  });

  const csv = [['week', 'week_start', 'total', ...STAGES].join(',')]
    .concat(rows.map((r) => [r.week, r.weekStart, r.total, ...STAGES.map((s) => r[s])].join(',')))
    .join('\n');
  fs.writeFileSync(OUT_CSV, csv + '\n');

  fs.writeFileSync(OUT_SVG, renderSvg(rows) + '\n');

  const svgRel = path.relative(path.dirname(OUT_MD), OUT_SVG);
  const currentStatusTable = renderCurrentStatusTable(tickets);
  const md = [
    ...currentStatusTable,
    '',
    `![Weekly ticket lifecycle](${svgRel})`,
    '',
    'Each bar is a cumulative snapshot at the end of that ISO week; the stack height equals the total number of tickets submitted so far.',
    '',
    `Generated: ${new Date().toISOString().slice(0, 10)}`,
    `Tickets included: ${tickets.length}${CUTOFF ? ` (created on or after ${CUTOFF.toISOString().slice(0, 10)})` : ''}`,
    ...(skipped.length ? [`Excluded (no parseable Created date): ${skipped.length} — ${skipped.map((t) => t.key).join(', ')}`] : []),
    '',
    '## Weekly counts',
    '',
    `| Week | Week start | Total | ${STAGES.join(' | ')} |`,
    `|---|---|---:|${STAGES.map(() => '---:').join('|')}|`,
    ...rows.map((r) => `| ${r.week} | ${r.weekStart} | ${r.total} | ${STAGES.map((s) => r[s]).join(' | ')} |`),
    '',
    '## Methodology',
    '',
    '- Sources: `jira/open`, `jira/closed`, and `jira/active*` ticket markdown files (deduplicated by `Key`).',
    '- Stage mapping from the ticket `Status` field:',
    '  - Submitted: Submitted',
    '  - Triaged: Triaged, Waiting for Input, Deferred',
    '  - ToBeApplied: Resolved - change required',
    '  - Done: Resolved - No Change, Duplicate, Applied',
    '- Transition dates are approximated from the exported `Created`, `Resolved`, and `Updated` fields because per-status transition history is not present in the local ticket markdown.',
    '- `ToBeApplied` covers tickets with an agreed disposition that is not yet marked Done.',
    '- Transition dates are forced to be non-decreasing per ticket.',
    '',
  ].join('\n');
  fs.writeFileSync(OUT_MD, md + '\n');

  console.log(`Tickets: ${tickets.length}, weeks: ${rows.length}`);
  console.log(`Wrote ${OUT_CSV}`);
  console.log(`Wrote ${OUT_SVG}`);
  console.log(`Wrote ${OUT_MD}`);
}

main();
