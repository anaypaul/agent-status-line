import { BaseAgent, type ClaudeCodeInput, type Config, type Segment } from '../types.js';
import { getIcon } from '../render/icons.js';

const MODE_COLORS: Record<string, string> = {
  NORMAL: '#61afef',
  INSERT: '#98c379',
};

const DEFAULT_MODE_COLOR = '#c678dd';

export class VimModeAgent extends BaseAgent {
  readonly id = 'vim-mode';

  compute(input: ClaudeCodeInput, config: Config): Segment | null {
    if (!input.vim) return null;

    const mode = input.vim.mode;
    const fg = MODE_COLORS[mode] ?? DEFAULT_MODE_COLOR;

    return {
      id: this.id,
      icon: getIcon('vim', config.icons),
      label: mode,
      fg,
      bg: '#2d2d2d',
      priority: 10,
      urgency: 'normal',
    };
  }
}
