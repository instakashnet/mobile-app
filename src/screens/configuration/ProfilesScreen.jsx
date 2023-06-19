import { ScrollView, View } from 'react-native'
import React from 'react'
import Container from '../../components/utils/Container'
import { Text } from 'react-native-paper'
import ProfileItem from '../../components/configuration/ProfileItem'
import AddProfileBtn from '../../components/configuration/AddProfileBtn'
import ProfilesList from '../../components/configuration/ProfilesList'
import { useGetUserProfilesQuery, useToggleFavProfileMutation } from '../../services/userData'
import CompanyItem from '../../components/configuration/CompanyItem'
import { useProfile } from '../../hooks/useProfile'

export default function ProfilesScreen({ navigation, route }) {
  const isConfig = route?.params?.isConfig
  const { data = {}, isFetching } = useGetUserProfilesQuery()
  const [toggleFavorite] = useToggleFavProfileMutation()
  const { storeProfile } = useProfile()

  const handleToogleFavorite = async (profileId, values) => {
    try {
      await toggleFavorite({ values, profileId }).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelect = async (profile) => {
    try {
      await storeProfile(profile)
      navigation.navigate('Calculator')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ScrollView>
      <Container>
        <Text className='mt-2'>Selecciona el perfil con el que deseas generar tu cambio de divisas</Text>
        <View className='mt-4' />
        <ProfileItem border profile={data.personal} onSelect={!isConfig ? handleSelect : null} />
        {data?.favorites?.length > 0 && (
          <>
            <View className='mt-4' />
            {data.favorites.map((favoriteProfile) => (
              <CompanyItem onSelect={!isConfig ? handleSelect : null} border key={favoriteProfile.id} profile={favoriteProfile} />
            ))}
          </>
        )}
        <View className='mt-4' />
        <ProfilesList profiles={data.companies} onToggleFav={handleToogleFavorite} onSelect={!isConfig ? handleSelect : null} />
        <View className='mt-12' />
        <Text variant='titleSmall' className='text-gray-600'>
          Agregar perfil empresa
        </Text>
        <Text variant='caption' className='mt-1'>
          Si deseas una facturación para una empresa en particular, debes agregarla y seleccionarla como perfil.{' '}
        </Text>
        <View className='mt-5' />
        <AddProfileBtn companies={data.companies?.length || 0} onAdd={() => navigation.navigate('AddProfile')} />
      </Container>
    </ScrollView>
  )
}
