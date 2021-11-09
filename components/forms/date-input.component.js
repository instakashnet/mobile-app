import React from "react";
import { DatePickerInput } from "react-native-paper-dates";
import styled from "styled-components/native";

const PickerInput = styled(DatePickerInput).attrs(({ theme }) => ({
  theme: { ...theme, colors: { primary: theme.colors.brand.primary, error: theme.colors.ui.error } },
  mode: "outlined",
  outlineColor: theme.colors.ui.border,
  inputMode: "start",
}))`
  width: 100%;
  background-color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.button};
  height: 45px;
`;

const FormGroup = styled.View`
  width: 100%;
  margin-top: ${({ theme }) => theme.space[2]};
`;

export const DateInput = ({ label, value, onChange }) => {
  return (
    <FormGroup>
      <PickerInput placeholder={label} locale="es" label={label} value={value} onChange={onChange} />
    </FormGroup>
  );
};
