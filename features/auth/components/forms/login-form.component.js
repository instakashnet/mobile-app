import React, { useState } from "react";
import { useFormik } from "formik";

// HELPERS
import { loginSchema } from "../../validations/schemas";

// COMPONENTS
import { Input } from "../../../../components/forms/input.component";
import { Button } from "../../../../components/UI/button.component";

export const LoginForm = ({ onSubmit, isProcessing }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const formik = useFormik({ initialValues: { email: "", password: "" }, validationSchema: loginSchema, onSubmit });

  return (
    <>
      <Input
        name="email"
        label="Correo electrónico"
        textContentType="emailAddress"
        keyboardType="email-address"
        error={formik.touched.email && formik.errors.email}
        right
        iconName="email"
        value={formik.values.email}
        onChange={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        name="password"
        label="Contraseña"
        secureTextEntry={hidePassword}
        right
        error={formik.touched.password && formik.errors.password}
        iconName={hidePassword ? "eye" : "eye-off"}
        onPress={() => setHidePassword((prev) => !prev)}
        value={formik.values.password}
        onChange={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
      />
      <Button onPress={formik.handleSubmit} disabled={!formik.isValid || isProcessing} loading={isProcessing} variant="primary">
        {isProcessing ? "Cargando..." : "Iniciar sesión"}
      </Button>
    </>
  );
};
