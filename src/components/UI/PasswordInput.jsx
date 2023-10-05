import { View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useState } from 'react'

import Input from './Input'
import Helper from './Helper'

function PasswordInput({ control, containerClasses = '', name, label, error }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`relative w-full ${containerClasses}`}>
      <Input name={name} control={control} label={label} error={error} secureTextEntry={!showPassword} />
      <View className="absolute right-0 items-center justify-center">
        <IconButton icon={showPassword ? 'eye-off' : 'eye'} iconColor="#ccc" onPress={() => setShowPassword(prev => !prev)} />
      </View>
    </View>
  )
}

export default PasswordInput
