import { View, Image, Pressable, Alert } from 'react-native'
import React from 'react'
import { Text, useTheme } from 'react-native-paper'
import { Feather } from '@expo/vector-icons'
import bankImages from '../../../data/bankImages'
import { useDeleteAccountMutation } from '../../services/account'

export default function AccountItem({ account, onSelect }) {
  const { colors } = useTheme()
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation()

  const handleDelete = () => {
    Alert.alert('Deseas eliminar esta cuenta?', 'Esta acción no puede ser revertida', [
      { text: 'Confirmar', onPress: () => deleteAccount(account?.id) },
      { text: 'Regresar' }
    ])
  }

  return (
    <View className='w-full'>
      <View className='flex-row items-center justify-between w-full'>
        <Image source={bankImages[account?.bank.name?.toLowerCase()]?.image} resizeMode='contain' className='w-20 h-8' />
        <Text>
          *****
          {account?.accNumber?.substring(account.accNumber.length - 5, account.accNumber.length) ||
            account?.cci?.substring(account.cci.length - 5, account.cci.length)}
        </Text>
      </View>
      <View className='flex-row items-center justify-between w-full'>
        {account?.joint && (
          <Text variant='caption' style={{ color: colors.primary700 }} className='p-1 px-2 rounded-lg bg-[#F0F7F8]'>
            Cuenta mancomunada
          </Text>
        )}
        <View className='flex-row items-center justify-end w-full'>
          <Pressable className='p-1 mr-2' onPress={onSelect}>
            <Feather name='edit' size={18} color={colors.primary700} />
          </Pressable>
          <Pressable className='p-1' onPress={isLoading ? null : handleDelete}>
            <Feather name='trash-2' size={18} color={colors.error} />
          </Pressable>
        </View>
      </View>
    </View>
  )
}
