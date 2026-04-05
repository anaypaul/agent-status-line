import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { BaseProvider, type ProviderOptions } from './base.provider.js';
import type { UnifiedInput } from '../types.js';

export class CodexProvider extends BaseProvider {
  readonly name = 'codex' as const;
  readonly displayName = 'Codex CLI';

  private get codexHome(): string {
    return process.env.CODEX_HOME ?? join(homedir(), '.codex');
  }

  async detect(): Promise<boolean> {
    if (process.env.CODEX_HOME || process.env.CODEX_SANDBOX_DIR) return true;
    return existsSync(join(this.codexHome, 'sessions'));
  }

  async read(options?: ProviderOptions): Promise<UnifiedInput> {
    const rolloutPath = options?.dataPath ?? this.findLatestRollout();
    if (!rolloutPath) {
      return this.fallback();
    }

    const lines = readFileSync(rolloutPath, 'utf-8').split('\n').filter(Boolean);

    let sessionMeta: any = null;
    let turnContext: any = null;
    let tokenCount: any = null;

    // Read from end for efficiency — find last token_count, turn_context, session_meta
    for (let i = lines.length - 1; i >= 0; i--) {
      try {
        const entry = JSON.parse(lines[i]);

        // token_count is nested: { type: "event_msg", payload: { type: "token_count", info: {...}, rate_limits: {...} } }
        if (!tokenCount && entry.type === 'event_msg' && entry.payload?.type === 'token_count') {
          tokenCount = entry.payload;
        }

        // turn_context has the model name: { type: "turn_context", payload: { model: "gpt-5.4", ... } }
        if (!turnContext && entry.type === 'turn_context') {
          turnContext = entry.payload;
        }

        // session_meta has session id and cwd: { type: "session_meta", payload: { id: "...", cwd: "..." } }
        if (!sessionMeta && entry.type === 'session_meta') {
          sessionMeta = entry.payload;
        }

        if (sessionMeta && turnContext && tokenCount) break;
      } catch { /* skip malformed lines */ }
    }

    const modelName = turnContext?.model ?? 'unknown';
    const sessionId = sessionMeta?.id ?? 'unknown';
    const cwd = options?.cwd ?? sessionMeta?.cwd ?? process.cwd();

    // Token usage is at payload.info.total_token_usage
    const usage = tokenCount?.info?.total_token_usage;
    const inputTokens = usage?.input_tokens ?? 0;
    const outputTokens = usage?.output_tokens ?? 0;
    const maxTokens = tokenCount?.info?.model_context_window ?? 0;
    const totalUsed = inputTokens + outputTokens;
    const usedPct = maxTokens > 0 ? Math.round((totalUsed / maxTokens) * 100) : null;

    // Rate limits are at payload.rate_limits
    const rl = tokenCount?.rate_limits;
    const rateLimits = rl?.primary ? {
      five_hour: {
        used_percentage: rl.primary.used_percent ?? 0,
        resets_at: rl.primary.resets_at ? rl.primary.resets_at * 1000 : undefined,
      },
      ...(rl.secondary ? {
        seven_day: {
          used_percentage: rl.secondary.used_percent ?? 0,
          resets_at: rl.secondary.resets_at ? rl.secondary.resets_at * 1000 : undefined,
        },
      } : {}),
    } : undefined;

    return {
      provider: 'codex',
      session_id: sessionId,
      cwd,
      model: { id: modelName, display_name: modelName },
      context_window: maxTokens > 0 ? {
        total_input_tokens: inputTokens,
        total_output_tokens: outputTokens,
        context_window_size: maxTokens,
        used_percentage: usedPct,
        remaining_percentage: usedPct != null ? 100 - usedPct : null,
      } : undefined,
      rate_limits: rateLimits,
      git: { branch: this.getGitBranch(cwd) },
      _raw: { sessionMeta, turnContext, tokenCount },
    };
  }

  private findLatestRollout(): string | undefined {
    const sessionsDir = join(this.codexHome, 'sessions');
    if (!existsSync(sessionsDir)) return undefined;

    // Check today's directory first, then scan recent
    const now = new Date();
    const dateDir = join(
      sessionsDir,
      String(now.getFullYear()),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0')
    );

    if (existsSync(dateDir)) {
      const latest = this.findLatestInDir(dateDir);
      if (latest) return latest;
    }

    return this.scanRecent(sessionsDir);
  }

  private findLatestInDir(dir: string): string | undefined {
    try {
      const files = readdirSync(dir)
        .filter(f => f.startsWith('rollout-') && f.endsWith('.jsonl'))
        .map(f => ({ name: f, mtime: statSync(join(dir, f)).mtimeMs }))
        .sort((a, b) => b.mtime - a.mtime);
      return files.length > 0 ? join(dir, files[0].name) : undefined;
    } catch {
      return undefined;
    }
  }

  private scanRecent(sessionsDir: string): string | undefined {
    try {
      const years = readdirSync(sessionsDir).filter(f => /^\d{4}$/.test(f)).sort().reverse();
      for (const year of years.slice(0, 1)) {
        const yearDir = join(sessionsDir, year);
        const months = readdirSync(yearDir).filter(f => /^\d{2}$/.test(f)).sort().reverse();
        for (const month of months.slice(0, 1)) {
          const monthDir = join(yearDir, month);
          const days = readdirSync(monthDir).filter(f => /^\d{2}$/.test(f)).sort().reverse();
          for (const day of days.slice(0, 3)) {
            const latest = this.findLatestInDir(join(monthDir, day));
            if (latest) return latest;
          }
        }
      }
    } catch { /* ignore */ }
    return undefined;
  }

  private fallback(): UnifiedInput {
    const cwd = process.cwd();
    return {
      provider: 'codex',
      session_id: 'unknown',
      cwd,
      model: { id: 'unknown', display_name: 'Codex (no session data)' },
      git: { branch: this.getGitBranch(cwd) },
    };
  }
}
