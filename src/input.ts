import { readFileSync } from 'node:fs';
import type { UnifiedInput } from './types.js';

export function readStdinInput(): UnifiedInput {
  const raw = readFileSync('/dev/stdin', 'utf-8');
  const parsed = JSON.parse(raw);
  return parsed as UnifiedInput;
}
