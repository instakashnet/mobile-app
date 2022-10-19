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
      <View>
        <BankLogo bankName={account.bank.name.toLowerCase()} source={bankLogos.find((icon) => icon.bankName === account.bank.name.toLowerCase()).uri} />
        <Text>{account.alias}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "auto" }}>
        <View>
          <Text variant="bold">{account.thirdParty ? "De terceros" : account.joint ? "Mancomunada" : ""}</Text>
        </View>
        <Text variant="bold">
          ***
          {account.accountNumber
            ? account.accountNumber.substring(account.accountNumber.length - 4, account.accountNumber.length)
            : account.cci.substring(account.cci.length - 4, account.cci.length)}
        </Text>
      </View>
    </AccountCard>
  );
};
