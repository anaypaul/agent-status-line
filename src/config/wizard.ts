import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

export async function runWizard(): Promise<void> {
  // Dynamic import to avoid loading inquirer during normal status line runs
  const { select, confirm } = await import('@inquirer/prompts');

  console.log('\n  Agent Status Line - Configuration Wizard\n');

  const style = await select({
    message: 'Choose display style:',
    choices: [
      { name: 'Powerline - Arrow separators (recommended)', value: 'powerline' },
      { name: 'Capsule - Rounded pill segments', value: 'capsule' },
      { name: 'Minimal - Plain text with | separators', value: 'minimal' },
    ],
  });

  const theme = await select({
    message: 'Choose color theme:',
    choices: [
      { name: 'Default (Catppuccin-inspired)', value: 'default' },
      { name: 'Catppuccin Mocha', value: 'catppuccin' },
      { name: 'Gruvbox Dark', value: 'gruvbox' },
      { name: 'Nord', value: 'nord' },
      { name: 'Monokai Pro', value: 'monokai' },
      { name: 'Solarized Dark', value: 'solarized' },
    ],
  });

  const icons = await select({
    message: 'Icon set (Nerd Font required for nerd icons):',
    choices: [
      { name: 'Nerd Font icons', value: 'nerd' },
      { name: 'ASCII fallbacks [M] [CTX]', value: 'ascii' },
      { name: 'No icons', value: 'none' },
    ],
  });

  const showSession = await confirm({
    message: 'Show session name & duration?',
    default: false,
  });

  const toml = `# Agent Status Line configuration
style = "${style}"
theme = "${theme}"
icons = "${icons}"

[thresholds]
context_warn = 50
context_critical = 90
rate_warn = 60
rate_critical = 85
cost_warn = 1.0
cost_critical = 5.0

[agents.session]
enabled = ${showSession}
`;

  const configDir = join(homedir(), '.config', 'agent-status-line');
  const configPath = join(configDir, 'config.toml');

  mkdirSync(configDir, { recursive: true });
  writeFileSync(configPath, toml, 'utf-8');

  console.log(`\n  Config saved to ${configPath}`);
  console.log('  Run `agent-status-line preview` to see your status line.\n');
}
