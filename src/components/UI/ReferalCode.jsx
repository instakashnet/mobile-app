import { Pressable, View } from 'react-native'
import React from 'react'
import { Text, useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/slices/authSlice'
import CopyButton from './CopyButton'

export default function ReferalCode() {
  const { colors } = useTheme()
  const user = useSelector(selectUser)

  return (
    <View>
      <Text>Código de referido</Text>
      <View className='px-4 py-2 mt-1 rounded-lg flex-row items-center justify-between' style={{ backgroundColor: colors.primary50 }}>
        <Text style={{ color: '#999' }}>{user?.username}</Text>
        <CopyButton />
      </View>
    </View>
  )
}
