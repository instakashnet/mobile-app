import React, { useEffect, useState } from "react";
import { Snackbar } from "react-native-paper";
import styled from "styled-components/native";

// REDUX
import { useDispatch } from "react-redux";

import { Text } from "../typography/text.component";

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
  margin: ${({ theme }) => theme.space[4]};
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
      <Text variant="button" numberOfLines={3} style={{ color: "#FFF" }}>
        {children}
      </Text>
    </StyledSnackBar>
  );
};
