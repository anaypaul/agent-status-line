import type { Segment, ThemeDefinition } from '../../types.js';
import { fg, bg, RESET } from '../ansi.js';
import { resolveSegmentColors } from '../../themes/engine.js';

const LEFT_ROUND = '\ue0b6';  // Powerline left half-circle
const RIGHT_ROUND = '\ue0b4'; // Powerline right half-circle

export function renderCapsule(segments: Segment[], theme: ThemeDefinition): string {
  if (segments.length === 0) return '';

  const parts = segments.map(seg => {
    const colors = resolveSegmentColors(theme, seg);
    const icon = seg.icon ?? '';
    const text = icon ? `${icon}${seg.label}` : seg.label;

    // Left cap + content + right cap
    const leftCap = `${fg(colors.bg)}${LEFT_ROUND}`;
    const content = `${bg(colors.bg)}${fg(colors.fg)}${text}`;
    const rightCap = `${fg(colors.bg)}${RESET}${RIGHT_ROUND}`;

    return `${leftCap}${content}${rightCap}${RESET}`;
  });

  return parts.join(' ');
}
