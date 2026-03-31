import { BaseAgent, type ClaudeCodeInput, type Config, type Segment } from '../types.js';
import { getIcon } from '../render/icons.js';
import { shortenPath } from '../utils/path-shorten.js';

export class DirectoryAgent extends BaseAgent {
  readonly id = 'directory';

  compute(input: ClaudeCodeInput, config: Config): Segment | null {
    const label = shortenPath(input.cwd);

    return {
      id: this.id,
      icon: getIcon('directory', config.icons),
      label,
      fg: '#d4d4d4',
      bg: '#2d2d2d',
      priority: 4,
      urgency: 'normal',
    };
  }
}
