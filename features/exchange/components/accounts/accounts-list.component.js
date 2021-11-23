import React from "react";
import { StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ASSETS
import { bankIcons } from "../../relative-paths/images";

// COMPONENTS
import { AccountsFlatList, AccountSelect, BankIcon, Radio } from "../accounts.styles";
import { Spacer } from "../../../../components/utils/spacer.component";
import { Text } from "../../../../components/typography/text.component";

export const AccountsList = ({ accounts, accountSelected, onSelect }) => {
  const TouchabledButton = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <AccountsFlatList
      data={accounts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: account }) => (
        <TouchabledButton style={styles.accountButton} onPress={() => onSelect(account)}>
          <AccountSelect style={accountSelected && accountSelected.id === account.id ? styles.selected : {}}>
            {accountSelected && accountSelected.id === account.id ? <Ionicons name="checkmark-circle" color="#0D8284" size={25} style={styles.icon} /> : <Radio />}
            <Spacer variant="left" />
            <BankIcon source={bankIcons.find((icon) => icon.bankName === account.bank.name.toLowerCase()).uri} />
            <View>
              <Text variant="button">{account.alias}</Text>
              <Text variant="button">{account.accountNumber || account.cci}</Text>
            </View>
            <Text variant="subtitle" style={styles.flag}>
              {account.currency.Symbol.toUpperCase()}
            </Text>
          </AccountSelect>
        </TouchabledButton>
      )}
    />
  );
};

const styles = StyleSheet.create({
  accountButton: {
    marginVertical: 10,
  },
  selected: {
    borderColor: "#0D8284",
  },
  flag: {
    marginLeft: "auto",
  },
  icon: {
    margin: 0,
  },
});
