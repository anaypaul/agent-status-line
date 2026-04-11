import { execSync } from 'node:child_process';
import { BaseAgent, type UnifiedInput, type Config, type Segment } from '../types.js';
import { getIcon } from '../render/icons.js';
import { projectRelativePath } from '../utils/path-shorten.js';

export class DirectoryAgent extends BaseAgent {
  readonly id = 'directory';

  compute(input: UnifiedInput, config: Config): Segment | null {
    const opts = config.agents[this.id]?.options ?? {};
    const maxLength = (opts.max_length as number) ?? 30;
    const shorten = (opts.shorten as boolean) ?? true;
    const maxBranchLen = (opts.max_branch_length as number) ?? 20;

    const projectDir = input.workspace?.project_dir;

    const dirLabel = shorten
      ? projectRelativePath(input.cwd, projectDir, maxLength)
      : input.cwd;

    // Append git branch if available
    let branch = input.git?.branch ?? input.git?.worktree_name ?? this.detectBranch(input.cwd);

    let label = dirLabel;
    if (branch) {
      if (branch.length > maxBranchLen) {
        branch = branch.slice(0, maxBranchLen - 1) + '…';
      }
      label = `${dirLabel} (${branch})`;
    }

    return {
      id: this.id,
      icon: getIcon('directory', config.icons),
      label,
      fg: '#d4d4d4',
      bg: '#2d2d2d',
      priority: 7,
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
