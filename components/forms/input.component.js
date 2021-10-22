import React from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { TextInput, HelperText } from "react-native-paper";
import { theme } from "../../theme";

const StyledInput = styled(TextInput).attrs(({ theme }) => ({
  theme: { ...theme, colors: { primary: theme.colors.brand.primary, error: theme.colors.ui.error } },
  mode: "outlined",
  outlineColor: theme.colors.ui.border,
}))`
  width: 100%;
  padding-vertical: 0px;
  height: 45px;
  font-size: ${({ theme }) => theme.fontSizes.button};
  background-color: #fff;
`;

const FormGroup = styled.View`
  width: 100%;
  margin-top: ${({ theme }) => theme.space[2]};
  margin-bottom: ${({ theme, error }) => (error ? theme.space[0] : theme.space[3])};
`;

export const Input = ({ name, onChange, right, infoText, iconName, onPress, error, isFlex, ...rest }) => {
  const inputProps = {
    name,
    onChangeText: onChange,
    ...rest,
    error: !!error,
  };

  const setIconColor = (focused) => {
    if (!!error) return theme.colors.ui.error;
    return focused ? theme.colors.brand.primary : theme.colors.ui.border;
  };

  const Icon = <TextInput.Icon style={iconStyles} color={setIconColor} name={iconName} onPress={onPress} />;
  if (right) inputProps.right = Icon;

  return (
    <FormGroup error={!!error || infoText}>
      <StyledInput {...inputProps} {...rest} />
      {(!!error || infoText) && !isFlex && (
        <HelperText style={{ textAlign: "left" }} type={!!error ? "error" : "info"} visible>
          {error ? error : infoText}
        </HelperText>
      )}
    </FormGroup>
  );
};

const iconStyles = StyleSheet.create({
  top: 5,
});
