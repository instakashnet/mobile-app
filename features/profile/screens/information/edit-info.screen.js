import React from "react";
import { useFormik } from "formik";

// COMPONENTS
import { SafeArea } from "../../../../components/utils/safe-area.component";
import { Button } from "../../../../components/UI/button.component";
import { Text } from "../../../../components/typography/text.component";
import { Input } from "../../../../components/forms/input.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { HeaderProfile, FormWrapper } from "../../components/profile.styles";

export const EditInfoScreen = ({ route }) => {
  const { profile, editType } = route.params;

  // FORMIK
  let values = {};
  if (editType === "phone") values = { phone: profile.phone };
  if (editType === "email") values = { email: profile.email };
  const formik = useFormik({ initialValues: values, enableReinitialize: true, onSubmit: (values) => console.log(values) });

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
        <Button disabled={!formik.isValid} onPress={formik.handleSubmit}>
          Editar {editType === "phone" ? "teléfono" : "correo"}
        </Button>
      </FormWrapper>
    </SafeArea>
  );
};
