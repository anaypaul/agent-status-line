import type { ThemeDefinition, Segment, ThemeSegmentColors } from '../types.js';

export function resolveSegmentColors(
  theme: ThemeDefinition,
  segment: Segment,
): { fg: string; bg: string } {
  const segmentTheme = theme.segments[segment.id];

  if (segmentTheme) {
    const colors: ThemeSegmentColors = segmentTheme[segment.urgency] ?? segmentTheme.normal;
    return { fg: colors.fg, bg: colors.bg };
  }

  // Fall back to base theme colors
  return { fg: theme.base.fg, bg: theme.base.bg };
}
