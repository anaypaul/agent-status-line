import type { Segment, ThemeDefinition } from '../../types.js';
import { fg, RESET } from '../ansi.js';
import { resolveSegmentColors } from '../../themes/engine.js';

export function renderMinimal(segments: Segment[], theme: ThemeDefinition): string {
  const parts = segments.map(seg => {
    const colors = resolveSegmentColors(theme, seg);
    const icon = seg.icon ?? '';
    const text = icon ? `${icon}${seg.label}` : seg.label;
    return `${fg(colors.fg)}${text}${RESET}`;
  });

  return parts.join(` ${fg(theme.base.separator_fg)}|${RESET} `);
}
