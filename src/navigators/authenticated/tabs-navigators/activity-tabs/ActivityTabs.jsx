import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useTheme } from 'react-native-paper'

import OrdersListView from '@/components/orders/OrdersListView'
import WithdrawsListView from '@/components/orders/WithdrawsListView'

const Tab = createMaterialTopTabNavigator()

export default function ActivityTabs() {
  const { fonts, colors } = useTheme()

  return (
    <Tab.Navigator
      style={{ minHeight: 380 }}
      screenOptions={{
        tabBarStyle: { backgroundColor: 'transparent', paddingBottom: 0 },
        tabBarLabelStyle: { fontFamily: fonts.default.fontFamily, textTransform: 'none' },
        tabBarIndicatorStyle: { backgroundColor: colors.primary700 },
      }}>
      <Tab.Screen name="OrdersList" options={{ title: 'Cambios' }} component={OrdersListView} />
      <Tab.Screen name="WithdrawsList" options={{ title: 'Retiros' }} component={WithdrawsListView} />
    </Tab.Navigator>
  )
}
