import React from "react";
import { Platform, View } from "react-native";

// COMPONENTS
import { Input } from "../../../../components/forms/input.component";
import { Select } from "../../../../components/forms/select.component";

export const JointInfo = ({ formik, onSelect }) => {
  // LIST OPTIONS
  const documentTypes = [
    { value: "DNI", label: "DNI" },
    { value: "CE", label: "CE" },
    { value: "PTP", label: "PTP" },
    { value: "pasaporte", label: "Pasaporte" },
  ];

  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <View style={{ width: "40%", marginRight: 10 }}>
          <Select
            onChange={onSelect}
            label="Doc."
            error={formik.touched.documentTypeJoint && formik.errors.documentTypeJoint}
            style={{ width: Platform.OS === "ios" ? 136 : 110 }}
            options={documentTypes}
            value={formik.values.documentTypeJoint}
            name="documentTypeJoint"
            isFlex
          />
        </View>
        <View style={{ flexGrow: 0.7, width: "52%" }}>
          <Input
            value={formik.values.documentNumberJoint}
            label="Número doc."
            error={formik.touched.documentNumberJoint && formik.errors.documentNumberJoint}
            onChange={formik.handleChange("documentNumberJoint")}
            onBlur={formik.handleBlur("documentNumberJoint")}
            isFlex
          />
        </View>
      </View>
      <Input
        value={formik.values.firstNameJoint}
        error={formik.touched.firstNameJoint && formik.errors.firstNameJoint}
        label="Nombre(s)"
        onChange={formik.handleChange("firstNameJoint")}
        onBlur={formik.handleBlur("firstNameJoint")}
      />
      <Input
        value={formik.values.lastNameJoint}
        error={formik.touched.lastNameJoint && formik.errors.lastNameJoint}
        label="Apellido(s)"
        onChange={formik.handleChange("lastNameJoint")}
        onBlur={formik.handleBlur("lastNameJoint")}
      />
    </>
  );
};
