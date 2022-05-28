import React from "react";
import LottieView from "lottie-react-native";

// COMPONENTS
import { SplashWrapper } from "../components/auth.styles";

export const SplashScreen = () => {
  return (
    <SplashWrapper>
      <LottieView key="animation" resizeMode="contain" style={{ width: 235 }} loop autoPlay source={require("../../../assets/animations/logo-animated.json")} />
    </SplashWrapper>
  );
};
