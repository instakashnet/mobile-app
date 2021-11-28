import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./root.navigation";
import * as Linking from "expo-linking";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../store/actions";

// NAVIGATORS
import { AuthNavigator } from "./stacks/auth.navigator";
import { DrawerNavigator } from "./drawer.navigator";

// SCREENS
import { SplashScreen } from "../features/auth/screens/splash.screen";

const prefix = Linking.makeUrl("/");

const linking = {
  prefixes: [prefix, "https://*.instakash.net"],
  config: {
    screens: {
      ResetPassword: "change-password",
    },
  },
};

export const Navigator = () => {
  const dispatch = useDispatch();
  const { isLoading, isSignedIn } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      {!isSignedIn ? <AuthNavigator /> : <DrawerNavigator />}
    </NavigationContainer>
  );
};
