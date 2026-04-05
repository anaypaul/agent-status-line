# agent-status-line

A modular, agent-based status line for agentic coding CLIs. Supports **Claude Code**, **Codex CLI**, **Gemini CLI**, and **OpenCode**. Each piece of information is computed by an independent "agent" widget, rendered in your choice of style and theme, and printed to stdout in under 1ms.

## Features

- **Multi-CLI support** — Claude Code, Codex, Gemini CLI, OpenCode (auto-detected)
- **9 agent widgets** — model, context window, rate limits, cost, git, session, directory, vim mode, sub-agent info
- **3 render styles** — minimal (`|` separators), powerline (arrow glyphs), capsule (rounded pills)
- **6 color themes** — default, catppuccin, monokai, solarized, gruvbox, nord
- **Color-coded thresholds** — green / yellow / red for context usage, rate limits, and cost
- **Watch mode** — polling for file-based providers (Codex, Gemini, OpenCode)
- **Responsive truncation** — drops low-priority segments on narrow terminals
- **TOML config** — per-project or global, with an interactive setup wizard
- **Fast** — 0.02ms average render time

## Quick Start

### Claude Code (native status line)

```bash
# One-liner (backs up your existing status line config)
bash <(curl -fsSL https://raw.githubusercontent.com/anaypaul/agent-status-line/main/scripts/install.sh)
```

Or manually add to `~/.claude/settings.json`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "npx -y agent-status-line@latest"
  }
}
```

### Codex CLI / Gemini CLI / OpenCode

These CLIs don't pipe to external status lines, so use watch mode:

```bash
# Auto-detect which CLI is active
agent-status-line --watch

# Or specify explicitly
agent-status-line --provider codex --watch
agent-status-line --provider gemini --watch
agent-status-line --provider opencode --watch

# Custom poll interval (default: 2000ms)
agent-status-line --provider codex --watch --interval 5000
```

Watch mode reads session data from each CLI's files and updates in place. Works great in a tmux status bar or split pane.

### Preview

```bash
npx agent-status-line preview
```

## Supported CLIs

| CLI | Data Source | Auto-Detect | Cost | Rate Limits | Context % |
|---|---|---|---|---|---|
| **Claude Code** | stdin JSON pipe | stdin is pipe | Yes | Yes | Yes |
| **Codex CLI** | `~/.codex/sessions/**/rollout-*.jsonl` | `~/.codex/` exists | No | Yes | Yes |
| **Gemini CLI** | `~/.gemini/tmp/*/chats/session-*.json` | `~/.gemini/tmp/` exists | No | No | Partial |
| **OpenCode** | `.opencode/opencode.db` (SQLite) | DB file exists | Yes | No | Partial |

Segments that aren't available for a given CLI are automatically hidden.

## Agent Widgets

| Agent | Shows | Priority | Notes |
|---|---|---|---|
| `vim-mode` | `NORMAL` / `INSERT` | 10 | Hidden when vim mode is off |
| `context` | `42% ███░░░░░` | 9 | Color shifts at 50% and 90% |
| `model` | `Claude Opus 4.6 (1M)` | 8 | |
| `rate-limit` | `5h: 23% 7d: 8% ↻2h` | 7 | Hidden without rate limit data |
| `cost` | `$1.42 +127/-34` | 6 | Hidden when CLI doesn't track cost |
| `agent-info` | `reviewer (code)` | 6 | Hidden when not in a sub-agent |
| `git` | `feat/auth-refactor` | 5 | Shell fallback for CLIs without git data |
| `directory` | `~/w/my-project` | 4 | Shortened path |
| `session` | `refactor-auth 12m` | 3 | Disabled by default |

## Configuration

```bash
npx agent-status-line init
```

Or create a TOML config file. Resolution order:

1. `$AGENT_STATUS_LINE_CONFIG` environment variable
2. `.agent-status-line.toml` in the project directory
3. `~/.config/agent-status-line/config.toml`
4. Built-in defaults

### Example config

```toml
style = "powerline"       # minimal | powerline | capsule
theme = "catppuccin"      # default | catppuccin | monokai | solarized | gruvbox | nord
icons = "nerd"            # nerd | ascii | none
# provider = "claude-code" # auto-detect if omitted

[watch]
# enabled = false
# interval_ms = 2000

[thresholds]
context_warn = 50
context_critical = 90
rate_warn = 60
rate_critical = 85
cost_warn = 1.0
cost_critical = 5.0
```

## CLI Commands

```bash
# Auto-detect CLI and render once (default for Claude Code stdin pipe)
agent-status-line

# Explicit provider
agent-status-line --provider codex
agent-status-line --provider gemini
agent-status-line --provider opencode

# Watch mode (polls session files every 2s)
agent-status-line --watch
agent-status-line --provider codex --watch --interval 5000

# Preview with sample data
agent-status-line preview

# Benchmark render performance
agent-status-line benchmark

# Interactive configuration wizard
agent-status-line init
```

## Architecture

```
CLI Tool ──► Provider ──► UnifiedInput ──► Agents ──► Segments ──► Render ──► stdout
                │
   claude-code: stdin JSON pipe
   codex:       rollout JSONL files
   gemini:      session chat JSON
   opencode:    SQLite DB query
```

Each provider normalizes its CLI's data into a `UnifiedInput`. The 9 agent widgets compute `Segment` objects from this unified shape. The render pipeline truncates, styles, and outputs ANSI-colored text.

## Development

```bash
npm install
npm run preview       # preview with sample data
npx tsc --noEmit      # type-check
npm test              # run tests
npm run build         # build for distribution
```

## License

[MIT](LICENSE)
