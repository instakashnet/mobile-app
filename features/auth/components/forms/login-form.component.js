
import { useFocusEffect } from "@react-navigation/native";
import { useFormik } from "formik";
import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox } from "../../../../components/forms/checkbox.component";
// COMPONENTS
import { Input } from "../../../../components/forms/input.component";
import { Link } from "../../../../components/typography/link.component";
import { Text } from "../../../../components/typography/text.component";
import { Button } from "../../../../components/UI/button.component";
import { getFromSecureStore, saveInSecureStore } from "../../../../shared/helpers/secure-store";
// HELPERS
import { loginSchema } from "../../validations/schemas";

export const LoginForm = ({ onSubmit, isProcessing, navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const formik = useFormik({
    initialValues: { email: "", password: "", remember: false, from: "app" },
    enableReinitialize: true,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      if (values.remember) await saveInSecureStore("authValues", values);
      onSubmit(values);
    },
  });

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const values = await getFromSecureStore("authValues");
        if (values) {
          formik.setFieldValue("email", values.email);
          formik.setFieldValue("remember", true);
        }
      })();
    }, [formik.setFieldValue])
  );
  return (
    <>
      <Input
        name="email"
        label="Correo electrónico"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCompleteType="email"
        importantForAutofill="no"
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
      <View style={styles.ActionWrapper}>
        <Checkbox status={formik.values.remember} onPress={() => formik.setFieldValue("remember", !formik.values.remember)}>
          <Text variant="caption">Recordarme</Text>
        </Checkbox>
        <Link onPress={() => navigation.navigate("RecoverPassword")}>
          <Text variant="caption">Olvidé mi contraseña</Text>
        </Link>
      </View>
      <Button onPress={formik.handleSubmit} disabled={!formik.isValid || isProcessing} loading={isProcessing} variant="primary">
        {isProcessing ? "Cargando..." : "Iniciar sesión"}
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  ActionWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
});
