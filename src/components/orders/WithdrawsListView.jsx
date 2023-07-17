import { Pressable } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

import { useWithdrawals } from '../../hooks/useWithdrawals'
import Card from '../UI/Card'
import WithdrawalItem from './WithdrawalItem'

export default function WithdrawsListView({ navigation }) {
  const { withdrawals } = useWithdrawals(3)
  const { colors } = useTheme()

  return (
    <Card classes={['py-4']}>
      {withdrawals.length > 0 ? (
        <>
          {withdrawals.map((withdrawal, idx) => (
            <WithdrawalItem
              key={withdrawal.id}
              withdrawal={withdrawal}
              last={idx + 1 >= withdrawal.length}
              onSelect={() => navigation.navigate('WithdrawalDetails', { withdrawal })}
            />
          ))}
          <Pressable className="w-full p-3" onPress={() => navigation.navigate('Withdrawals')}>
            <Text className="text-center" variant="button" style={{ color: colors.primary700 }}>
              Ver mas
            </Text>
          </Pressable>
        </>
      ) : (
        <Text className="text-center">No has realizado ningún retiro de KASH.</Text>
      )}
    </Card>
  )
}
