import React, { useEffect, useState } from "react";
import { Snackbar } from "react-native-paper";
import styled from "styled-components/native";

// REDUX
import { useDispatch } from "react-redux";

const StyledSnackBar = styled(Snackbar).attrs(({ theme, action }) => ({
  action: {
    ...action,
    labelStyle: {
      color: "#fff",
      fontFamily: theme.fonts.button,
    },
  },
}))`
  background-color: ${({ theme, type }) => theme.colors.ui[type]};
  font-size: ${({ theme }) => theme.fontSizes.body};
`;

export const Alert = ({ children, type, visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(visible);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  // HANDLERS
  const onDismiss = () => {
    dispatch(onClose());
    setIsVisible(false);
  };

  return (
    <StyledSnackBar visible={isVisible} action={{ label: "Cerrar" }} type={type} onDismiss={onDismiss}>
      {children}
    </StyledSnackBar>
  );
};
