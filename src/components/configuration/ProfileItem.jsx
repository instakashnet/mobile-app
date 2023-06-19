import { Pressable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Card from '../UI/Card'
import { MaleProfileIcon } from '../../../assets/images/illustrations/male-profile'
import { Text, useTheme } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { FemaleProfileIcon } from '../../../assets/images/illustrations/female-profile'

export default function ProfileItem({ profile = {}, onSelect }) {
  const { colors } = useTheme()

  const Icon = profile?.identitySex === 'male' ? MaleProfileIcon : FemaleProfileIcon

  return (
    <Pressable activeOpacity={!onSelect ? 1 : 0.7} onPress={() => (onSelect ? onSelect(profile) : null)}>
      <Card classes={['flex-row', 'items-center', 'justify-between']}>
        <View className='flex-row items-center justify-center gap-x-2'>
          <Icon width={50} />
          <View className='w-4/6'>
            <Text numberOfLines={1}>{profile?.firstName + ' ' + profile?.lastName}</Text>
            <Text variant='button'>Personal</Text>
          </View>
        </View>
        {onSelect && <Ionicons name='md-chevron-forward-outline' size={22} color={colors.primary700} />}
      </Card>
    </Pressable>
  )
}
