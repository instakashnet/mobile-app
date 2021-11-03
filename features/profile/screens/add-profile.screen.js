import React from "react";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { addProfile, clearProfileError } from "../../../store/actions";

// FORMIK
import { useFormik } from "formik";
import { addProfileSchema } from "../validations/schemas";

// COMPONENTS
import { AddProfileForm, BorderLine } from "../components/select-profile.styles";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { Input } from "../../../components/forms/input.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Checkbox } from "../../../components/forms/checkbox.component";
import { Button } from "../../../components/UI/button.component";
import { Alert } from "../../../components/UI/alert.component";

export const AddProfileScreen = () => {
  const dispatch = useDispatch();
  const { isProcessing, profileError } = useSelector((state) => state.profileReducer);

  // FORMIK
  const formik = useFormik({
    initialValues: { type: "juridica", ruc: "", address: "", razon_social: "", accept: false },
    validationSchema: addProfileSchema,
    onSubmit: (values) => dispatch(addProfile(values)),
  });

  return (
    <SafeArea>
      <AddProfileForm>
        <Spacer variant="top" />
        <Text>
          Agrega los datos de una empresa donde seas el representante legal y <Text variant="bold">empieza a cambiar dolares con ella</Text>.
        </Text>
        <Spacer variant="top" size={3} />
        <Text variant="bold">Datos de la empresa</Text>
        <Spacer variant="top" />
        <BorderLine />
        <Spacer variant="top" />
        <Input
          name="RUC"
          label="RUC"
          keyboardType="numeric"
          error={formik.touched.ruc && formik.errors.ruc}
          onChange={formik.handleChange("ruc")}
          onBlur={formik.handleBlur("ruc")}
          value={formik.values.ruc}
        />
        <Input
          name="razon_social"
          label="Razón social"
          error={formik.touched.razon_social && formik.errors.razon_social}
          onChange={formik.handleChange("razon_social")}
          onBlur={formik.handleBlur("razon_social")}
          value={formik.values.razon_social}
          autoCompleteType="off"
        />
        <Input
          name="address"
          onBlur={formik}
          error={formik.touched.address && formik.errors.address}
          label="Dirección fiscal"
          onChange={formik.handleChange("address")}
          value={formik.values.address}
        />
        <Spacer varaint="top" />
        <Spacer variant="horizontal" size={2}>
          <Checkbox status={formik.values.accept} onPress={() => formik.setFieldValue("accept", !formik.values.accept)}>
            <Text variant="caption">Declaro que todos los datos acá ingresados son veraces y que soy el representante legal de la empresa.</Text>
          </Checkbox>
        </Spacer>
        <Button variant="primary" onPress={formik.handleSubmit} loading={isProcessing} disabled={!formik.isValid || isProcessing}>
          Agregar empresa
        </Button>
      </AddProfileForm>
      <Alert type="error" onClose={clearProfileError} visible={!!profileError}>
        {profileError}
      </Alert>
    </SafeArea>
  );
};
