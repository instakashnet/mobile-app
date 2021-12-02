import React from "react";
import { TouchableOpacity, TouchableWithoutFeedback, Alert, Linking, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../theme";

// ASSETS
import { Whatsapp } from "../../assets/icons/whatsapp";

// COMPONENTS
import { Text } from "../../components/typography/text.component";

export const headerOptions = {
  backgroundColor: theme.colors.bg.light,
  headerTintColor: theme.colors.text.title,
  headerBackTitleStyle: { fontSize: 12 },
  headerStyle: {
    height: 90,
    borderBottomWidth: 1,
  },
  headerLeftContainerStyle: {
    paddingBottom: 0,
  },
  headerTitleContainerStyle: {
    paddingBottom: 0,
  },
};

export const topBarOptions = {
  tabBarInactiveTintColor: "#676767",
  tabBarActiveTintColor: "#FFF",
  tabBarIndicatorStyle: { backgroundColor: "#20A2A5", height: "100%" },
};

const onOpenWhatsapp = async () => {
  const URL = `whatsapp://send?text=Hola Instakash, deseo información&phone=51930463531`;

  try {
    await Linking.openURL(URL);
  } catch (error) {
    Alert.alert("Error", "Verifica que whatsapp está instalado correctamente en este dispositivo.");
  }
};

export const headerRight = () => (
  <View style={{ paddingBottom: 0, marginRight: 10 }}>
    <TouchableOpacity onPress={onOpenWhatsapp}>
      <Whatsapp />
    </TouchableOpacity>
  </View>
);

export const headerBackLeft = (navigation) => (
  <View style={{ paddingBottom: 0, marginLeft: 10 }}>
    <TouchableOpacity onPress={navigation.goBack}>
      <Ionicons name="arrow-back-outline" color="#0D8284" size={30} />
    </TouchableOpacity>
  </View>
);

export const headerLeft = (navigation) => (
  <View style={{ paddingBottom: 0, marginLeft: 10 }}>
    <TouchableWithoutFeedback onPress={navigation.toggleDrawer}>
      <Ionicons name="menu-outline" color="#0D8284" size={30} />
    </TouchableWithoutFeedback>
  </View>
);

export const headerCameraFlash = (onPress, iconType) => (
  <View style={{ paddingBottom: 0, marginRight: 10 }}>
    <TouchableWithoutFeedback onPress={onPress}>
      <Ionicons name={iconType === 2 ? "ios-flash-outline" : iconType === 1 ? "ios-flash" : "ios-flash-off-outline"} color="#0D8284" size={30} />
    </TouchableWithoutFeedback>
  </View>
);

export const headerTitle = (title) => (
  <Text variant="subtitle" numberOfLines={1}>
    {title}
  </Text>
);
