import { TextInput, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

function KashAmountInput({ amount, value, onChange }) {
  const { fonts } = useTheme()

  return (
    <View className='flex-row items-center justify-center gap-2'>
      <Text variant='caption'>KASH</Text>
      <TextInput
        placeholder='0'
        className='text-[50px]'
        style={{ fontFamily: fonts.titleLarge.fontFamily }}
        onChangeText={onChange}
        value={value?.toString()}
        keyboardType='decimal-pad'
        maxLength={amount?.toString()?.length}
      />
    </View>
  )
}

export default KashAmountInput
