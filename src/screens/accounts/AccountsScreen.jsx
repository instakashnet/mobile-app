import { ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import { List, useTheme } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'

import EmptyAccounts from '../../components/accounts/EmptyAccounts'
import AccountsList from '../../components/accounts/AccountsList'
import { useGetAccountsQuery } from '../../services/account'

export default function AccountsScreen({ navigation }) {
  const { colors } = useTheme()
  const { data: accounts = [], isFetching } = useGetAccountsQuery('users')
  const dollarAccounts = useMemo(() => accounts.filter(acc => acc.currency.id === 1), [accounts])
  const solesAccounts = useMemo(() => accounts.filter(acc => acc.currency.id === 2), [accounts])

  console.log({ accounts })

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View className="flex-1 p-6">
        {accounts.length <= 0 ? (
          <EmptyAccounts navigate={navigation.navigate} />
        ) : (
          <List.Section>
            <AccountsList isLoading={isFetching} title="Cuentas en soles S/." accounts={solesAccounts} />
            <View className="mt-4" />
            <AccountsList isLoading={isFetching} title="Cuentas en dólares $" accounts={dollarAccounts} />
          </List.Section>
        )}
      </View>
      {accounts.length > 0 && accounts.length < 20 && (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate('AccountForm', { name: 'Agregar cuenta' })}
          className={`p-3 absolute right-5 bottom-5 w-15 h-15 shadow-md shadow-slate-300 items-center justify-center rounded-full bg-[${colors.primary700}]`}>
          <MaterialIcons name="add" size={40} color="#fff" />
        </TouchableOpacity>
      )}
    </ScrollView>
  )
}
