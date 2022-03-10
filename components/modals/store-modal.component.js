import { Modal } from "react-native-paper";
import React from "react";
import styled from "styled-components/native";

// COMPONENTS
import { Text } from "../typography/text.component";
import { Spacer } from "../utils/spacer.component";
import { Button } from "../UI/button.component";
import { Link } from "../typography/link.component";

export const StoreModal = ({ isVisible, onUpdate, closeModal }) => {
  return (
    <StyledModal dismissable={false} visible={isVisible}>
      <Spacer variant="top" size={2} />
      <Text variant="title">Nueva versión</Text>
      <Spacer variant="top" />
      <Text style={{ textAlign: "center" }}>Hay una nueva versión disponible. Descargala para que puedas disfrutar de todas nuestras actualizaciones y mejoras.</Text>
      <Spacer variant="top" size={2} />
      <Button onPress={onUpdate}>Actualizar</Button>
      <Spacer variant="top" />
      <Link onPress={closeModal}>
        <Text variant="bold" style={{ fontSize: 14 }}>
          Más tarde
        </Text>
      </Link>
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
