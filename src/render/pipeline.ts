import type { Segment, Config, ThemeDefinition } from '../types.js';
import { truncateSegments, estimateSegmentWidth } from './truncate.js';
import { renderMinimal } from './styles/minimal.js';
import { renderPowerline } from './styles/powerline.js';
import { renderCapsule } from './styles/capsule.js';

export function render(segments: Segment[], config: Config, theme: ThemeDefinition): string {
  if (segments.length === 0) return '';

  const maxWidth = config.max_width === 'auto'
    ? (process.stdout.columns ?? 120)
    : config.max_width;

  const fitted = truncateSegments(segments, maxWidth, estimateSegmentWidth);

  switch (config.style) {
    case 'minimal':
      return renderMinimal(fitted, theme);
    case 'powerline':
      return renderPowerline(fitted, theme);
    case 'capsule':
      return renderCapsule(fitted, theme);
    default:
      return renderMinimal(fitted, theme);
  }
}
