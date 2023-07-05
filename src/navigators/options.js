import React from 'react'
import { Alert, Linking, Platform, Pressable, SafeAreaView, View } from 'react-native'
import { getHeaderTitle } from '@react-navigation/elements'
import { Appbar, Text, useTheme } from 'react-native-paper'
import { Feather } from '@expo/vector-icons'
import { useSelector } from 'react-redux'

import { selectUser } from '../store/slices/authSlice'

export function MainHeader({ navigation }) {
  const { colors } = useTheme()
  const user = useSelector(selectUser)

  const handleWhatsapp = async () => {
    try {
      await Linking.openURL(`whatsapp://send?text=${'Hola, quisiera asistencia para Instakash'}&phone=${'51929050743'}`)
    } catch (error) {
      Alert.alert('Error', 'No se pudo abrir Whatsapp. verifica que esté instalado e intenta nuevamente.')
    }
  }

  return (
    <SafeAreaView>
      <Appbar.Header
        statusBarHeight={Platform.OS === 'ios' ? 0 : 20}
        className="bg-white border-b px-3 h-[60px] border-gray-300 justify-between">
        <Pressable className={`p-2 rounded bg-[${colors.primary100}]`} onPress={navigation.openDrawer}>
          <Feather name="menu" size={25} color={colors.primary700} />
        </Pressable>

        <View className="flex-row items-center">
          <Appbar.Action icon="whatsapp" color={colors.primary700} size={25} onPress={handleWhatsapp} />
          <Text variant="caption" style={{ fontFamily: 'poppins-semibold', lineHeight: 14, marginLeft: -5 }}>
            Hola,{'\n'}
            <Text variant="caption">{user.firstName}</Text>
          </Text>
        </View>
      </Appbar.Header>
    </SafeAreaView>
  )
}

export function TitleHeader({ navigation, route, options }) {
  const title = getHeaderTitle(options, route.name)
  const { fonts } = useTheme()

  return (
    <SafeAreaView>
      <Appbar.Header statusBarHeight={Platform.OS === 'ios' ? 0 : 20} className="bg-white">
        {options.headerLeft !== null && <Appbar.BackAction onPress={navigation.goBack} size={18} />}
        <Appbar.Content title={title} titleStyle={{ fontFamily: fonts.bodyLarge.fontFamily, fontSize: fonts.titleMedium.fontSize }} />
      </Appbar.Header>
    </SafeAreaView>
  )
}

export function TabBarLabel({ focused, label }) {
  const { colors } = useTheme()

  return (
    <Text variant="caption" style={{ color: focused ? colors.primary700 : colors.gray500 }}>
      {label}
    </Text>
  )
}
