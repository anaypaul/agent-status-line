import { execSync } from 'node:child_process';
import { BaseAgent, type UnifiedInput, type Config, type Segment } from '../types.js';
import { getIcon } from '../render/icons.js';

export class GitAgent extends BaseAgent {
  readonly id = 'git';

  compute(input: UnifiedInput, config: Config): Segment | null {
    const opts = config.agents[this.id]?.options ?? {};
    const maxLen = (opts.max_branch_length as number) ?? 20;

    // Use provider-supplied git data, or detect branch from cwd
    let label = input.git?.branch ?? input.git?.worktree_name;

    if (!label) {
      label = this.detectBranch(input.cwd);
    }

    if (!label) return null;

    // Truncate long branch names
    if (label.length > maxLen) {
      label = label.slice(0, maxLen - 1) + '…';
    }

    // Wrap in parentheses for visual clarity
    label = `(${label})`;

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

  private detectBranch(cwd: string): string | undefined {
    try {
      return execSync('git branch --show-current', {
        cwd,
        encoding: 'utf-8',
        timeout: 500,
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim() || undefined;
    } catch {
      return undefined;
    }
  }
}
