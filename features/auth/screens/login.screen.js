import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Alert as RNAlert } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { useFocusEffect } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import * as AppleAuthentication from "expo-apple-authentication";

// HELPERS
import { getVariables } from "../../../variables";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { loginUser, loginGoogle, clearAuthError } from "../../../store/actions";

// ASSETS
import { GoogleIcon } from "../../../assets/icons/google";
import { AppleIcon } from "../../../assets/icons/apple";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Button } from "../../../components/UI/button.component";
import { Logo } from "../../../assets/illustrations/logo";
import { Alert } from "../../../components/UI/alert.component";
import { Text } from "../../../components/typography/text.component";
import { Link } from "../../../components/typography/link.component";
import { LoginForm } from "../components/forms/login-form.component";
import { KeyboardScrollAware } from "../../../components/utils/keyboard-scroll.component";

// STYLED COMPONENTS
import { AuthWrapper, AuthLinkWrapper, AuthLine, AppleButton } from "../components/auth.styles";

const { googleSinInAndroid, googleSinInExpo, googleSinInIOS } = getVariables();

export const LoginScreen = ({ navigation, route }) => {
  const { isBiometrics } = route.params,
    dispatch = useDispatch(),
    [isAppleSinginAvailable, setIsAppleSigninAvailable] = useState(null),
    { isProcessing, authError } = useSelector((state) => state.authReducer),
    [request, response, promptAsync] = Google.useAuthRequest({
      expoClientId: googleSinInExpo,
      iosClientId: googleSinInIOS,
      androidClientId: googleSinInAndroid,
    });

  // EFFECTS
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      dispatch(loginGoogle(authentication.accessToken));
    }
  }, [response]);

  useEffect(() => {
    (async () => {
      try {
        const isAvailable = await AppleAuthentication.isAvailableAsync();
        setIsAppleSigninAvailable(isAvailable);
      } catch (error) {
        console.log(error);
        setIsAppleSigninAvailable(false);
      }
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => dispatch(clearAuthError());
    }, [dispatch])
  );

  useFocusEffect(
    useCallback(() => {
      const localAuth = async () => {
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (isEnrolled) {
          const storedAuth = await SecureStore.getItemAsync("authValues");

          if (storedAuth) {
            const result = await LocalAuthentication.authenticateAsync({
              cancelLabel: "Cancelar",
              fallbackLabel: "Usar código",
              promptMessage: "Inicia sesión con tu Apple ID",
            });

            if (result.success) {
              const authValues = JSON.parse(storedAuth);
              dispatch(loginUser(authValues));
            }
          }
        }
      };

      localAuth();
    }, [isBiometrics])
  );

  // HANDLERS
  const onSubmit = (values) => dispatch(loginUser(values));

  const onGoogleLogin = async () => {
    try {
      await promptAsync();
    } catch (error) {
      RNAlert.alert("Error", "Ha ocurrido un error con el servicio de google.");
    }
  };

  const onAppleSignin = async () => {
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME, AppleAuthentication.AppleAuthenticationScope.EMAIL],
      });

      console.log(credentials);
    } catch (e) {
      if (e.code === "ERR_CANCELED") {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };

  return (
    <SafeArea>
      <KeyboardScrollAware>
        <AuthWrapper>
          <Logo width={280} />
          <Spacer variant="top" />
          <Text>Gana siempre con nosotros. Mejores tasas, mayor ahorro.</Text>
          <Button icon={() => <GoogleIcon />} disabled={!request} variant="secondary" onPress={onGoogleLogin}>
            Ingresar con Google
          </Button>
          {isAppleSinginAvailable && (
            <AppleButton icon={() => <AppleIcon />} onPress={onAppleSignin}>
              Acceder con Apple
            </AppleButton>
          )}
          <Spacer variant="top" />
          <View style={styles.loginInfo}>
            <AuthLine />
            <Spacer variant="horizontal">
              <Text variant="caption">o ingresa tus datos</Text>
            </Spacer>
            <AuthLine />
          </View>
          <Spacer variant="top" />
          <LoginForm isProcessing={isProcessing} onSubmit={onSubmit} />
          <Spacer variant="vertical" size={3}>
            <Link onPress={() => navigation.navigate("RecoverPassword")}>
              <Text variant="bold">Olvidé mi contraseña</Text>
            </Link>
          </Spacer>
          <AuthLinkWrapper>
            <Text>¿Eres nuevo en Instakash?</Text>
            <Spacer variant="left" />
            <Link onPress={() => navigation.navigate("Register")}>
              <Text variant="bold">Registrate</Text>
            </Link>
          </AuthLinkWrapper>
        </AuthWrapper>
      </KeyboardScrollAware>
      <Alert type="error" onClose={clearAuthError} visible={!!authError}>
        {authError}
      </Alert>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  loginInfo: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
});
