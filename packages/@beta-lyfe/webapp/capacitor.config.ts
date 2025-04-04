import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.betalyfe.app',
  appName: 'betalyfe',
  webDir: 'dist',
  server:{
    cleartext:true
  }
};

export default config;
