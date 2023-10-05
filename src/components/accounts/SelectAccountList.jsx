import { FlatList, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'

import SelectAccountItem from './SelectAccountItem'
import { useGetAccountsQuery } from '../../services/account'
import { ACCOUNT_TYPES } from '@/constants/ACCOUNT_TYPES'

export default function SelectAccountList({ onSelect, currencyId, accType }) {
  const { data: accounts = {} } = useGetAccountsQuery('users')
  const accountsList = accounts?.personal
    ? accType === ACCOUNT_TYPES.PERSONAL
      ? accounts?.personal
      : [...accounts?.personal, ...accounts?.tercero]
    : []

  return (
    <FlatList
      ListEmptyComponent={() => (
        <View className="my-6">
          <Text>No hay cuentas para mostrar</Text>
        </View>
      )}
      data={accountsList?.filter(acc => acc?.currency?.id === currencyId)}
      keyExtractor={item => item?.id?.toString()}
      renderItem={({ item }) => <SelectAccountItem account={item} onSelect={onSelect} />}
    />
  )
}
