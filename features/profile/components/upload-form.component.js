import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Image } from "react-native";

// COMPONENTS
import { Button } from "../../../components/UI/button.component";
import { Text } from "../../../components/typography/text.component";

export const UploadForm = ({ type, image, onSubmit, isProcessing }) => {
  const formik = useFormik({ initialValues: { identityPhoto: "", identityPhotoTwo: "" }, onSubmit }),
    { setFieldValue } = formik;

  // EFFECTS
  useEffect(() => {
    setFieldValue(type === "frontal" ? "identityPhoto" : "identityPhotoTwo", image);
  }, [type]);

  return (
    <>
      <Image source={{ uri: image.uri }} style={{ width: "100%", height: 130 }} resizeMode="contain" />
      <Button
        icon="file-upload"
        labelStyle={{ color: isProcessing ? "#FFF" : "#676767" }}
        loading={isProcessing}
        disabled={isProcessing}
        onPress={formik.handleSubmit}
        style={{ maxWidth: 250 }}
        labelStyle={{ fontSize: 20 }}
      >
        <Text variant="button" style={{ fontSize: 12 }}>
          Subir documento
        </Text>
      </Button>
    </>
  );
};
