import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join } from 'node:path';
import { BaseProvider, type ProviderOptions } from './base.provider.js';
import type { UnifiedInput } from '../types.js';

export class OpenCodeProvider extends BaseProvider {
  readonly name = 'opencode' as const;
  readonly displayName = 'OpenCode';

  async detect(): Promise<boolean> {
    if (process.env.OPENCODE) return true;
    return this.findDbPath() !== undefined;
  }

  async read(options?: ProviderOptions): Promise<UnifiedInput> {
    const dbPath = options?.dataPath ?? this.findDbPath();
    if (!dbPath) {
      return this.fallback();
    }

    try {
      return this.queryDb(dbPath, options?.cwd);
    } catch {
      return this.fallback();
    }
  }

  private queryDb(dbPath: string, cwd?: string): UnifiedInput {
    const resolvedCwd = cwd ?? process.cwd();

    // Query latest session + its most recent message's model
    const query = `SELECT s.id, s.title, s.prompt_tokens, s.completion_tokens, s.cost, s.message_count, s.created_at, s.updated_at, (SELECT m.model FROM messages m WHERE m.session_id = s.id ORDER BY m.created_at DESC LIMIT 1) as model FROM sessions s ORDER BY s.updated_at DESC LIMIT 1;`;

    const result = execSync(
      `sqlite3 -json "${dbPath}" "${query}"`,
      { encoding: 'utf-8', timeout: 2000, stdio: ['pipe', 'pipe', 'pipe'] }
    ).trim();

    if (!result || result === '[]') {
      return this.fallback();
    }

    const rows = JSON.parse(result);
    const row = rows[0];
    if (!row) return this.fallback();

    const promptTokens = row.prompt_tokens ?? 0;
    const completionTokens = row.completion_tokens ?? 0;
    const modelName = row.model ?? 'unknown';
    const costUsd = row.cost ?? 0;
    const createdAt = row.created_at ?? 0;
    const updatedAt = row.updated_at ?? 0;
    const durationMs = (updatedAt - createdAt) * 1000;

    return {
      provider: 'opencode',
      session_id: row.id ?? 'unknown',
      session_name: row.title ?? undefined,
      cwd: resolvedCwd,
      model: { id: modelName, display_name: modelName },
      context_window: {
        total_input_tokens: promptTokens,
        total_output_tokens: completionTokens,
        used_percentage: null, // OpenCode doesn't store context window size
      },
      cost: {
        total_cost_usd: costUsd,
        total_duration_ms: durationMs > 0 ? durationMs : undefined,
      },
      git: { branch: this.getGitBranch(resolvedCwd) },
      _raw: row,
    };
  }

  private findDbPath(): string | undefined {
    // Walk up from cwd looking for .opencode/opencode.db
    let dir = process.cwd();
    const root = '/';
    while (dir !== root) {
      const candidate = join(dir, '.opencode', 'opencode.db');
      if (existsSync(candidate)) return candidate;
      const parent = join(dir, '..');
      if (parent === dir) break;
      dir = parent;
    }
    return undefined;
  }

  private fallback(): UnifiedInput {
    const cwd = process.cwd();
    return {
      provider: 'opencode',
      session_id: 'unknown',
      cwd,
      model: { id: 'unknown', display_name: 'OpenCode (no session data)' },
      git: { branch: this.getGitBranch(cwd) },
    };
  }
}
