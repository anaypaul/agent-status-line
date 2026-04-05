import { BaseAgent, type UnifiedInput, type Config, type Segment } from '../types.js';
import { getIcon } from '../render/icons.js';

export class ModelAgent extends BaseAgent {
  readonly id = 'model';

  compute(input: UnifiedInput, config: Config): Segment | null {
    return {
      id: this.id,
      icon: getIcon('model', config.icons),
      label: input.model.display_name,
      fg: '#d4d4d4',
      bg: '#2d2d2d',
      priority: 8,
      urgency: 'normal',
    };
  }
}
