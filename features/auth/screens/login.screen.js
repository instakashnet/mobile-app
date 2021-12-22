import React, { useCallback } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { loginUser, clearAuthError } from "../../../store/actions";

// ASSETS
import { Logo } from "../../../assets/illustrations/platform/logo";

// COMPONENTS
import { DismissKeyboard } from "../../../components/utils/dismiss-keyobard.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Alert } from "../../../components/UI/alert.component";
import { Text } from "../../../components/typography/text.component";
import { Link } from "../../../components/typography/link.component";
import { LoginForm } from "../components/forms/login-form.component";
import { GoogleButton } from "../components/google-button.component";

// STYLED COMPONENTS
import { AuthLinkWrapper, AuthScroll, AuthLine } from "../components/auth.styles";

export const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch(),
    { isProcessing, authError } = useSelector((state) => state.authReducer);

  useFocusEffect(
    useCallback(() => {
      return () => dispatch(clearAuthError());
    }, [dispatch])
  );

  // HANDLERS
  const onSubmit = (values) => dispatch(loginUser(values));

  return (
    <SafeArea>
      <DismissKeyboard>
        <AuthScroll>
          <Logo width={280} />
          <Spacer variant="top" />
          <Text>Gana siempre con nosotros. Mejores tasas, mayor ahorro.</Text>
          {Platform.OS === "android" && (
            <>
              <GoogleButton />
              <Spacer variant="top" />
              <View style={styles.loginInfo}>
                <AuthLine />
                <Spacer variant="horizontal">
                  <Text variant="caption">o ingresa tus datos</Text>
                </Spacer>
                <AuthLine />
              </View>
            </>
          )}
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
        </AuthScroll>
      </DismissKeyboard>
      <Alert type="error" onClose={clearAuthError} visible={!!authError}>
        {authError}
      </Alert>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  loginInfo: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
});
