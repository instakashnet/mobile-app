import { useNavigation } from '@react-navigation/native'
import React, { Fragment, useState } from 'react'
import { Divider, List } from 'react-native-paper'

import AccountItem from './AccountItem'

export default function AccountsList({ title, accounts = [], isLoading = false }) {
  const [expanded, setExpanded] = useState(false)
  const navigation = useNavigation()
  const handlePress = () => setExpanded(prev => !prev)
  const handleSelect = account => {
    console.log({ account })
    navigation.navigate('AccountForm', { account, name: 'Editar cuenta' })
  }

  if (isLoading)
    return (
      <List.Accordion title={title} expanded style={{ borderRadius: 12 }}>
        <List.Item title={<AccountItem isLoading />} />
        <List.Item title={<AccountItem isLoading />} />
      </List.Accordion>
    )

  return (
    <List.Accordion title={title} expanded={expanded} style={{ borderRadius: 12 }} onPress={handlePress}>
      {accounts.map((acc, idx) => (
        <Fragment key={acc.id}>
          <AccountItem account={acc} onSelect={() => handleSelect(acc)} />
          {idx + 1 < accounts.length ? <Divider /> : null}
        </Fragment>
      ))}
    </List.Accordion>
  )
}
