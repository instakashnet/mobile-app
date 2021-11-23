import React from "react";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { updateUsername, clearProfileError } from "../../../store/actions";

// FOMRIK
import { useFormik } from "formik";
import { usernameSchema } from "../validations/schemas";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Button } from "../../../components/UI/button.component";
import { Input } from "../../../components/forms/input.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Alert } from "../../../components/UI/alert.component";

// STYLED COMPONENTS
import { AffiliateHeader, FormWrapper } from "../components/affiliates.styles";

export const EditCodeScreen = ({ route }) => {
  const { username } = route.params,
    dispatch = useDispatch(),
    { isProcessing, profileError } = useSelector((state) => state.profileReducer),
    formik = useFormik({ initialValues: { username }, enableReinitialize: true, validationSchema: usernameSchema, onSubmit: (values) => dispatch(updateUsername(values)) });

  return (
    <SafeArea>
      <AffiliateHeader>
        <Text style={{ color: "#FFF" }}>
          Edita tu código de afiliado para que sea más sencillo de compartir y recordar.{" "}
          <Text variant="bold" style={{ color: "#FFF" }}>
            Debe ser de al menos 8 caracteres con una letra y un número.
          </Text>
        </Text>
      </AffiliateHeader>
      <FormWrapper>
        <Input
          name="username"
          error={formik.touched.username && formik.errors.username}
          onChange={formik.handleChange("username")}
          onBlur={formik.handleBlur("username")}
          value={formik.values.username}
        />
        <Spacer variant="top" size={6} />
        <Button disabled={!formik.isValid || isProcessing} loading={isProcessing} onPress={formik.handleSubmit}>
          Editar mi código
        </Button>
      </FormWrapper>

      <Alert type="error" onClose={clearProfileError} visible={!!profileError}>
        {profileError}
      </Alert>
    </SafeArea>
  );
};
