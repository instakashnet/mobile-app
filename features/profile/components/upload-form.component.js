import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Image } from "react-native";

// COMPONENTS
import { Button } from "../../../components/UI/button.component";
import { Spacer } from "../../../components/utils/spacer.component";

export const UploadForm = ({ type, image, user, onSubmit, isProcessing }) => {
  const formik = useFormik({ initialValues: { identityPhoto: "", identityPhotoTwo: "" }, onSubmit }),
    { setFieldValue } = formik;

  // EFFECTS
  useEffect(() => {
    setFieldValue(type === "frontal" ? "identityPhoto" : "identityPhotoTwo", image);
  }, [type]);

  return (
    <>
      <Image source={{ uri: image.uri }} style={{ width: "100%", height: 150 }} resizeMode="contain" />
      <Spacer variant="top" />
      <Button
        icon="file-upload"
        labelStyle={{ color: isProcessing ? "#FFF" : "#676767" }}
        loading={isProcessing}
        disabled={isProcessing}
        onPress={formik.handleSubmit}
        style={{ maxWidth: 250 }}
      >
        Subir documento
      </Button>
    </>
  );
};
