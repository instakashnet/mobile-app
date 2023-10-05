import { Ionicons } from '@expo/vector-icons'
import * as Linking from 'expo-linking'
import { Pressable, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { useCompleteExchangeMutation } from '../../services/exchange'
import Banner from '../UI/Banner'
import Button from '../UI/Button'
import Card from '../UI/Card'
import CopyButton from '../UI/CopyButton'
import Text from '../utils/Text'

function EmailVoucherInfo({ order, onComplete, onPressBack }) {
  const { colors } = useTheme()
  const [completeExchange, { isLoading }] = useCompleteExchangeMutation()

  const handleTermsAndConditions = async () => {
    try {
      await Linking.openURL('https://instakash.net/terminos-y-condiciones/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleComplete = async () => {
    try {
      await completeExchange({ orderId: order?.id, values: { transactionCode: 'INTERBANCARIO' } }).unwrap()
      onComplete()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View className="flex-1 h-full">
      <Text variant="titleLarge" className="text-center mb-1">
        Envianos tu comprobante
      </Text>
      <Text className="text-center">
        Envianos tu comprobante de pago <Text variant="button">desde la APP de tu banco SCOTIABANK.</Text>
      </Text>
      <Card cardClasses="my-4 py-6 flex-row items-center justify-between">
        <Text variant="titleSmall">pagos@instakash.net</Text>
        <CopyButton textToCopy="pagos@instakash.net" icon={<Ionicons name="copy-outline" color={colors.primary700} size={16} />} />
      </Card>
      <Banner type="info">
        <Text>
          Recuerda que <Text variant="button">las transferencias interbancarias pueden demorar de 24 a 48 horas.</Text> Te invitamos a
          informarte en nuestros{' '}
          <Pressable onPress={handleTermsAndConditions}>
            <Text className="underline" style={{ color: colors.primary700 }}>
              términos y condiciones.
            </Text>
          </Pressable>
        </Text>
      </Banner>
      <View className="mt-14" />
      <Button onPress={handleComplete} loading={isLoading}>
        Completar solicitud
      </Button>
      <View className="mt-4" />
      <Button variant="secondary" onPress={onPressBack}>
        Regresar
      </Button>
    </View>
  )
}

export default EmailVoucherInfo
