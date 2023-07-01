import 'dotenv/config'

module.exports = {
  owner: 'instakash',
  scheme: 'net.instakash.app',
  name: 'Instakash',
  slug: 'instakash-app',
  jsEngine: 'hermes',
  version: '1.1.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    jsEngine: 'jsc',
    supportsTablet: false,
    bundleIdentifier: 'instakash.app',
    googleServicesFile: process.env.GOOGLE_SERVICES_PLIST,
    config: {
      usesNonExemptEncryption: false,
    },
  },
  android: {
    jsEngine: 'jsc',
    package: 'net.instakash.app',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#0A686A',
    },
    softwareKeyboardLayoutMode: 'pan',
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    permissions: ['android.permission.CAMERA', 'android.permission.RECORD_AUDIO'],
  },
  web: {
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    '@react-native-google-signin/google-signin',
    'expo-apple-authentication',
    [
      'expo-camera',
      {
        cameraPermission: '$(PRODUCT_NAME) necesita permisos para poder usar tu cámara.',
      },
    ],
    [
      'expo-updates',
      {
        username: 'rogerrc12',
      },
    ],
    [
      'expo-notifications',
      {
        icon: './assets/notification-icon.png',
        color: '#0A686A',
      },
    ],
    'expo-notifications',
  ],
  extra: {
    eas: {
      projectId: 'd79c74ef-7ba4-44fa-b647-92650d67b200',
    },
    googleWebClientId: process.env.GOOGLE_WEB_CLIENT_ID,
  },
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  updates: {
    url: 'https://u.expo.dev/d79c74ef-7ba4-44fa-b647-92650d67b200',
  },
}

// {
//   "expo":
// }
