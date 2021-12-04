import React from "react";
import { useFormik } from "formik";
import { View } from "react-native";
import { HelperText } from "react-native-paper";

// VALIDATIONS
import { completeProfileSchema } from "../../validations/schemas";

// COMPONENTS
import { Input } from "../../../../components/forms/input.component";
import { Select } from "../../../../components/forms/select.component";
import { Button } from "../../../../components/UI/button.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { PhoneInput } from "../../../../components/forms/phone-input.component";
import { Text } from "../../../../components/typography/text.component";

export const CompleteProfileForm = ({ isProcessing, onSubmit, user }) => {
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
    initialValues: { type: "natural", document_type: "", first_name: "", last_name: "", phone: "", document_identification: "", identity_sex: "", phone: "", affiliate: "" },
    onSubmit,
    validationSchema: completeProfileSchema,
  });

  // HANDLERS
  const onSelectChange = async (name, value) => {
    await formik.setFieldValue(name, value);
    formik.setFieldTouched(name, true);
  };

  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <View style={{ width: "42%", marginRight: 10 }}>
          <Select onChange={onSelectChange} label="Doc." options={documentTypes} value={formik.values.document_type} name="document_type" isFlex />
        </View>
        <View style={{ flexGrow: 0.7, width: "52%" }}>
          <Input
            value={formik.values.document_identification}
            label="Número doc."
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
      <PhoneInput
        defaultCode="PE"
        value={formik.values.phone}
        error={formik.touched.phone && formik.errors.phone}
        onChangeText={(number) => onSelectChange("phone", number)}
        onChange={formik.handleChange("phone")}
        onBlur={formik.handleBlur("phone")}
        placeholder="Número de teléfono"
      />
      <Select
        name="identity_sex"
        value={formik.values.identity_sex}
        label="Género"
        options={genderOptions}
        error={formik.touched.identity_sex && formik.errors.identity_sex}
        onChange={onSelectChange}
      />
      {user && user.isGoogle && (
        <>
          <Spacer variant="top" size={2} />
          <Text variant="title">¿Te ha referido un amigo?</Text>
          <Input name="affiliate" label="Ingresa el código acá" value={formik.values.affiliate} onChange={formik.handleChange("affiliate")} />
        </>
      )}
      <Spacer variant="top" size={3} />
      <Button variant="primary" disabled={!formik.isValid || isProcessing} loading={isProcessing} onPress={formik.handleSubmit}>
        Completar perfil
      </Button>
    </>
  );
};
