import { View } from 'react-native'
import Input from './Input'
import { useState } from 'react'
import { IconButton } from 'react-native-paper'

function PasswordInput({ control, name, label, error }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className='relative mt-2'>
      <Input name={name} control={control} label={label} error={error} secureTextEntry={!showPassword} />
      <IconButton
        icon={showPassword ? 'eye-off' : 'eye'}
        iconColor='#ccc'
        onPress={() => setShowPassword((prev) => !prev)}
        className='absolute right-[5px] -bottom-[2px] z-10'
      />
    </View>
  )
}

export default PasswordInput
