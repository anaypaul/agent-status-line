import type { Config } from '../types.js';

export const DEFAULT_CONFIG: Config = {
  style: 'minimal',
  theme: 'default',
  icons: 'ascii',
  max_width: 'auto',
  thresholds: {
    context_warn: 50,
    context_critical: 90,
    rate_warn: 60,
    rate_critical: 85,
    cost_warn: 1.0,
    cost_critical: 5.0,
  },
  agents: {
    'vim-mode': { enabled: true, position: 0, options: {} },
    'model': { enabled: true, position: 1, options: {} },
    'context': { enabled: true, position: 2, options: { bar_width: 8, show_bar: true } },
    'rate-limit': { enabled: true, position: 3, options: { show_seven_day: true, show_reset_countdown: true } },
    'cost': { enabled: true, position: 4, options: { show_lines: true } },
    'git': { enabled: true, position: 5, options: { max_branch_length: 20 } },
    'agent-info': { enabled: true, position: 6, options: {} },
    'directory': { enabled: true, position: 7, options: { shorten: true, max_length: 30 } },
    'session': { enabled: false, position: 8, options: { show_duration: true } },
  },
  provider: undefined,
  watch: { enabled: false, interval_ms: 2000 },
};
