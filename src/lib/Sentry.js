import * as Sentry from 'sentry-expo'

import ENV from '../../variables'

export function initSentry() {
  return Sentry.init({
    dsn: ENV.sentryDsn,
    enableInExpoDevelopment: true,
    debug: ENV.stage === 'dev', // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
    tracesSampleRate: ENV.stage === 'dev' ? 1.0 : 0.3,
  })
}
