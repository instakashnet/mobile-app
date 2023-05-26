import React from 'react'
import { Platform, Pressable, SafeAreaView, View } from 'react-native'
import { getHeaderTitle } from '@react-navigation/elements'
import { Text, IconButton, useTheme } from 'react-native-paper'
import { Feather, Ionicons } from '@expo/vector-icons'

export function MainHeader({ navigation }) {
  const { colors } = useTheme()

  return (
    <View className='w-full h-24 pt-6 flex-row items-center justify-between px-3 border-b-2 bg-[#fff] border-gray-200'>
      <Pressable className={`p-2 rounded bg-[${colors.primary100}]`} onPress={navigation.openDrawer}>
        <Feather name='menu' size={25} color={colors.primary700} />
      </Pressable>

      <View className='flex-row items-center'>
        <Pressable className={`p-2 rounded bg-[${colors.primary100}] mr-3`}>
          <Ionicons name='logo-whatsapp' size={25} color={colors.primary700} />
        </Pressable>
        <Text variant='caption' style={{ fontFamily: 'poppins-semibold', lineHeight: 18 }}>
          Hola, {'\n'} <Text variant='caption'>Roger</Text>
        </Text>
      </View>
    </View>
  )
}

export function TitleHeader({ navigation, route, options }) {
  const title = getHeaderTitle(options, route.name)

  return (
    <SafeAreaView>
      <View
        className={`w-full h-26 flex-row items-center justify-center self-stretch px-3 bg-[#f8fafb] ${Platform.OS === 'android' && 'py-6'}`}
      >
        {options.headerLeft !== null ? (
          <IconButton icon='chevron-left' size={30} onPress={navigation.goBack} />
        ) : (
          <View className='mr-auto' />
        )}
        <View className='mx-auto'>
          <Text variant='bodyLarge'>{title}</Text>
        </View>

        <View className='ml-auto' />
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
