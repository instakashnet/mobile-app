import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider } from "styled-components/native";
import { Navigator } from "./navigation";
import { theme } from "./theme";
import { store } from "./store";
import { registerTranslation } from "react-native-paper-dates";

// "runtimeVersion": "2.718",

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
  const [fontsLoaded] = useFonts({
    "lato-regular": require("./fonts/lato/lato-regular.ttf"),
    "lato-bold": require("./fonts/lato/lato-bold.ttf"),
    "lato-black": require("./fonts/lato/lato-black.ttf"),
    "roboto-regular": require("./fonts/roboto/roboto-regular.ttf"),
  });
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();

      setIsBiometricSupported(compatible);
    })();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      <ThemeProvider theme={theme}>
        <PaperProvider>
          <Navigator isBiometrics={isBiometricSupported} />
        </PaperProvider>
      </ThemeProvider>
    </Provider>
  );
}
