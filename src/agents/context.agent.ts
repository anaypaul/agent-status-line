import { BaseAgent, type UnifiedInput, type Config, type Segment } from '../types.js';
import { getIcon } from '../render/icons.js';
import { progressBar } from '../utils/progress-bar.js';

export class ContextAgent extends BaseAgent {
  readonly id = 'context';

  compute(input: UnifiedInput, config: Config): Segment | null {
    if (!input.context_window) return null;

    const pct = input.context_window.used_percentage;

    if (pct === null || pct === undefined) {
      return {
        id: this.id,
        icon: getIcon('context', config.icons),
        label: '...',
        fg: '#ffffff',
        bg: '#2d2d2d',
        priority: 9,
        urgency: 'normal',
      };
    }

    const urgency = this.urgencyFromPercent(
      pct,
      config.thresholds.context_warn,
      config.thresholds.context_critical,
    );

    const bar = progressBar(pct);
    const label = `${Math.round(pct)}% ${bar}`;

    let fg = '#ffffff';
    let bg = '#2d2d2d';
    if (urgency === 'warn') {
      fg = '#ffffff';
      bg = '#6b5300';
    } else if (urgency === 'critical') {
      fg = '#ffffff';
      bg = '#8b0000';
    }

    return {
      id: this.id,
      icon: getIcon('context', config.icons),
      label,
      fg,
      bg,
      priority: 9,
      urgency,
    };
  }
}
