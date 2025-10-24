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
    Sitemap({
      hostname: 'https://vaktiapp.com',
      i18n: {
        defaultLanguage: 'tr',
        languages: [
          'tr',
          'en',
          'ru',
          'es',
          'fa',
          'fr',
          'de',
          'zh',
          'ar',
          'az',
          'id',
          'it',
          'kk',
          'ko',
          'ky',
          'ms',
        ],
      },
      priority: { '/': 1.0, '/times': 1.0, '/sabbaticals': 0.9, '/settings': 0.7, '/about': 0.6 },
      dynamicRoutes: ['/times', '/sabbaticals', '/settings', '/about'],
    }),
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
