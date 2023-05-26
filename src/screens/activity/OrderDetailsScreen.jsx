import { Image, View } from 'react-native'
import React from 'react'
import SafeArea from '../../components/utils/SafeArea'
import { Text, useTheme } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import StatusBadge from '../../components/UI/StatusBadge'
import CopyButton from '../../components/UI/CopyButton'
import OrderInfoSection from '../../components/orders/OrderInfoSection'
import { formatDate } from '../../helpers/formatters'
import Button from '../../components/UI/Button'

export default function OrderDetailsScreen({ route, navigation }) {
  const order = route.params?.order
  const { colors } = useTheme()

  return (
    <SafeArea>
      <View className='flex-1 p-6'>
        <OrderInfoSection title='Estado:'>
          <StatusBadge status={order?.status} />
        </OrderInfoSection>
        <View className='mt-6' />
        <OrderInfoSection title='No. orden:'>
          <View className='flex-row items-center'>
            <Text className='mr-2'>{order?.orderId}</Text>
            <View className='p-1 rounded-lg bg-gray-200'>
              <CopyButton icon={<Ionicons name='copy' size={15} color='#444' />} textToCopy={order?.orderId} />
            </View>
          </View>
        </OrderInfoSection>
        <View className='mt-6' />
        <OrderInfoSection title='Fecha:'>
          <Text>{formatDate(order?.date, { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
        </OrderInfoSection>
        <View className='mt-6' />
        <OrderInfoSection title='Monto solicitado:'>
          <Text variant='titleSmall' style={{ color: colors.primary700 }}>
            {order?.amountToReceive}
          </Text>
        </OrderInfoSection>
        <View className='mt-6' />
        <OrderInfoSection title='Tipo de cambio:'>
          <Text>{order?.rate}</Text>
        </OrderInfoSection>
        <View className='mt-6' />
        <Text variant='button'>Cuenta a recibir:</Text>
        <View className='mt-2' />
        <OrderInfoSection
          title={<Image source={require('../../../assets/images/banks/interbank-logo.png')} className='w-20 h-6' resizeMode='contain' />}
        >
          <Text>{order?.accToSend}</Text>
        </OrderInfoSection>
        <View className='mt-auto'>
          <Button variant='secondary' onPress={() => navigation.goBack()}>
            Regresar
          </Button>
        </View>
      </View>
    </SafeArea>
  )
}
