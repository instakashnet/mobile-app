// import Constants from 'expo-constants'
import * as Updates from 'expo-updates'

const ENV = {
  stage: 'dev',
  apiUrl: 'https://api.dev.instakash.net',
  sentryDsn: 'https://10877a090fe44c9fbcd669266f7b2bce@o1108528.ingest.sentry.io/4505433789169664',
  googleWebClientId: '714696989879-rkuapcucjc4u0ttfk7kd92k45k1b11js.apps.googleusercontent.com',
}

if (Updates.channel === 'production' || Updates.channel === 'staging') {
  ENV.stage = 'prod'
  ENV.apiUrl = 'https://api.instakash.net'
}

export default ENV
