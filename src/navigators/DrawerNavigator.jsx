import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import CustomDrawer from '../components/UI/drawer/CustomDrawer'
import { useLogoutMutation } from '../services/auth'
import TabsNavigator from './TabsNavigator'
import VerificationNavigator from './authenticated/VerificationNavigator'
import ConfigurationNavigator from './authenticated/ConfigurationNavigator'

const Drawer = createDrawerNavigator()

export default function DrawerNavigator() {
  const [logout] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={props => <CustomDrawer {...props} onLogout={handleLogout} />}
      screenOptions={{
        drawerType: 'front',
        drawerStyle: { width: '80%' },
        headerShown: false,
      }}>
      <Drawer.Screen name="Main" component={TabsNavigator} />
      <Drawer.Screen name="Verification" component={VerificationNavigator} />
      <Drawer.Screen name="Configuration" component={ConfigurationNavigator} />
    </Drawer.Navigator>
  )
}
