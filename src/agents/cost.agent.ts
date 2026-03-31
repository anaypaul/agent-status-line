import { BaseAgent, type ClaudeCodeInput, type Config, type Segment } from '../types.js';
import { getIcon } from '../render/icons.js';

export class CostAgent extends BaseAgent {
  readonly id = 'cost';

  compute(input: ClaudeCodeInput, config: Config): Segment | null {
    const { total_cost_usd, total_lines_added, total_lines_removed } = input.cost;

    const cost = `$${total_cost_usd.toFixed(2)}`;
    const lines = `+${total_lines_added}/-${total_lines_removed}`;
    const label = `${cost} ${lines}`;

    const urgency = this.urgencyFromValue(
      total_cost_usd,
      config.thresholds.cost_warn,
      config.thresholds.cost_critical,
    );

    return {
      id: this.id,
      icon: getIcon('cost', config.icons),
      label,
      fg: '#d4d4d4',
      bg: '#2d2d2d',
      priority: 6,
      urgency,
    };
  }
}
