import { Pressable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ActivityIndicator, useTheme } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

import Card from '../UI/Card'
import { CompanyProfileIcon } from '../../../assets/images/illustrations/company-profile'
import Text from '../utils/Text'

export default function CompanyItem({ profile = {}, border, onToggleFav, onSelect, onDelete, processing }) {
  const { colors } = useTheme()

  return (
    <Pressable activeOpacity={!onSelect ? 1 : 0.7} onPress={() => (onSelect ? onSelect(profile) : null)}>
      <Card cardClasses={`flex-row items-center justify-between ${!border ? 'border-0' : ''}`}>
        <View className="flex-row items-center justify-center gap-x-2">
          <CompanyProfileIcon width={50} />
          <Text numberOfLines={1}>{profile?.razonSocial}</Text>
        </View>
        <View className="flex-row items-center gap-x-2 justify-between">
          {processing ? (
            <ActivityIndicator size="small" color={colors.primary700} />
          ) : (
            <>
              {onToggleFav && (
                <TouchableOpacity activeOpacity={0.5} onPress={onToggleFav}>
                  <Ionicons
                    name={profile?.isFavorite ? 'heart' : 'heart-outline'}
                    size={22}
                    color={profile?.isFavorite ? colors.error : colors.primary700}
                  />
                </TouchableOpacity>
              )}
              {onSelect && <Ionicons name="md-chevron-forward-outline" size={22} color={colors.primary700} />}
              {!onSelect && onDelete && (
                <Pressable onPress={onDelete}>
                  <Ionicons name="md-trash-outline" size={22} color={colors.error} />
                </Pressable>
              )}
            </>
          )}
        </View>
      </Card>
    </Pressable>
  )
}
