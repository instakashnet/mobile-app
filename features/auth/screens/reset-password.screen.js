import React, { useState } from "react";
import { useFormik } from "formik";

// COMPONENTS
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { AuthWrapper } from "../components/auth.styles";
import { Spacer } from "../../../components/utils/spacer.component";
import { Input } from "../../../components/forms/input.component";
import { Button } from "../../../components/UI/button.component";

export const ResetPasswordScreen = ({ route }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const formik = useFormik({ initialValues: { password: "", confirmPassword: "" }, onSubmit: (values) => console.log(values) });

  console.log(route);

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
        <Button onPress={formik.handleSubmit} variant="primary">
          Cambiar contraseña
        </Button>
      </AuthWrapper>
    </SafeArea>
  );
};
