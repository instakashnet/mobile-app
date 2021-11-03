import React from "react";
import { useFormik } from "formik";

// COMPONENTS
import { SafeArea } from "../../../../components/utils/safe-area.component";
import { Button } from "../../../../components/UI/button.component";
import { Text } from "../../../../components/typography/text.component";
import { Input } from "../../../../components/forms/input.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { HeaderProfile, FormWrapper } from "../../components/profile.styles";

export const EditInfoScreen = () => {
  const formik = useFormik({ initialValues: { phone: "" }, enableReinitialize: true, onSubmit: (values) => console.lopg(values) });

  return (
    <SafeArea>
      <HeaderProfile>
        <Text variant="button" style={{ color: "#FFF" }}>
          El número de teléfono esta conectado a tu usario y debe ser único.
        </Text>
      </HeaderProfile>
      <FormWrapper>
        <Input name="phone" label="Teléfono" value={formik.values.phone} onChange={formik.handleChange("phone")} onBlur={formik.handleBlur("phone")} />
        <Spacer variant="top" size={6} />
        <Button disabled={!formik.isValid}>Editar teléfono</Button>
      </FormWrapper>
    </SafeArea>
  );
};
