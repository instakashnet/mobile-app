import React from "react";
import { ScrollView, StyleSheet } from "react-native";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearAuthError } from "../../../store/actions";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { AuthWrapper } from "../components/auth.styles";
import { Alert } from "../../../components/UI/alert.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { RegisterForm } from "../components/forms/register-form.component";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { isProcessing, authError } = useSelector((state) => state.authReducer);

  // HANDLERS
  const onSubmit = (values) => dispatch(registerUser(values));

  return (
    <SafeArea>
      <ScrollView contentContainerStyle={styles.registerContainer}>
        <AuthWrapper>
          <Text variant="title">¡Bienvenido a Instakash!</Text>
          <Text>Regístrate y realiza tus operaciones de forma segura desde nuetra plataforma digital.</Text>
          <Spacer variant="top" size={2} />
          <RegisterForm isProcessing={isProcessing} onSubmit={onSubmit} />
        </AuthWrapper>
        <Alert type="error" onClose={clearAuthError} visible={!!authError}>
          {authError}
        </Alert>
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  registerContainer: { justifyContent: "center", alignItems: "center", flex: 1 },
});
