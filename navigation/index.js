import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./root.navigation";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../store/actions";

// NAVIGATORS
import { AuthNavigator } from "./stacks/auth.navigator";
import { SelectProfileNavigator } from "./select-profile.navigator";
import { DrawerNavigator } from "./drawer.navigator";

// SCREENS
import { SplashScreen } from "../features/auth/screens/splash.screen";

export const Navigator = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.authReducer);
  const profile = useSelector((state) => state.profileReducer.profile);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (isLoading) return <SplashScreen />;

  return <NavigationContainer ref={navigationRef}>{!user ? <AuthNavigator /> : !profile ? <SelectProfileNavigator /> : <DrawerNavigator />}</NavigationContainer>;
};
