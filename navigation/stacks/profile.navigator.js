import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { BasicInfoScreen } from '../../features/profile/screens/basic-info.screen';
import { EditInfoScreen } from '../../features/profile/screens/edit-info.screen';
// SCREENS
import { ProfileScreen } from '../../features/profile/screens/profile.screen';
// UTILS
import { headerLeft, headerOptions, headerRight, headerTitle } from '../utils/navigator.options';
import ValidationNavigator from './validation.navigator';

const ProfileStack = createNativeStackNavigator();

export const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        ...headerOptions,
        headerRight,
        headerBackTitleVisible: false,
      }}
      initialRouteName='MyProfile'
    >
      <ProfileStack.Screen
        name='MyProfile'
        options={({ navigation }) => ({ headerTitle: () => headerTitle('Mi perfil'), headerLeft: () => headerLeft(navigation) })}
        component={ProfileScreen}
      />
      <ProfileStack.Screen name='BasicInfo' options={{ headerTitle: () => headerTitle('Información básica') }} component={BasicInfoScreen} />
      <ProfileStack.Screen name='EditInfo' options={{ headerTitle: () => headerTitle('Editar información') }} component={EditInfoScreen} />
      <ProfileStack.Screen name='IdentityValidation' options={{ headerShown: false }} component={ValidationNavigator} />
    </ProfileStack.Navigator>
  );
};
