import React from "react";
import { View, Alert } from "react-native";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount } from "../../../store/actions";

// ASSETS
import { bankLogos } from "../relative-paths/images";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Button } from "../../../components/UI/button.component";
import { AccountsWrapper, DetailsCard, DetailsWrapper, DetailsInfo, BankLogo, Line, Title } from "../components/accounts.styles";

export const AccountDetailsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch(),
    { account } = route.params,
    isProcessing = useSelector((state) => state.accountsReducer.isProcessing);

  const onDelete = () => {
    Alert.alert(
      "¿Estás seguro?",
      "Esta acción no puede ser revertida.",
      [
        {
          text: "Eliminar",
          onPress: () => dispatch(deleteAccount(account.id)),
          style: "cancel",
        },
        {
          text: "Regresar",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <SafeArea>
      <AccountsWrapper>
        <DetailsCard>
          <DetailsInfo>
            <BankLogo bankName={account.bank.name.toLowerCase()} source={bankLogos.find((icon) => icon.bankName === account.bank.name.toLowerCase()).uri} />
            <Spacer variant="left" />
            <View>
              <Title>{account.alias}</Title>
              <Text variant="bold">{account.accountNumber || account.cci}</Text>
              <Text>{account.thirdParty ? "Cuenta de terceros" : "Cuenta personal"}</Text>
              {account.cci ? <Text variant="bold">interbancaria</Text> : null}
            </View>
            <View style={{ marginLeft: "auto" }}>
              <Text variant="title">{account.currency.Symbol}</Text>
            </View>
          </DetailsInfo>
          <Spacer variant="vertical" size={5}>
            <Line />
          </Spacer>
          <DetailsWrapper>
            <View>
              <Text>Tipo de cuenta</Text>
              <Text variant="bold">{account.accType === "savings" ? "De ahorros" : "Corriente"}</Text>
            </View>
            <View>
              <Text style={{ textAlign: "right" }}>Moneda</Text>
              <Text variant="bold" style={{ textAlign: "right" }}>
                {account.currency.name}
              </Text>
            </View>
          </DetailsWrapper>
          <Spacer variant="top" size={2} />
          {account.thirdParty && (
            <DetailsWrapper>
              <View>
                <Text>Nombre</Text>
                <Text variant="bold">{account.thirdParty.name || account.thirdParty.razonSocial}</Text>
              </View>
              <View>
                <Text style={{ textAlign: "right" }}>Documento</Text>
                <Text style={{ textAlign: "right" }} variant="bold">
                  {account.thirdParty.documentType} {account.thirdParty.documentNumber}
                </Text>
              </View>
            </DetailsWrapper>
          )}
        </DetailsCard>
        <Spacer variant="top" size={6} />
        <Button icon="circle-edit-outline" contentStyle={{ flexDirection: "row-reverse" }} onPress={() => navigation.navigate("EditAccount", { account })}>
          Editar cuenta
        </Button>
        <Spacer variant="top" />
        <Button
          icon="trash-can"
          variant="error"
          loading={isProcessing}
          disabled={isProcessing}
          contentStyle={{ flexDirection: "row-reverse" }}
          style={{ borderColor: "red", borderWidth: 1 }}
          onPress={onDelete}
        >
          Eliminar cuenta
        </Button>
      </AccountsWrapper>
    </SafeArea>
  );
};
