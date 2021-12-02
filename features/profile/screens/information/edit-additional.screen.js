import React from "react";
import { ScrollView } from "react-native";

// FORMIK
import { useFormik } from "formik";
import { editAdditionalsSchema } from "../../validations/schemas";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, clearProfileError } from "../../../../store/actions";

// COMPONENTS
import { SafeArea } from "../../../../components/utils/safe-area.component";
import { DismissKeyboard } from "../../../../components/utils/dismiss-keyobard.component";
import { Text } from "../../../../components/typography/text.component";
import { DateInput } from "../../../../components/forms/date-input.component";
import { Input } from "../../../../components/forms/input.component";
import { Button } from "../../../../components/UI/button.component";
import { Alert } from "../../../../components/UI/alert.component";

// STYLED COMPONENTS
import { FormWrapper, HeaderProfile, GooglePlacesInput, ProfileWrapper } from "../../components/profile.styles";

// VARIABLES
import { getVariables } from "../../../../variables";
const { googlePlacesKey } = getVariables();

export const EditAdditionalScreen = ({ route }) => {
  const dispatch = useDispatch(),
    { isProcessing, profileError } = useSelector((state) => state.profileReducer),
    { user } = route.params;

  // FORMIK
  const formik = useFormik({
    initialValues: {
      profileId: user.profileId,
      type: "natural",
      date_birth: user.dateBirth || "",
      address: user.address || "",
      job: user.job || "",
      profession: user.profession || "",
    },
    enableReinitialize: true,
    validationSchema: editAdditionalsSchema,
    onSubmit: (values) => dispatch(updateProfile(values)),
  });
  // HANDLERS
  const onDateChange = async (date) => {
    await formik.setFieldValue("date_birth", date);
    formik.setFieldTouched("date_birth", true);
  };

  return (
    <SafeArea>
      <HeaderProfile>
        <Text numberOfLines={2} variant="button" style={{ color: "#FFF" }}>
          Toddos los datos ingresados deben ser reales y serán validados.
        </Text>
      </HeaderProfile>
      <DismissKeyboard>
        <ProfileWrapper>
          <FormWrapper>
            <DateInput
              error={formik.touched.date_birth && formik.errors.date_birth}
              label="Fecha de nacimiento"
              value={formik.values.date_birth}
              maximumDate={new Date()}
              onChange={onDateChange}
            />
            <GooglePlacesInput
              debounce={500}
              nearbyPlacesAPI="GooglePlacesSearch"
              placeholder="Dirección corta"
              query={{ key: googlePlacesKey, language: "es" }}
              enablePoweredByContainer={false}
              onFail={(error) => console.log(error)}
              onPress={(data) => formik.setFieldValue("address", data.description)}
            />

            <Input
              name="job"
              error={formik.touched.job && formik.errors.job}
              value={formik.values.job}
              label="Ocupación"
              onChange={formik.handleChange("job")}
              onBlur={formik.handleBlur("job")}
            />
            <Input
              name="profession"
              error={formik.touched.profession && formik.errors.profession}
              value={formik.values.profession}
              label="Profesión"
              onChange={formik.handleChange("profession")}
              onBlur={formik.handleBlur("profession")}
            />
            <Button onPress={formik.handleSubmit} disabled={!formik.isValid || isProcessing} loading={isProcessing}>
              Completar información
            </Button>
          </FormWrapper>
        </ProfileWrapper>
      </DismissKeyboard>

      <Alert type="error" onClose={clearProfileError} visible={!!profileError}>
        {profileError}
      </Alert>
    </SafeArea>
  );
};
