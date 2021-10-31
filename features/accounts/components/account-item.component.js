import React from "react";
import { View } from "react-native";

// ASSETS
import { bankLogos } from "../relative-paths/images";

// COMPONENTS
import { Text } from "../../../components/typography/text.component";
import { AccountCard, BankLogo } from "./accounts.styles";

export const AccountItem = ({ account, onPress }) => {
  return (
    <AccountCard onPress={onPress}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <BankLogo bankName={account.bank.name.toLowerCase()} source={bankLogos.find((icon) => icon.bankName === account.bank.name.toLowerCase()).uri} />
        <Text variant="bold">Ver cuenta</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "auto" }}>
        <Text>{account.alias}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text variant="subtitle">***{account.accountNumber.substring(account.accountNumber.length - 4, account.accountNumber.length)}</Text>
          <Text variant="title" style={{ marginLeft: 7 }}>
            {account.currency.Symbol}
          </Text>
        </View>
      </View>
    </AccountCard>
  );
};
