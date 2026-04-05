// ── Provider ──

export type ProviderName = 'claude-code' | 'codex' | 'gemini' | 'opencode';

// ── Unified input shape (CLI-agnostic) ──

export interface UnifiedInput {
  // Mandatory core (all providers produce these)
  provider: ProviderName;
  session_id: string;
  cwd: string;
  model: {
    id: string;
    display_name: string;
  };

  // Optional fields (not all CLIs provide these)
  session_name?: string;
  version?: string;
  transcript_path?: string;

  workspace?: {
    current_dir: string;
    project_dir: string;
    added_dirs?: string[];
  };

  output_style?: {
    name: string;
  };

  context_window?: {
    total_input_tokens?: number;
    total_output_tokens?: number;
    context_window_size?: number;
    current_usage?: {
      input_tokens: number;
      output_tokens: number;
      cache_creation_input_tokens?: number;
      cache_read_input_tokens?: number;
    } | null;
    used_percentage: number | null;
    remaining_percentage?: number | null;
  };

  rate_limits?: {
    five_hour?: {
      used_percentage: number;
      resets_at?: number;
    };
    seven_day?: {
      used_percentage: number;
      resets_at?: number;
    };
  };

  cost?: {
    total_cost_usd?: number;
    total_duration_ms?: number;
    total_api_duration_ms?: number;
    total_lines_added?: number;
    total_lines_removed?: number;
  };

  git?: {
    branch?: string;
    worktree_name?: string;
    worktree_path?: string;
    original_cwd?: string;
    original_branch?: string;
  };

  vim?: {
    mode: string;
  };

  agent?: {
    name: string;
    type?: string;
  };

  // Extension slot for provider-specific raw data
  _raw?: unknown;
}

/** @deprecated Use UnifiedInput instead */
export type ClaudeCodeInput = UnifiedInput;

// ── Segment: output of each agent widget ──

export type Urgency = 'normal' | 'warn' | 'critical';

export interface Segment {
  id: string;
  icon?: string;
  label: string;
  fg: string;
  bg: string;
  priority: number;
  urgency: Urgency;
}

// ── Theme ──

export interface ThemeSegmentColors {
  fg: string;
  bg: string;
}

export interface ThemeDefinition {
  name: string;
  meta: { author: string; variant: 'dark' | 'light' };
  base: {
    bg: string;
    fg: string;
    separator_fg: string;
  };
  segments: Record<string, {
    normal: ThemeSegmentColors;
    warn: ThemeSegmentColors;
    critical: ThemeSegmentColors;
  }>;
}

// ── Config ──

export type StyleName = 'minimal' | 'powerline' | 'capsule';
export type IconSet = 'nerd' | 'ascii' | 'none';

export interface AgentConfig {
  enabled: boolean;
  position: number;
  options: Record<string, unknown>;
}

export interface Thresholds {
  context_warn: number;
  context_critical: number;
  rate_warn: number;
  rate_critical: number;
  cost_warn: number;
  cost_critical: number;
}

export interface WatchConfig {
  enabled: boolean;
  interval_ms: number;
}

export interface Config {
  style: StyleName;
  theme: string;
  icons: IconSet;
  max_width: number | 'auto';
  agents: Record<string, AgentConfig>;
  thresholds: Thresholds;
  provider?: ProviderName;
  watch?: WatchConfig;
}

// ── Base Agent ──

export abstract class BaseAgent {
  abstract readonly id: string;

  abstract compute(input: UnifiedInput, config: Config): Segment | null;

  protected urgencyFromPercent(value: number, warnAt: number, critAt: number): Urgency {
    if (value >= critAt) return 'critical';
    if (value >= warnAt) return 'warn';
    return 'normal';
  }

  protected urgencyFromValue(value: number, warnAt: number, critAt: number): Urgency {
    if (value >= critAt) return 'critical';
    if (value >= warnAt) return 'warn';
    return 'normal';
  }
}
