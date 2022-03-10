import React, { useCallback, useEffect, useState } from "react";
import { Platform, Linking } from "react-native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { connectToDevTools } from "react-devtools-core";
import { ThemeProvider } from "styled-components/native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Updates from "expo-updates";
import { StatusBar } from "expo-status-bar";
import * as Sentry from "sentry-expo";
import * as Facebook from "expo-facebook";
import * as Application from "expo-application";
import { requestTrackingPermissionsAsync, getTrackingPermissionsAsync } from "expo-tracking-transparency";
import "react-native-gesture-handler";
import { Navigator } from "./navigation";
import { theme } from "./theme";
import { getVariables } from "./variables";

// REDUX
import { Provider } from "react-redux";
import { store } from "./store";
import { injectStore } from "./services/interceptors";

// COMPONENTS
import { UpdateModal } from "./components/modals/update-modal.component";
import { StoreModal } from "./components/modals/store-modal.component";

injectStore(store);
const { stage } = getVariables();

if (__DEV__) {
  connectToDevTools({
    host: "localhost",
    port: 8097,
  });
}

Sentry.init({
  dsn: "https://02a80f87130549feb3357ae057e0c268@o1108528.ingest.sentry.io/6136263",
  enableInExpoDevelopment: true,
  debug: stage !== "prod",
});

export default function App() {
  const [otaModal, setOtaModal] = useState(false),
    [isOtaUpdate, setIsOtaUpdate] = useState(false),
    [isStoreUpdate, setIsStoreUpdate] = useState(false),
    [appIsReady, setAppIsReady] = useState(false);

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
          const update = await Updates.checkForUpdateAsync();

          if (update.isAvailable) {
            await Updates.fetchUpdateAsync();
            setIsOtaUpdate(update.isAvailable);
          } else {
            if (Application.nativeApplicationVersion !== "0.2.2") setIsStoreUpdate(true);
          }
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
        await SplashScreen.hideAsync();
      })();
    }
  }, [appIsReady]);

  useEffect(() => {
    (async () => {
      try {
        if (isOtaUpdate) {
          setOtaModal(true);
          return await Updates.reloadAsync();
        } else {
          let { granted: getGranted } = await getTrackingPermissionsAsync();

          if (getGranted) {
            await Facebook.initializeAsync();
            await Facebook.setAdvertiserTrackingEnabledAsync(true);
          } else {
            let { granted: requestGranted } = await requestTrackingPermissionsAsync();

            if (requestGranted) {
              await Facebook.initializeAsync();
              await Facebook.setAdvertiserTrackingEnabledAsync(true);
            }
          }
        }
      } catch (error) {
        throw error;
      }
    })();
  }, [isOtaUpdate]);

  return appIsReady ? (
    <Provider store={store}>
      <StatusBar style="dark" />
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
