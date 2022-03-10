import React, { useState } from "react";
import { TextInput, HelperText, TouchableRipple } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { FontAwesome5 } from "@expo/vector-icons";

import styled from "styled-components/native";

const StyledInput = styled(TextInput).attrs(({ theme }) => ({
  theme: { ...theme, colors: { primary: theme.colors.brand.primary, error: theme.colors.ui.error } },
  mode: "outlined",
  outlineColor: theme.colors.ui.border,
  dense: true,
  allowFontScaling: false,
}))`
  width: 100%;
  text-align-vertical: center;
  height: 50px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  background-color: #fff;
`;

const FormGroup = styled.View`
  width: 100%;
  margin-top: ${({ theme }) => theme.space[2]};
  margin-bottom: ${({ theme, error }) => (error ? theme.space[0] : theme.space[3])};
  position: relative;
`;

const CalendarButton = styled(TouchableRipple)`
  position: absolute;
  right: 5px;
  top: 25%;
  padding-horizontal: 9px;
  padding-vertical: 6px;
  border-radius: 15px;
`;

export const DateInput = ({ label, value, onChange, error, ...rest }) => {
  const [pickerVisible, setPickerVisible] = useState(false);

  // HANDLERS

  const handleConfirm = (date) => {
    onChange(date);
    setPickerVisible(false);
  };

  return (
    <FormGroup>
      <StyledInput
        variant="outlined"
        showSoftInputOnFocus={false}
        keyboardType="numeric"
        placeholder={label}
        value={value ? format(new Date(value), "dd/MM/yyyy") : ""}
        onFocus={() => setPickerVisible(true)}
      />
      <CalendarButton onPress={() => setPickerVisible(true)}>
        <FontAwesome5 name="calendar-alt" size={20} color="#676767" />
      </CalendarButton>
      {!!error && (
        <HelperText style={{ textAlign: "left" }} type="error" visible>
          {error}
        </HelperText>
      )}
      <DateTimePickerModal
        locale="es_ES"
        isVisible={pickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setPickerVisible(false)}
        date={value ? new Date(value) : new Date()}
        {...rest}
      />
    </FormGroup>
  );
};
