import React, { Fragment, useState } from 'react'
import { Divider, List } from 'react-native-paper'
import AccountItem from './AccountItem'
import { useNavigation } from '@react-navigation/native'

export default function AccountsList({ title, accounts = [] }) {
  const [expanded, setExpanded] = useState(false)
  const navigation = useNavigation()
  const handlePress = () => setExpanded((prev) => !prev)
  const handleSelect = (account) => navigation.navigate('AccountForm', { account })

  return (
    <List.Accordion title={title} expanded={expanded} style={{ borderRadius: 12 }} onPress={handlePress}>
      {accounts.map((acc, idx) => (
        <Fragment key={acc.id}>
          <List.Item className='pl-0 bg-white' title={<AccountItem account={acc} onSelect={() => handleSelect(acc)} />} />
          {idx + 1 < accounts.length ? <Divider /> : null}
        </Fragment>
      ))}
    </List.Accordion>
  )
}
