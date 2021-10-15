import React from "react";
import { Modal as ModalComponent } from "react-native-paper";
import styled from "styled-components/native";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/actions";

const StyledModal = styled(ModalComponent).attrs(({ theme }) => ({
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
}))``;

export const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state) => state.utilsReducer);

  // HANDLRES
  const onDismiss = () => dispatch(closeModal());

  return (
    <StyledModal visible={showModal} onDismiss={onDismiss}>
      {children}
    </StyledModal>
  );
};
