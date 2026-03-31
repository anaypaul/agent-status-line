import { BaseAgent, type ClaudeCodeInput, type Config, type Segment } from '../types.js';
import { getIcon } from '../render/icons.js';

export class AgentInfoAgent extends BaseAgent {
  readonly id = 'agent-info';

  compute(input: ClaudeCodeInput, config: Config): Segment | null {
    if (!input.agent) return null;

    let label = input.agent.name;
    if (input.agent.type) {
      label += ` (${input.agent.type})`;
    }

    return {
      id: this.id,
      icon: getIcon('agent', config.icons),
      label,
      fg: '#d4d4d4',
      bg: '#2d2d2d',
      priority: 6,
      urgency: 'normal',
    };
  }
}
