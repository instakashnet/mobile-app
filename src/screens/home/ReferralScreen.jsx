import React from 'react'
import { Text } from 'react-native-paper'
import { View, ScrollView } from 'react-native'
import Container from '../../components/utils/Container'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/slices/authSlice'
import CopyButton from '../../components/UI/CopyButton'
import { useGetUserKashQuery } from '../../services/userData'
import KashEarned from '../../components/user/KashEarned'
import Table from '../../components/UI/Table'
import { referrals } from '../../../mocks/referrals'

const columns = [
  { label: 'Usuario', attrs: [] },
  { label: 'Completado', attrs: [] },
]

export default function ReferralScreen({ navigation }) {
  const user = useSelector(selectUser)
  const { data = {}, isLoading } = useGetUserKashQuery(true)

  return (
    <ScrollView>
      <Container>
        <Text variant="titleLarge" className="mb-2 text-gray-700">
          Refiere a un amigo
        </Text>
        <Text>
          Copia tu código mostrado y compártelo con tus amigos. Cuando uno de tus referidos complete su primer cambio, ganarás 2 KASH.
        </Text>
        <View className="w-full flex-row items-center justify-between p-2 px-3 bg-white border-2 border-[#0d8284] border-dashed rounded-lg mt-6">
          <Text className="text-gray-500">{user.username}</Text>
          <CopyButton textToCopy="Hola" />
        </View>
        <View className="mt-10" />
        <Text variant="button" className="mb-2">
          KASH acumulados
        </Text>
        <KashEarned
          kashInfo={data}
          loading={isLoading}
          onPress={() => navigation.navigate('WithdrawKash', { kashAmount: data?.kash })}
          canWithdraw
        />
        <View className="mt-6" />
        <Text variant="button" className="mb-2">
          Mis referidos
        </Text>

        <View className="bg-white rounded-lg w-full p-2">
          <Table rows={referrals} />
        </View>
      </Container>
    </ScrollView>
  )
}
