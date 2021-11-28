import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity, Dimensions } from "react-native";
import { Checkbox as PaperCheckbox } from "react-native-paper";
import { theme } from "../../theme";

const CheckboxGroup = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const TouchableCheckbox = styled(TouchableOpacity)`
  width: ${Dimensions.get("window").width / 1.26}px;
  align-self: flex-start;
`;

export const Checkbox = ({ onPress, children, status }) => {
  return (
    <TouchableCheckbox onPress={onPress}>
      <CheckboxGroup>
        <PaperCheckbox.Android status={status ? "checked" : "unchecked"} color={theme.colors.brand.primary} />
        {children}
      </CheckboxGroup>
    </TouchableCheckbox>
  );
};
