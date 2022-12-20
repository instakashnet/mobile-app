import React, { useCallback } from "react";
import { Modal } from "react-native-paper";
import styled from "styled-components/native";

// COMPONENTS
import { Linking, Platform } from "react-native";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/actions";
import { Link } from "../typography/link.component";
import { Text } from "../typography/text.component";
import { Button } from "../UI/button.component";
import { Spacer } from "../utils/spacer.component";

export const StoreModal = ({ isVisible }) => {
  const dispatch = useDispatch();
  const goToStore = useCallback(
    () => Linking.openURL(Platform.OS === "android" ? "https://play.google.com/store/apps/details?id=net.instakash.app" : "https://apps.apple.com/pe/app/instakash/id1601561803"),
    [Linking, Platform]
  );

  return (
    <StyledModal dismissable={false} visible={isVisible}>
      <Spacer variant="top" size={2} />
      <Text variant="title">Nueva versión disponible</Text>
      <Spacer variant="top" />
      <Text style={{ textAlign: "center" }}>Hay una nueva versión disponible. Descargala para que puedas disfrutar de todas nuestras actualizaciones y mejoras.</Text>
      <Spacer variant="top" size={2} />
      <Button onPress={goToStore}>Ir a la store</Button>
      <Spacer variant="top" />
      <Link onPress={() => dispatch(closeModal())}>
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
