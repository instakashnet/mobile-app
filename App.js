import * as Font from 'expo-font';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { connectToDevTools } from 'react-devtools-core';
import 'react-native-gesture-handler';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
// REDUX
import { Provider } from 'react-redux';
import * as Sentry from 'sentry-expo';
import { ThemeProvider } from 'styled-components/native';
// COMPONENTS
import { Navigator } from './navigation';
import { injectStore } from './services/interceptors';
import { checkTrackingPermissions } from './shared/helpers/permissions';
import Updater from './shared/updater.component';
// PERMISSIONS
import { store } from './store';
import { handleNotificationsInit } from './store/actions';
import { theme } from './theme';
import ENV from './variables';

injectStore(store);

if (__DEV__) {
  connectToDevTools({
    host: 'localhost',
    port: 8097,
  });
} else {
  Sentry.init({
    dsn: 'https://02a80f87130549feb3357ae057e0c268@o1108528.ingest.sentry.io/6136263',
    enableInExpoDevelopment: false,
    debug: ENV.stage !== 'prod',
    enableOutOfMemoryTracking: false,
  });
}

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false),
    [notification, setNotification] = useState(null),
    notificationListener = useRef(null),
    responseListener = useRef(null);

  // EFFECTS
  useEffect(() => {
    (async () => {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          'lato-regular': require('./fonts/lato/lato-regular.ttf'),
          'lato-bold': require('./fonts/lato/lato-bold.ttf'),
          'lato-black': require('./fonts/lato/lato-black.ttf'),
          'roboto-regular': require('./fonts/roboto/roboto-regular.ttf'),
        });
      } catch (e) {
        Sentry.Native.captureException(e);
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    })();
  }, []);

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        await checkTrackingPermissions();
      } catch (error) {
        throw error;
      }
    };

    if (appIsReady) checkPermissions();
  }, [appIsReady]);

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => setNotification(notification));
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) =>
      store.dispatch(handleNotificationsInit(response.notification?.request?.content)),
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const hideSplashScreen = async () => await SplashScreen.hideAsync();

  return appIsReady ? (
    <Provider store={store}>
      <StatusBar style='dark' backgroundColor='#0D8284' />
      <ThemeProvider theme={theme}>
        <PaperProvider theme={{ ...DefaultTheme, dark: false }}>
          <Navigator />
          <Updater />
          {/* <StoreModal isVisible={isStoreUpdate} onUpdate={goToStore} closeModal={() => setIsStoreUpdate(false)} /> */}
        </PaperProvider>
      </ThemeProvider>
    </Provider>
  ) : null;
}
