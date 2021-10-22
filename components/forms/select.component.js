import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { HelperText } from "react-native-paper";
import styled from "styled-components/native";
import { theme } from "../../theme";

const FormGroup = styled.View`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.space[2]};
  position: relative;
`;

const PickerIcon = styled(Ionicons).attrs({
  name: "ios-caret-down-sharp",
  size: 13,
  color: "black",
})`
  position: absolute;
  right: 17px;
  top: 18px;
  z-index: 10;
`;

export const Select = ({ label, value, onChange, name, options, style, error, isFlex, ...rest }) => {
  return (
    <FormGroup error={!!error}>
      <PickerIcon />
      <RNPickerSelect
        placeholder={{ label }}
        style={{
          placeholder: pickerStyles.placeholder,
          inputIOS: { ...pickerStyles.inputIOS, ...style, borderColor: error ? theme.colors.ui.error : theme.colors.ui.border, borderWidth: error ? 2 : 1 },
          inputAndroid: { ...pickerStyles.inputAndroid, ...style, borderColor: error ? theme.colors.ui.error : theme.colors.ui.border, borderWidth: error ? 2 : 1 },
        }}
        useNativeAndroidPickerStyle={false}
        value={value}
        items={options}
        onValueChange={(value) => onChange(name, value)}
        {...rest}
      />
      {!!error && !isFlex && (
        <HelperText style={{ textAlign: "left" }} type="error" visible={!!error}>
          {error}
        </HelperText>
      )}
    </FormGroup>
  );
};

const pickerStyles = StyleSheet.create({
  placeholder: {
    color: theme.colors.text.body,
  },
  inputIOS: {
    fontSize: 14,
    paddingVertical: 13,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginTop: 5,
    backgroundColor: "#FFF",
  },
  inputAndroid: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginTop: 5,
    backgroundColor: "#FFF",
  },
});
