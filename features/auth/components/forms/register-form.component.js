import React, { useState } from "react";
import { useFormik } from "formik";

// HELPERS
import { registerSchema } from "../../validations/schemas";
import { openURL } from "../../../../shared/helpers/functions";

// COMPONENTS
import { Input } from "../../../../components/forms/input.component";
import { PhoneInput } from "../../../../components/forms/phone-input.component";
import { Checkbox } from "../../../../components/forms/checkbox.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { Button } from "../../../../components/UI/button.component";

export const RegisterForm = ({ onSubmit, isProcessing }) => {
  const [hidePassword, setHidePassword] = useState(true);

  // FORMIK METHODS
  const formik = useFormik({
    initialValues: { email: "", phone: "", password: "", confirmPassword: "", affiliate: "", allowPromotionalEmail: true, acceptTerms: false },
    validationSchema: registerSchema,
    onSubmit,
  });

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
      <PhoneInput
        defaultCode="PE"
        value={formik.values.phone}
        error={formik.touched.phone && formik.errors.phone}
        onChangeText={(number) => formik.setFieldValue("phone", number)}
        onChange={formik.handleChange("phone")}
        onBlur={formik.handleBlur("phone")}
        placeholder="Número de teléfono"
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
      <Input
        name="confirmPassword"
        label="Confirmar contraseña"
        secureTextEntry={hidePassword}
        right
        error={formik.touched.confirmPassword && formik.errors.confirmPassword}
        iconName={hidePassword ? "eye" : "eye-off"}
        onPress={() => setHidePassword((prev) => !prev)}
        value={formik.values.confirmPassword}
        onChange={formik.handleChange("confirmPassword")}
        onBlur={formik.handleBlur("confirmPassword")}
      />
      <Spacer variant="top" />
      <Text variant="title">¿Te ha referido un amigo?</Text>
      <Input name="affiliate" label="Ingresa el código acá" value={formik.values.affiliate} onChange={formik.handleChange("affiliate")} />
      <Spacer variant="vertical">
        <Checkbox status={formik.values.allowPromotionalEmail} onPress={() => formik.setFieldValue("allowPromotionalEmail", !formik.values.allowPromotionalEmail)}>
          <Text variant="caption">Autorizo recibir notícias y promociones de parte de Instakash.</Text>
        </Checkbox>
      </Spacer>
      <Checkbox status={formik.values.acceptTerms} onPress={() => formik.setFieldValue("acceptTerms", !formik.values.acceptTerms)}>
        <Text variant="caption">
          Declaro que he leído y acepto sus{" "}
          <Text variant="underline" onPress={() => openURL("https://instakash.net/terminos-y-condiciones")}>
            Términos y condiciones
          </Text>{" "}
          y las{" "}
          <Text variant="underline" onPress={() => openURL("https://instakash.net/politicas-de-privacidad")}>
            Políticas de privacidad
          </Text>
          .
        </Text>
      </Checkbox>
      <Spacer variant="bottom" />
      <Button onPress={formik.handleSubmit} disabled={!formik.isValid || isProcessing} loading={isProcessing} variant="primary">
        {isProcessing ? "Registrando..." : "Registrarme"}
      </Button>
    </>
  );
};
