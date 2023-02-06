import React, { useEffect, useState } from 'react';

// FORMIK
import { useFormik } from 'formik';
import { addAddressSchema } from '../../validations/schemas';
import { provincias } from '../../../../data/address.data';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { clearProfileError, addAddress } from '../../../../store/actions';

// COMPONENTS
import { Input } from '../../../../components/forms/input.component';
import { Select } from '../../../../components/forms/select.component';
import { Text } from '../../../../components/typography/text.component';
import { Alert } from '../../../../components/UI/alert.component';
import { Button } from '../../../../components/UI/button.component';
import { DismissKeyboard } from '../../../../components/utils/dismiss-keyobard.component';
import { KeyboardView } from '../../../../components/utils/keyboard-view.component';
import { SafeArea } from '../../../../components/utils/safe-area.component';

// STYLED COMPONENTS
import { FormWrapper, HeaderProfile, ProfileInfoWrapper } from '../../components/profile.styles';

// VARIABLES

export const AddAddressScreen = () => {
  const dispatch = useDispatch(),
    [provinces, setProvinces] = useState([]),
    [districts, setDistricts] = useState([]),
    user = useSelector((state) => state.authReducer.user),
    { isProcessing, profileError } = useSelector((state) => state.profileReducer);

  // FORMIK
  const formik = useFormik({
    initialValues: {
      profileId: user?.profileId,
      city: '',
      district: '',
      address: '',
    },
    enableReinitialize: true,
    validationSchema: addAddressSchema,
    onSubmit: (values) => dispatch(addAddress(values)),
  });
  const { city } = formik.values;

  useEffect(() => {
    if (provincias.length) {
      setProvinces(
        provincias.map((province) => ({
          label: province.provincia,
          value: province.provincia,
        })),
      );
    }
  }, []);

  useEffect(() => {
    if (city) {
      let selectedCity = provincias.find((p) => p.provincia === city);

      setDistricts(
        selectedCity.distritos.map((dist) => ({
          label: dist,
          value: dist,
        })),
      );
    } else {
      setDistricts([]);
    }
  }, [city]);

  const handleSelect = (name, value) => formik.setFieldValue(name, value);

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
              <Select name='city' value={formik.values.city} error={formik.touched.city && formik.errors.city} options={provinces} label='Ciudad' onChange={handleSelect} />
              <Select
                name='district'
                value={formik.values.district}
                error={formik.touched.district && formik.errors.district}
                options={districts}
                label='Distrito'
                onChange={handleSelect}
              />
              <Input
                name='address'
                error={formik.touched.address && formik.errors.address}
                value={formik.values.address}
                label='Dirección de residencia'
                onChange={formik.handleChange('address')}
                onBlur={formik.handleBlur('address')}
              />
              <Button onPress={formik.handleSubmit} disabled={!formik.isValid || isProcessing} loading={isProcessing}>
                Agregar dirección
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
