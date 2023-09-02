import { Pressable, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

import Card from '../UI/Card'
import { MaleProfileIcon } from '../../../assets/images/illustrations/male-profile'
import { FemaleProfileIcon } from '../../../assets/images/illustrations/female-profile'
import Skeleton from '../UI/Skeleton'
import Text from '../utils/Text'

export default function ProfileItem({ profile = {}, onSelect, loading = true }) {
  const { colors } = useTheme()

  const Icon = profile?.identitySex === 'male' ? MaleProfileIcon : FemaleProfileIcon

  if (loading)
    return (
      <View className="px-2 flex-row items-center">
        <Skeleton height={50} width={50} borderRadius={100} />
        <View className="ml-3" />
        <Skeleton height={30} width={120} />
      </View>
    )

  return (
    <Pressable activeOpacity={!onSelect ? 1 : 0.7} onPress={() => (onSelect ? onSelect(profile) : null)}>
      <Card classes={['flex-row', 'items-center', 'justify-between']}>
        <View className="flex-row items-center justify-center gap-x-2">
          <Icon width={50} />
          <View className="w-4/6">
            <Text numberOfLines={1}>{profile?.firstName + ' ' + profile?.lastName}</Text>
            <Text variant="button">Personal</Text>
          </View>
        </View>
        {onSelect && <Ionicons name="md-chevron-forward-outline" size={22} color={colors.primary700} />}
      </Card>
    </Pressable>
  )
}
