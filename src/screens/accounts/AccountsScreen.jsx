import { ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
// import { accounts } from '../../../mocks/accounts'
import EmptyAccounts from '../../components/accounts/EmptyAccounts'
import { List, useTheme } from 'react-native-paper'
import AccountsList from '../../components/accounts/AccountsList'
import { MaterialIcons } from '@expo/vector-icons'
import { useGetAccountsQuery } from '../../services/account'

export default function AccountsScreen({ navigation }) {
  const { colors } = useTheme()
  const { data: accounts = [], isLoading } = useGetAccountsQuery('users')
  const dollarAccounts = useMemo(() => accounts.filter((acc) => acc.currency.id === 1), [accounts])
  const solesAccounts = useMemo(() => accounts.filter((acc) => acc.currency.id === 2), [accounts])

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View className='flex-1 p-6'>
        {accounts.length <= 0 ? (
          <EmptyAccounts navigate={navigation.navigate} />
        ) : (
          <List.Section>
            <AccountsList title='Cuentas en soles S/.' accounts={solesAccounts} />
            <View className='mt-4' />
            <AccountsList title='Cuentas en dólares $' accounts={dollarAccounts} />
          </List.Section>
        )}
      </View>
      {accounts.length > 0 && (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate('AccountForm')}
          className={`p-3 absolute right-5 bottom-5 w-15 h-15 shadow-md shadow-slate-300 items-center justify-center rounded-full bg-[${colors.primary700}]`}
        >
          <MaterialIcons name='add' size={40} color='#fff' />
        </TouchableOpacity>
      )}
    </ScrollView>
  )
}
