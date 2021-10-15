import React from "react";
import { useFormik } from "formik";
import { View, Dimensions, Platform } from "react-native";
import { HelperText } from "react-native-paper";

// VALIDATIONS
import { completeProfileSchema } from "../../validations/schemas";

// COMPONENTS
import { Input } from "../../../../components/forms/input.component";
import { Select } from "../../../../components/forms/select.component";
import { Button } from "../../../../components/UI/button.component";
import { Spacer } from "../../../../components/utils/spacer.component";

export const CompleteProfileForm = ({ isProcessing, onSubmit }) => {
  // LIST OPTIONS
  const documentTypes = [
    { value: "DNI", label: "DNI" },
    { value: "CE", label: "CE" },
    { value: "PTP", label: "PTP" },
    { value: "pasaporte", label: "Pasaporte" },
  ];

  const genderOptions = [
    { label: "Hombre", value: "male" },
    { label: "Mujer", value: "female" },
    { label: "Otro", value: "other" },
  ];

  // FORM METHODS
  const formik = useFormik({
    initialValues: { type: "natural", document_type: "", first_name: "", last_name: "", document_identification: "", identity_sex: "", phone: "" },
    onSubmit,
    validationSchema: completeProfileSchema,
  });

  // HANDLERS
  const onSelectChange = (value, name) => formik.setFieldValue(name, value);

  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: Dimensions.get("window").width / 2 }}>
        <View style={{ flexGrow: 0.3, marginRight: 10 }}>
          <Select
            onChange={onSelectChange}
            label="Tipo doc."
            error={!formik.values.document_type && formik.errors.document_type}
            style={{ width: Platform.OS === "ios" ? 136 : 110 }}
            options={documentTypes}
            value={formik.values.document_type}
            name="document_type"
            isFlex
          />
        </View>
        <View style={{ width: Platform.OS === "ios" ? Dimensions.get("window").width / 2 : Dimensions.get("window").width / 1.75 }}>
          <Input
            value={formik.values.document_identification}
            label="Nro. de docucmento"
            error={formik.touched.document_identification && formik.errors.document_identification}
            onChange={formik.handleChange("document_identification")}
            onBlur={formik.handleBlur("document_identification")}
            isFlex
          />
        </View>
      </View>
      {formik.touched.document_identification && formik.errors.document_identification && (
        <View style={{ width: "100%" }}>
          <HelperText type="error" visible={formik.touched.document_identification && formik.errors.document_identification}>
            {formik.errors.document_identification}
          </HelperText>
        </View>
      )}
      <Input
        value={formik.values.first_name}
        error={formik.touched.first_name && formik.errors.first_name}
        label="Nombre(s)"
        onChange={formik.handleChange("first_name")}
        onBlur={formik.handleBlur("first_name")}
      />
      <Input
        value={formik.values.last_name}
        error={formik.touched.last_name && formik.errors.last_name}
        label="Apellido(s)"
        onChange={formik.handleChange("last_name")}
        onBlur={formik.handleBlur("last_name")}
      />
      <Select
        name="identity_sex"
        value={formik.values.identity_sex}
        label="Género"
        options={genderOptions}
        error={!formik.values.identity_sex && formik.errors.identity_sex}
        onChange={onSelectChange}
      />
      <Spacer variant="top" size={3} />
      <Button variant="primary" disabled={!formik.isValid || isProcessing} loading={isProcessing} onPress={formik.handleSubmit}>
        Completar perfil
      </Button>
    </>
  );
};
