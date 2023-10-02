import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import PersonalAccountsScreen from '@/screens/accounts/PersonalAccounts.screen'
import { colors } from '@/theme/colors'
import Text from '@/components/utils/Text'
import { tabsStyles } from './AccountTabs.styles'
import ThirdPartyAccountsScreen from '@/screens/accounts/ThirdPartyAccounts.screen'

const Tab = createMaterialTopTabNavigator()

function AccountsTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        ...tabsStyles,
        tabBarLabel: ({ children, focused }) => {
          return <Text style={{ color: focused ? colors.white100 : colors.gray700 }}>{children}</Text>
        },
      }}>
      <Tab.Screen name="PersonalAccounts" options={{ title: 'Personales' }} component={PersonalAccountsScreen} />
      <Tab.Screen name="ThirdAccounts" options={{ title: 'De terceros' }} component={ThirdPartyAccountsScreen} />
    </Tab.Navigator>
  )
}

export default AccountsTabs
