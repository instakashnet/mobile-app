import { Dimensions, Platform, Pressable, SafeAreaView, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import { Camera, CameraType, ImageType } from 'expo-camera'
import React, { useRef } from 'react'
import { useUpdate } from '../../../hooks/useUpdate'
import { Text } from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native'
import Mask from 'react-native-barcode-mask'
import { Ionicons } from '@expo/vector-icons'
import { manipulateAsync } from 'expo-image-manipulator'
import { useCameraRatio } from '../../../hooks/useCameraRatio'

export default function DocumentCameraScreen({ navigation }) {
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const { ratio, isRatioSet, prepareRatio } = useCameraRatio()
  const { width, height } = useWindowDimensions()
  const isFocused = useIsFocused()
  const cameraRef = useRef(null)
  const documentWidth = width / 1.1
  const documentHeight = height / 3.4

  useUpdate(() => {
    const requestCameraPermissions = async () => {
      try {
        await requestPermission()
      } catch (error) {
        console.log(error)
      }
    }

    if (!permission?.granted && permission?.canAskAgain) {
      requestCameraPermissions()
    }
  }, [permission])

  const handleTakePhoto = async () => {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current?.takePictureAsync({
          exif: false,
          imageType: ImageType.jpg
        })

        const image = await manipulateAsync(photo?.uri, [
          {
            crop: {
              width: photo?.width,
              height: photo?.height / 2.85,
              originX: 0,
              originY: photo?.height / 2.85
            }
          }
        ])

        return navigation.navigate('DocumentPreview', { photo: image })
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (!permission?.granted)
    return (
      <View className='flex-1 items-center justify-center px-3'>
        <Text className='text-center'>Debes aceptar los permisos de la cámara para poder validar tu documento.</Text>
      </View>
    )

  return isFocused ? (
    <Camera ratio={'16:9'} style={StyleSheet.absoluteFill} ref={cameraRef} type={CameraType.back}>
      <SafeAreaView className='flex-1'>
        <Mask width={documentWidth} height={documentHeight} showAnimatedLine={false} />
        <Pressable className='z-10 p-6' onPress={navigation.goBack}>
          <Ionicons name={Platform.OS === 'ios' ? 'ios-chevron-back-outline' : 'md-arrow-back-outline'} color='#fff' size={25} />
        </Pressable>
        <View className='flex-1 justify-end mb-[75px]'>
          <Text variant='button' className='text-white text-center flex-wrap'>
            Ubica el <Text className='text-yellow-300'>documento</Text> dentro del marco.
          </Text>
        </View>
        <View className='self-center bottom-3 w-[75px] h-[75px] rounded-full border-[4px] p-1 border-white items-center justify-center'>
          <TouchableOpacity className='w-full h-full bg-white rounded-full' onPress={handleTakePhoto} activeOpacity={0.3} />
        </View>
      </SafeAreaView>
    </Camera>
  ) : null
}
