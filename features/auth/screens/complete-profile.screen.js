import React from "react";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal, logoutUser, completeProfile, clearAuthError } from "../../../store/actions";

// COMPONENTS
import { AuthWrapper } from "../components/auth.styles";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { Link } from "../../../components/typography/link.component";
import { Modal } from "../../../components/UI/modal.component";
import { Alert } from "../../../components/UI/alert.component";
import { Button } from "../../../components/UI/button.component";
import { CompleteProfileForm } from "../components/forms/complete-form.component";

export const CompleteProfileScreen = () => {
  const dispatch = useDispatch();
  const { isProcessing, authError } = useSelector((state) => state.authReducer);

  // HANDLERS
  const onSubmit = (values) => dispatch(completeProfile(values));
  const onOpenModal = () => dispatch(openModal());
  const onCloseModal = () => dispatch(closeModal());
  const onLogout = () => dispatch(logoutUser());

  return (
    <SafeArea>
      <AuthWrapper>
        <Text variant="title">¡Ya has creado tu cuenta!</Text>
        <Text>Ahora necesitamos que completes tus datos.</Text>
        <Spacer variant="top" size={2} />
        <CompleteProfileForm isProcessing={isProcessing} onSubmit={onSubmit} />
        <Button onPress={onLogout} variant="secondary">
          Acceder con otra cuenta
        </Button>
        <Spacer variant="top" size={3} />
        <Link onPress={onOpenModal}>
          <Text variant="bold">¿Porqué me piden estos datos?</Text>
        </Link>
      </AuthWrapper>
      <Modal>
        <Text variant="title">Todo por tu seguridad</Text>
        <Spacer variant="top" />
        <Text style={{ textAlign: "center" }}>
          Al realizar una operación queremos estar seguro que eres tu quien lo realiza. Además, nos ayuda a saber según tu perfil registrado si debemos entregarte boleta o
          factura..
        </Text>
        <Spacer variant="top" size={2} />
        <Button onPress={onCloseModal} variant="primary">
          Aceptar
        </Button>
      </Modal>
      <Alert type="error" onClose={clearAuthError} visible={!!authError}>
        {authError}
      </Alert>
    </SafeArea>
  );
};
