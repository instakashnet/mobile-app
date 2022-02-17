import React from "react";
import styled from "styled-components/native";
import { HelperText } from "react-native-paper";

// COMPONENTS
import { AccountWrapper, AccountPicker } from "../accounts.styles";
import { Text } from "../../../../components/typography/text.component";
import { Link } from "../../../../components/typography/link.component";
import { Spacer } from "../../../../components/utils/spacer.component";

const FormGroup = styled.View`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

export const SelectAccount = ({ children, selected, label, error, onSelect }) => {
  return (
    <FormGroup>
      <AccountPicker>
        <Text>{label}</Text>
        <Spacer vartiant="bottom" />
        <AccountWrapper onPress={onSelect} error={error}>
          {children}
          <Link onPress={onSelect}>
            <Text variant="bold">{selected ? "cambiar" : "seleccionar"}</Text>
          </Link>
        </AccountWrapper>
      </AccountPicker>
      {!!error && (
        <HelperText style={{ textAlign: "left" }} type="error" visible>
          {error}
        </HelperText>
      )}
    </FormGroup>
  );
};
