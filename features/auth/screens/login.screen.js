import React from "react";
import { View, StyleSheet } from "react-native";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { loginUser, clearAuthError } from "../../../store/actions";

// ASSETS
import { GoogleIcon } from "../../../assets/icons/google";

// COMPONENTS
import { AuthWrapper, AuthLinkWrapper, AuthLine } from "../components/auth.styles";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Button } from "../../../components/UI/button.component";
import { Logo } from "../../../assets/illustrations/logo";
import { Alert } from "../../../components/UI/alert.component";
import { Text } from "../../../components/typography/text.component";
import { Link } from "../../../components/typography/link.component";
import { LoginForm } from "../components/forms/login-form.component";
import { DismissKeyboard } from "../../../components/utils/dismiss-keyobard.component";

export const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isProcessing, authError } = useSelector((state) => state.authReducer);

  // HANDLERS
  const onSubmit = (values) => dispatch(loginUser(values));

  return (
    <SafeArea>
      <DismissKeyboard>
        <AuthWrapper>
          <Logo width={300} />
          <Spacer variant="top">
            <Text>Gana siempre con nosotros. Mejores tasas, mayor ahorro.</Text>
          </Spacer>
          <Spacer variant="top" size={3} />
          <Button icon={() => <GoogleIcon />} variant="secondary" onPress={() => {}}>
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
          <Alert type="error" onClose={clearAuthError} visible={!!authError}>
            {authError}
          </Alert>
        </AuthWrapper>
      </DismissKeyboard>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  loginInfo: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
});
