import { View, Image, SafeAreaView, Pressable, Platform, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { Text, useTheme } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../../../components/UI/Button'
import { getImageBlob } from '../../../helpers/fetchers'
import { useUploadPhotoMutation } from '../../../services/user'
import { selectUser, setUser } from '../../../store/slices/authSlice'

export default function DocumentPreviewScreen({ route, navigation }) {
  const { width, height } = useWindowDimensions()
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadPhoto] = useUploadPhotoMutation()

  const handleUploadPhoto = async (imageUrl = '') => {
    setIsProcessing(true)

    try {
      const photoBlob = await getImageBlob(imageUrl)
      await uploadPhoto({ photo: photoBlob }).unwrap()
      dispatch(setUser({ ...user, documentValidation: 'pending' }))
      navigation.replace('Verifying')
    } catch (error) {
      console.log(error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <View className="flex-1 bg-black p-6">
      <SafeAreaView className="flex-1 w-full items-center justify-center">
        <Pressable className="z-10 absolute left-4 top-4" onPress={navigation.goBack}>
          <Ionicons name={Platform.OS === 'ios' ? 'ios-chevron-back-outline' : 'md-arrow-back-outline'} color="#fff" size={25} />
        </Pressable>
        <View style={{ width, height: height / 2.6, overflow: 'hidden' }}>
          <Image borderRadius={20} source={{ uri: route.params?.photo.uri }} style={{ width, height: '90%' }} resizeMode="contain" />
        </View>
        <Text variant="button" className="text-white text-center">
          Verifica que se vea la información del documento y sube la foto. Caso contrario, Vuelve a tomarla.
        </Text>
        <View className="w-full absolute bottom-10">
          <Button loading={isProcessing} onPress={() => handleUploadPhoto(route.params?.photo.uri)}>
            Subir foto
          </Button>
          <View className="mt-2" />
          <Button
            onPress={navigation.goBack}
            icon={() => <Ionicons name="camera-outline" size={20} color={colors.primary700} />}
            variant="secondary">
            Volver a tomar
          </Button>
        </View>
      </SafeAreaView>
    </View>
  )
}
