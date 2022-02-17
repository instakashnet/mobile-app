import React, { useEffect, useState } from "react";
import { StyleSheet, Platform, Alert, Linking } from "react-native";
import { Provider as PaperProvider, DefaultTheme, Modal } from "react-native-paper";
import { connectToDevTools } from "react-devtools-core";
import { ThemeProvider } from "styled-components/native";
import LottieView from "lottie-react-native";
import { registerTranslation } from "react-native-paper-dates";
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
import { Text } from "./components/typography/text.component";
import { Spacer } from "./components/utils/spacer.component";

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

registerTranslation("es", {
  save: "Guardar",
  selectSingle: "Seleccionar fecha",
  notAccordingToDateFormat: (inputFormat) => `El formato debe ser ${inputFormat}`,
  mustBeHigherThan: "Debe ser mayor a",
  mustBeLowerThan: "Debe ser menor que",
  mustBeBetween: "Debe ser entre",
  dateIsDisabled: "El dia está deshabilitado",
});

export default function App() {
  const [updateModal, setUpdateModal] = useState(false),
    [isUpdateAvailable, setIsUpdateAvailable] = useState(false),
    [isStoreUpdate, setIsStoreUpdate] = useState(false),
    [appIsReady, setAppIsReady] = useState(false);

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
          if (Application.nativeApplicationVersion !== "0.2.1") {
            Alert.alert("Actualización!", "Hay una nueva versión disponible en la store, debes descargarla para poder usar esta app.", [
              {
                text: "Ir a la store",
                onPress: () =>
                  Linking.openURL(
                    Platform.OS === "android" ? "https://play.google.com/store/apps/details?id=net.instakash.app" : "https://apps.apple.com/pe/app/instakash/id1601561803"
                  ),
              },
            ]);
            setIsStoreUpdate(true);
          } else {
            const update = await Updates.checkForUpdateAsync();
            setIsUpdateAvailable(update.isAvailable);
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
    if (appIsReady && !isUpdateAvailable && !isStoreUpdate) {
      (async () => {
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
      })();
    }
  }, [appIsReady, isUpdateAvailable]);

  useEffect(() => {
    if (isUpdateAvailable && appIsReady) {
      (async () => {
        try {
          setUpdateModal(true);

          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        } catch (error) {
          throw error;
        }
      })();
    }
  }, [isUpdateAvailable, appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      <ThemeProvider theme={theme}>
        <PaperProvider theme={{ ...DefaultTheme, dark: false }}>
          <Navigator />
          <Modal dismissable={false} visible={updateModal} contentContainerStyle={styles.modalContainer}>
            <LottieView key="animation" resizeMode="contain" style={{ width: 140 }} loop autoPlay source={require("./assets/animations/updating.json")} />
            <Spacer variant="top" size={2} />
            <Text variant="title">¡Actualización!</Text>
            <Spacer variant="top" />
            <Text style={{ textAlign: "center" }}>
              Estamos actualizando la app para poder brindarte todas las funcionalidades, solo tomará unos segundos. <Text variant="bold">Agradecemos tu espera.</Text>
            </Text>
            <Spacer variant="top" />
          </Modal>
        </PaperProvider>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    minHeight: 150,
  },
});
