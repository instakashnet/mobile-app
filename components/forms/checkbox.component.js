import React from "react";
import { TouchableOpacity } from "react-native";
import { Checkbox as PaperCheckbox } from "react-native-paper";
import styled from "styled-components/native";
import { theme } from "../../theme";

const CheckboxGroup = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TouchableCheckbox = styled(TouchableOpacity)`
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
