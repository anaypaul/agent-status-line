#!/usr/bin/env node

import { run, loadConfig } from '../src/index.js';
import { detectProvider, getProviderByName } from '../src/providers/detect.js';
import { watch } from '../src/watch.js';
import type { UnifiedInput, ProviderName } from '../src/types.js';

const SAMPLE_INPUT: UnifiedInput = {
  provider: 'claude-code',
  session_id: 'a7c21d25-3220-4098-bcce-594b993ee20d',
  session_name: 'refactor-auth',
  transcript_path: '/Users/dev/.claude/projects/myapp/session.jsonl',
  cwd: '/Users/dev/workspace/my-project',
  version: '1.0.71',
  model: {
    id: 'claude-opus-4-6',
    display_name: 'Claude Opus 4.6 (1M)',
  },
  workspace: {
    current_dir: '/Users/dev/workspace/my-project',
    project_dir: '/Users/dev/workspace/my-project',
  },
  context_window: {
    total_input_tokens: 45200,
    total_output_tokens: 12800,
    context_window_size: 200000,
    current_usage: {
      input_tokens: 45200,
      output_tokens: 3200,
      cache_creation_input_tokens: 8000,
      cache_read_input_tokens: 12000,
    },
    used_percentage: 42,
    remaining_percentage: 58,
  },
  rate_limits: {
    five_hour: { used_percentage: 23, resets_at: Date.now() + 2 * 60 * 60 * 1000 },
    seven_day: { used_percentage: 8 },
  },
  cost: {
    total_cost_usd: 1.42,
    total_duration_ms: 720000,
    total_api_duration_ms: 340000,
    total_lines_added: 127,
    total_lines_removed: 34,
  },
  vim: { mode: 'NORMAL' },
  git: {
    worktree_name: 'feat-auth',
    worktree_path: '/Users/dev/workspace/my-project-wt-feat-auth',
    branch: 'feat/auth-refactor',
  },
};

// ── Arg parsing ──

const args = process.argv.slice(2);

function getFlag(name: string): string | undefined {
  const idx = args.indexOf(name);
  return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : undefined;
}

const subcommand = args.find(a => !a.startsWith('--'));
const providerFlag = getFlag('--provider');
const watchFlag = args.includes('--watch');
const intervalFlag = getFlag('--interval');

// ── Subcommands ──

switch (subcommand) {
  case 'preview': {
    const config = loadConfig();
    const styles = ['minimal', 'powerline', 'capsule'] as const;
    for (const style of styles) {
      const cfg = { ...config, style };
      const output = run(SAMPLE_INPUT, cfg);
      console.log(`\n  ${style.toUpperCase()}:`);
      console.log(`  ${output}`);
    }
    console.log();
    break;
  }

  case 'benchmark': {
    const iterations = 100;
    const config = loadConfig();
    const times: number[] = [];

    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      run(SAMPLE_INPUT, config);
      times.push(performance.now() - start);
    }

    times.sort((a, b) => a - b);
    const p50 = times[Math.floor(iterations * 0.5)];
    const p95 = times[Math.floor(iterations * 0.95)];
    const p99 = times[Math.floor(iterations * 0.99)];
    const avg = times.reduce((s, t) => s + t, 0) / iterations;

    console.log(`Benchmark (${iterations} iterations):`);
    console.log(`  avg: ${avg.toFixed(2)}ms`);
    console.log(`  p50: ${p50.toFixed(2)}ms`);
    console.log(`  p95: ${p95.toFixed(2)}ms`);
    console.log(`  p99: ${p99.toFixed(2)}ms`);
    break;
  }

  case 'init': {
    import('../src/config/wizard.js').then(m => m.runWizard());
    break;
  }

  default: {
    // Main entry: auto-detect or explicit provider, optional watch mode
    (async () => {
      try {
        const config = loadConfig();
        const provider = providerFlag
          ? getProviderByName(providerFlag as ProviderName)
          : await detectProvider();

        if (watchFlag) {
          const intervalMs = intervalFlag ? parseInt(intervalFlag, 10) : (config.watch?.interval_ms ?? 2000);
          await watch({ provider, config, intervalMs });
        } else {
          const input = await provider.read();
          const output = run(input, config);
          process.stdout.write(output + '\n');
        }
      } catch {
        // Silent failure — status line should never crash the host CLI
        process.exit(0);
      }
    })();
  }
}
