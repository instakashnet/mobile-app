import { Pressable, View } from 'react-native'
import React, { useMemo } from 'react'
import Logo from '../../../../assets/images/svgs/Logo'
import SafeArea from '../../utils/SafeArea'
import { Ionicons } from '@expo/vector-icons'
import { Drawer, Text } from 'react-native-paper'
import ReferalCode from '../ReferalCode'
import Hours from '../Hours'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../store/slices/authSlice'
import DrawerItem from './DrawerItem'

const ROUTENAMES = {
  main: 'main',
  accounts: 'accounts',
  exchange: 'exchange'
}

export default function CustomDrawer({ navigation, state, onLogout }) {
  const user = useSelector(selectUser)
  const { routes, index } = state // Not sure about the name of index property. Do check it out by logging the 'state' variable.
  const focusedRoute = useMemo(() => {
    const routeName = routes[index]?.name
    if (routeName === 'Verification') return routeName

    return routes[0]?.name
  }, [index])

  return (
    <View className='h-full bg-white'>
      <SafeArea>
        <View className='flex-row items-center justify-between pb-4 px-4'>
          <Logo width={100} />
          <Pressable className='p-2 pr-0' onPress={navigation.closeDrawer}>
            <Ionicons name='close' size={25} />
          </Pressable>
        </View>
        <Drawer.Section>
          <DrawerItem
            iconName='home-outline'
            route={ROUTENAMES.main}
            onNavigate={() => navigation.navigate('Home')}
            focusedRoute={focusedRoute}
            routeName='Inicio'
          />
          <DrawerItem
            iconName='swap-horizontal-outline'
            route={ROUTENAMES.exchange}
            onNavigate={() => navigation.navigate('CurrencyExchange')}
            focusedRoute={focusedRoute}
            routeName='Cambiar divisas'
          />
          <DrawerItem
            iconName='bar-chart-outline'
            route={ROUTENAMES.exchange}
            onNavigate={() => navigation.navigate('Operations')}
            focusedRoute={focusedRoute}
            routeName='Mis operaciones'
          />
          <DrawerItem
            iconName='wallet-outline'
            route={ROUTENAMES.exchange}
            onNavigate={() => navigation.navigate('Accounts')}
            focusedRoute={focusedRoute}
            routeName='Mis cuentas'
          />
        </Drawer.Section>
        <Drawer.Section>
          <DrawerItem
            iconName='settings-outline'
            route={ROUTENAMES.exchange}
            onNavigate={() => navigation.navigate('Configuration')}
            focusedRoute={focusedRoute}
            routeName='Configuración'
          />
          {user?.validationLevel < 3 && (
            <DrawerItem
              iconName='shield-checkmark-outline'
              route={ROUTENAMES.exchange}
              onNavigate={() => navigation.navigate('Verification')}
              focusedRoute={focusedRoute}
              routeName='Verificar identidad'
            />
          )}
        </Drawer.Section>
        <Drawer.Section className='flex-1'>
          <View className='flex-1 px-4 my-4 justify-between'>
            <Hours />
            <ReferalCode />
          </View>
        </Drawer.Section>

        <Pressable className='flex-row items-center py-2 px-6 mt-3' onPress={onLogout}>
          <Ionicons name='log-out-outline' size={25} color='#444' />
          <Text variant='bodyLarge' className='ml-3'>
            Cerrar sesión
          </Text>
        </Pressable>
      </SafeArea>
    </View>
  )
}
