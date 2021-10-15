import React from "react";
import LottieView from "lottie-react-native";

// COMPONENTS
import { SplashWrapper } from "../components/auth.styles";
import { Text } from "../../../components/typography/text.component";

export const SplashScreen = () => {
  return (
    <SplashWrapper>
      <LottieView key="animation" resizeMode="contain" style={{ width: 225 }} loop autoPlay source={require("../../../assets/logo-animated.json")} />
      <Text variant="title" style={{ color: "#FFF", marginTop: 10 }}>
        CARGANDO DATOS
      </Text>
    </SplashWrapper>
  );
};
