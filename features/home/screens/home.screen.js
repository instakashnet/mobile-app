import React from "react";
import { StyleSheet } from "react-native";

// ASSETS
import { PigIcon } from "../../../assets/illustrations/platform/pig";

// COMPONENTS
import { HomeWrapper, WelcomeCard, InfoCard, CardContent, ImgWrapper, Shape1Bg, Button, ShadowCard } from "../components/home.styles";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/utils/spacer.component";

export const HomeScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <HomeWrapper>
        <ShadowCard>
          <WelcomeCard>
            <Text variant="subtitle">¡Bienvenido!</Text>
            <CardContent>
              <Text numberOfLines={3}>Cambia dólares al mejor tipo de cambio del Perú.</Text>
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
            <CardContent>
              <Text numberOfLines={2}>Comparte con tus amigos, gana KASH y mucho más.</Text>
            </CardContent>
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
