import { BaseAgent, type UnifiedInput, type Config, type Segment } from '../types.js';
import { getIcon } from '../render/icons.js';

export class GitAgent extends BaseAgent {
  readonly id = 'git';

  compute(input: UnifiedInput, config: Config): Segment | null {
    if (!input.git) return null;

    const label = input.git.branch ?? input.git.worktree_name;
    if (!label) return null;

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
