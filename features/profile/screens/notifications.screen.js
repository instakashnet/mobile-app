import { useFocusEffect } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { getPermissionsAsync } from "expo-notifications";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "../../../components/typography/text.component";
import { Alert } from "../../../components/UI/alert.component";
import { Button } from "../../../components/UI/button.component";
import { CustomSwitch } from "../../../components/UI/custom-switch.component";
import { Loader } from "../../../components/UI/loader.component";
import { KeyboardView } from "../../../components/utils/keyboard-view.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { clearNotificationsError, getNotifications, setNotificationRates, toggleNotification } from "../../../store/actions";
import { HeaderProfile, NotificationLabel, NotificationWrapper, ProfileScroll } from "../components/profile.styles";

export const NotificationsScreen = () => {
  const dispatch = useDispatch(),
    [notificationsState, setNotificationsState] = useState([]),
    [buyAlert, setBuyAlert] = useState(0),
    [sellAlert, setSellAlert] = useState(0),
    [permissions, hasPermissions] = useState(false),
    { isLoading, notifications, notificationsError } = useSelector((state) => state.notificationsReducer),
    appState = useRef(AppState.currentState);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = async (nextAppState) => {
    if (appState.current.match(/inactive|background/) && nextAppState === "active") {
      const { status: existingStatus } = await getPermissionsAsync();
      hasPermissions(existingStatus === "granted");
    }

    appState.current = nextAppState;
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getNotifications());
    }, [dispatch])
  );

  useEffect(() => {
    (async () => {
      const { status: existingStatus } = await getPermissionsAsync();
      hasPermissions(existingStatus === "granted");
    })();
  }, []);

  useEffect(() => {
    if (notifications.length > 0) {
      setNotificationsState(
        notifications.map((notif) => ({
          type: notif.type,
          enabled: notif.enabled,
        }))
      );

      let buyRate = notifications.find((notif) => notif.type === "rateBuy"),
        sellRate = notifications.find((notif) => notif.type === "rateSell");

      setBuyAlert(buyRate?.amount || 0);
      setSellAlert(sellRate?.amount || 0);
    }
  }, [notifications]);

  const handleToggleNotification = (type, enabled) => {
    dispatch(toggleNotification(type, enabled));
    const filteredMotifications = notifications.filter((n) => n.type !== type);

    setNotificationsState([...filteredMotifications, { type, enabled }]);
  };

  const handleSetNotificationRates = useCallback(() => dispatch(setNotificationRates({ rateBuy: buyAlert, rateSell: sellAlert })), [buyAlert, sellAlert, dispatch]);

  return (
    <SafeArea>
      {isLoading && <Loader />}
      <KeyboardView>
        <HeaderProfile>
          <Text numberOfLines={3} variant="button" style={{ color: "#FFF" }}>
            Gestiona tus notificaciones y selecciona aquellas que deseas recibir.
          </Text>
        </HeaderProfile>
        <ProfileScroll>
          <Spacer variant="top" size={4} />
          <NotificationWrapper>
            <Text>Notificaciones generales</Text>
            <CustomSwitch enabled={permissions} onToggle={() => Linking.openURL("app-settings:")} />
          </NotificationWrapper>
          <Spacer variant="top" size={5} />
          {notifications.map(
            (notif) =>
              notif.type !== "rateBuy" &&
              notif.type !== "rateSell" && (
                <NotificationWrapper key={notif.type}>
                  <Text>
                    {notif.type === "statusChanged"
                      ? "Estado de operaciones"
                      : notif.type === "kash"
                      ? "KASH recibidos"
                      : notif.type === "promotions"
                      ? "Avisos y promociones"
                      : ""}
                  </Text>
                  <CustomSwitch
                    enabled={permissions && notificationsState.find((n) => n.type === notif.type)?.enabled}
                    onToggle={() => handleToggleNotification(notif.type, !notif.enabled)}
                  />
                </NotificationWrapper>
              )
          )}
          <Spacer variant="top" size={3} />
          <NotificationLabel>
            <Text>
              Alerta cuando la <Text variant="bold">COMPRA</Text> esté por encima de:
            </Text>
          </NotificationLabel>
          <Spacer variant="top" />
          <NotificationWrapper>
            <CurrencyInput
              value={buyAlert}
              keyboardType="decimal-pad"
              precision={3}
              ignoreNegative={true}
              minValue={0}
              separator="."
              onChangeValue={(value) => setBuyAlert(value)}
              style={{ paddingRight: 30, paddingVertical: 10, paddingLeft: 10 }}
            />
            <CustomSwitch
              enabled={permissions && notificationsState.find((n) => n.type === "rateBuy")?.enabled}
              onToggle={() => handleToggleNotification("rateBuy", !notificationsState.find((n) => n.type === "rateBuy")?.enabled)}
            />
          </NotificationWrapper>
          <NotificationLabel>
            <Text>
              Alerta cuando la <Text variant="bold">VENTA</Text> esté por debajo de:
            </Text>
          </NotificationLabel>
          <Spacer variant="top" />
          <NotificationWrapper>
            <CurrencyInput
              value={sellAlert}
              keyboardType="decimal-pad"
              precision={3}
              ignoreNegative={true}
              minValue={0}
              separator="."
              onChangeValue={(value) => setSellAlert(value)}
              style={{ paddingRight: 30, paddingVertical: 10, paddingLeft: 10 }}
            />
            <CustomSwitch
              enabled={permissions && notificationsState.find((n) => n.type === "rateSell")?.enabled}
              onToggle={() => handleToggleNotification("rateSell", !notificationsState.find((n) => n.type === "rateSell")?.enabled)}
            />
          </NotificationWrapper>
          <Spacer variant="top" />
          <Button onPress={handleSetNotificationRates} loading={isLoading}>
            Guardar valores
          </Button>
        </ProfileScroll>
      </KeyboardView>
      <Alert type="error" onClose={clearNotificationsError} visible={!!notificationsError}>
        {notificationsError}
      </Alert>
    </SafeArea>
  );
};
