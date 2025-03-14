import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import { configDefaults, defineConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        provider: 'v8',
        reporter: ['json-summary'],
        exclude: ['e2e/*', 'android/*', 'assets/*', 'ios/*'],
      },
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*', 'android/*', 'assets/*', 'ios/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      server: {
        deps: {
          inline: ['vuetify'],
        },
      },
      setupFiles: ['./vitest/setup.ts'],
    },
  }),
);
