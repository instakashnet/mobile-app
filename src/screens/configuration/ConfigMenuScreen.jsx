import { View, ScrollView } from 'react-native'
import React from 'react'

import Container from '../../components/utils/Container'
import MenuItem from '../../components/configuration/MenuItem'

export default function ConfigMenuScreen({ navigation }) {
  return (
    <ScrollView>
      <Container>
        <View className="mt-3" />
        <MenuItem
          label="Datos Personales"
          description="Nombre, apellido, correo electrónico y número de teléfono"
          onNavigate={() => navigation.navigate('PersonalInfo')}
        />
        <View className="mt-3" />
        <MenuItem
          label="Seguridad"
          description="Cambia tu contraseña y maneja tu seguridad"
          onNavigate={() => navigation.navigate('Security')}
        />
        <View className="mt-3" />
        <MenuItem
          label="Perfiles"
          description="Admistra tus perfiles de cambio"
          onNavigate={() => navigation.navigate('Profiles', { isConfig: true })}
        />
        <View className="mt-3" />
        <MenuItem label="Notificaciones y alertas" onNavigate={() => navigation.navigate('Notifications')} />
        <View className="my-3 w-full border border-gray-200" />
        <MenuItem label="Centro de ayuda" onNavigate={() => {}} />
      </Container>
    </ScrollView>
  )
}
