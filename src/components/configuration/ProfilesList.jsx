import React, { Fragment, useState } from 'react'
import { List, Text } from 'react-native-paper'
import { View } from 'react-native'

import CompanyItem from './CompanyItem'
import { useRemoveProfileMutation, useToggleFavProfileMutation } from '../../services/userData'
import Skeleton from '../UI/Skeleton'

export default function ProfilesList({ profiles = [], onSelect, loading }) {
  const [expanded, setExpanded] = useState(false)
  const [removeProfile, { isLoading: isProcessing }] = useRemoveProfileMutation()
  const [toggleFavorite, { isLoading: toggleProcessing }] = useToggleFavProfileMutation()
  const handlePress = () => setExpanded(prev => !prev)

  const handleRemoveProfile = async profileId => {
    try {
      await removeProfile(profileId).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  const handleToogleFavorite = async (profileId, values) => {
    try {
      await toggleFavorite({ values, profileId }).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <List.Section>
      <List.Accordion
        title={<Text>Perfiles empresa</Text>}
        className="rounded-lg border-[1px] border-[#F0F0F0] bg-white p-0 pr-3"
        expanded={loading || expanded}
        onPress={handlePress}>
        {loading ? (
          <View className="px-2 flex-row items-center mt-3">
            <Skeleton height={50} width={50} borderRadius={100} />
            <View className="ml-3" />
            <Skeleton height={30} width={120} />
          </View>
        ) : (
          profiles.map(profile => (
            <Fragment key={profile.id}>
              <List.Item
                className="p-0 bg-white"
                title={
                  <CompanyItem
                    profile={profile}
                    onSelect={onSelect}
                    onToggleFav={() => handleToogleFavorite(profile.id, { isFavorite: !profile.isFavorite })}
                    onDelete={() => handleRemoveProfile(profile.id)}
                    processing={isProcessing || toggleProcessing}
                  />
                }
              />
              <View className="w-full border-[1px] border-gray-100" />
            </Fragment>
          ))
        )}
      </List.Accordion>
    </List.Section>
  )
}
