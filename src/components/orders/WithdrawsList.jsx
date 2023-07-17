import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native'
import { Text } from 'react-native-paper'

import WithdrawalItem from './WithdrawalItem'

function WithdrawsList({ data = [], listProps = {} }) {
  const navigation = useNavigation()

  return data.length > 0 ? (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={item => item.id?.toString()}
      renderItem={({ item }) => (
        <WithdrawalItem withdrawal={item} onSelect={() => navigation.navigate('WithdrawalDetails', { withdrawal: item })} />
      )}
      {...listProps}
    />
  ) : (
    <Text className="p-4 text-center">No has realizado ningún retiro</Text>
  )
}

export default WithdrawsList
