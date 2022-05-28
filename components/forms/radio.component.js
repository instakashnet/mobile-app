import React from "react";
import { RadioButton } from "react-native-paper";
import styled from "styled-components/native";

export const RadioGroup = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Radio = ({ value, children, onPress, status }) => {
  return (
    <RadioGroup>
      <RadioButton.Android value={value} onPress={onPress} status={status} />
      {children}
    </RadioGroup>
  );
};
