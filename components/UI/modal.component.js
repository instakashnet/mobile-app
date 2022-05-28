import React from "react";
import { Modal as ModalComponent } from "react-native-paper";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { closeModal } from "../../store/actions";

const StyledModal = styled(ModalComponent).attrs({
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

export const Modal = ({ children, onClose, dismissable }) => {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state) => state.utilsReducer);

  // HANDLRES
  const onDismiss = () => dispatch(closeModal());

  return (
    <StyledModal visible={showModal} onDismiss={onClose ? onClose : onDismiss} dismissable={dismissable}>
      {children}
    </StyledModal>
  );
};
