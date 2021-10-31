import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// ASSETS
import { bankLogos } from "../relative-paths/images";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Button } from "../../../components/UI/button.component";
import { AccountsWrapper, DetailsCard, BankLogo, Line, Title } from "../components/accounts.styles";

export const AccountDetails = ({ route }) => {
  const { account } = route.params;
  console.log(account);

  return (
    <SafeArea>
      <AccountsWrapper>
        <DetailsCard>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <BankLogo bankName={account.bank.name.toLowerCase()} source={bankLogos.find((icon) => icon.bankName === account.bank.name.toLowerCase()).uri} />
            <Spacer variant="left" />
            <View>
              <Title>{account.alias}</Title>
              <Text variant="bold">{account.accountNumber || account.cci}</Text>
              <Text>{account.thirParty ? "Cuenta de terceros" : "Cuenta personal"}</Text>
            </View>
            <View style={{ marginLeft: "auto" }}>
              <Text variant="title">{account.currency.Symbol}</Text>
            </View>
          </View>
          <Spacer variant="vertical" size={5}>
            <Line />
          </Spacer>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View>
              <Text>Tipo de cuenta</Text>
              <Text variant="bold">{account.accType === "savings" ? "De ahorros" : "Corriente"}</Text>
            </View>
            <View>
              <Text>Moneda</Text>
              <Text variant="bold">{account.currency.name}</Text>
            </View>
          </View>
        </DetailsCard>
        <Spacer variant="top" size={6} />
        <Button icon="circle-edit-outline" contentStyle={{ flexDirection: "row-reverse" }}>
          Editar cuenta
        </Button>
        <Spacer variant="top" />
        <Button icon="trash-can" variant="secondary" contentStyle={{ flexDirection: "row-reverse" }} style={{ borderColor: "red", borderWidth: 2 }}>
          Eliminar cuenta
        </Button>
      </AccountsWrapper>
    </SafeArea>
  );
};
