import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'org.stconnect.app',
  appName: 'stconnect',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
    //  launchAutoHide": false,
   //   launchFadeOutDuration": 3000,
      backgroundColor: "#2a9b7d",
   //   "androidSplashResourceName": "splash",
    //  "androidScaleType": "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "small",
     // "iosSpinnerStyle": "small",
    //  "spinnerColor": "#999999",
      "splashFullScreen": true,
      "splashImmersive": true,
   //   "layoutName": "launch_screen",
     // "useDialog": true
    }
  }
}

export default config
