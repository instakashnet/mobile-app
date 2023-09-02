import { ScrollView, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import Container from '../../components/utils/Container'
import PersonalInfoIntem from '../../components/configuration/PersonalInfoItem'
import { selectUser } from '../../store/slices/authSlice'

export default function PersonalInfoScreen() {
  const user = useSelector(selectUser)
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      phone: '',
    },
  })

  const onSubmit = values => console.log(values)

  return (
    <ScrollView keyboardDismissMode="on-drag">
      <Container>
        <PersonalInfoIntem label="Nombre completo" value={user?.name} />
        <View className="mt-6" />
        <PersonalInfoIntem label="Documento" value={`${user?.documentType} ${user?.documentIdentification}`} />
        <View className="mt-6" />
        <PersonalInfoIntem
          label="Correo electrónico"
          value={user?.email}
          onEdit={handleSubmit(onSubmit)}
          control={control}
          inputProps={{ name: 'email', keyboardType: 'email-address', autoCapitalize: 'none' }}
        />
        <View className="mt-6" />
        <PersonalInfoIntem
          label="Teléfono"
          value={user?.phone}
          onEdit={handleSubmit(onSubmit)}
          control={control}
          inputProps={{ name: 'phone', keyboardType: 'phone-pad' }}
        />
      </Container>
    </ScrollView>
  )
}
