import React from "react";
import { useFormik } from "formik";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { changePhone, changeEmail, clearProfileError } from "../../../../store/actions";

// COMPONENTS
import { SafeArea } from "../../../../components/utils/safe-area.component";
import { Button } from "../../../../components/UI/button.component";
import { Text } from "../../../../components/typography/text.component";
import { Input } from "../../../../components/forms/input.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { Alert } from "../../../../components/UI/alert.component";

// STYLED COMPONENTS
import { HeaderProfile, FormWrapper } from "../../components/profile.styles";

export const EditInfoScreen = ({ route }) => {
  const { user, editType } = route.params,
    dispatch = useDispatch(),
    { isProcessing, profileError } = useSelector((state) => state.profileReducer);

  // FORMIK
  let values = {};
  if (editType === "phone") values = { phone: user.phone };
  if (editType === "email") values = { email: user.email };
  const formik = useFormik({ initialValues: values, enableReinitialize: true, onSubmit: (values) => dispatch(editType === "phone" ? changePhone(values) : changeEmail(values)) });

  return (
    <SafeArea>
      <HeaderProfile>
        <Text variant="button" style={{ color: "#FFF" }}>
          El {editType === "email" ? "correo electrónico" : "número de teléfono"} esta conectado a tu usuario y debe ser único.
        </Text>
      </HeaderProfile>
      <FormWrapper>
        {editType === "phone" ? (
          <Input name="phone" label="Teléfono" value={formik.values.phone} onChange={formik.handleChange("phone")} onBlur={formik.handleBlur("phone")} />
        ) : (
          <Input name="email" label="Correo electrónico" value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")} />
        )}
        <Spacer variant="top" size={6} />
        <Button
          disabled={!formik.isValid || isProcessing || (editType === "phone" && user.phone === formik.values.phone) || (editType === "email" && user.email === formik.values.email)}
          loading={isProcessing}
          onPress={formik.handleSubmit}
        >
          Editar {editType === "phone" ? "teléfono" : "correo"}
        </Button>
      </FormWrapper>

      <Alert type="error" onClose={clearProfileError} visible={!!profileError}>
        {profileError}
      </Alert>
    </SafeArea>
  );
};
