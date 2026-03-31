import type { Segment, ThemeDefinition } from '../../types.js';
import { fg, bg, RESET } from '../ansi.js';
import { resolveSegmentColors } from '../../themes/engine.js';

const RIGHT_ARROW = '\ue0b0'; // Powerline right arrow
const RIGHT_ARROW_THIN = '\ue0b1'; // Powerline thin right arrow (unused but available)

export function renderPowerline(segments: Segment[], theme: ThemeDefinition): string {
  if (segments.length === 0) return '';

  let output = '';

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const colors = resolveSegmentColors(theme, seg);
    const icon = seg.icon ?? '';
    const text = icon ? `${icon}${seg.label}` : seg.label;

    // Segment content: bg + fg + padded text
    output += `${bg(colors.bg)}${fg(colors.fg)} ${text} `;

    // Separator arrow: current bg as fg, next bg as bg
    if (i < segments.length - 1) {
      const nextColors = resolveSegmentColors(theme, segments[i + 1]);
      output += `${fg(colors.bg)}${bg(nextColors.bg)}${RIGHT_ARROW}`;
    } else {
      // Last segment: arrow into reset
      output += `${RESET}${fg(colors.bg)}${RIGHT_ARROW}${RESET}`;
    }
  }

  return output;
}
