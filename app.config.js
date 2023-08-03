import 'dotenv/config'

module.exports = {
  owner: 'instakash',
  scheme: 'instakash.app',
  originalFullName: '@rogerrc12/instakash',
  name: 'Instakash',
  slug: 'instakash-app',
  platforms: ['ios', 'android'],
  jsEngine: 'hermes',
  version: '1.1.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#0A686A',
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
    package: 'net.instakash.app',
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#0A686A',
    },
    softwareKeyboardLayoutMode: 'pan',
    permissions: [
      'android.permission.CAMERA',
      'android.permission.RECORD_AUDIO',
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE',
      'android.permission.RECEIVE_BOOT_COMPLETED',
    ],
  },
  web: {
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    [
      'expo-tracking-transparency',
      {
        userTrackingPermission:
          '$(PRODUCT_NAME) busca mejorar tu experiencia al utilizar nuestros servicios. Al permitir el seguimiento de tu actividad, podemos personalizar las ofertas y promociones específicas para tus cambios de divisas. Nunca compartimos tu información personal con anunciantes sin tu consentimiento explícito.',
      },
    ],
    'sentry-expo',
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
        icon: './assets/images/notification-icon.png',
        color: '#0A686A',
      },
    ],
    'expo-notifications',
    '@react-native-google-signin/google-signin',
  ],
  runtimeVersion: {
    policy: 'appVersion',
  },
  updates: {
    enabled: true,
    fallbackToCacheTimeout: 15000,
    checkAutomatically: 'ON_ERROR_RECOVERY',
    url: 'https://u.expo.dev/d79c74ef-7ba4-44fa-b647-92650d67b200',
  },
  extra: {
    googleWebClientId: '714696989879-qam3q40tc0buh8ffde830n22fhr9tusb.apps.googleusercontent.com',
    sentryDsn: 'https://10877a090fe44c9fbcd669266f7b2bce@o1108528.ingest.sentry.io/4505433789169664',
    eas: {
      projectId: 'd79c74ef-7ba4-44fa-b647-92650d67b200',
    },
  },
  hooks: {
    postPublish: [
      {
        file: 'sentry-expo/upload-sourcemaps',
        config: {
          organization: process.env.SENTRY_ORGANIZATION,
          project: process.env.SENTRY_PROJECT,
        },
      },
    ],
  },
}
