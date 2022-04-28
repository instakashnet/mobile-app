import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
// SCREENS
import { SplashScreen } from "../features/auth/screens/splash.screen";
// HOOKS
import { useNotifications } from "../hooks/use-notifications.hook";
import { loadUser } from "../store/actions";
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

  useNotifications();

  // EFFECTS
  useEffect(() => {
    console.log("calling load user");
    dispatch(loadUser());
  }, [dispatch]);

  if (isLoading) return <SplashScreen />;

  return <NavigationContainer ref={navigationRef}>{!isSignedIn ? <AuthNavigator /> : <DrawerNavigator />}</NavigationContainer>;
};
