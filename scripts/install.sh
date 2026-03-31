#!/usr/bin/env bash
set -euo pipefail

SETTINGS_FILE="$HOME/.claude/settings.json"
BACKUP_FILE="$HOME/.claude/settings.json.bak"

echo ""
echo "  Agent Status Line - Installer"
echo ""

# Check for jq
if ! command -v jq &>/dev/null; then
  echo "  Error: jq is required. Install it with: brew install jq"
  exit 1
fi

# Backup existing settings
if [ -f "$SETTINGS_FILE" ]; then
  cp "$SETTINGS_FILE" "$BACKUP_FILE"
  echo "  Backed up existing settings to $BACKUP_FILE"
fi

# Create settings file if it doesn't exist
if [ ! -f "$SETTINGS_FILE" ]; then
  mkdir -p "$(dirname "$SETTINGS_FILE")"
  echo '{}' > "$SETTINGS_FILE"
fi

# Check if there's an existing status line config and warn
EXISTING=$(jq -r '.statusLine // empty' "$SETTINGS_FILE" 2>/dev/null || true)
if [ -n "$EXISTING" ]; then
  echo "  Existing status line config found (backed up)."
fi

# Write the status line config
jq '.statusLine = {"type": "command", "command": "npx -y agent-status-line@latest"}' \
  "$SETTINGS_FILE" > "${SETTINGS_FILE}.tmp" && mv "${SETTINGS_FILE}.tmp" "$SETTINGS_FILE"

echo "  Status line configured in $SETTINGS_FILE"
echo ""
echo "  Run 'npx agent-status-line preview' to preview your status line."
echo "  Run 'npx agent-status-line init' to customize."
echo ""
