import { View } from 'react-native'
import React from 'react'

import SafeArea from '../../components/utils/SafeArea'
import { SecureMoney } from '../../../assets/images/illustrations/secure-money'
import Button from '../../components/UI/Button'
import { usePollverificiation } from '../../hooks/usePollVerification'
import Text from '@/components/utils/Text'

export default function VerifyingScreen({ navigation }) {
  usePollverificiation()

  return (
    <SafeArea>
      <View className="flex-1 items-center justify-center p-6">
        <View className="flex-1 items-center justify-center">
          <SecureMoney width={125} />
          <Text variant="titleLarge" className="text-center mt-6">
            Estamos Verificando tu documento
          </Text>
          <Text className="text-center mt-3">
            Recibirás un correo una vez finalizado el proceso. Si la verificación se procesa exitosamente podrás empezar a cambiar.
          </Text>
        </View>
        <View className="w-full">
          <Button
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
              })
            }>
            Volver al inicio
          </Button>
        </View>
      </View>
    </SafeArea>
  )
}
