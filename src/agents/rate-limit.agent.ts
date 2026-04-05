import { BaseAgent, type UnifiedInput, type Config, type Segment } from '../types.js';
import { getIcon } from '../render/icons.js';
import { formatCountdown } from '../utils/duration.js';

export class RateLimitAgent extends BaseAgent {
  readonly id = 'rate-limit';

  compute(input: UnifiedInput, config: Config): Segment | null {
    if (!input.rate_limits) return null;

    const fiveHour = input.rate_limits.five_hour;
    const sevenDay = input.rate_limits.seven_day;

    if (!fiveHour && !sevenDay) return null;

    const parts: string[] = [];
    let maxPct = 0;

    if (fiveHour) {
      const pct = Math.round(fiveHour.used_percentage);
      parts.push(`5h: ${pct}%`);
      maxPct = Math.max(maxPct, fiveHour.used_percentage);
    }

    if (sevenDay) {
      const pct = Math.round(sevenDay.used_percentage);
      parts.push(`7d: ${pct}%`);
      maxPct = Math.max(maxPct, sevenDay.used_percentage);
    }

    // Add countdown to the nearest reset
    const resetAt = fiveHour?.resets_at ?? sevenDay?.resets_at;
    if (resetAt) {
      parts.push(`\u21bb${formatCountdown(resetAt)}`);
    }

    const urgency = this.urgencyFromPercent(
      maxPct,
      config.thresholds.rate_warn,
      config.thresholds.rate_critical,
    );

    return {
      id: this.id,
      icon: getIcon('rateLimit', config.icons),
      label: parts.join(' '),
      fg: '#d4d4d4',
      bg: '#2d2d2d',
      priority: 7,
      urgency,
    };
  }
}
