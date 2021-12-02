import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// REDUX
import { useSelector } from "react-redux";

// UTILS
import { headerOptions, headerTitle } from "../utils/navigator.options";

// SCREENS
import { AuthScreen } from "../../features/auth/screens/auth.screen";
import { LoginScreen } from "../../features/auth/screens/login.screen";
import { RegisterScreen } from "../../features/auth/screens/register.screen";
import { ResetPasswordScreen } from "../../features/auth/screens/reset-password.screen";
import { RecoverPasswordScreen } from "../../features/auth/screens/recover-password.screen";
import { CompleteProfileScreen } from "../../features/auth/screens/complete-profile.screen";
import { EmailVerificationScreen } from "../../features/auth/screens/email-verification.screen";

const AuthStack = createStackNavigator();

export const AuthNavigator = () => {
  const { user, isSignOut } = useSelector((state) => state.authReducer);

  return (
    <AuthStack.Navigator
      screenOptions={{
        ...headerOptions,
      }}
    >
      <AuthStack.Screen options={{ headerShown: false, animationTypeForReplace: isSignOut ? "pop" : "push" }} name="Auth" component={AuthScreen} />
      <AuthStack.Screen options={{ headerShown: false }} name="EmailVerification" component={EmailVerificationScreen} />
      {!user ? (
        <>
          <AuthStack.Screen options={{ headerTitle: () => headerTitle("Acceder"), headerBackTitleVisible: false }} name="Login" component={LoginScreen} />
          <AuthStack.Screen options={{ headerTitle: () => headerTitle("Registrarse"), headerBackTitleVisible: false }} name="Register" component={RegisterScreen} />
          <AuthStack.Screen
            options={{ headerTitle: () => headerTitle("Olvidé mi contraseña"), headerBackTitleVisible: false }}
            name="RecoverPassword"
            component={RecoverPasswordScreen}
          />
          <AuthStack.Screen options={{ headerTitle: () => headerTitle("Nueva co)ntraseña"), headerBackTitleVisible: false }} name="ResetPassword" component={ResetPasswordScreen} />
        </>
      ) : (
        <AuthStack.Screen options={{ headerShown: false }} name="CompleteProfile" component={CompleteProfileScreen} />
      )}
    </AuthStack.Navigator>
  );
};
