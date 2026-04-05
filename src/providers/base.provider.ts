import { execSync } from 'node:child_process';
import type { UnifiedInput, ProviderName } from '../types.js';

export interface ProviderOptions {
  cwd?: string;
  dataPath?: string;
}

export abstract class BaseProvider {
  abstract readonly name: ProviderName;
  abstract readonly displayName: string;

  abstract read(options?: ProviderOptions): Promise<UnifiedInput>;
  abstract detect(): Promise<boolean>;

  protected getGitBranch(cwd?: string): string | undefined {
    try {
      const branch = execSync('git branch --show-current', {
        cwd: cwd ?? process.cwd(),
        encoding: 'utf-8',
        timeout: 1000,
        stdio: ['pipe', 'pipe', 'pipe'],
      }).trim();
      return branch || undefined;
    } catch {
      return undefined;
    }
  }
}
