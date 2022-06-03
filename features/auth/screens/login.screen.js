import { useFocusEffect } from "@react-navigation/native";
import { authenticateAsync } from "expo-local-authentication";
import React, { useCallback } from "react";
import { Platform, StyleSheet, View } from "react-native";
// REDUX
import { useDispatch, useSelector } from "react-redux";
// ASSETS
import { Logo } from "../../../assets/illustrations/platform/logo";
import { Link } from "../../../components/typography/link.component";
import { Text } from "../../../components/typography/text.component";
import { Alert } from "../../../components/UI/alert.component";
// COMPONENTS
import { DismissKeyboard } from "../../../components/utils/dismiss-keyobard.component";
import { KeyboardScrollAware } from "../../../components/utils/keyboard-scroll.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { useBiometrics } from "../../../hooks/use-biometrics.hook";
import { getFromStore } from "../../../shared/helpers/async-store";
import { getFromSecureStore } from "../../../shared/helpers/secure-store";
import { clearAuthError, loginBiometrics, loginGoogle, loginUser } from "../../../store/actions";
// STYLED COMPONENTS
import { AuthLine, AuthLinkWrapper, AuthScroll } from "../components/auth.styles";
import { LoginForm } from "../components/forms/login-form.component";
import { GoogleButton } from "../components/google-button.component";

export const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch(),
    { isBiometricsSupported } = useBiometrics(),
    { isProcessing, authError } = useSelector((state) => state.authReducer);

  useFocusEffect(
    useCallback(() => {
      return () => dispatch(clearAuthError());
    }, [dispatch])
  );

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const granted = await getFromStore("biometricsGranted");

        if (isBiometricsSupported && granted) {
          const user = await getFromSecureStore("biometricsValues");

          if (user) {
            const biometrics = await authenticateAsync({
              promptMessage: "Inicio rápido de sesión",
              cancelLabel: "Cancelar",
              fallbackLabel: "Usar código",
            });

            if (biometrics.success) dispatch(loginBiometrics(user.email));
          }
        }
      })();
    }, [isBiometricsSupported, dispatch])
  );

  // HANDLERS
  const onSubmit = (values) => dispatch(loginUser(values)),
    onGoogleLogin = (token) => dispatch(loginGoogle(token));

  return (
    <SafeArea>
      <DismissKeyboard>
        <KeyboardScrollAware>
          <AuthScroll>
            <Spacer variant="top" />
            <View style={styles.logoWrapper}>
              <Logo width={250} />
              <Spacer variant="top" />
              <Text>Gana siempre con nosotros. Mejores tasas, mayor ahorro.</Text>
            </View>
            {Platform.OS === "android" && <GoogleButton loginGoogle={onGoogleLogin} />}
            <Spacer variant="top" />
            <View style={styles.loginInfo}>
              <AuthLine />
              <Spacer variant="horizontal">
                <Text variant="caption">o ingresa tus datos</Text>
              </Spacer>
              <AuthLine />
            </View>
            <Spacer variant="top" />
            <LoginForm isProcessing={isProcessing} onSubmit={onSubmit} navigation={navigation} />
            <AuthLinkWrapper>
              <Text>¿Eres nuevo en Instakash?</Text>
              <Spacer variant="left" />
              <Link onPress={() => navigation.navigate("Register")}>
                <Text variant="bold">Registrate</Text>
              </Link>
            </AuthLinkWrapper>
          </AuthScroll>
        </KeyboardScrollAware>
      </DismissKeyboard>
      <Alert type="error" onClose={clearAuthError} visible={!!authError}>
        {authError}
      </Alert>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  loginInfo: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  logoWrapper: { width: "90%" },
});
