import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react'
import { View, Modal, Platform, TouchableOpacity } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

function DatePicker({ show, hidePicker, onChangeDate }) {
  const [date, setDate] = useState(new Date())
  const { colors } = useTheme()

  const handleSelectDate = (_, selectedDate) => {
    const currentDate = selectedDate || date
    setDate(new Date(currentDate))
    if (Platform.OS === 'android') {
      onChangeDate(date)
      hidePicker()
    }
  }

  const handleConfirm = () => {
    onChangeDate(date)
    hidePicker()
  }

  const renderDatePicker = () => {
    return (
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode="date"
        locale="es-ES"
        is24Hour
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        className="w-full self-center"
        onChange={handleSelectDate}
      />
    )
  }

  if (Platform.OS === 'android' && show) return renderDatePicker()

  return (
    <Modal
      visible={show}
      animationType={Platform.OS === 'ios' ? 'slide' : 'fade'}
      transparent
      supportedOrientations={['portrait']}
      onRequestClose={hidePicker}>
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
          {renderDatePicker()}
        </View>
      </View>
    </Modal>
  )
}

export default DatePicker
