import { useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ActivityIndicator, List } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'

import Screen from '@/components/utils/Screen'
import { useGetAccountsQuery } from '@/services/account'
import { colors } from '@/theme/colors'
import AccountsList from '@/components/accounts/AccountsList'
import EmptyAccounts from '@/components/accounts/EmptyAccounts'

function ThirdPartyAccountsScreen({ navigation }) {
  const { data: accounts = [], isFetching } = useGetAccountsQuery('users')
  const thirdPartyAccounts = accounts.filter(acc => acc.isThird)
  const dollarAccounts = useMemo(() => thirdPartyAccounts.filter(acc => acc.currency.id === 1), [thirdPartyAccounts])
  const solesAccounts = useMemo(() => thirdPartyAccounts.filter(acc => acc.currency.id === 2), [thirdPartyAccounts])

  const handleAddAccount = () => navigation.navigate('AddThirdPartyAccount')

  if (isFetching)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary500} />
      </View>
    )

  return (
    <Screen>
      {thirdPartyAccounts <= 0 ? (
        <EmptyAccounts onAdd={handleAddAccount} accType="tercero" />
      ) : (
        <>
          <List.Section>
            <AccountsList isLoading={isFetching} title="Cuentas en soles S/." accounts={solesAccounts} />
            <View className="mt-4" />
            <AccountsList isLoading={isFetching} title="Cuentas en dólares $" accounts={dollarAccounts} />
          </List.Section>
          <View className="mt-10" />
          {accounts.length < 20 && (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={handleAddAccount}
              className={`p-3 absolute right-4 bottom-4 w-15 h-15 shadow-md shadow-slate-300 items-center justify-center rounded-full bg-[${colors.primary700}]`}>
              <MaterialIcons name="add" size={40} color="#fff" />
            </TouchableOpacity>
          )}
        </>
      )}
    </Screen>
  )
}

export default ThirdPartyAccountsScreen
