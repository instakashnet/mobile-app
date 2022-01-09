import React from "react";
import { FlatList, View } from "react-native";

// COMPONENTS
import { Text } from "../../../components/typography/text.component";
import { AccountItem } from "./account-item.component";

// STYLED COMPONENTS
import { AccountsListWrapper } from "./accounts.styles";

export const AccountsSection = ({ accounts, onDetails }) => {
  return (
    <AccountsListWrapper>
      <Text variant="subtitle" style={{ textAlign: "center" }}>{`Cuentas en ${accounts[0].currency.name} ${accounts[0].currency.Symbol}`}</Text>
      <FlatList horizontal data={accounts} style={{ height: 100 }} renderItem={({ item }) => <AccountItem account={item} onPress={() => onDetails(item)} />} />
    </AccountsListWrapper>
  );
};
