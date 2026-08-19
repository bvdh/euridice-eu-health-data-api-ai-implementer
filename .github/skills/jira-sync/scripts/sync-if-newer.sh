#!/bin/bash
# Jira Sync - Prefer the newest Excel export in jira/ when it is newer than the
# already-synced markdown; otherwise fall back to fetching the live Jira URL.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
JIRA_DIR="$REPO_ROOT/jira"
EXCEL_SYNC_SCRIPT="$JIRA_DIR/sync-jira-tickets.mjs"
URL_SYNC_SCRIPT="$JIRA_DIR/sync-jira-from-url.mjs"
FORCE_SYNC=false
CUSTOM_URL=""
ACTIVE_DIR_NAME="active"
URL_MODE="incremental"
LAST_SYNC_MARKER_NAME=".jira-last-sync"

# Parse arguments:
# --force keeps the Excel-source override behavior.
# --full-refresh forces full URL refresh (no incremental updated filter).
# --incremental explicitly enables incremental URL refresh (default).
# --url passes through a custom Jira full-content URL.
while [[ $# -gt 0 ]]; do
    case "$1" in
        --force)
            FORCE_SYNC=true
            shift
            ;;
        --full-refresh|--full)
            URL_MODE="full"
            shift
            ;;
        --incremental)
            URL_MODE="incremental"
            shift
            ;;
        --url)
            CUSTOM_URL="${2:-}"
            shift 2
            ;;
        *)
            shift
            ;;
    esac
done

if [[ ! -d "$JIRA_DIR" ]]; then
    echo "ERROR: jira directory not found: $JIRA_DIR"
    exit 1
fi

# Resolve branch-scoped active dir when branch-context-management is available.
BRANCH_RESOLVER="$REPO_ROOT/.github/skills/branch-context-management/scripts/resolve-branch-context.sh"
if [[ -f "$BRANCH_RESOLVER" ]]; then
    RESOLVED_ACTIVE_DIR="$(bash "$BRANCH_RESOLVER" --repo-root "$REPO_ROOT" | sed -n 's/^ACTIVE_TICKETS_DIR=//p' || true)"
    if [[ -n "$RESOLVED_ACTIVE_DIR" ]]; then
        ACTIVE_DIR_NAME="$(basename "$RESOLVED_ACTIVE_DIR")"
    fi
fi

if ! command -v node >/dev/null 2>&1; then
    echo "ERROR: Node.js is not installed"
    exit 1
fi

# --- Locate the newest Excel export (if any) ---------------------------------
EXCEL_FILES=()
while IFS= read -r file; do
    [[ -n "$file" ]] && EXCEL_FILES+=("$file")
done < <(find "$JIRA_DIR" -maxdepth 1 -type f -name "*.xlsx" -printf '%T@ %p\n' 2>/dev/null | sort -rn | awk '{ $1=""; sub(/^ /, ""); print }')

EXCEL_FILE=""
if [[ ${#EXCEL_FILES[@]} -gt 0 ]]; then
    EXCEL_FILE="${EXCEL_FILES[0]}"
    if [[ ${#EXCEL_FILES[@]} -gt 1 ]]; then
        echo "WARNING: Found ${#EXCEL_FILES[@]} Excel files in jira/:"
        for file in "${EXCEL_FILES[@]}"; do
            echo "  - $(basename "$file")"
        done
        echo "Using most recent: $(basename "$EXCEL_FILE")"
        echo ""
    fi
fi

# --- Find the most recently synced ticket markdown ---------------------------
LATEST_OUTPUT_MTIME=0
for state_dir in "$JIRA_DIR/open" "$JIRA_DIR/closed" "$JIRA_DIR/$ACTIVE_DIR_NAME" "$JIRA_DIR/active"; do
    [[ -d "$state_dir" ]] || continue
    for ticket_dir in "$state_dir"/FHIR-*; do
        [[ -d "$ticket_dir" ]] || continue
        ticket_key="$(basename "$ticket_dir")"
        ticket_file="$ticket_dir/$ticket_key.md"
        [[ -f "$ticket_file" ]] || continue
        FILE_MTIME=$(stat -c %Y "$ticket_file" 2>/dev/null || stat -f %m "$ticket_file" 2>/dev/null)
        if [[ $FILE_MTIME -gt $LATEST_OUTPUT_MTIME ]]; then
            LATEST_OUTPUT_MTIME=$FILE_MTIME
        fi
    done
done

# --- Decide source: newer Excel preferred, else live URL ---------------------
USE_EXCEL=false
if [[ -n "$EXCEL_FILE" ]]; then
    EXCEL_MTIME=$(stat -c %Y "$EXCEL_FILE" 2>/dev/null || stat -f %m "$EXCEL_FILE" 2>/dev/null)
    EXCEL_DATE=$(stat -c '%y' "$EXCEL_FILE" 2>/dev/null | cut -d. -f1 || echo "")
    echo "Newest Excel export: $(basename "$EXCEL_FILE") (modified $EXCEL_DATE)"
    if [[ $FORCE_SYNC == true ]]; then
        USE_EXCEL=true
        echo "Force sync enabled - using Excel export."
    elif [[ $LATEST_OUTPUT_MTIME -eq 0 ]]; then
        USE_EXCEL=true
        echo "No existing synced markdown - using Excel export."
    elif [[ $EXCEL_MTIME -gt $LATEST_OUTPUT_MTIME ]]; then
        USE_EXCEL=true
        echo "Excel is newer than synced markdown - using Excel export."
    else
        echo "Excel is not newer than synced markdown - falling back to the live Jira URL."
    fi
else
    echo "No Excel export found in jira/ - using the live Jira URL."
fi

echo ""

if [[ $USE_EXCEL == true ]]; then
    if [[ ! -f "$EXCEL_SYNC_SCRIPT" ]]; then
        echo "ERROR: Excel sync script not found: $EXCEL_SYNC_SCRIPT"
        exit 1
    fi
    node "$EXCEL_SYNC_SCRIPT" --excel "$EXCEL_FILE" --out "$JIRA_DIR" --active-dir "$ACTIVE_DIR_NAME" --prune
    date -u +"%Y-%m-%dT%H:%M:%SZ" > "$JIRA_DIR/$LAST_SYNC_MARKER_NAME"
    echo "Updated sync marker: $JIRA_DIR/$LAST_SYNC_MARKER_NAME"
    echo ""
    echo "Jira sync completed successfully (source: Excel export)"
else
    if [[ ! -f "$URL_SYNC_SCRIPT" ]]; then
        echo "ERROR: URL sync script not found: $URL_SYNC_SCRIPT"
        exit 1
    fi
    if [[ ! -d "$JIRA_DIR/node_modules/cheerio" ]]; then
        echo "ERROR: cheerio is not installed. Run 'npm install' in jira/ first."
        exit 1
    fi
    URL_ARGS=(--out "$JIRA_DIR" --save "$JIRA_DIR/jira-export.html" --active-dir "$ACTIVE_DIR_NAME")
    if [[ "$URL_MODE" == "full" ]]; then
        URL_ARGS+=(--full-refresh --prune)
        echo "URL mode: full refresh"
    else
        URL_ARGS+=(--incremental)
        echo "URL mode: incremental (updated since one day before last sync; pruning disabled)"
    fi
    if [[ -n "$CUSTOM_URL" ]]; then
        URL_ARGS+=(--url "$CUSTOM_URL")
    fi
    node "$URL_SYNC_SCRIPT" "${URL_ARGS[@]}"
    echo ""
    echo "Jira sync completed successfully (source: live Jira URL)"
fi
