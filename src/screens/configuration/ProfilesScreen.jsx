import { View } from 'react-native'
import React from 'react'

import ProfileItem from '../../components/configuration/ProfileItem'
import AddProfileBtn from '../../components/configuration/AddProfileBtn'
import ProfilesList from '../../components/configuration/ProfilesList'
import { useGetUserProfilesQuery } from '../../services/userData'
import CompanyItem from '../../components/configuration/CompanyItem'
import { useProfile } from '../../hooks/useProfile'
import Screen from '@/components/utils/Screen'
import Text from '@/components/utils/Text'

export default function ProfilesScreen({ navigation, route }) {
  const isConfig = route?.params?.isConfig
  const { data = {}, isFetching } = useGetUserProfilesQuery('getProfiles', { refetchOnFocus: true, refetchOnMountOrArgChange: true })
  const { storeProfile } = useProfile()

  const handleSelect = async profile => {
    try {
      await storeProfile(profile)
      navigation.navigate('Calculator')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Screen>
      <Text className="mt-2">Selecciona el perfil con el que deseas generar tu cambio de divisas</Text>
      <View className="mt-4" />
      <ProfileItem border profile={data.personal} loading={isFetching} onSelect={!isConfig ? handleSelect : null} />
      <View className="mt-3" />
      {data?.favorite && <CompanyItem onSelect={!isConfig ? handleSelect : null} border profile={data?.favorite} />}
      <View className="mt-5" />
      <ProfilesList profiles={data.companies} loading={isFetching} onSelect={!isConfig ? handleSelect : null} />
      <View className="mt-12" />
      <Text variant="titleSmall" className="text-gray-600">
        Agregar perfil empresa
      </Text>
      <Text variant="caption" className="mt-1">
        Si deseas una facturación para una empresa en particular, debes agregarla y seleccionarla como perfil.{' '}
      </Text>
      <View className="mt-5" />
      <AddProfileBtn companies={data.companies?.length || 0} onAdd={() => navigation.navigate('AddProfile')} />
    </Screen>
  )
}
