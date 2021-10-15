import React from "react";

// COMPONENTS
import { AccountWrapper, AccountPicker } from "../accounts.styles";
import { Text } from "../../../../components/typography/text.component";
import { Link } from "../../../../components/typography/link.component";
import { Spacer } from "../../../../components/utils/spacer.component";

export const SelectAccount = ({ children, selected, label, onSelect }) => {
  return (
    <AccountPicker>
      <Text>{label}</Text>
      <Spacer vartiant="bottom" />
      <AccountWrapper onPress={onSelect}>
        {children}
        <Link onPress={onSelect}>
          <Text variant="bold">{selected ? "cambiar" : "seleccionar"}</Text>
        </Link>
      </AccountWrapper>
    </AccountPicker>
  );
};
