import React from 'react'
import { Alert, Image, View } from 'react-native'
import { IconButton, useTheme } from 'react-native-paper'

import bankImages from '../../../data/bankImages'
import { useDeleteAccountMutation } from '../../services/account'
import Skeleton from '../UI/Skeleton'
import Text from '../utils/Text'

export default function AccountItem({ account, onSelect, isLoading }) {
  const { colors } = useTheme()
  const [deleteAccount, { isLoading: isProcessing }] = useDeleteAccountMutation()

  const handleDelete = () => {
    Alert.alert('Deseas eliminar esta cuenta?', 'Esta acción no puede ser revertida', [
      { text: 'Confirmar', onPress: () => deleteAccount(account?.id) },
      { text: 'Regresar' },
    ])
  }

  if (isLoading)
    return (
      <View className="flex-row items-center justify-between w-full">
        <Skeleton width={90} height={40} />
        <View className="items-end">
          <Skeleton width={120} height={20} />
          <View className="flex-row items-center gap-2 mt-2">
            <Skeleton width={20} height={20} marginRight={12} />
            <Skeleton width={20} height={20} />
          </View>
        </View>
      </View>
    )

  return (
    <View className="w-full py-2 px-4 bg-white">
      <View className="flex-row items-center justify-between w-full">
        <Image source={bankImages[account?.bank.name?.toLowerCase()]?.image} resizeMode="contain" className="w-[85px] h-8" />
        <Text>
          *****
          {account?.accNumber?.substring(account.accNumber.length - 5, account.accNumber.length) ||
            account?.cci?.substring(account.cci.length - 5, account.cci.length)}
        </Text>
      </View>
      <View className="flex-row items-center justify-between w-full">
        {account?.joint && (
          <Text variant="caption" style={{ color: colors.primary700 }} className="p-1 px-2 rounded-lg bg-[#F0F7F8]">
            Cuenta mancomunada
          </Text>
        )}
        <View className="flex-row items-center ml-auto self-end">
          <IconButton icon="square-edit-outline" className="mr-0" size={20} iconColor={colors.primary700} onPress={onSelect} />
          <IconButton
            className="mr-0"
            icon="delete-forever-outline"
            size={20}
            iconColor={colors.error}
            onPress={isProcessing ? null : handleDelete}
          />
        </View>
      </View>
    </View>
  )
}
