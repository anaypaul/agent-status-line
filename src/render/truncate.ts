import type { Segment } from '../types.js';
import { visibleLength } from './ansi.js';

export function truncateSegments(
  segments: Segment[],
  maxWidth: number,
  renderWidth: (seg: Segment) => number
): Segment[] {
  let result = [...segments];
  let totalWidth = result.reduce((sum, seg) => sum + renderWidth(seg), 0);
  // Account for separators between segments (roughly 1-3 chars each)
  totalWidth += Math.max(0, result.length - 1) * 3;

  while (totalWidth > maxWidth && result.length > 1) {
    // Find lowest priority segment
    let minIdx = 0;
    let minPriority = Infinity;
    for (let i = 0; i < result.length; i++) {
      if (result[i].priority < minPriority) {
        minPriority = result[i].priority;
        minIdx = i;
      }
    }
    totalWidth -= renderWidth(result[minIdx]) + 3;
    result.splice(minIdx, 1);
  }

  return result;
}

export function estimateSegmentWidth(seg: Segment): number {
  const iconLen = seg.icon ? visibleLength(seg.icon) + 1 : 0;
  return iconLen + seg.label.length + 2; // +2 for padding
}
