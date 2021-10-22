import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

DropDownPicker.setListMode("SCROLLVIEW");

const Select = styled(DropDownPicker).attrs(({ theme }) => ({
  dropDownContainerStyle: {
    borderColor: theme.colors.ui.border,
    borderRadius: 4,
    zIndex: 1,
  },
}))`
  border-color: ${({ theme }) => theme.colors.ui.border};
  border-radius: 4px;
`;

const FormGroup = styled.View`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.space[3]};
  z-index: 2;
`;

export const IconSelect = ({ options, value, error, name, onSelect, placeholder }) => {
  const [open, setOpen] = useState(false);

  return (
    <FormGroup>
      <Select
        open={open}
        ArrowUpIconComponent={({ style }) => <Ionicons size={13} style={style} name="ios-caret-up-sharp" />}
        ArrowDownIconComponent={({ style }) => <Ionicons size={13} style={style} name="ios-caret-down-sharp" />}
        value={value}
        items={options}
        setOpen={setOpen}
        setValue={(getValue) => onSelect(name, getValue())}
        placeholder={placeholder}
      />
    </FormGroup>
  );
};
