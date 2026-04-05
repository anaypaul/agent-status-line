import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { BaseProvider, type ProviderOptions } from './base.provider.js';
import type { UnifiedInput } from '../types.js';

export class GeminiProvider extends BaseProvider {
  readonly name = 'gemini' as const;
  readonly displayName = 'Gemini CLI';

  private get geminiHome(): string {
    return join(homedir(), '.gemini');
  }

  async detect(): Promise<boolean> {
    if (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY) {
      return existsSync(join(this.geminiHome, 'tmp'));
    }
    return existsSync(join(this.geminiHome, 'tmp'));
  }

  async read(options?: ProviderOptions): Promise<UnifiedInput> {
    const sessionPath = options?.dataPath ?? this.findLatestSession();
    if (!sessionPath) {
      return this.fallback();
    }

    try {
      const raw = readFileSync(sessionPath, 'utf-8');
      const data = JSON.parse(raw);
      return this.normalize(data, options?.cwd);
    } catch {
      return this.fallback();
    }
  }

  private normalize(data: any, cwd?: string): UnifiedInput {
    const resolvedCwd = cwd ?? process.cwd();

    // Extract model from conversation record
    // Gemini session files typically have messages with model metadata
    let modelName = 'Gemini';
    let sessionId = 'unknown';
    let totalInputTokens = 0;
    let totalOutputTokens = 0;

    // Session ID from filename or data
    if (data.sessionId) sessionId = data.sessionId;
    if (data.session_id) sessionId = data.session_id;

    // Messages array — extract model and token info
    const messages = data.messages ?? data.turns ?? [];
    for (const msg of messages) {
      if (msg.model) modelName = msg.model;
      if (msg.modelId) modelName = msg.modelId;
      if (msg.usageMetadata) {
        totalInputTokens += msg.usageMetadata.promptTokenCount ?? 0;
        totalOutputTokens += msg.usageMetadata.candidatesTokenCount ?? 0;
      }
      if (msg.tokenCount) {
        totalInputTokens += msg.tokenCount.input ?? msg.tokenCount.prompt ?? 0;
        totalOutputTokens += msg.tokenCount.output ?? msg.tokenCount.candidates ?? 0;
      }
    }

    // Try to get model from config or response metadata
    if (data.model) modelName = data.model;
    if (data.modelName) modelName = data.modelName;

    // Derive lines changed from tool usage if available
    let linesAdded = 0;
    let linesRemoved = 0;
    for (const msg of messages) {
      const toolCalls = msg.toolCalls ?? msg.tool_calls ?? [];
      for (const tc of toolCalls) {
        if (tc.result?.linesAdded) linesAdded += tc.result.linesAdded;
        if (tc.result?.linesRemoved) linesRemoved += tc.result.linesRemoved;
      }
    }

    return {
      provider: 'gemini',
      session_id: sessionId,
      cwd: resolvedCwd,
      model: { id: modelName, display_name: modelName },
      context_window: totalInputTokens > 0 ? {
        total_input_tokens: totalInputTokens,
        total_output_tokens: totalOutputTokens,
        used_percentage: null, // Gemini doesn't provide context window size in session files
      } : undefined,
      cost: (linesAdded > 0 || linesRemoved > 0) ? {
        total_lines_added: linesAdded,
        total_lines_removed: linesRemoved,
      } : undefined,
      git: { branch: this.getGitBranch(resolvedCwd) },
      _raw: data,
    };
  }

  private findLatestSession(): string | undefined {
    const tmpDir = join(this.geminiHome, 'tmp');
    if (!existsSync(tmpDir)) return undefined;

    try {
      let latestPath: string | undefined;
      let latestMtime = 0;

      // Scan project directories
      const projects = readdirSync(tmpDir, { withFileTypes: true })
        .filter(d => d.isDirectory());

      for (const project of projects) {
        const chatsDir = join(tmpDir, project.name, 'chats');
        if (!existsSync(chatsDir)) continue;

        const files = readdirSync(chatsDir)
          .filter(f => f.startsWith('session-') && f.endsWith('.json'));

        for (const file of files) {
          const fullPath = join(chatsDir, file);
          const mtime = statSync(fullPath).mtimeMs;
          if (mtime > latestMtime) {
            latestMtime = mtime;
            latestPath = fullPath;
          }
        }
      }

      return latestPath;
    } catch {
      return undefined;
    }
  }

  private fallback(): UnifiedInput {
    const cwd = process.cwd();
    return {
      provider: 'gemini',
      session_id: 'unknown',
      cwd,
      model: { id: 'unknown', display_name: 'Gemini (no session data)' },
      git: { branch: this.getGitBranch(cwd) },
    };
  }
}
