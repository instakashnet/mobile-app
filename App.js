import * as Font from "expo-font";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as Updates from "expo-updates";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { connectToDevTools } from "react-devtools-core";
import { Linking, Platform } from "react-native";
import "react-native-gesture-handler";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
// REDUX
import { Provider } from "react-redux";
import * as Sentry from "sentry-expo";
import { ThemeProvider } from "styled-components/native";
import { StoreModal } from "./components/modals/store-modal.component";
// COMPONENTS
import { UpdateModal } from "./components/modals/update-modal.component";
import { Navigator } from "./navigation";
import { injectStore } from "./services/interceptors";
// PERMISSIONS
import { checkAppUpdate, checkTrackingPermissions } from "./shared/helpers/permissions";
import { store } from "./store";
import { handleNotificationsInit } from "./store/actions";
import { theme } from "./theme";
import { getVariables } from "./variables";

injectStore(store);
const { stage } = getVariables();

if (__DEV__) {
  connectToDevTools({
    host: "localhost",
    port: 8097,
  });
} else {
  Sentry.init({
    dsn: "https://02a80f87130549feb3357ae057e0c268@o1108528.ingest.sentry.io/6136263",
    enableInExpoDevelopment: false,
    debug: stage !== "prod",
  });
}

export default function App() {
  const [otaModal, setOtaModal] = useState(false),
    [isOtaUpdate, setIsOtaUpdate] = useState(false),
    [isStoreUpdate, setIsStoreUpdate] = useState(false),
    [appIsReady, setAppIsReady] = useState(false),
    [notification, setNotification] = useState(null),
    notificationListener = useRef(null),
    responseListener = useRef(null);

  // HANDLERS
  const goToStore = useCallback(
    () => Linking.openURL(Platform.OS === "android" ? "https://play.google.com/store/apps/details?id=net.instakash.app" : "https://apps.apple.com/pe/app/instakash/id1601561803"),
    [Linking, Platform]
  );

  // EFFECTS
  useEffect(() => {
    (async () => {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "lato-regular": require("./fonts/lato/lato-regular.ttf"),
          "lato-bold": require("./fonts/lato/lato-bold.ttf"),
          "lato-black": require("./fonts/lato/lato-black.ttf"),
          "roboto-regular": require("./fonts/roboto/roboto-regular.ttf"),
        });

        if (stage !== "dev") {
          const { storeUpdate, otaUpdate } = await checkAppUpdate();

          setIsStoreUpdate(storeUpdate);
          setIsOtaUpdate(otaUpdate);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      (async () => {
        try {
          if (isOtaUpdate) {
            setOtaModal(true);

            await Updates.fetchUpdateAsync();
            await Updates.reloadAsync();
          } else await checkTrackingPermissions();
        } catch (error) {
          throw error;
        }
      })();
    }
  }, [appIsReady]);

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => setNotification(notification));
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) =>
      store.dispatch(handleNotificationsInit(response.notification?.request?.content))
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return appIsReady ? (
    <Provider store={store}>
      <StatusBar style="dark" backgroundColor="#0D8284" />
      <ThemeProvider theme={theme}>
        <PaperProvider theme={{ ...DefaultTheme, dark: false }}>
          <Navigator />
          <UpdateModal isVisible={otaModal} />
          <StoreModal isVisible={isStoreUpdate} onUpdate={goToStore} closeModal={() => setIsStoreUpdate(false)} />
        </PaperProvider>
      </ThemeProvider>
    </Provider>
  ) : null;
}
