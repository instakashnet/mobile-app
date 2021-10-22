import React from "react";
import { TouchableOpacity, Alert, Linking, Platform, View } from "react-native";
import { theme } from "../../theme";

// ASSETS
import { Whatsapp } from "../../assets/icons/whatsapp";

export const headerOptions = {
  backgroundColor: theme.colors.bg.light,
  headerTintColor: theme.colors.text.title,
  headerBackTitleStyle: { fontSize: 12 },
  headerStyle: {
    height: 90,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.brand.primary,
  },
  headerLeftContainerStyle: {
    paddingBottom: Platform.OS === "ios" ? 0 : 25,
  },
  headerTitleContainerStyle: {
    paddingBottom: Platform.OS === "ios" ? 0 : 25,
  },
};

const onOpenWhatsapp = async () => {
  const URL = `whatsapp://send?text=Hola Instakash, deseo información&phone=51930463531`;

  try {
    await Linking.openURL(URL);
  } catch (error) {
    Alert.alert("Error", "Verifica que whatsapp está instalado correctamente en este dispositivo.");
  }
};

export const headerLeft = () => (
  <View style={{ paddingBottom: Platform.OS === "ios" ? 0 : 20, marginLeft: 10 }}>
    <TouchableOpacity onPress={onOpenWhatsapp}>
      <Whatsapp />
    </TouchableOpacity>
  </View>
);
