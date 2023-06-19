import React from 'react'
import { DrawerItem as RNDrawerItem } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'
import { Text, useTheme } from 'react-native-paper'
import { StyleSheet } from 'react-native'

export default function DrawerItem({ iconName, routeName, onNavigate, focusedRoute, route }) {
  const { colors } = useTheme()

  const getActiveColor = (routeName) => {
    return focusedRoute === routeName ? { color: colors.primary700, bg: colors.primary50 } : { color: '#444', bg: 'transparent' }
  }

  return (
    <RNDrawerItem
      icon={() => <Ionicons style={{ marginRight: -20 }} name={iconName} size={20} color={getActiveColor(route).color} />}
      label={() => <Text style={{ color: getActiveColor(route).color }}>{routeName}</Text>}
      onPress={onNavigate}
      style={[styles.drawerItem, { backgroundColor: getActiveColor(route).bg }]}
    />
  )
}

const styles = StyleSheet.create({
  drawerItem: {
    paddingHorizontal: 8,
    marginBottom: 0
  }
})
