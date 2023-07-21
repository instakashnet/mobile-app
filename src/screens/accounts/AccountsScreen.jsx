import { MaterialIcons } from '@expo/vector-icons'
import React, { useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { List, useTheme } from 'react-native-paper'

import AccountsList from '../../components/accounts/AccountsList'
import EmptyAccounts from '../../components/accounts/EmptyAccounts'
import Screen from '../../components/utils/Screen'
import { useGetAccountsQuery } from '../../services/account'

export default function AccountsScreen({ navigation }) {
  const { colors } = useTheme()
  const { data: accounts = [], isFetching } = useGetAccountsQuery('users')
  const dollarAccounts = useMemo(() => accounts.filter(acc => acc.currency.id === 1), [accounts])
  const solesAccounts = useMemo(() => accounts.filter(acc => acc.currency.id === 2), [accounts])

  return (
    <Screen>
      {accounts.length <= 0 && !isFetching && <EmptyAccounts navigate={navigation.navigate} />}
      {accounts.length > 0 && (
        <List.Section>
          <AccountsList isLoading={isFetching} title="Cuentas en soles S/." accounts={solesAccounts} />
          <View className="mt-4" />
          <AccountsList isLoading={isFetching} title="Cuentas en dólares $" accounts={dollarAccounts} />
        </List.Section>
      )}
      {accounts.length > 0 && accounts.length < 20 && (
        <>
          <View className="mt-10" />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate('AccountForm', { name: 'Agregar cuenta' })}
            className={`p-3 absolute right-4 bottom-4 w-15 h-15 shadow-md shadow-slate-300 items-center justify-center rounded-full bg-[${colors.primary700}]`}>
            <MaterialIcons name="add" size={40} color="#fff" />
          </TouchableOpacity>
        </>
      )}
    </Screen>
  )
}
