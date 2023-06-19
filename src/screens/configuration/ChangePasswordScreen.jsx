import Container from '../../components/utils/Container'
import KeyboardView from '../../components/utils/KeyboardView'
import DismissKeyboard from '../../components/utils/DismissKeyboard'
import { useForm } from 'react-hook-form'
import { Text } from 'react-native-paper'
import { View } from 'react-native'
import Helper from '../../components/UI/Helper'
import Button from '../../components/UI/Button'
import { changePasswordSchema } from '../../schemas/user'
import { yupResolver } from '@hookform/resolvers/yup'
import PasswordInput from '../../components/UI/PasswordInput'

function ChangePasswordScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    mode: 'onTouched',
    resolver: yupResolver(changePasswordSchema)
  })

  const onSubmit = (values) => console.log(values)

  return (
    <Container>
      <KeyboardView>
        <DismissKeyboard>
          <View className='flex-1 mb-4'>
            <Text variant='titleLarge' className='my-2'>
              Cambiar contraseña
            </Text>
            <Text className='mb-8'>Puedes cambiar tu contraseña por una nueva, así como administrar tu método de ingreso</Text>
            <PasswordInput name='currentPassword' control={control} label='Contraseña actual' error={errors.currentPassword} />
            <Helper error={errors.currentPassword?.message} />
            <PasswordInput name='newPassword' control={control} label='Nueva contraeña' error={errors.newPassword} />
            <Helper error={errors.newPassword?.message} />
            <PasswordInput name='confirmPassword' control={control} label='Confirmar contraeña' error={errors.confirmPassword} />
            <Helper error={errors.confirmPassword?.message} />
            <View className='mt-auto' />
            <Button onPress={handleSubmit(onSubmit)} disabled={!isValid}>
              Guardar cambios
            </Button>
          </View>
        </DismissKeyboard>
      </KeyboardView>
    </Container>
  )
}

export default ChangePasswordScreen
