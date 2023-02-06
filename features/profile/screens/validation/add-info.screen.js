import React from 'react';

// FORMIK
import { useFormik } from 'formik';
import { editAdditionalsSchema } from '../../validations/schemas';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { clearProfileError, updateProfile } from '../../../../store/actions';

// COMPONENTS
import { DateInput } from '../../../../components/forms/date-input.component';
import { Input } from '../../../../components/forms/input.component';
import { Text } from '../../../../components/typography/text.component';
import { Alert } from '../../../../components/UI/alert.component';
import { Button } from '../../../../components/UI/button.component';
import { DismissKeyboard } from '../../../../components/utils/dismiss-keyobard.component';
import { KeyboardView } from '../../../../components/utils/keyboard-view.component';
import { SafeArea } from '../../../../components/utils/safe-area.component';

// STYLED COMPONENTS
import { FormWrapper, HeaderProfile, ProfileInfoWrapper } from '../../components/profile.styles';

// VARIABLES

export const AddInfoScreen = () => {
  const dispatch = useDispatch(),
    user = useSelector((state) => state.authReducer.user),
    { isProcessing, profileError } = useSelector((state) => state.profileReducer);

  // FORMIK
  const formik = useFormik({
    initialValues: {
      profileId: user?.profileId,
      type: 'natural',
      date_birth: '',
      job: '',
      profession: '',
    },
    enableReinitialize: true,
    validationSchema: editAdditionalsSchema,
    onSubmit: (values) => dispatch(updateProfile(values)),
  });
  // HANDLERS
  const onDateChange = async (date) => {
    await formik.setFieldValue('date_birth', date);
    formik.setFieldTouched('date_birth', true);
  };

  return (
    <SafeArea>
      <HeaderProfile>
        <Text numberOfLines={2} variant='button' style={{ color: '#FFF' }}>
          Toddos los datos ingresados deben ser reales y serán validados.
        </Text>
      </HeaderProfile>
      <KeyboardView>
        <DismissKeyboard>
          <ProfileInfoWrapper>
            <FormWrapper>
              <DateInput
                error={formik.touched.date_birth && formik.errors.date_birth}
                label='Fecha de nacimiento'
                value={formik.values.date_birth}
                maximumDate={new Date()}
                onChange={onDateChange}
              />
              <Input
                name='job'
                error={formik.touched.job && formik.errors.job}
                value={formik.values.job}
                label='Ocupación'
                onChange={formik.handleChange('job')}
                onBlur={formik.handleBlur('job')}
              />
              <Input
                name='profession'
                error={formik.touched.profession && formik.errors.profession}
                value={formik.values.profession}
                label='Profesión'
                onChange={formik.handleChange('profession')}
                onBlur={formik.handleBlur('profession')}
              />
              <Button onPress={formik.handleSubmit} disabled={!formik.isValid || isProcessing} loading={isProcessing}>
                Completar información
              </Button>
            </FormWrapper>
          </ProfileInfoWrapper>
        </DismissKeyboard>
      </KeyboardView>

      <Alert type='error' onClose={clearProfileError} visible={!!profileError}>
        {profileError}
      </Alert>
    </SafeArea>
  );
};
