import Constants from 'expo-constants'
import * as Updates from 'expo-updates'

const ENV = {
  stage: 'dev',
  apiUrl: 'https://api.dev.instakash.net',
  sentryDsn: Constants.expoConfig.extra?.sentryDsn,
  googleWebClientId: Constants.expoConfig.extra?.googleWebClientId,
}

if (Updates.channel === 'production' || Updates.channel === 'staging') {
  ENV.stage = 'prod'
  ENV.apiUrl = 'https://api.instakash.net'
}

export default ENV
