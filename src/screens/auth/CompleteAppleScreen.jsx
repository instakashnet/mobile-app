import { useForm } from 'react-hook-form'
import { View } from 'react-native'

import Screen from '@/components/utils/Screen'
import Select from '@/components/UI/Select'
import { documentOptions, sexOptions } from '@/helpers/select-options'
import Input from '@/components/UI/Input'
import Helper from '@/components/UI/Helper'
import PhoneInput from '@/components/UI/PhoneInput'
import Checkbox from '@/components/UI/Checkbox'
import Button from '@/components/UI/Button'
import { useCompleteRegistrationMutation, useLazyGetSessionQuery } from '@/services/auth'
import Text from '@/components/utils/Text'

function CompleteAppleScreen({ route, navigation }) {
  const appleUserName = route.params?.appleUserName
  const [completeRegistration, { isLoading }] = useCompleteRegistrationMutation()
  const [getSession] = useLazyGetSessionQuery()

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      type: 'natural',
      identity_sex: '',
      phone: '',
      document_type: 'DNI',
      document_identification: '',
      accept: false,
    },
  })

  const onSubmit = async values => {
    try {
      await completeRegistration(values).unwrap()
      await getSession().unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Screen>
      <Text variant="titleLarge">Completa tu perfil</Text>
      {appleUserName && <Text className="mt-2">Hola {appleUserName.givenName}, debes completar los datos necesarios para continuar</Text>}
      <View className="mt-6">
        <View className="flex-row items-center justify-center">
          <View className="flex-[.5] mr-3">
            <Select options={documentOptions} name="document_type" control={control} error={errors.document_type} label="Tipo doc" />
          </View>
          <View className="flex-1">
            <Input label="Número" name="document_identification" maxLength={15} error={errors.document_identification} control={control} />
          </View>
        </View>
        <Helper error={errors.document_type?.message || errors.document_identification?.message} />
        <View className="mt-1" />
        <Select options={sexOptions} name="identity_sex" control={control} error={errors.identity_sex} label="Género" />
        <Helper error={errors.identity_sex?.message} />
        <View className="mt-1" />
        <PhoneInput label="Teléfono" name="phone" error={errors.phone} control={control} maxLength={15} />
        <Helper error={errors.phone?.message} />
        <View>
          <Checkbox control={control} name="accept">
            <Text variant="caption" className="mr-1">
              Declaro que la información es correcta y me hago responsable por su legitimidad.
            </Text>
          </Checkbox>
        </View>
        <View className="mt-4" />
        <Button onPress={handleSubmit(onSubmit)} disabled={!isValid} loading={isLoading}>
          Continuar
        </Button>
      </View>
      <Button variant="secondary" className="mt-4" onPress={() => navigation.replace('Login')}>
        Volver al inicio
      </Button>
    </Screen>
  )
}

export default CompleteAppleScreen
