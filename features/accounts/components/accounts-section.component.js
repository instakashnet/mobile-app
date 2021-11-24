import React from "react";
import { FlatList, View } from "react-native";

// COMPONENTS
import { Text } from "../../../components/typography/text.component";
import { AccountItem } from "./account-item.component";
import { Spacer } from "../../../components/utils/spacer.component";

export const AccountsSection = ({ accounts, onDetails }) => {
  return (
    <View style={{ height: "43%", marginVertical: 5 }}>
      <Spacer variant="top" />
      <Text variant="title">{`Cuentas en ${accounts[0].currency.name} ${accounts[0].currency.Symbol}`}</Text>
      <FlatList horizontal data={accounts} renderItem={({ item }) => <AccountItem account={item} onPress={() => onDetails(item)} />} />
    </View>
  );
};
