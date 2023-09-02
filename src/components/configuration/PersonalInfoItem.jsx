import { Pressable, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'react-native-paper'
import { useState } from 'react'

import Input from '../UI/Input'
import ChipBtn from '../UI/ChipBtn'
import Helper from '../UI/Helper'
import Text from '../utils/Text'

function PersonalInfoIntem({ label, inputProps, value, onEdit, error, control }) {
  const { colors } = useTheme()
  const [editable, setEditable] = useState(false)

  return (
    <View className="flex-row items-center justify-center pt-2 pb-5 border-b border-gray-300">
      <View className="flex-1">
        {editable ? (
          <>
            <Input label={label} control={control} {...inputProps} />
            <Helper error={error?.message} />
            <View className="flex-row justify-end gap-x-3 mt-1">
              <ChipBtn
                Icon={() => <Feather name="check-circle" size={20} color={colors.primary700} />}
                className="bg-[#E1F2EC]"
                onPress={onEdit}>
                Guardar
              </ChipBtn>
              <ChipBtn
                Icon={() => <Feather name="x-circle" size={20} color={colors.error} />}
                className="bg-red-100"
                onPress={() => setEditable(false)}>
                Cancelar
              </ChipBtn>
            </View>
          </>
        ) : (
          <>
            <Text variant="caption" className="mb-1">
              {label}
            </Text>
            <Text variant="button">{value}</Text>
          </>
        )}
      </View>
      {onEdit && !editable && (
        <Pressable onPress={() => setEditable(true)}>
          <Feather name="edit" size={24} color={colors.primary700} />
        </Pressable>
      )}
    </View>
  )
}

export default PersonalInfoIntem
