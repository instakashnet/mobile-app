import React, { useCallback, useState } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { storeData } from "../../../hooks/use-storage.hook";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getBanks, getAccounts } from "../../../store/actions";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Button } from "../../../components/UI/button.component";
import { Loader } from "../../../components/UI/loader.component";
import { BanksList } from "../components/accounts/banks-list.component";
import { AccountsList } from "../components/accounts/accounts-list.component";
import { AddAccountButton } from "../components/accounts/add-account-button.component";

// STYLED COMPONENTS
import { ExchangeWrapper } from "../components/exchange.styles";

export const AccountSelectScreen = ({ route, navigation }) => {
  const dispatch = useDispatch(),
    { type, currencyToReceive } = route.params,
    { isLoading, banks } = useSelector((state) => state.accountsReducer),
    accounts = useSelector((state) => state.accountsReducer.accounts.filter((acc) => acc.currency.id === currencyToReceive)),
    [bankSelected, setBankSelected] = useState(null),
    [accountSelected, setAccountSelected] = useState(null);

  // EFFECT
  useFocusEffect(
    useCallback(() => {
      if (type === "bank") dispatch(getBanks());
      if (type === "account") dispatch(getAccounts("orders"));
    }, [dispatch, type])
  );

  // HANDLERS
  const onBankSelect = (bank) => setBankSelected(bank);
  const onAccountSelect = (acc) => setAccountSelected(acc);
  const onConfirm = async () => {
    try {
      type === "bank" ? await storeData("@selectedBank", bankSelected) : await storeData("@selectedAcc", accountSelected);
      navigation.navigate("Accounts");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeArea>
      {isLoading && <Loader />}
      <ExchangeWrapper>
        <Text variant="title">{type === "bank" ? "Selecciona un banco" : "Selecciona una cuenta"}</Text>
        <Text>Debes seleccionar {type === "bank" ? "el banco donde nos enviarás los fondos" : "la cuenta donde recibirás "}</Text>
        <Spacer variant="top" />
        {type === "bank" ? (
          <BanksList banks={banks} bankSelected={bankSelected} onSelect={onBankSelect} />
        ) : (
          <AccountsList accounts={accounts} accountSelected={accountSelected} onSelect={onAccountSelect} />
        )}
        <Spacer variant="top" />
        {type === "account" && <AddAccountButton onPress={() => navigation.navigate("AddAccount", { currencyToReceive })} />}
        <Spacer variant="top" />
        <Button onPress={onConfirm} disabled={(type === "bank" && !bankSelected) || (type === "account" && !accountSelected)}>
          Confirmar
        </Button>
      </ExchangeWrapper>
    </SafeArea>
  );
};
