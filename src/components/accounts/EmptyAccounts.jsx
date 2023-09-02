import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'

import { EmptyAccount } from '../../../assets/images/illustrations/empty-account'
import Button from '../UI/Button'
import Text from '../utils/Text'

export default function EmptyAccounts({ navigate }) {
  return (
    <View className="items-center flex-1 justify-center p-6">
      <EmptyAccount width={250} />
      <Text variant="bodyLarge" className="mt-4 text-center">
        No tienes cuentas agregadas. Agrega una cuenta en soles o en dólares para tus cambios.
      </Text>
      <View className="mt-4" />
      <Button
        onPress={() => navigate('AccountForm', { name: 'Agregar cuenta' })}
        icon={() => <Ionicons size={25} color="#fff" name="add" />}>
        Agregar cuenta
      </Button>
      <View className="mt-4" />
      <Text className="text-center">Puedes agregar hasta 20 cuentas propias o de tu(s) empresa(s).</Text>
    </View>
  )
}
