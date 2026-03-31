# agent-status-line

A modular, agent-based status line for [Claude Code](https://docs.anthropic.com/en/docs/claude-code). Each piece of information is computed by an independent "agent" widget, rendered in your choice of style and theme, and printed to stdout in under 1ms.

## Features

- **9 agent widgets** — model, context window, rate limits, cost, git/worktree, session, directory, vim mode, sub-agent info
- **3 render styles** — minimal (`|` separators), powerline (arrow glyphs), capsule (rounded pills)
- **6 color themes** — default, catppuccin, monokai, solarized, gruvbox, nord
- **Color-coded thresholds** — green / yellow / red for context usage, rate limits, and cost
- **Responsive truncation** — drops low-priority segments on narrow terminals
- **Icon sets** — Nerd Font, ASCII fallback, or none
- **TOML config** — per-project or global, with an interactive setup wizard
- **Fast** — 0.02ms average render time, zero impact on Claude Code

## Quick Start

### Install into Claude Code

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

### Preview

```bash
npx agent-status-line preview
```

Shows sample output in all three styles:

```
MINIMAL:
 NORMAL |  Claude Opus 4.6 (1M) |  42% ███░░░░░ |  5h: 23% 7d: 8% |  $1.42 +127/-34

POWERLINE:
  NORMAL   Claude Opus 4.6 (1M)   42% ███░░░░░   5h: 23% 7d: 8%   $1.42 +127/-34

CAPSULE:
  NORMAL   Claude Opus 4.6 (1M)   42% ███░░░░░   5h: 23% 7d: 8%   $1.42 +127/-34
```

## Agent Widgets

| Agent | Shows | Priority | Notes |
|---|---|---|---|
| `vim-mode` | `NORMAL` / `INSERT` | 10 | Hidden when vim mode is off |
| `context` | `42% ███░░░░░` | 9 | Color shifts at 50% and 90% |
| `model` | `Claude Opus 4.6 (1M)` | 8 | |
| `rate-limit` | `5h: 23% 7d: 8% ↻2h` | 7 | Hidden without rate limit data; shows reset countdown |
| `cost` | `$1.42 +127/-34` | 6 | Session cost + lines added/removed |
| `agent-info` | `reviewer (code)` | 6 | Hidden when not in a sub-agent |
| `git` | `feat/auth-refactor` | 5 | Branch name from worktree data |
| `directory` | `~/w/my-project` | 4 | Shortened path |
| `session` | `refactor-auth 12m` | 3 | Disabled by default |

Priority determines which segments survive when the terminal is too narrow — higher priority segments are kept.

## Configuration

Run the interactive wizard:

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

[thresholds]
context_warn = 50         # % context used -> yellow
context_critical = 90     # % context used -> red
rate_warn = 60
rate_critical = 85
cost_warn = 1.0           # USD
cost_critical = 5.0

[agents.model]
enabled = true
position = 1

[agents.context]
enabled = true
position = 2

[agents.session]
enabled = false           # disabled by default
position = 8
```

## CLI Commands

```bash
# Normal operation (reads Claude Code JSON from stdin)
agent-status-line

# Preview with sample data in all styles
agent-status-line preview

# Benchmark render performance (100 iterations)
agent-status-line benchmark

# Interactive configuration wizard
agent-status-line init
```

## Development

```bash
# Install dependencies
npm install

# Run preview during development
npm run preview

# Type-check
npx tsc --noEmit

# Run tests
npm test

# Build for distribution
npm run build
```

## Architecture

```
stdin JSON ─► parse ─► load config ─► run agents ─► truncate ─► style render ─► stdout
                           │              │
                      TOML config    9 independent
                      + Zod schema   widget agents
```

Each agent is a class extending `BaseAgent` with a single `compute(input, config) → Segment | null` method. The render pipeline collects non-null segments, drops the lowest-priority ones if the output exceeds terminal width, and applies the chosen style's separators and ANSI colors.

## License

[MIT](LICENSE)
