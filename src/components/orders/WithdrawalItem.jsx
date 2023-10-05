import { TouchableOpacity, View } from 'react-native'

import { formatAmount } from '../../helpers/formatters'
import DateItem from '../UI/DateItem'
import StatusBadge from '../UI/StatusBadge'
import Text from '../utils/Text'

function WithdrawalItem({ withdrawal, onSelect, last }) {
  return (
    <TouchableOpacity
      activeOpacity={!onSelect ? 1 : 0.7}
      className={`flex-row py-4 items-center ${!last && 'border-b-[1px]'} border-gray-200`}
      onPress={onSelect || null}>
      <DateItem date={withdrawal.date} />
      <View className="ml-3">
        <Text variant="button">{withdrawal.amount} KASH</Text>
        <Text variant="caption" className="text-gray-500">
          {formatAmount(withdrawal.amount, '$')}
        </Text>
      </View>
      <View className="ml-auto" />
      <StatusBadge status={withdrawal.status} />
    </TouchableOpacity>
  )
}

export default WithdrawalItem
