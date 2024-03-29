import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { useTheme } from 'react-native-paper'

import SafeArea from '../components/utils/SafeArea'
import AccountsNavigator from './authenticated/AccountsNavigator'
import ActivityNavigator from './authenticated/ActivityNavigator'
import ExchangeNavigator from './authenticated/ExchangeNavigator'
import HomeNavigator from './authenticated/HomeNavigator'
import { TabBarLabel } from './options'

const Tabs = createBottomTabNavigator()

export default function TabsNavigator() {
  const { colors } = useTheme()

  return (
    <SafeArea>
      <Tabs.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 56,
            paddingTop: 8,
            paddingBottom: 0,
            backgroundColor: '#fff',
          },
          tabBarActiveTintColor: colors.primary700,
          tabBarInactiveTintColor: colors.gray500,
        }}>
        <Tabs.Screen
          name="Home"
          options={{
            tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label="Inicio" />,
            tabBarIcon: ({ focused, color }) => <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={color} />,
          }}
          component={HomeNavigator}
        />
        <Tabs.Screen
          name="Accounts"
          options={{
            tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label="Cuentas" />,
            tabBarIcon: ({ focused, color }) => <Ionicons name={focused ? 'wallet' : 'wallet-outline'} size={22} color={color} />,
          }}
          component={AccountsNavigator}
        />
        <Tabs.Screen
          name="Exchange"
          options={{
            tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label="Cambiar" />,
            tabBarIcon: ({ color }) => <Ionicons name="swap-horizontal-outline" size={22} color={color} />,
          }}
          component={ExchangeNavigator}
        />
        <Tabs.Screen
          name="Operations"
          options={{
            tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label="Operaciones" />,
            tabBarIcon: ({ focused, color }) => <Ionicons name={focused ? 'bar-chart' : 'bar-chart-outline'} size={22} color={color} />,
          }}
          component={ActivityNavigator}
        />
      </Tabs.Navigator>
    </SafeArea>
  )
}
