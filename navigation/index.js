import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { hideAsync } from "expo-splash-screen";
import React, { useEffect } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { SplashScreen } from "../features/auth/screens/splash.screen";
// HOOKS
import { useNotifications } from "../hooks/use-notifications.hook";
import { getSchedule, loadUser } from "../store/actions";
import { DrawerNavigator } from "./drawer.navigator";
import { navigationRef } from "./root.navigation";
// NAVIGATORS
import { AuthNavigator } from "./stacks/auth.navigator";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const Navigator = () => {
  const dispatch = useDispatch(),
    { isLoading, isSignedIn } = useSelector((state) => state.authReducer);

  const hideSplashScreen = async () => await hideAsync();

  // HOOKS
  useNotifications();

  useEffect(() => {
    dispatch(getSchedule());
    dispatch(loadUser());
  }, [dispatch]);

  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer ref={navigationRef} onReady={hideSplashScreen}>
      {isSignedIn ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
