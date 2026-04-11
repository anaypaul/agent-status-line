import { BaseAgent, type UnifiedInput, type Config, type Segment } from '../types.js';
import { getIcon } from '../render/icons.js';
import { projectRelativePath } from '../utils/path-shorten.js';

export class DirectoryAgent extends BaseAgent {
  readonly id = 'directory';

  compute(input: UnifiedInput, config: Config): Segment | null {
    const opts = config.agents[this.id]?.options ?? {};
    const maxLength = (opts.max_length as number) ?? 30;
    const shorten = (opts.shorten as boolean) ?? true;

    const projectDir = input.workspace?.project_dir;

    const label = shorten
      ? projectRelativePath(input.cwd, projectDir, maxLength)
      : input.cwd;

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
}
