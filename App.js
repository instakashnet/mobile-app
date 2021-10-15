import React from "react";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider } from "styled-components/native";
import { Navigator } from "./navigation";
import { theme } from "./theme";
import { store } from "./store";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Lato-Regular": require("./fonts/lato/Lato-Regular.ttf"),
    "Lato-Bold": require("./fonts/lato/Lato-Bold.ttf"),
    "Lato-Black": require("./fonts/lato/Lato-Black.ttf"),
    "Roboto-Regular": require("./fonts/roboto/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <ThemeProvider theme={theme}>
        <PaperProvider>
          <Navigator />
        </PaperProvider>
      </ThemeProvider>
    </Provider>
  );
}
