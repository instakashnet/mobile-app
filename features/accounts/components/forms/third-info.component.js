import React from "react";
import { Platform, View } from "react-native";

// COMPONENTS
import { Input } from "../../../../components/forms/input.component";
import { Select } from "../../../../components/forms/select.component";

export const ThirdInfo = ({ formik, onSelect }) => {
  // LIST OPTIONS
  const documentTypes = [
    { value: "DNI", label: "DNI" },
    { value: "CE", label: "CE" },
    { value: "PTP", label: "PTP" },
    { value: "pasaporte", label: "Pasaporte" },
    { value: "RUC", label: "RUC" },
  ];

  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <View style={{ width: "40%", marginRight: 10 }}>
          <Select
            onChange={onSelect}
            label="Doc."
            error={formik.touched.documentType && formik.errors.documentType}
            style={{ width: Platform.OS === "ios" ? 136 : 110 }}
            options={documentTypes}
            value={formik.values.documentType}
            name="documentType"
            disabled={formik.values.documentType === "RUC"}
            isFlex
          />
        </View>
        <View style={{ flexGrow: 0.7, width: "52%" }}>
          <Input
            value={formik.values.documentIdentity}
            label="Número doc."
            error={formik.touched.documentIdentity && formik.errors.documentIdentity}
            onChange={formik.handleChange("documentIdentity")}
            onBlur={formik.handleBlur("documentIdentity")}
            isFlex
          />
        </View>
      </View>
      {formik.values.thirdPartyAccType === "natural" ? (
        <>
          <Input
            value={formik.values.name}
            error={formik.touched.name && formik.errors.name}
            label="Nombre(s)"
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
          />
          <Input
            value={formik.values.job}
            error={formik.touched.job && formik.errors.job}
            label="Ocupación"
            onChange={formik.handleChange("job")}
            onBlur={formik.handleBlur("job")}
          />
        </>
      ) : (
        <Input
          value={formik.values.razonSocial}
          error={formik.touched.razonSocial && formik.errors.razonSocial}
          label="Razón social"
          onChange={formik.handleChange("razonSocial")}
          onBlur={formik.handleBlur("razonSocial")}
        />
      )}
      <Input
        value={formik.values.email}
        error={formik.touched.email && formik.errors.email}
        label="Correo electrónico"
        onChange={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
      />
    </>
  );
};
