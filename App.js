import React from "react";
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

export default function App() {
  const [fontsLoaded] = useFonts({
    "lato-regular": require("./fonts/lato/lato-regular.ttf"),
    "lato-bold": require("./fonts/lato/lato-bold.ttf"),
    "lato-black": require("./fonts/lato/lato-black.ttf"),
    "roboto-regular": require("./fonts/roboto/roboto-regular.ttf"),
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
