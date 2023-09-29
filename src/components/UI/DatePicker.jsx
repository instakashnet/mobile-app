import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useCallback, useEffect, useState } from 'react'
import { View, Modal, TouchableOpacity, Platform } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

function DatePicker({ hidePicker, onChangeDate, show }) {
  const [date, setDate] = useState(new Date())
  const { colors } = useTheme()

  const handleSelectDate = useCallback(
    (_, selectedDate) => {
      const currentDate = selectedDate || date
      setDate(new Date(currentDate))
      if (Platform.OS === 'android') {
        onChangeDate(currentDate)
        hidePicker()
      }
    },
    [date, hidePicker, onChangeDate],
  )

  const handleConfirm = () => {
    onChangeDate(date)
    hidePicker()
  }

  useEffect(() => {
    if (Platform.OS === 'android' && show) {
      DateTimePickerAndroid.open({
        value: date,
        mode: 'date',
        display: 'default',
        is24Hour: true,
        onChange: handleSelectDate,
      })
    }
  }, [show, date, handleSelectDate])

  return Platform.OS === 'ios' ? (
    <Modal visible={show} animationType="slide" transparent supportedOrientations={['portrait']} onRequestClose={hidePicker}>
      <View className="flex-1 bg-black/40">
        <View className="bg-white w-full h-[30%] absolute bottom-0 left-0">
          <View className="flex-row items-center justify-between py-4 px-8 border-b border-gray-300">
            <TouchableOpacity activeOpacity={0.7} onPress={hidePicker}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={handleConfirm}>
              <Text variant="button" style={{ color: colors.primary700 }}>
                Confirmar
              </Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            locale="es-ES"
            is24Hour
            display="spinner"
            className="w-full self-center"
            onChange={handleSelectDate}
          />
        </View>
      </View>
    </Modal>
  ) : null
}

export default DatePicker
