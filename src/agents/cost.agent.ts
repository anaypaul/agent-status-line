import { BaseAgent, type UnifiedInput, type Config, type Segment } from '../types.js';
import { getIcon } from '../render/icons.js';

export class CostAgent extends BaseAgent {
  readonly id = 'cost';

  compute(input: UnifiedInput, config: Config): Segment | null {
    if (!input.cost?.total_cost_usd && input.cost?.total_cost_usd !== 0) return null;

    const total_cost_usd = input.cost.total_cost_usd;
    const total_lines_added = input.cost.total_lines_added ?? 0;
    const total_lines_removed = input.cost.total_lines_removed ?? 0;

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
