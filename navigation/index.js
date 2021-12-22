import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./root.navigation";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../store/actions";

// NAVIGATORS
import { AuthNavigator } from "./stacks/auth.navigator";
import { DrawerNavigator } from "./drawer.navigator";

// SCREENS
import { SplashScreen } from "../features/auth/screens/splash.screen";

export const Navigator = () => {
  const dispatch = useDispatch();
  const { isLoading, isSignedIn } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (isLoading) return <SplashScreen />;

  return <NavigationContainer ref={navigationRef}>{!isSignedIn ? <AuthNavigator /> : <DrawerNavigator />}</NavigationContainer>;
};
