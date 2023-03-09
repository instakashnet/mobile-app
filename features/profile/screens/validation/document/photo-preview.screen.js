import React, { useEffect } from 'react';
import { TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeArea } from '../../../../../components/utils/safe-area.component';
import { MaterialIcons } from '@expo/vector-icons';
import { Alert } from '../../../../../components/UI/alert.component';
import { Text } from '../../../../../components/typography/text.component';
import { useDispatch, useSelector } from 'react-redux';
import { uploadDocument } from '../../../../../store/actions';
import { CameraLoader, LoaderWrapper } from '../../../components/camera.styles';
import { clearProfileError } from '../../../../../store/actions';
import { Button } from '../../../../../components/UI/button.component';

export default function PhotoPreviewScreen({ navigation, route }) {
  const params = route.params,
    { isProcessing, profileError } = useSelector((state) => state.profileReducer),
    { height, width } = Dimensions.get('window'),
    dispatch = useDispatch();

  const onConfirm = async () => {
    try {
      dispatch(uploadDocument({ frontPhoto: params?.photo.uri }, params?.documentType));
    } catch (error) {
      console.log(error);
    }
  };

  const onRetry = () => navigation.push('Camera');

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.push('ValidateDocument')}>
          <MaterialIcons name='close' color='#0d8284' size={30} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <SafeArea>
      <Image source={{ uri: params?.photo.uri }} style={{ height: height / 2, width: width / 1.5, borderRadius: 12, overflow: 'hidden', marginTop: 25 }} resizeMode='cover' />
      <Text style={{ textAlign: 'center', marginTop: 40, fontSize: 24, lineHeight: 24 }} variant='title'>
        Confirma la foto
      </Text>
      <Text style={{ textAlign: 'center', color: '#676767', fontSize: 18, lineHeight: 24, paddingHorizontal: 12, marginBottom: 12 }} variant='bold'>
        ¿La imagen está clara y y todos los datos se ven correctamente?
      </Text>

      {isProcessing ? (
        <LoaderWrapper>
          <CameraLoader />
          <Text style={{ color: '#676767', fontSize: 18, lineHeight: 24 }}>Subiendo fotos...</Text>
        </LoaderWrapper>
      ) : (
        <>
          <Button onPress={onConfirm}>Si, se ve bien</Button>
          <Button variant='secondary' onPress={onRetry}>
            Reintentar
          </Button>
        </>
      )}
      <Alert type='error' onClose={clearProfileError} visible={!!profileError}>
        {profileError}
      </Alert>
    </SafeArea>
  );
}
