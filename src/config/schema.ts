import { z } from 'zod';
import { DEFAULT_CONFIG } from './defaults.js';
import type { Config } from '../types.js';

const AgentConfigSchema = z.object({
  enabled: z.boolean().optional(),
  position: z.number().optional(),
  options: z.record(z.unknown()).optional(),
});

type ParsedAgentConfig = z.infer<typeof AgentConfigSchema>;

const ThresholdsSchema = z.object({
  context_warn: z.number().optional().default(DEFAULT_CONFIG.thresholds.context_warn),
  context_critical: z.number().optional().default(DEFAULT_CONFIG.thresholds.context_critical),
  rate_warn: z.number().optional().default(DEFAULT_CONFIG.thresholds.rate_warn),
  rate_critical: z.number().optional().default(DEFAULT_CONFIG.thresholds.rate_critical),
  cost_warn: z.number().optional().default(DEFAULT_CONFIG.thresholds.cost_warn),
  cost_critical: z.number().optional().default(DEFAULT_CONFIG.thresholds.cost_critical),
});

export const ConfigSchema = z.object({
  style: z.enum(['minimal', 'powerline', 'capsule']).optional().default(DEFAULT_CONFIG.style),
  theme: z.string().optional().default(DEFAULT_CONFIG.theme),
  icons: z.enum(['nerd', 'ascii', 'none']).optional().default(DEFAULT_CONFIG.icons),
  max_width: z.union([z.number(), z.literal('auto')]).optional().default(DEFAULT_CONFIG.max_width),
  thresholds: ThresholdsSchema.optional().default({}),
  agents: z.record(AgentConfigSchema).optional().default({}),
});

function deepMerge<T extends Record<string, unknown>>(base: T, override: Record<string, unknown>): T {
  const result = { ...base } as Record<string, unknown>;
  for (const key of Object.keys(override)) {
    const baseVal = result[key];
    const overVal = override[key];
    if (
      baseVal !== null &&
      overVal !== null &&
      typeof baseVal === 'object' &&
      typeof overVal === 'object' &&
      !Array.isArray(baseVal) &&
      !Array.isArray(overVal)
    ) {
      result[key] = deepMerge(
        baseVal as Record<string, unknown>,
        overVal as Record<string, unknown>,
      );
    } else {
      result[key] = overVal;
    }
  }
  return result as T;
}

export function validateConfig(raw: unknown): Config {
  const parsed = ConfigSchema.parse(raw ?? {});

  // Deep-merge agents: user overrides per-agent on top of defaults
  const mergedAgents: Record<string, { enabled: boolean; position: number; options: Record<string, unknown> }> = {};
  for (const [id, agentDefault] of Object.entries(DEFAULT_CONFIG.agents)) {
    const userAgent = parsed.agents[id];
    mergedAgents[id] = {
      enabled: userAgent?.enabled ?? agentDefault.enabled,
      position: userAgent?.position ?? agentDefault.position,
      options: userAgent?.options
        ? { ...agentDefault.options, ...userAgent.options }
        : { ...agentDefault.options },
    };
  }

  // Include any extra agents the user defined that aren't in defaults
  for (const [id, userAgent] of Object.entries(parsed.agents) as [string, ParsedAgentConfig][]) {
    if (!mergedAgents[id]) {
      mergedAgents[id] = {
        enabled: userAgent.enabled ?? true,
        position: userAgent.position ?? 99,
        options: (userAgent.options ?? {}) as Record<string, unknown>,
      };
    }
  }

  return {
    style: parsed.style,
    theme: parsed.theme,
    icons: parsed.icons,
    max_width: parsed.max_width,
    thresholds: parsed.thresholds,
    agents: mergedAgents,
  };
}
