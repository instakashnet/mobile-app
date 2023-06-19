import { View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Card from '../UI/Card'
import { Text, useTheme } from 'react-native-paper'
import { CompanyProfileIcon } from '../../../assets/images/illustrations/company-profile'

export default function AddProfileBtn({ companies = 0, onAdd }) {
  const { colors } = useTheme()

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onAdd}>
      <Card classes={['flex-row', 'items-center', 'justify-between']}>
        <View className='flex-row items-center gap-x-3 ml-1'>
          <CompanyProfileIcon width={50} />
          <View>
            <Text>Agregadas {companies}/10</Text>
            <Text variant='button'>Empresas</Text>
          </View>
        </View>

        <Text variant='button' style={{ color: colors.primary700 }}>
          Agregar
        </Text>
      </Card>
    </TouchableOpacity>
  )
}
