import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'bin/agent-status-line': 'bin/agent-status-line.ts',
    'index': 'src/index.ts',
  },
  format: ['esm'],
  target: 'node18',
  platform: 'node',
  dts: true,
  clean: true,
  splitting: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
});
