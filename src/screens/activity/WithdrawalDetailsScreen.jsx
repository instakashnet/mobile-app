import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

import OrderInfoSection from '../../components/orders/OrderInfoSection'
import Button from '../../components/UI/Button'
import CopyButton from '../../components/UI/CopyButton'
import StatusBadge from '../../components/UI/StatusBadge'
import SafeArea from '../../components/utils/SafeArea'
import { formatDate } from '../../helpers/formatters'

export default function WithdrawalDetails({ route, navigation }) {
  const withdrawal = route.params?.withdrawal
  const { colors } = useTheme()

  console.log({ withdrawal })

  return (
    <SafeArea>
      <View className="flex-1 p-6">
        {/* <OrderInfoSection title="Estado:">
          <StatusBadge status={order?.status} />
        </OrderInfoSection>
        <View className="mt-6" />
        <OrderInfoSection title="No. orden:">
          <View className="flex-row items-center">
            <Text className="mr-2">{order?.orderId}</Text>
            <View className="p-1 rounded-lg bg-gray-200">
              <CopyButton icon={<Ionicons name="copy" size={15} color="#444" />} textToCopy={order?.orderId} />
            </View>
          </View>
        </OrderInfoSection>
        <View className="mt-6" />
        <OrderInfoSection title="Fecha:">
          <Text>{formatDate(order?.date, 'DD/MM/YYYY')}</Text>
        </OrderInfoSection>
        <View className="mt-6" />
        <OrderInfoSection title="Monto solicitado:">
          <Text variant="titleSmall" style={{ color: colors.primary700 }}>
            {order?.amountToReceive}
          </Text>
        </OrderInfoSection>
        <View className="mt-6" />
        <OrderInfoSection title="Tipo de cambio:">
          <Text>{order?.rate}</Text>
        </OrderInfoSection>
        <View className="mt-6" />
        <Text variant="button">Cuenta a recibir:</Text>
        <View className="mt-2" />
        <OrderInfoSection
          title={<Image source={require('../../../assets/images/banks/interbank-logo.png')} className="w-20 h-6" resizeMode="contain" />}>
          <Text>{order?.accToSend}</Text>
        </OrderInfoSection>
        <View className="mt-auto">
          {order?.status?.id === 2 && <Button onPress={() => navigation.navigate('Exchange')}>Completar operación</Button>}
          <Button className="mt-3" variant="secondary" onPress={() => navigation.goBack()}>
            Regresar
          </Button>
        </View> */}
      </View>
    </SafeArea>
  )
}
