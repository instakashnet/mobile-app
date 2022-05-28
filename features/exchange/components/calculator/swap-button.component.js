import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import styled from "styled-components";

const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  width: 55px;
  height: 55px;
  border-radius: 50px;
  border-width: 4px;
  border-color: #fff;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 55px;
  right: 10%;
  z-index: 10;
  background-color: #67be9f;
`;

const ViewIcon = styled.View`
  width: 75%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.buttons.active};
  border-radius: 50px;
  padding-vertical: 6px;
`;

export const SwapButton = ({ onPress }) => {
  return (
    <Button onPress={onPress}>
      <ViewIcon>
        <MaterialCommunityIcons color="#0D8284" name="swap-vertical-variant" size={23} />
      </ViewIcon>
    </Button>
  );
};
