import LottieView from "lottie-react-native";
import React from "react";
import { Modal } from "react-native-paper";
import styled from "styled-components/native";

// COMPONENTS
import { reloadAsync } from "expo-updates";
import { Text } from "../typography/text.component";
import { Button } from "../UI/button.component";
import { Spacer } from "../utils/spacer.component";

export const UpdateModal = ({ isVisible }) => {
  const handleOtaUpdate = async () => await reloadAsync();

  return (
    <StyledModal dismissable={false} visible={isVisible}>
      <LottieView key="animation" resizeMode="contain" style={{ width: 140 }} loop autoPlay source={require("../../assets/animations/updating.json")} />
      <Spacer variant="top" size={2} />
      <Text variant="title">¡Nueva actulización!</Text>
      <Spacer variant="top" />
      <Text style={{ textAlign: "center" }}>Hemos actualizado la app para poder brindarte un mejor rendimiento y funcionalidades.</Text>
      <Text variant="bold">Solo tomará unos segundos.</Text>
      <Spacer variant="top" />
      <Button onPress={handleOtaUpdate}>Aplicar</Button>
    </StyledModal>
  );
};

const StyledModal = styled(Modal).attrs({
  contentContainerStyle: {
    width: "80%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    minHeight: 150,
  },
})``;
