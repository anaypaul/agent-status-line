import { readFileSync } from 'node:fs';
import { BaseProvider, type ProviderOptions } from './base.provider.js';
import type { UnifiedInput } from '../types.js';

export class ClaudeCodeProvider extends BaseProvider {
  readonly name = 'claude-code' as const;
  readonly displayName = 'Claude Code';

  async detect(): Promise<boolean> {
    // Claude Code is the only CLI that pipes JSON to stdin for status lines
    return !process.stdin.isTTY;
  }

  async read(_options?: ProviderOptions): Promise<UnifiedInput> {
    const raw = readFileSync('/dev/stdin', 'utf-8');
    const data = JSON.parse(raw);

    // Map Claude Code's native shape to UnifiedInput
    return {
      provider: 'claude-code',
      session_id: data.session_id,
      session_name: data.session_name,
      transcript_path: data.transcript_path,
      cwd: data.cwd,
      version: data.version,
      model: data.model,
      workspace: data.workspace,
      output_style: data.output_style,
      context_window: data.context_window,
      rate_limits: data.rate_limits,
      cost: data.cost,
      vim: data.vim,
      agent: data.agent,
      // Map worktree -> git (Claude Code sends "worktree" in its JSON)
      git: data.worktree ? {
        branch: data.worktree.branch,
        worktree_name: data.worktree.name,
        worktree_path: data.worktree.path,
        original_cwd: data.worktree.original_cwd,
        original_branch: data.worktree.original_branch,
      } : undefined,
      _raw: data,
    };
  }
}
