import { BaseAgent, type ClaudeCodeInput, type Config, type Segment } from '../types.js';
import { getIcon } from '../render/icons.js';

export class GitAgent extends BaseAgent {
  readonly id = 'git';

  compute(input: ClaudeCodeInput, config: Config): Segment | null {
    if (!input.worktree) return null;

    const label = input.worktree.branch ?? input.worktree.name;

    return {
      id: this.id,
      icon: getIcon('git', config.icons),
      label,
      fg: '#d4d4d4',
      bg: '#2d2d2d',
      priority: 5,
      urgency: 'normal',
    };
  }
}
