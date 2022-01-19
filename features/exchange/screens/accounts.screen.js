import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { getData } from "../../../hooks/use-storage.hook";
import { useFocusEffect } from "@react-navigation/native";

// FORMIK
import { useFormik } from "formik";
import { accountsSchema } from "../validations/schemas";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { cancelOrder, continueOrder, clearExchangeError } from "../../../store/actions";

// HELPERS
import { openURL, validateInterplaza } from "../../../shared/helpers/functions";

// ASSETS
import { bankIcons } from "../relative-paths/images";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Select } from "../../../components/forms/select.component";
import { Input } from "../../../components/forms/input.component";
import { Alert } from "../../../components/UI/alert.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { SelectAccount } from "../components/forms/select-account.component";
import { Button } from "../../../components/UI/button.component";
import { HeaderProfile } from "../components/header-profile.component";
import { SnackBar } from "../../../components/UI/snack.component";

// STYLE COMPONENTS
import { ExchangeScroll, ExchangeForm } from "../components/exchange.styles";
import { BankDescription, BankIcon } from "../components/accounts.styles";

export const AccountsScreen = ({ navigation }) => {
  // CUSTOM HOOKS && VARIABLES
  const dispatch = useDispatch(),
    { order, isProcessing, coupon, exchangeError } = useSelector((state) => state.exchangeReducer),
    profile = useSelector((state) => state.profileReducer.profile),
    [bankSelected, setBankSelected] = useState(null),
    [accountSelected, setAccountSelected] = useState(null),
    [interplaza, setInterplaza] = useState(false),
    [fundsInput, setFundsInput] = useState(false),
    fundsOptions = [
      { label: "Ahorros", value: "ahorros" },
      {
        label: "Alquiler de bienes inmuebles",
        value: "alquiler de bienes inmuebles",
      },
      {
        label: "Alquiler de bienes muebles",
        value: "alquiler de bienes muebles",
      },
      { label: "Venta de bienes inmuebles", value: "venta de bienes inmuebles" },
      { label: "Venta de bienes muebles", value: "venta de bienes muebles" },
      { label: "Donación o sorteo", value: "donación o sorteo" },
      { label: "Trabajo independiente", value: "trabajo independiente" },
      { label: "Regalía", value: "regalía" },
      { label: "Préstamos", value: "préstamos" },
      { label: "Otros", value: "otros" },
    ],
    formik = useFormik({
      initialValues: {
        bank_id: bankSelected ? bankSelected.id : "",
        account_to_id: accountSelected ? accountSelected.id : "",
        funds_origin: "",
        funds_input: "",
        couponName: coupon ? coupon.name : null,
        origin: (order.currencyReceivedId === 1 && order.amountSent >= 4000) || (order.currencyReceivedId === 2 && order.amountSent >= 1000),
        kashApplied: "no",
        kashUsed: "",
      },
      enableReinitialize: true,
      validationSchema: accountsSchema,
      onSubmit: (values) => dispatch(continueOrder(values, order.id)),
    });

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      if (!order) navigation.popToTop();

      return () => dispatch(clearExchangeError());
    }, [order])
  );

  useFocusEffect(
    useCallback(() => {
      const getSelectedData = async () => {
        try {
          const selectedBank = await getData("@selectedBank");
          const selectedAcc = await getData("@selectedAcc");

          if (selectedBank) setBankSelected(selectedBank);
          if (selectedAcc) {
            setAccountSelected(selectedAcc);
            if (selectedAcc.bank.name.toLowerCase() === "interbank") setInterplaza(validateInterplaza(selectedAcc.accountNumber));
          }
        } catch (error) {
          Alert.alert("Error", error.message);
        }
      };

      getSelectedData();
    }, [])
  );

  // HANDLERS
  const onSelect = (type) => navigation.navigate("AccountSelect", { type, currencyToReceive: order.currencyReceivedId }),
    onCancelOrder = () => dispatch(cancelOrder("draft", order.id)),
    onFundsHandler = (name, value) => {
      if (value === "otros") {
        setFundsInput(true);
      } else {
        setFundsInput(false);
        formik.setFieldValue("funds_input", "");
      }

      formik.setFieldValue(name, value);
    };

  return (
    <SafeArea>
      <ExchangeScroll>
        {profile && <HeaderProfile profile={profile} screen="accounts" />}
        <ExchangeForm>
          <Spacer variant="top" size={2} />
          <Text variant="title">Completa la información</Text>
          <Text style={{ textAlign: "center" }}>Debes seleccionar el banco donde envias y la cuenta donde vas a recibir.</Text>
          <Spacer vartian="top" size={3} />
          <SelectAccount label="¿Desde que banco nos envias tu dinero?" selected={!!bankSelected} onSelect={onSelect.bind(null, "bank")}>
            {bankSelected ? (
              <BankDescription>
                <BankIcon bankName={bankSelected.name.toLowerCase()} source={bankIcons.find((icon) => icon.bankName === bankSelected.name.toLowerCase()).uri} />
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
                <BankIcon bankName={accountSelected.bank.name.toLowerCase()} source={bankIcons.find((icon) => icon.bankName === accountSelected.bank.name.toLowerCase()).uri} />
                <View>
                  <Text variant="bold">{accountSelected.alias}</Text>
                  <Text variant="button">{accountSelected.accountNumber || accountSelected.cci}</Text>
                </View>
              </BankDescription>
            ) : (
              <Text variant="body">Selecciona una cuenta</Text>
            )}
          </SelectAccount>
          <Spacer vartian="top" size={2} />
          {formik.values.origin && (
            <Select
              name="funds_origin"
              error={formik.touched.funds_origin && formik.errors.funds_origin}
              label="Origen de los fondos"
              value={formik.values.funds_origin}
              options={fundsOptions}
              onChange={onFundsHandler}
            />
          )}
          {fundsInput && (
            <Input
              name="funds_input"
              value={formik.values.funds_input}
              label="Escribe el origen de tus fondos"
              error={formik.touched.funds_input && formik.errors.funds_input}
              onChange={formik.handleChange("funds_input")}
            />
          )}
          {accountSelected && interplaza && (
            <SnackBar type="warning">
              Las transferencias a cuentas Interbank interplaza acarrean comisión. Visita nuestros{" "}
              <Text variant="underline" onPress={() => openURL("https://instakash.net/terminos-y-condiciones")}>
                Términos y condiciones
              </Text>{" "}
              y conoce más.
            </SnackBar>
          )}
          {bankSelected && accountSelected && (!bankSelected.active || !accountSelected.bank.active) && (
            <SnackBar type="warning">
              Las operaciones interbancarias pueden demorar hasta 48 horas y acarrean comisiones. Visita nuestros{" "}
              <Text variant="underline" onPress={() => openURL("https://instakash.net/terminos-y-condiciones")}>
                Términos y condiciones
              </Text>{" "}
              y conoce más.
            </SnackBar>
          )}

          <Button onPress={formik.handleSubmit} loading={isProcessing} disabled={!formik.isValid || isProcessing}>
            Continuar
          </Button>
          <Button variant="secondary" onPress={onCancelOrder}>
            Regresar
          </Button>
        </ExchangeForm>
      </ExchangeScroll>
      <Alert type="error" onClose={clearExchangeError} visible={!!exchangeError}>
        {exchangeError}
      </Alert>
    </SafeArea>
  );
};
