import { BaseAgent, type ClaudeCodeInput, type Config, type Segment } from '../types.js';
import { getIcon } from '../render/icons.js';
import { formatDuration } from '../utils/duration.js';

export class SessionAgent extends BaseAgent {
  readonly id = 'session';

  compute(input: ClaudeCodeInput, config: Config): Segment | null {
    const name = input.session_name ?? input.session_id.slice(0, 8);
    const duration = formatDuration(input.cost.total_duration_ms);
    const label = `${name} ${duration}`;

    return {
      id: this.id,
      icon: getIcon('session', config.icons),
      label,
      fg: '#d4d4d4',
      bg: '#2d2d2d',
      priority: 3,
      urgency: 'normal',
    };
  }
}
