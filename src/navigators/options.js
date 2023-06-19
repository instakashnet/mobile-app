import React from 'react'
import { Platform, Pressable, SafeAreaView, View } from 'react-native'
import { getHeaderTitle } from '@react-navigation/elements'
import { Text, useTheme } from 'react-native-paper'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { selectUser } from '../store/slices/authSlice'

export function MainHeader({ navigation }) {
  const { colors } = useTheme()
  const user = useSelector(selectUser)

  return (
    <SafeAreaView>
      <View
        className={`w-full h-18 pb-3 flex-row items-center justify-between px-3 border-b-2 bg-[#fff] border-gray-200 ${
          Platform.OS === 'android' ? 'pt-6' : ''
        }`}
      >
        <Pressable className={`p-2 rounded bg-[${colors.primary100}]`} onPress={navigation.openDrawer}>
          <Feather name='menu' size={25} color={colors.primary700} />
        </Pressable>

        <View className='flex-row items-center'>
          <Pressable className={`p-2 rounded bg-[${colors.primary100}] mr-1`}>
            <Ionicons name='logo-whatsapp' size={25} color={colors.primary700} />
          </Pressable>
          <Text variant='caption' style={{ fontFamily: 'poppins-semibold', lineHeight: 18 }}>
            Hola, {'\n'} <Text variant='caption'>{user.firstName}</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export function TitleHeader({ navigation, route, options }) {
  const title = getHeaderTitle(options, route.name)

  return (
    <SafeAreaView>
      <View className={`w-full h-26 px-3 py-3 flex-row items-center justify-center ${Platform.OS === 'android' ? 'pt-8' : ''}`}>
        {options.headerLeft !== null && (
          <View className='absolute left-4 items-center justify-center'>
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-chevron-back-outline' : 'md-arrow-back-outline'}
              size={25}
              style={{ marginTop: Platform.OS === 'ios' ? 0 : 10 }}
              onPress={navigation.goBack}
            />
          </View>
        )}
        <Text variant='bodyLarge'>{title}</Text>
      </View>
    </SafeAreaView>
  )
}

export function TabBarLabel({ focused, label }) {
  const { colors } = useTheme()

  return (
    <Text variant='caption' style={{ color: focused ? colors.primary700 : colors.gray500 }}>
      {label}
    </Text>
  )
}
