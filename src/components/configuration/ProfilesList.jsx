import React, { Fragment, useState } from 'react'
import { List, Text } from 'react-native-paper'
import CompanyItem from './CompanyItem'
import { View } from 'react-native'
import { useRemoveProfileMutation } from '../../services/userData'

export default function ProfilesList({ profiles = [], onToggleFav, onSelect }) {
  const [expanded, setExpanded] = useState(false)
  const [removeProfile, { isLoading }] = useRemoveProfileMutation()
  const handlePress = () => setExpanded((prev) => !prev)

  const handleRemoveProfile = async (profileId) => {
    try {
      await removeProfile(profileId).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <List.Section>
      <List.Accordion
        title={<Text>Perfiles empresa</Text>}
        className='rounded-lg border-[1px] border-[#F0F0F0] bg-white p-0 pr-3'
        expanded={expanded}
        onPress={handlePress}
      >
        {profiles.map((profile) => (
          <Fragment key={profile.id}>
            <List.Item
              className='p-0 bg-white'
              title={
                <CompanyItem
                  profile={profile}
                  onSelect={onSelect}
                  onToggleFav={() => onToggleFav(profile.id, { isFavorite: !profile.isFavorite })}
                  onDelete={() => handleRemoveProfile(profile.id)}
                />
              }
            />
            <View className='w-full border-[1px] border-gray-100' />
          </Fragment>
        ))}
      </List.Accordion>
    </List.Section>
  )
}
