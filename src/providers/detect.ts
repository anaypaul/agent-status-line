import type { ProviderName } from '../types.js';
import type { BaseProvider } from './base.provider.js';
import { ClaudeCodeProvider } from './claude-code.provider.js';
import { CodexProvider } from './codex.provider.js';
import { GeminiProvider } from './gemini.provider.js';
import { OpenCodeProvider } from './opencode.provider.js';

const PROVIDERS: BaseProvider[] = [
  new ClaudeCodeProvider(),
  new CodexProvider(),
  new GeminiProvider(),
  new OpenCodeProvider(),
];

export function getProviderByName(name: ProviderName): BaseProvider {
  const p = PROVIDERS.find(p => p.name === name);
  if (!p) throw new Error(`Unknown provider: ${name}`);
  return p;
}

export async function detectProvider(): Promise<BaseProvider> {
  for (const provider of PROVIDERS) {
    if (await provider.detect()) {
      return provider;
    }
  }
  // Default to Claude Code (original behavior)
  return PROVIDERS[0];
}
