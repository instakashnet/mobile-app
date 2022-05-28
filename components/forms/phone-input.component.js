import React, { useState } from "react";
import styled from "styled-components/native";
import { HelperText } from "react-native-paper";
import Input from "react-native-phone-number-input";
import { Platform } from "react-native";
import { Spacer } from "../utils/spacer.component";

const StyledInput = styled(Input).attrs(({ theme, focused, error }) => {
  return {
    containerStyle: { width: "100%", alignSelf: "center" },
    codeTextStyle: { fontSize: 14, color: theme.colors.text.body },
    textContainerStyle: {
      borderWidth: focused || error ? 2 : 1,
      borderColor: error ? theme.colors.ui.error : focused ? theme.colors.brand.primary : theme.colors.ui.border,
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
      paddingVertical: Platform.OS === "android" ? 9 : 16,
      borderLeftWidth: 0,
      backgroundColor: "#fff",
    },
    textInputStyle: { fontSize: 16, fontFamily: theme.fonts.button, color: theme.colors.text.body },
    flagButtonStyle: {
      backgroundColor: "#FFF",
      borderWidth: focused || error ? 2 : 1,
      borderColor: error ? theme.colors.ui.error : focused ? theme.colors.brand.primary : theme.colors.ui.border,
      borderRightWidth: 0,
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
    },
  };
})``;

const InputGroup = styled.View`
  width: 100%;
  align-items: flex-start;
  margin-bottom: ${({ error, theme }) => (error ? theme.space[0] : theme.space[2])};
  margin-top: ${({ theme }) => theme.space[2]};
`;

export const PhoneInput = ({ onChange, onBlur, onChangeText, placeholder, value, error, ...rest }) => {
  const [focused, setFocused] = useState(false);

  const onBlurHandler = (e) => {
    onBlur(e);
    setFocused(false);
  };

  return (
    <InputGroup error={!!error}>
      <StyledInput
        defaultValue={value}
        layout="first"
        placeholder={placeholder}
        onChangeFormattedText={onChangeText}
        textInputProps={{ onFocus: () => setFocused(true), onChange, onBlur: onBlurHandler, keyboardType: "phone-pad" }}
        focused={focused}
        countryPickerProps={{ translation: "spa" }}
        error={!!error}
        {...rest}
      />
      {!!error && (
        <Spacer variant="left">
          <HelperText type="error" visible={!!error} style={{ alignSelf: "flex-start" }}>
            {error}
          </HelperText>
        </Spacer>
      )}
    </InputGroup>
  );
};
