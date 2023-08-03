import { View, Image, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { Text, useTheme } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../../../components/UI/Button'
// import { getImageBlob } from '../../../helpers/fetchers'
import { useUploadPhotoMutation } from '../../../services/user'
import { selectUser, setUser } from '../../../store/slices/authSlice'
import Screen from '@/components/utils/Screen'

export default function DocumentPreviewScreen({ route, navigation }) {
  const { width, height } = useWindowDimensions()
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadPhoto] = useUploadPhotoMutation()

  const handleUploadPhoto = async image => {
    setIsProcessing(true)

    try {
      const base64Photo = `data:image/jpeg;base64,${image.base64}`
      console.log({ base64Photo })
      const formData = new FormData()
      formData.append('photo', base64Photo)
      // const photoBlob = await getImageBlob(imageUrl)
      await uploadPhoto(formData).unwrap()
      // dispatch(setUser({ ...user, documentValidation: 'pending' }))
      // navigation.replace('Verifying')
    } catch (error) {
      console.log(error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <View className="flex-1 bg-black">
      <Screen containerClasses="items-center">
        <View style={{ width, height: height / 2.6, overflow: 'hidden' }}>
          <Image borderRadius={20} source={{ uri: route.params?.photo.uri }} style={{ width, height: '90%' }} resizeMode="contain" />
        </View>
        <Text variant="button" className="text-white text-center">
          Verifica que se vea la información del documento y sube la foto. Caso contrario, Vuelve a tomarla.
        </Text>
        <View className="w-full absolute bottom-10">
          <Button loading={isProcessing} onPress={() => handleUploadPhoto(route.params?.photo)}>
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
      </Screen>
    </View>
  )
}
