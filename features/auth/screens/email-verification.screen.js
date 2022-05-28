import React, { useCallback, useLayoutEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, Platform, ActivityIndicator } from "react-native";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { validateEmail, refreshCode, clearAuthError, closeModal, logoutUser } from "../../../store/actions";

// ASSETS
import { ValidationIcon } from "../../../assets/icons/validation";

// COMPONENTS
import { VerificationForm } from "../components/forms/verification-form.component";
import { DismissKeyboard } from "../../../components/utils/dismiss-keyobard.component";
import { Button } from "../../../components/UI/button.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Alert } from "../../../components/UI/alert.component";
import { Modal } from "../../../components/UI/modal.component";

// STYLED COMPONENTS
import { AuthWrapper } from "../components/auth.styles";

export const EmailVerificationScreen = ({ navigation, route }) => {
  const dispatch = useDispatch(),
    { isProcessing, isSignOut, authError } = useSelector((state) => state.authReducer),
    { type } = route.params;

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      return () => dispatch(clearAuthError());
    }, [dispatch])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => dispatch(logoutUser("auth"))} style={{ marginLeft: 10 }}>
          {isSignOut ? (
            <ActivityIndicator size="small" color="#0D8284" />
          ) : (
            <MaterialIcons name={Platform.OS === "ios" ? "arrow-back-ios" : "arrow-back"} color="#0D8284" size={30} />
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // HANDLRES
  const onSubmit = (values) => dispatch(validateEmail(values, type)),
    onRefreshCode = () => dispatch(refreshCode()),
    onCloseModal = () => dispatch(closeModal());

  return (
    <SafeArea>
      <DismissKeyboard>
        <AuthWrapper>
          <ValidationIcon />
          <Spacer variant="top" size={3} />
          <Text variant="title">Verificación</Text>
          <Spacer variant="top" />
          <Text>Hemos enviado un código de 4 dígitos a tu correo. Por favor, ingresalo para verificar tu cuenta.</Text>
          <VerificationForm isProcessing={isProcessing} onSubmit={onSubmit} onRefreshCode={onRefreshCode} />
        </AuthWrapper>
      </DismissKeyboard>
      <Modal>
        <Text variant="title">¡Enviado!</Text>
        <Spacer variant="top" />
        <Text style={{ textAlign: "center" }}>Se ha enviado un nuevo código a tu correo, recuerda revisar tu carpeta spam.</Text>
        <Spacer variant="top" size={2} />
        <Button onPress={onCloseModal} style={{ width: "100%" }} variant="primary">
          Aceptar
        </Button>
      </Modal>

      <Alert type="error" onClose={clearAuthError} visible={!!authError}>
        {authError}
      </Alert>
    </SafeArea>
  );
};
