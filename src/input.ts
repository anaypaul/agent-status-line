import { readFileSync } from 'node:fs';
import type { ClaudeCodeInput } from './types.js';

export function readStdinInput(): ClaudeCodeInput {
  const raw = readFileSync('/dev/stdin', 'utf-8');
  const parsed = JSON.parse(raw);
  return parsed as ClaudeCodeInput;
}
