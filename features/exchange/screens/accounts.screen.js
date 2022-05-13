import { useFocusEffect } from "@react-navigation/native";
// FORMIK
import { useFormik } from "formik";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../../components/forms/input.component";
import { Select } from "../../../components/forms/select.component";
import { Text } from "../../../components/typography/text.component";
import { Alert } from "../../../components/UI/alert.component";
import { Button } from "../../../components/UI/button.component";
import { SnackBar } from "../../../components/UI/snack.component";
// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { getData } from "../../../hooks/use-storage.hook";
// HELPERS
import { openURL, validateInterplaza } from "../../../shared/helpers/functions";
import { cancelOrder, clearExchangeError, continueOrder } from "../../../store/actions";
import { BankDescription, BankIcon } from "../components/accounts.styles";
// STYLE COMPONENTS
import { ExchangeForm, ExchangeScroll, StepsProgressWrapper } from "../components/exchange.styles";
import { SelectAccount } from "../components/forms/select-account.component";
import { HeaderProfile } from "../components/header-profile.component";
import { ProgressIndicator } from "../components/progress-indicator.component";
// ASSETS
import { bankIcons } from "../relative-paths/images";
import { accountsSchema } from "../validations/schemas";

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
      if (!order) return navigation.popToTop();

      return () => dispatch(clearExchangeError());
    }, [order])
  );

  useFocusEffect(
    useCallback(() => {
      const getSelectedData = async () => {
        try {
          const selectedBank = await getData("@selectedBank");
          const selectedAcc = await getData("@selectedAcc");

          if (selectedBank) {
            formik.setFieldTouched("bank_id", true);
            formik.setFieldValue("bank_id", selectedBank.id);
            setBankSelected(selectedBank);
          }
          if (selectedAcc) {
            formik.setFieldTouched("account_to_id", true);
            formik.setFieldValue("account_to_id", selectedAcc.id);
            setAccountSelected(selectedAcc);
            if (selectedAcc.bank.name.toLowerCase() === "interbank") setInterplaza(validateInterplaza(selectedAcc.accountNumber));
          }
        } catch (error) {
          Alert.alert("Error", error.message);
        }
      };

      getSelectedData();
    }, [formik.setFieldTouched])
  );

  // HANDLERS
  const onSelect = (type) => navigation.navigate("AccountSelect", { type, currencyToReceive: order.currencyReceivedId }),
    onCancelOrder = () => dispatch(cancelOrder("draft", order.id, "exchange")),
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
          <StepsProgressWrapper>
            <ProgressIndicator labels={["Selecciona", "Transfiere", "Confirma"]} currentPos={0} />
          </StepsProgressWrapper>
          <Spacer vartian="top" size={3} />
          <Text variant="title">Selecciona tu banco y cuenta</Text>
          <Spacer vartian="top" />
          <SelectAccount
            label="¿Desde que banco nos envias tu dinero?"
            error={!formik.touched.bank_id && formik.errors.bank_id}
            selected={!!bankSelected}
            onSelect={onSelect.bind(null, "bank")}
          >
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
          <SelectAccount
            label="¿En que cuenta recibirás tu cambio?"
            error={!formik.touched.account_to_id && formik.errors.account_to_id}
            selected={!!accountSelected}
            onSelect={onSelect.bind(null, "account")}
          >
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
