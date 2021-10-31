import React from "react";
import { FlatList } from "react-native";

// COMPONENTS
import { Text } from "../../../components/typography/text.component";
import { AccountItem } from "./account-item.component";
import { Spacer } from "../../../components/utils/spacer.component";

export const AccountsSection = ({ accounts, onDetails }) => {
  return (
    <>
      <Spacer variant="top" />
      <Text variant="title">{`Cuentas en ${accounts[0].currency.name} ${accounts[0].currency.Symbol}`}</Text>
      <FlatList horizontal contentContainerStyle={{ marginTop: 10 }} data={accounts} renderItem={({ item }) => <AccountItem account={item} onPress={() => onDetails(item)} />} />
    </>
  );
};
