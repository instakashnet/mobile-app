import React, { useState, useLayoutEffect } from "react";
import { useFormik } from "formik";
import { TouchableOpacity, Platform, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { clearAuthError, resetPassword, logoutUser } from "../../../store/actions";

// COMPONENTS
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Input } from "../../../components/forms/input.component";
import { Button } from "../../../components/UI/button.component";
import { Alert } from "../../../components/UI/alert.component";

// STYLED COMPONENTS
import { AuthWrapper } from "../components/auth.styles";

export const ResetPasswordScreen = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true),
    dispatch = useDispatch(),
    { isProcessing, isSignOut, authError } = useSelector((state) => state.authReducer),
    formik = useFormik({ initialValues: { password: "", confirmPassword: "" }, onSubmit: (values) => dispatch(resetPassword(values)) });

  // EFFECTS
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

  return (
    <SafeArea>
      <AuthWrapper>
        <Text variant="title">Ingresa tu nueva contraseña</Text>
        <Text>Coloque su nueva contraseña para poder acceder nuevamente. Te aconsejamos crear una que te sea facil de recordar.</Text>
        <Spacer variant="top" size={2} />
        <Input
          name="password"
          label="Contraseña"
          secureTextEntry={hidePassword}
          right
          iconName={hidePassword ? "eye" : "eye-off"}
          onPress={() => setHidePassword((prev) => !prev)}
          value={formik.values.password}
          onChange={formik.handleChange("password")}
        />
        <Input
          name="confirmPassword"
          label="Confirmar contraseña"
          secureTextEntry={hidePassword}
          right
          iconName={hidePassword ? "eye" : "eye-off"}
          onPress={() => setHidePassword((prev) => !prev)}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange("confirmPassword")}
        />
        <Spacer variant="top" />
        <Button onPress={formik.handleSubmit} disabled={!formik.isValid || isProcessing} loading={isProcessing} variant="primary">
          Cambiar contraseña
        </Button>
      </AuthWrapper>
      <Alert type="error" onClose={clearAuthError} visible={!!authError}>
        {authError}
      </Alert>
    </SafeArea>
  );
};
