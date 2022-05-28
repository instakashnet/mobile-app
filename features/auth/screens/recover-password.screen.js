import React, { useCallback } from "react";
import { useFormik } from "formik";
import { useFocusEffect } from "@react-navigation/native";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { recoverPassword, clearAuthError } from "../../../store/actions";

// COMPONENTS
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Input } from "../../../components/forms/input.component";
import { Button } from "../../../components/UI/button.component";
import { Link } from "../../../components/typography/link.component";
import { Alert } from "../../../components/UI/alert.component";
import { DismissKeyboard } from "../../../components/utils/dismiss-keyobard.component";
import { KeyboardView } from "../../../components/utils/keyboard-view.component";

// STYLED COMPONENTS
import { AuthWrapper, AuthLinkWrapper } from "../components/auth.styles";

export const RecoverPasswordScreen = ({ navigation }) => {
  const dispatch = useDispatch(),
    { isProcessing, authError } = useSelector((state) => state.authReducer);

  // FORMIK
  const formik = useFormik({ initialValues: { email: "" }, onSubmit: (values) => dispatch(recoverPassword(values)) });

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      return () => dispatch(clearAuthError());
    }, [dispatch])
  );

  return (
    <SafeArea>
      <KeyboardView>
        <DismissKeyboard>
          <AuthWrapper>
            <Text variant="title">Tranquilo, lo solucionaremos.</Text>
            <Text>Ingresa tu correo debajo y te enviaremos un correo para iniciar el proceso de crear una nueva contraseña.</Text>
            <Spacer variant="top" size={2} />
            <Input
              name="email"
              label="Correo electrónico"
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
              right
              iconName="email"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
            />
            <Spacer variant="top" />
            <Button onPress={formik.handleSubmit} disabled={isProcessing} loading={isProcessing} variant="primary">
              {isProcessing ? "Cargando..." : "Continuar"}
            </Button>
            <Spacer variant="top" />
            <AuthLinkWrapper>
              <Text>¿Ya la recordaste?</Text>
              <Spacer variant="left" />
              <Link onPress={() => navigation.navigate("Login")}>
                <Text variant="bold">Ingresa aquí</Text>
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
