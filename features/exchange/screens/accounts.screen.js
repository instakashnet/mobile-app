import React, { useCallback, useState, useEffect } from "react";
import { useFormik } from "formik";
import { View, Alert } from "react-native";
import { getData } from "../../../hooks/use-storage.hook";
import { useFocusEffect } from "@react-navigation/native";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { cancelOrder, completeOrder } from "../../../store/actions";

// ASSETS
import { bankIcons } from "../relative-paths/images";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { SelectAccount } from "../components/forms/select-account.component";
import { Button } from "../../../components/UI/button.component";
import { ExchangeWrapper } from "../components/exchange.styles";
import { BankDescription, BankIcon } from "../components/accounts.styles";

export const AccountsScreen = ({ navigation }) => {
  // CUSTOM HOOKS && VARIABLES
  const dispatch = useDispatch(),
    { order, isProcessing } = useSelector((state) => state.exchangeReducer),
    [bankSelected, setBankSelected] = useState(null),
    [accountSelected, setAccountSelected] = useState(null),
    formik = useFormik({
      initialValues: {
        bank_id: bankSelected ? bankSelected.id : "",
        account_to_id: accountSelected ? accountSelected.id : "",
        funds_origin: "",
        couponName: null,
        kashApplied: "no",
        kashUsed: "",
      },
      enableReinitialize: true,
      onSubmit: (values) => dispatch(completeOrder(values, order.id)),
    });

  // EFFECTS
  useEffect(() => {
    if (!order) navigation.popToTop();
  }, [order]);

  useFocusEffect(
    useCallback(() => {
      const getSelectedData = async () => {
        try {
          const selectedBank = await getData("@selectedBank");
          const selectedAcc = await getData("@selectedAcc");

          if (selectedBank) setBankSelected(selectedBank);
          if (selectedAcc) setAccountSelected(selectedAcc);
        } catch (error) {
          Alert.alert("Error", error.message);
        }
      };

      getSelectedData();
    }, [])
  );

  // HANDLERS
  const onSelect = (type) => navigation.navigate("AccountSelect", { type, currencyToReceive: order.currencyReceivedId }),
    onCancelOrder = () => dispatch(cancelOrder("draft", order.id));

  return (
    <SafeArea>
      <ExchangeWrapper>
        <Text variant="title">Completa la información</Text>
        <Text style={{ textAlign: "center" }}>Debes seleccionar el banco donde envias y la cuando donde vas a recibir.</Text>
        <Spacer vartian="top" size={3} />
        <SelectAccount label="¿Desde que banco nos envias tu dinero?" selected={!!bankSelected} onSelect={onSelect.bind(null, "bank")}>
          {bankSelected ? (
            <BankDescription>
              <BankIcon source={bankIcons.find((icon) => icon.bankName === bankSelected.name.toLowerCase()).uri} />
              <Text variant="bold" style={{ textTransform: "uppercase" }}>
                {bankSelected.name}
              </Text>
            </BankDescription>
          ) : (
            <Text variant="body">Selecciona un banco</Text>
          )}
        </SelectAccount>
        <Spacer vartian="top" size={3} />
        <SelectAccount label="¿En que cuenta recibirás tu cambio?" selected={!!accountSelected} onSelect={onSelect.bind(null, "account")}>
          {accountSelected ? (
            <BankDescription>
              <BankIcon source={bankIcons.find((icon) => icon.bankName === accountSelected.bank.name.toLowerCase()).uri} />
              <View>
                <Text variant="button">{accountSelected.alias}</Text>
                <Text variant="button">{accountSelected.accountNumber}</Text>
              </View>
            </BankDescription>
          ) : (
            <Text variant="body">Selecciona una cuenta</Text>
          )}
        </SelectAccount>
        <Spacer vartian="top" size={2} />
        <Button onPress={formik.handleSubmit} loading={isProcessing} disabled={!formik.isValid || isProcessing}>
          Continuar
        </Button>
        <Button variant="secondary" onPress={onCancelOrder}>
          Regresar
        </Button>
      </ExchangeWrapper>
    </SafeArea>
  );
};
