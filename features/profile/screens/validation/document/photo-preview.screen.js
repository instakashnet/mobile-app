import React from 'react';
import { ImageBackground, View, TouchableOpacity } from 'react-native';
import { SafeArea } from '../../../../../components/utils/safe-area.component';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert } from '../../../../../components/UI/alert.component';
import { Text } from '../../../../../components/typography/text.component';
import { Spacer } from '../../../../../components/utils/spacer.component';
import { getFromStore, saveInStore } from '../../../../../shared/helpers/async-store';
import { useDispatch, useSelector } from 'react-redux';
import { uploadDocument } from '../../../../../store/actions';
import { BottomOverlay, CameraLoader, CameraSquare, CameraWrapper, LoaderWrapper, TopOverlay, VerticalOverlay } from '../../../components/camera.styles';
import { clearProfileError } from '../../../../../store/actions';

export default function PhotoPreviewScreen({ navigation, route }) {
  const params = route.params,
    { isProcessing, profileError } = useSelector((state) => state.profileReducer),
    dispatch = useDispatch();

  const onConfirm = async () => {
    try {
      if (params?.documentType !== 'pasaporte') {
        if (params?.photoSide !== 'trasera') {
          await saveInStore('@frontPhoto', params?.photo);
          return navigation.navigate('Camera', { photoSide: 'trasera' });
        } else {
          const frontPhoto = await getFromStore('@frontPhoto');

          dispatch(uploadDocument({ frontPhoto: frontPhoto.uri, backPhoto: params?.photo.uri }, params?.documentType));
        }
      } else {
        dispatch(uploadDocument({ frontPhoto: params?.photo.uri }, params?.documentType));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRetry = () => {
    navigation.navigate('Camera', { photoSide: params?.photoSide });
  };

  return (
    <ImageBackground source={{ uri: params?.photo.uri }} style={{ flex: 1, width: '100%', height: '100%' }}>
      <TopOverlay>
        <SafeArea>
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', top: 30, right: 20 }}>
            <TouchableOpacity onPress={() => navigation.navigate('ValidateDocument')}>
              <MaterialIcons name='close' color='#FFF' size={30} />
            </TouchableOpacity>
          </View>
        </SafeArea>
      </TopOverlay>

      <CameraWrapper>
        <VerticalOverlay />
        <CameraSquare />
        <VerticalOverlay />
      </CameraWrapper>

      <BottomOverlay>
        {isProcessing ? (
          <LoaderWrapper>
            <CameraLoader />
            <Text style={{ color: '#FFF' }}>Subiendo fotos...</Text>
          </LoaderWrapper>
        ) : (
          <>
            <Text style={{ color: '#FFF', textAlign: 'center', marginVertical: 20 }}>¿Se vé la imagen clara y y todos los datos se ven correctamente?</Text>
            <SafeArea>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15 }} onPress={onConfirm}>
                  <MaterialCommunityIcons name='check-circle' color='#0D8284' size={22} />
                  <Spacer variant='left' />
                  <Text style={{ color: '#FFF' }}>Si, se ve bien</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15 }} onPress={onRetry}>
                  <MaterialCommunityIcons name='backspace-reverse' color='#FFF' size={22} />
                  <Spacer variant='left' />
                  <Text style={{ color: '#FFF' }}>Reintentar</Text>
                </TouchableOpacity>
              </View>
            </SafeArea>
          </>
        )}
      </BottomOverlay>

      <Alert type='error' onClose={clearProfileError} visible={!!profileError}>
        {profileError}
      </Alert>
    </ImageBackground>
  );
}
