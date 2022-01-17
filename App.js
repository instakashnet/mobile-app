import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import "react-native-gesture-handler";
import * as Updates from "expo-updates";
import { StyleSheet } from "react-native";
import { Provider as PaperProvider, DefaultTheme, Modal } from "react-native-paper";
import { registerTranslation } from "react-native-paper-dates";
import LottieView from "lottie-react-native";
import { ThemeProvider } from "styled-components/native";
import { Navigator } from "./navigation";
import { theme } from "./theme";
import { store } from "./store";
import * as Sentry from "sentry-expo";
import * as Facebook from "expo-facebook";
import { requestTrackingPermissionsAsync, getTrackingPermissionsAsync } from "expo-tracking-transparency";
import { getVariables } from "./variables";
import { connectToDevTools } from "react-devtools-core";

// COMPONENTS
import { Text } from "./components/typography/text.component";
import { Spacer } from "./components/utils/spacer.component";

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
    [fontsLoaded] = useFonts({
      "lato-regular": require("./fonts/lato/lato-regular.ttf"),
      "lato-bold": require("./fonts/lato/lato-bold.ttf"),
      "lato-black": require("./fonts/lato/lato-black.ttf"),
      "roboto-regular": require("./fonts/roboto/roboto-regular.ttf"),
    });

  // EFFECTS
  useEffect(() => {
    if (stage !== "dev") {
      (async () => {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          setUpdateModal(true);
          setTimeout(() => {
            onReloadApp();
          }, 4000);
        }
      })();
    }
  });

  useEffect(() => {
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
  }, []);

  // HANDLERS
  const onReloadApp = async () => {
    await Updates.fetchUpdateAsync();
    await Updates.reloadAsync();
  };

  if (!fontsLoaded) {
    return <AppLoading />;
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
