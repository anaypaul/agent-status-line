import type { BaseProvider } from './providers/base.provider.js';
import type { Config } from './types.js';
import { run } from './index.js';

export interface WatchOptions {
  provider: BaseProvider;
  config: Config;
  intervalMs: number;
}

export async function watch(opts: WatchOptions): Promise<void> {
  const { provider, config, intervalMs } = opts;

  const tick = async () => {
    try {
      const input = await provider.read();
      const output = run(input, config);
      // Clear line and overwrite in place
      process.stdout.write('\x1b[2K\r' + output);
    } catch {
      // Silent — status line should never crash
    }
  };

  await tick();
  setInterval(tick, intervalMs);
}
