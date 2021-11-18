import { Linking, Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";

// NUMBER FUNCTIONS
export const formatAmount = (amount) => Number(amount).toFixed(2);

// COLOR FUNCTIONS
export const lightenColor = (color, amount) => {
  color = color.indexOf("#") >= 0 ? color.substring(1, color.length) : color;
  amount = parseInt((255 * amount) / 100);
  return (color = `#${addLight(color.substring(0, 2), amount)}${addLight(color.substring(2, 4), amount)}${addLight(color.substring(4, 6), amount)}`);
};

const addLight = (color, amount) => {
  let cc = parseInt(color, 16) + amount;
  let c = cc > 255 ? 255 : cc;
  c = c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
  return c;
};

export const openURL = async (url) => {
  const supported = await Linking.canOpenURL(url);
  if (!supported) return Alert.alert("Error", `Hay un error al intentar abrir la ruta: ${url}`);

  await WebBrowser.openBrowserAsync(url);
};
