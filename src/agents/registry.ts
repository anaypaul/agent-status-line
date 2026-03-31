import { type BaseAgent, type Config } from '../types.js';
import { ModelAgent } from './model.agent.js';
import { ContextAgent } from './context.agent.js';
import { RateLimitAgent } from './rate-limit.agent.js';
import { CostAgent } from './cost.agent.js';
import { GitAgent } from './git.agent.js';
import { SessionAgent } from './session.agent.js';
import { DirectoryAgent } from './directory.agent.js';
import { VimModeAgent } from './vim-mode.agent.js';
import { AgentInfoAgent } from './agent-info.agent.js';

const ALL_AGENTS: BaseAgent[] = [
  new ModelAgent(),
  new ContextAgent(),
  new RateLimitAgent(),
  new CostAgent(),
  new GitAgent(),
  new SessionAgent(),
  new DirectoryAgent(),
  new VimModeAgent(),
  new AgentInfoAgent(),
];

export function getAgents(config: Config): BaseAgent[] {
  return ALL_AGENTS
    .filter((agent) => config.agents[agent.id]?.enabled !== false)
    .sort((a, b) => {
      const posA = config.agents[a.id]?.position ?? Infinity;
      const posB = config.agents[b.id]?.position ?? Infinity;
      return posA - posB;
    });
}
