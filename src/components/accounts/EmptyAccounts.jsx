import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'

import { EmptyAccount } from '../../../assets/images/illustrations/empty-account'
import Button from '../UI/Button'
import Text from '../utils/Text'
import { ACCOUNT_TYPES } from '@/constants/ACCOUNT_TYPES'

export default function EmptyAccounts({ onAdd, accType }) {
  return (
    <View className="items-center flex-1 justify-center p-6">
      <View className="flex-1 items-center justify-center">
        <EmptyAccount width={250} />
        <Text variant="bodyLarge" className="mt-4 text-center">
          No tienes cuentas agregadas.
        </Text>
        {accType === ACCOUNT_TYPES.TERCERO ? (
          <Text variant="button" className="mt-2">
            Las cuentas de tercero solo sirven para recibir el monto cambiado.
          </Text>
        ) : null}
      </View>
      <Button className="w-full" onPress={onAdd} icon={() => <Ionicons size={25} color="#fff" name="add" />}>
        Agregar cuenta {accType}
      </Button>
      <View className="mt-4" />
      <Text className="text-center">Puedes agregar hasta 20 cuentas entre personales y de terceros.</Text>
    </View>
  )
}
