import { Modal } from "react-native-paper";
import React from "react";
import styled from "styled-components/native";
import LottieView from "lottie-react-native";

// COMPONENTS
import { Text } from "../typography/text.component";
import { Spacer } from "../utils/spacer.component";

export const UpdateModal = ({ isVisible }) => {
  return (
    <StyledModal dismissable={false} visible={isVisible}>
      <LottieView key="animation" resizeMode="contain" style={{ width: 140 }} loop autoPlay source={require("../../assets/animations/updating.json")} />
      <Spacer variant="top" size={2} />
      <Text variant="title">¡Actualización!</Text>
      <Spacer variant="top" />
      <Text style={{ textAlign: "center" }}>
        Estamos actualizando la app para poder brindarte todas las funcionalidades, solo tomará unos segundos. <Text variant="bold">Agradecemos tu espera.</Text>
      </Text>
      <Spacer variant="top" />
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
