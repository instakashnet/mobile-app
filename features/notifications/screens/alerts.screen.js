import { useFormik } from "formik";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../../components/forms/input.component";
import { Text } from "../../../components/typography/text.component";
import { Button } from "../../../components/UI/button.component";
import { CustomSwitch } from "../../../components/UI/custom-switch.component";
import { Loader } from "../../../components/UI/loader.component";
import { KeyboardScrollAware } from "../../../components/utils/keyboard-scroll.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { setNotificationRates } from "../../../store/actions";
import { Header, InputWrapper, NotificationWrapper } from "../components/notifications.styles";

export const ExchangeAlertsScreen = () => {
  const dispatch = useDispatch(),
    { isLoading, notifications } = useSelector((state) => state.notificationsReducer),
    formik = useFormik({
      initialValues: { isRateSell: false, isRateBuy: false, rateSell: "0.000", rateBuy: "0.000" },
      onSubmit: (values) => dispatch(setNotificationRates(values)),
    });

  useEffect(() => {
    if (notifications.length > 0) {
      let sellNotif = notifications.find((n) => n.type === "rateSell"),
        buyNotif = notifications.find((n) => n.type === "rateBuy");

      if (sellNotif.amount) {
        formik.setFieldValue("isRateSell", sellNotif.enabled);
        formik.setFieldValue("rateSell", Number(sellNotif.amount).toFixed(3));
      }
      if (buyNotif.amount) {
        formik.setFieldValue("isRateBuy", buyNotif.enabled);
        formik.setFieldValue("rateBuy", Number(buyNotif.amount).toFixed(3));
      }
    }
  }, [notifications, formik.setFieldValue]);

  return (
    <SafeArea>
      {isLoading && <Loader />}
      <KeyboardScrollAware>
        <Header>
          <Text style={{ color: "#FFF" }}>Utiliza las alertas de tipo de cambio para saber cuando el dolar sube o baja a tu favor. Coloca tus valores, activalas y guarda.</Text>
        </Header>
        <Spacer variant="top" size={5} />
        <NotificationWrapper>
          <View style={{ flex: 0.9 }}>
            <Text>
              Alerta cuando la <Text variant="bold">COMPRA</Text> esté por encima de
            </Text>
          </View>
          <CustomSwitch enabled={formik.values.isRateBuy} onToggle={() => formik.setFieldValue("isRateBuy", !formik.values.isRateBuy)} />
        </NotificationWrapper>
        <Spacer variant="top" />
        <InputWrapper>
          <Input name="rateBuy" label="Ingresa el precio de compra" onChange={formik.handleChange("rateBuy")} keyboardType="decimal-pad" value={formik.values.rateBuy} />
        </InputWrapper>
        <Spacer variant="top" size={5} />
        <NotificationWrapper>
          <View style={{ flex: 0.9 }}>
            <Text>
              Alerta cuando la <Text variant="bold">VENTA</Text> esté por debajo de
            </Text>
          </View>
          <CustomSwitch enabled={formik.values.isRateSell} onToggle={() => formik.setFieldValue("isRateSell", !formik.values.isRateSell)} />
        </NotificationWrapper>
        <Spacer variant="top" />
        <InputWrapper>
          <Input name="rateSell" label="Ingresa el precio de venta" onChange={formik.handleChange("rateSell")} keyboardType="decimal-pad" value={formik.values.rateSell} />
        </InputWrapper>
        <Spacer variant="top" size={3} />
        <Button onPress={formik.handleSubmit}>Guardar alertas</Button>
      </KeyboardScrollAware>
    </SafeArea>
  );
};
