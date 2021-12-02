import React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { HelperText } from "react-native-paper";
import styled from "styled-components/native";
import { theme } from "../../theme";

const FormGroup = styled.View`
  width: 100%;
  margin-top: ${({ theme }) => theme.space[2]};
  margin-bottom: ${({ theme, error }) => (error ? theme.space[0] : theme.space[3])};
  position: relative;
`;

const PickerIcon = styled(Ionicons).attrs({
  name: "ios-caret-down-sharp",
  size: 13,
  color: "black",
})`
  position: absolute;
  right: 13px;
  top: 23px;
  z-index: 10;
`;

export const Select = ({ label, value, onChange, name, options, hasIcon, style, error, isFlex, ...rest }) => {
  // HANDLERS
  const getIcon = (options) => {
    if (value && hasIcon) {
      const Icon = options.find((o) => o.value === value).icon;
      return <Icon />;
    } else return null;
  };

  return (
    <FormGroup error={!!error}>
      <PickerIcon />
      <RNPickerSelect
        placeholder={{ label }}
        style={{
          placeholder: pickerStyles.placeholder,
          inputIOS: {
            ...pickerStyles.inputIOS,
            ...style,
            paddingLeft: hasIcon ? 35 : 10,
            paddingRight: 10,
            borderColor: error ? theme.colors.ui.error : theme.colors.ui.border,
            borderWidth: error ? 2 : 1,
          },
          inputAndroid: {
            ...pickerStyles.inputAndroid,
            ...style,
            paddingLeft: hasIcon ? 35 : 10,
            paddingRight: 10,
            borderColor: error ? theme.colors.ui.error : theme.colors.ui.border,
            borderWidth: error ? 2 : 1,
          },
          iconContainer: { left: 9, top: "33%" },
        }}
        useNativeAndroidPickerStyle={false}
        value={value}
        items={options.map((o) => ({
          label: o.label,
          value: o.value,
        }))}
        onValueChange={(value) => onChange(name, value)}
        Icon={() => getIcon(options)}
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
    paddingLeft: 10,
  },
  inputIOS: {
    fontSize: 14,
    paddingVertical: 16,
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginTop: 5,
    backgroundColor: "#FFF",
  },
  inputAndroid: {
    fontSize: 14,
    paddingVertical: 10,
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginTop: 5,
    backgroundColor: "#FFF",
  },
});
