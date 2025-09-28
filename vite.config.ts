import { fileURLToPath, URL } from 'node:url';
import { execSync } from 'node:child_process';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import Sitemap from 'vite-plugin-sitemap';

// Helper to get Git commit hash
function getGitCommitHash() {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch (error) {
    console.warn('Unable to get Git commit hash:', error);
    return 'unknown';
  }
}

// Generate build time
const buildTime = new Date().toISOString();

const packageVersion = process.env.npm_package_version;
// Combine version, commit hash, and build time
const buildVersion = `${packageVersion} / ${getGitCommitHash()} / ${buildTime}`;

export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
    }),
    Sitemap({ dynamicRoutes: ['/times', '/sabbaticals', '/settings', '/about'] }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    'process.env.BUILD_VERSION': JSON.stringify(buildVersion),
  },
});
