import React from "react";
import { Dimensions } from "react-native";
import { useFormik } from "formik";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../../../store/actions";

// COMPONENTS
import { SafeArea } from "../../../../components/utils/safe-area.component";
import { KeyboardView } from "../../../../components/utils/keyboard-view.component";
import { Text } from "../../../../components/typography/text.component";
import { DateInput } from "../../../../components/forms/date-input.component";
import { Input } from "../../../../components/forms/input.component";
import { Button } from "../../../../components/UI/button.component";
import { DismissKeyboard } from "../../../../components/utils/dismiss-keyobard.component";
import { FormWrapper, HeaderProfile, ProfileScroll } from "../../components/profile.styles";

export const EditAdditionalScreen = ({ route }) => {
  const dispatch = useDispatch(),
    isProcessing = useSelector((state) => state.profileReducer.isProcessing),
    { user } = route.params;

  // FORMIK
  const formik = useFormik({
    initialValues: {
      profileId: user.profileId,
      type: "natural",
      date_birth: new Date(user.dateBirth) || "",
      address: user.address || "",
      district: "",
      state: "",
      job: user.job || "",
      profession: user.profession || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => dispatch(updateProfile(values)),
  });
  // HANDLERS
  const onDateChange = (date) => formik.setFieldValue("date_birth", new Date(date));

  return (
    <SafeArea>
      <HeaderProfile>
        <Text variant="button" style={{ color: "#FFF" }}>
          Toddos los datos ingresados deben ser reales y serán validados.
        </Text>
      </HeaderProfile>
      <KeyboardView offset={Dimensions.get("screen").height / 9}>
        <ProfileScroll>
          <FormWrapper>
            <DateInput label="Fecha de nacimiento" value={formik.values.date_birth} onChange={onDateChange} />
            <Input name="address" value={formik.values.address} label="Dirección corta" onChange={formik.handleChange("address")} onBlur={formik.handleBlur("address")} />
            <Input name="district" value={formik.values.district} label="Distrito" onChange={formik.handleChange("district")} onBlur={formik.handleBlur("district")} />
            <Input name="state" value={formik.values.state} label="Estado o provincia" onChange={formik.handleChange("state")} onBlur={formik.handleBlur("state")} />
            <Input name="job" value={formik.values.job} label="Ocupación" onChange={formik.handleChange("job")} onBlur={formik.handleBlur("job")} />
            <Input name="profession" value={formik.values.profession} label="Profesión" onChange={formik.handleChange("profession")} onBlur={formik.handleBlur("profession")} />
            <Button onPress={formik.handleSubmit} disabled={!formik.isValid || isProcessing} loading={isProcessing}>
              Completar información
            </Button>
          </FormWrapper>
        </ProfileScroll>
      </KeyboardView>
    </SafeArea>
  );
};
