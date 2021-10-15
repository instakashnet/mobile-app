import React from "react";
import { useFormik } from "formik";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { recoverPassword, clearAuthError, closeModal } from "../../../store/actions";

// COMPONENTS
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { AuthWrapper, AuthLinkWrapper } from "../components/auth.styles";
import { Spacer } from "../../../components/utils/spacer.component";
import { Input } from "../../../components/forms/input.component";
import { Button } from "../../../components/UI/button.component";
import { Link } from "../../../components/typography/link.component";
import { Alert } from "../../../components/UI/alert.component";
import { Modal } from "../../../components/UI/modal.component";

export const RecoverPasswordScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isProcessing, authError } = useSelector((state) => state.authReducer);

  // FORM
  const formik = useFormik({ initialValues: { email: "" }, onSubmit: (values) => dispatch(recoverPassword(values, showModal)) });

  return (
    <SafeArea>
      <AuthWrapper>
        <Text variant="title">Tranquilo, lo solucionaremos.</Text>
        <Text>Ingresa tu correo debajo y te enviaremos un link para crear una nueva contraseña.</Text>
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
          {isProcessing ? "Cargando..." : "Enviar correo"}
        </Button>
        <Spacer variant="top" />
        <AuthLinkWrapper>
          <Text>¿Ya la recordaste?</Text>
          <Spacer variant="left" />
          <Link onPress={() => navigation.navigate("Login")}>
            <Text variant="bold">Ingresa aquí</Text>
          </Link>
        </AuthLinkWrapper>
        <Alert type="error" onClose={clearAuthError} visible={!!authError}>
          {authError}
        </Alert>
      </AuthWrapper>
      <Modal>
        <Text variant="title">¡Correo enviado!</Text>
        <Spacer variant="top" />
        <Text style={{ textAlign: "center" }}>El correo fue enviado correctamente, recuerda revisar tu carpeta spam.</Text>
        <Spacer variant="top" size={2} />
        <Button onPress={() => dispatch(closeModal())} variant="primary">
          Aceptar
        </Button>
      </Modal>
    </SafeArea>
  );
};
