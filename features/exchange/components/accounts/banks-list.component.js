import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ASSETS
import { bankIcons } from "../../relative-paths/images";

// COMPONENTS
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { AccountSelect, Radio, BankIcon, BankDescription, AccountsFlatList } from "../../components/accounts.styles";

export const BanksList = ({ banks, bankSelected, onSelect }) => {
  return (
    <AccountsFlatList
      data={banks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: bank }) => (
        <TouchableOpacity style={styles.bankButton} onPress={() => onSelect(bank)}>
          <AccountSelect style={bankSelected && bankSelected.id === bank.id ? styles.selected : {}}>
            {bankSelected && bankSelected.id === bank.id ? <Ionicons name="checkmark-circle" color="#0D8284" size={25} style={styles.icon} /> : <Radio />}
            <Spacer variant="left" />
            <BankDescription>
              <BankIcon source={bankIcons.find((icon) => icon.bankName === bank.name.toLowerCase()).uri} />
              <Text variant="caption" style={styles.caption}>
                {bank.name}
              </Text>
            </BankDescription>
          </AccountSelect>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  bankButton: {
    marginVertical: 10,
  },
  selected: {
    borderColor: "#0D8284",
  },
  flag: {
    textTransform: "uppercase",
    marginLeft: "auto",
  },
  caption: {
    textTransform: "uppercase",
  },
  icon: {
    margin: 0,
  },
});
