import { FlatList } from 'react-native'
import React from 'react'

import SelectAccountItem from './SelectAccountItem'
import { useGetAccountsQuery } from '../../services/account'

export default function SelectAccountList({ onSelect, currencyId }) {
  const { data: accounts = [] } = useGetAccountsQuery('orders')

  return (
    <FlatList
      data={accounts?.filter(acc => acc?.currency?.id === currencyId)}
      keyExtractor={item => item?.id?.toString()}
      renderItem={({ item }) => <SelectAccountItem account={item} onSelect={onSelect} />}
    />
  )
}
