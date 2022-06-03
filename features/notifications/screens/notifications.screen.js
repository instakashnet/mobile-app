import { useFocusEffect } from "@react-navigation/native";
import { applicationId } from "expo-application";
import { ActivityAction, startActivityAsync } from "expo-intent-launcher";
import { getPermissionsAsync } from "expo-notifications";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AppState, Linking, Platform, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "../../../components/typography/text.component";
import { Alert } from "../../../components/UI/alert.component";
import { CustomSwitch } from "../../../components/UI/custom-switch.component";
import { Loader } from "../../../components/UI/loader.component";
import { KeyboardView } from "../../../components/utils/keyboard-view.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { clearNotificationsError, getNotifications, toggleNotification } from "../../../store/actions";
import { Header, NavItem, NotificationWrapper, RightArrow, ScrollContainer } from "../components/notifications.styles";

export const NotificationsScreen = ({ navigation }) => {
  const dispatch = useDispatch(),
    [notificationsState, setNotificationsState] = useState([]),
    [permissions, hasPermissions] = useState(false),
    { isLoading, notifications, notificationsError } = useSelector((state) => state.notificationsReducer),
    appState = useRef(AppState.currentState);

  useEffect(() => {
    let appStateListener = AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      if (appStateListener) appStateListener.remove();
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
    }
  }, [notifications]);

  const handleToggleNotification = (type, enabled) => {
    dispatch(toggleNotification(type, enabled));
    const filteredMotifications = notifications.filter((n) => n.type !== type);

    setNotificationsState([...filteredMotifications, { type, enabled }]);
  };

  const handleOpenNotificationSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      const bundleIdentifier = applicationId;

      startActivityAsync(ActivityAction.APPLICATION_DETAILS_SETTINGS, {
        data: `package:${bundleIdentifier}`,
      });
    }
  };

  return (
    <SafeArea>
      {isLoading && <Loader />}
      <KeyboardView>
        <Header>
          <Text numberOfLines={3} variant="button" style={{ color: "#FFF" }}>
            Gestiona tus notificaciones y selecciona aquellas que deseas recibir.
          </Text>
        </Header>
        <ScrollContainer>
          <Spacer variant="top" size={4} />
          <NavItem onPress={handleOpenNotificationSettings}>
            <NotificationWrapper>
              <View style={{ flex: 0.9 }}>
                <Text>Notificaciones generales</Text>
                <Text variant="caption">
                  {permissions
                    ? "Si desactivas las notificaciones, dejarás de recibir información de tu interés sobre Instakash"
                    : "Activa las notificaciones para recibir información de tu interés sobre Instakash y los procesos de tus cambios."}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10 }}>
                <Text variant="caption" style={{ color: "#999" }}>
                  {permissions ? "Desactivar" : "Activar"}
                </Text>
                <RightArrow />
              </View>
            </NotificationWrapper>
          </NavItem>
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
          <Spacer variant="top" size={5} />
          <NavItem onPress={() => navigation.navigate("ExchangeAlerts")}>
            <NotificationWrapper>
              <Text>Alertas de tipo de cambio</Text>
              <RightArrow />
            </NotificationWrapper>
          </NavItem>
        </ScrollContainer>
      </KeyboardView>
      <Alert type="error" onClose={clearNotificationsError} visible={!!notificationsError}>
        {notificationsError}
      </Alert>
    </SafeArea>
  );
};
