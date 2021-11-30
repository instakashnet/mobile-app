import React, { useCallback, useEffect } from "react";
import { View, StyleSheet, Alert as RNAlert } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { useFocusEffect } from "@react-navigation/native";

// HELPERS
import { getVariables } from "../../../variables";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { loginUser, loginGoogle, clearAuthError } from "../../../store/actions";

// ASSETS
import { GoogleIcon } from "../../../assets/icons/google";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Button } from "../../../components/UI/button.component";
import { Logo } from "../../../assets/illustrations/logo";
import { Alert } from "../../../components/UI/alert.component";
import { Text } from "../../../components/typography/text.component";
import { Link } from "../../../components/typography/link.component";
import { LoginForm } from "../components/forms/login-form.component";
import { DismissKeyboard } from "../../../components/utils/dismiss-keyobard.component";
import { KeyboardView } from "../../../components/utils/keyboard-view.component";

// STYLED COMPONENTS
import { AuthWrapper, AuthLinkWrapper, AuthLine } from "../components/auth.styles";

const { googleSinInAndroid, googleSinInExpo, googleSinInIOS } = getVariables();

export const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch(),
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

  useFocusEffect(
    useCallback(() => {
      return () => dispatch(clearAuthError());
    }, [dispatch])
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

  return (
    <SafeArea>
      <KeyboardView>
        <DismissKeyboard>
          <AuthWrapper>
            <Logo width={280} />
            <Spacer variant="top" />
            <Text>Gana siempre con nosotros. Mejores tasas, mayor ahorro.</Text>
            <Button icon={() => <GoogleIcon />} disabled={!request} variant="secondary" onPress={onGoogleLogin}>
              Ingresar con Google
            </Button>
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
        </DismissKeyboard>
      </KeyboardView>
      <Alert type="error" onClose={clearAuthError} visible={!!authError}>
        {authError}
      </Alert>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  loginInfo: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
});
