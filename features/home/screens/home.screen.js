import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

// REDUX
import { useDispatch } from "react-redux";
import { savePushToken } from "../../../store/actions";

// ASSETS
import { PigIcon } from "../../../assets/illustrations/platform/pig";

// COMPONENTS
import { HomeWrapper, WelcomeCard, InfoCard, CardContent, ImgWrapper, Shape1Bg, Button, ShadowCard } from "../components/home.styles";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/utils/spacer.component";

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // EFFECTS
  useEffect(() => {
    (async () => {
      if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        } else return;

        if (finalStatus !== "granted") return;
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        dispatch(savePushToken(token));
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    })();
  }, []);

  return (
    <SafeArea>
      <HomeWrapper>
        <ShadowCard>
          <WelcomeCard>
            <Text variant="subtitle">¡Bienvenido!</Text>
            <CardContent>
              <Text numberOfLines={3}>Con nosotros todo es más fácil, ahora puedes cambiar dólares desde cualquier lugar.</Text>
            </CardContent>
            <Shape1Bg />
            <ImgWrapper>
              <PigIcon />
            </ImgWrapper>
          </WelcomeCard>
        </ShadowCard>
        <Spacer variant="top" size={5} />
        <ShadowCard>
          <InfoCard>
            <Text variant="subtitle">¡Cambia con Instakash!</Text>
            <CardContent>
              <Text numberOfLines={2}>¿Qué esperas para hacer tu cambio?</Text>
            </CardContent>
            <Spacer variant="top" size={2} />
            <Button style={styles.button} onPress={() => navigation.navigate("Exchange")}>
              Hacer cambio
            </Button>
          </InfoCard>
        </ShadowCard>
        <Spacer variant="top" size={5} />
        <ShadowCard>
          <InfoCard>
            <Text variant="subtitle">¡Gana con nosotros!</Text>
            <Text numberOfLines={2}>Comparte tu código de afiliado y gana KASH y más beneficios.</Text>
            <Spacer variant="top" size={2} />
            <Button style={styles.button} onPress={() => navigation.navigate("Affiliates")}>
              Saber más
            </Button>
          </InfoCard>
        </ShadowCard>
      </HomeWrapper>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  button: {
    maxWidth: 160,
  },
});
