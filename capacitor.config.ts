import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vakit.app',
  appName: 'Vakit App',
  webDir: 'dist',
  plugins: {
    StatusBar: {
      overlaysWebView: false,
      style: 'DARK',
      backgroundColor: '#ffffffff',
    },
  },
};

export default config;
