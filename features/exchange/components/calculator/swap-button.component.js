import React from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";

const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  width: 55px;
  height: 55px;
  background-color: ${({ theme }) => theme.colors.buttons.active};
  border-radius: 50px;
  border-width: 5px;
  border-color: #fff;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 55px;
  left: 7%;
  z-index: 10;
`;

const ViewIcon = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const SwapButton = ({ onPress }) => {
  return (
    <Button onPress={onPress}>
      <ViewIcon>
        <Ionicons color="#676767" name="swap-vertical-outline" size={30} />
      </ViewIcon>
    </Button>
  );
};
