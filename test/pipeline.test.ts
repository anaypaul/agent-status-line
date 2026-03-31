import { describe, it, expect } from 'vitest';
import { run } from '../src/index.js';
import { DEFAULT_CONFIG } from '../src/config/defaults.js';
import type { ClaudeCodeInput } from '../src/types.js';
import { stripAnsi } from '../src/render/ansi.js';
import sampleInput from './fixtures/sample-input.json';

const input = sampleInput as ClaudeCodeInput;

describe('pipeline', () => {
  it('renders minimal style with all segments', () => {
    const config = { ...DEFAULT_CONFIG, style: 'minimal' as const, max_width: 300 };
    const output = run(input, config);
    const plain = stripAnsi(output);

    expect(plain).toContain('Opus 4.6');
    expect(plain).toContain('42%');
    expect(plain).toContain('5h: 23%');
    expect(plain).toContain('$1.42');
    expect(plain).toContain('NORMAL');
    expect(plain).toContain('feat/auth-refactor');
  });

  it('renders powerline style', () => {
    const config = { ...DEFAULT_CONFIG, style: 'powerline' as const };
    const output = run(input, config);
    expect(output).toBeTruthy();
    expect(output.length).toBeGreaterThan(0);
  });

  it('renders capsule style', () => {
    const config = { ...DEFAULT_CONFIG, style: 'capsule' as const };
    const output = run(input, config);
    expect(output).toBeTruthy();
  });

  it('omits vim-mode when vim is absent', () => {
    const noVim = { ...input, vim: undefined };
    const config = { ...DEFAULT_CONFIG, style: 'minimal' as const };
    const output = run(noVim, config);
    const plain = stripAnsi(output);
    expect(plain).not.toContain('NORMAL');
    expect(plain).not.toContain('INSERT');
  });

  it('omits rate-limit when rate_limits is absent', () => {
    const noRate = { ...input, rate_limits: undefined };
    const config = { ...DEFAULT_CONFIG, style: 'minimal' as const };
    const output = run(noRate, config);
    const plain = stripAnsi(output);
    expect(plain).not.toContain('5h:');
  });

  it('omits agent-info when agent is absent', () => {
    const config = { ...DEFAULT_CONFIG, style: 'minimal' as const };
    const output = run(input, config);
    const plain = stripAnsi(output);
    // No agent field in sample input
    expect(plain).not.toContain('[A]');
  });

  it('respects disabled agents', () => {
    const config = {
      ...DEFAULT_CONFIG,
      style: 'minimal' as const,
      agents: {
        ...DEFAULT_CONFIG.agents,
        'cost': { enabled: false, position: 4, options: {} },
      },
    };
    const output = run(input, config);
    const plain = stripAnsi(output);
    expect(plain).not.toContain('$1.42');
  });

  it('shows critical urgency for high context usage', () => {
    const highCtx = {
      ...input,
      context_window: {
        ...input.context_window,
        used_percentage: 95,
        remaining_percentage: 5,
      },
    };
    const config = { ...DEFAULT_CONFIG, style: 'minimal' as const };
    const output = run(highCtx, config);
    const plain = stripAnsi(output);
    expect(plain).toContain('95%');
  });
});
