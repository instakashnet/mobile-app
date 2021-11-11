import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Image } from "react-native";

// COMPONENTS
import { Button } from "../../../components/UI/button.component";
import { Spacer } from "../../../components/utils/spacer.component";

export const UploadForm = ({ type, image, onSubmit, isProcessing }) => {
  const formik = useFormik({ initialValues: { identity_photo: "", identity_photo_two: "" }, onSubmit }),
    { setFieldValue } = formik;

  // EFFECTS
  useEffect(() => {
    setFieldValue(type === "frontal" ? "identity_photo" : "identity_photo_two", image);
  }, [type]);

  return (
    <>
      <Image source={{ uri: image.uri }} style={{ width: "100%", height: 150 }} resizeMode="contain" />
      <Spacer variant="top" />
      <Button icon="file-upload" labelStyle={{ color: "#FFF" }} loading={isProcessing} disabled={isProcessing} onPress={formik.handleSubmit} style={{ maxWidth: 250 }}>
        Subir documento
      </Button>
    </>
  );
};
