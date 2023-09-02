import { SafeAreaView, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import { Camera, CameraType, ImageType } from 'expo-camera'
import React, { useRef } from 'react'
import { manipulateAsync } from 'expo-image-manipulator'
import { useIsFocused } from '@react-navigation/native'
import Mask from 'react-native-barcode-mask'

import Button from '../../../components/UI/Button'
import SafeArea from '../../../components/utils/SafeArea'
import Container from '../../../components/utils/Container'
import { openAppSetting } from '../../../utils/handlers'
import { useCameraPermissions } from '../../../hooks/camera/useCameraPermissions'
import Text from '@/components/utils/Text'
// import { useCameraRatio } from '../../../hooks/useCameraRatio'

export default function DocumentCameraScreen({ navigation }) {
  // const { ratio, isRatioSet, prepareRatio } = useCameraRatio()
  const { permission } = useCameraPermissions()
  const { width, height } = useWindowDimensions()
  const isFocused = useIsFocused()
  const cameraRef = useRef(null)
  const documentWidth = width / 1.1
  const documentHeight = height / 3.4

  const handleTakePhoto = async () => {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current?.takePictureAsync({
          exif: false,
          imageType: ImageType.jpg,
          quality: 0.85,
          comppress: true,
        })

        const image = await manipulateAsync(
          photo?.uri,
          [
            {
              crop: {
                width: photo?.width,
                height: photo?.height / 2.85,
                originX: 0,
                originY: photo?.height / 2.85,
              },
            },
          ],
          { base64: true, format: 'jpeg' },
        )

        return navigation.navigate('DocumentPreview', { photo: image })
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (!permission || !permission.granted)
    return (
      <SafeArea>
        <Container>
          <View className="flex-1 items-center justify-center">
            <Text variant="titleSmall" className="text-center mb-4">
              Debes habilitar tu cámara para poder realizar el proceso de validación de tu documento.
            </Text>
          </View>
          <View className="mt-auto" />
          <Button onPress={openAppSetting}>Habilitar cámara</Button>
          <View className="mt-3" />
          <Button variant="secondary" onPress={() => navigation.popToTop()}>
            Volver al inicio
          </Button>
        </Container>
      </SafeArea>
    )

  return isFocused ? (
    <Camera ratio="16:9" style={StyleSheet.absoluteFill} ref={cameraRef} type={CameraType.back}>
      <SafeAreaView className="flex-1">
        <Mask width={documentWidth} height={documentHeight} showAnimatedLine={false} />
        <View className="flex-1 justify-end mb-[75px]">
          <Text variant="button" className="text-white text-center flex-wrap">
            Ubica el <Text className="text-yellow-300">documento</Text> dentro del marco.
          </Text>
        </View>
        <View className="self-center bottom-3 w-[75px] h-[75px] rounded-full border-[4px] p-1 border-white items-center justify-center">
          <TouchableOpacity className="w-full h-full bg-white rounded-full" onPress={handleTakePhoto} activeOpacity={0.3} />
        </View>
      </SafeAreaView>
    </Camera>
  ) : null
}
