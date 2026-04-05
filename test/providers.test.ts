import { describe, it, expect } from 'vitest';
import { ClaudeCodeProvider } from '../src/providers/claude-code.provider.js';
import { CodexProvider } from '../src/providers/codex.provider.js';
import { GeminiProvider } from '../src/providers/gemini.provider.js';
import { OpenCodeProvider } from '../src/providers/opencode.provider.js';

describe('providers', () => {
  describe('ClaudeCodeProvider', () => {
    it('has correct name and displayName', () => {
      const p = new ClaudeCodeProvider();
      expect(p.name).toBe('claude-code');
      expect(p.displayName).toBe('Claude Code');
    });
  });

  describe('CodexProvider', () => {
    it('has correct name and displayName', () => {
      const p = new CodexProvider();
      expect(p.name).toBe('codex');
      expect(p.displayName).toBe('Codex CLI');
    });
  });

  describe('GeminiProvider', () => {
    it('has correct name and displayName', () => {
      const p = new GeminiProvider();
      expect(p.name).toBe('gemini');
      expect(p.displayName).toBe('Gemini CLI');
    });
  });

  describe('OpenCodeProvider', () => {
    it('has correct name and displayName', () => {
      const p = new OpenCodeProvider();
      expect(p.name).toBe('opencode');
      expect(p.displayName).toBe('OpenCode');
    });
  });
});

describe('provider detection', () => {
  it('imports detectProvider and getProviderByName', async () => {
    const { detectProvider, getProviderByName } = await import('../src/providers/detect.js');
    expect(typeof detectProvider).toBe('function');
    expect(typeof getProviderByName).toBe('function');
  });

  it('getProviderByName returns correct provider', async () => {
    const { getProviderByName } = await import('../src/providers/detect.js');
    expect(getProviderByName('claude-code').name).toBe('claude-code');
    expect(getProviderByName('codex').name).toBe('codex');
    expect(getProviderByName('gemini').name).toBe('gemini');
    expect(getProviderByName('opencode').name).toBe('opencode');
  });

  it('getProviderByName throws on unknown', async () => {
    const { getProviderByName } = await import('../src/providers/detect.js');
    expect(() => getProviderByName('unknown' as any)).toThrow('Unknown provider');
  });
});
