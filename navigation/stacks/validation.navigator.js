import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { headerBackLeft, headerOptions, headerRight, headerTitle } from '../utils/navigator.options';
import { useSelector } from 'react-redux';
import { DocumentValidationScreen } from '../../features/profile/screens/validation/document/document-validation.screen';
import { DocumentInfoScreen } from '../../features/profile/screens/validation/document/document-info.screen';
import { CameraScreen } from '../../features/profile/screens/validation/document/camera.screen';
import { DocumentUploadedScreen } from '../../features/profile/screens/validation/document/document-uploaded.screen';
import { AddAddressScreen } from '../../features/profile/screens/validation/add-address.screen';
import { AddInfoScreen } from '../../features/profile/screens/validation/add-info.screen';
import PhotoPreviewScreen from '../../features/profile/screens/validation/document/photo-preview.screen';

const ValidationStack = createNativeStackNavigator();

export default function ValidationNavigator() {
  const user = useSelector((state) => state.authReducer.user);

  return (
    <ValidationStack.Navigator
      screenOptions={{
        ...headerOptions,
        headerRight,
      }}
      initialRouteName={user.validationLevel < 1 ? 'AddAddress' : user.validationLevel === 1 ? 'AddInfo' : 'DocumentInfo'}
    >
      {user.validationLevel < 1 && (
        <ValidationStack.Screen
          name='AddAddress'
          options={({ navigation }) => ({ headerBackVisible: false, headerLeft: () => headerBackLeft(navigation), headerTitle: () => headerTitle('Agregar dirección') })}
          component={AddAddressScreen}
        />
      )}
      {user.validationLevel < 2 && (
        <ValidationStack.Screen
          name='AddInfo'
          options={({ navigation }) => ({ headerBackVisible: false, headerLeft: () => headerBackLeft(navigation), headerTitle: () => headerTitle('Agregar información') })}
          component={AddInfoScreen}
        />
      )}
      {user.validationLevel < 3 && (
        <>
          {user.documentValidation === 'pending' ? (
            <ValidationStack.Screen
              name='ValidatingDocument'
              options={({ navigation }) => ({ headerBackVisible: false, headerLeft: () => headerBackLeft(navigation), headerTitle: () => headerTitle('Verificando identidad') })}
              component={DocumentValidationScreen}
            />
          ) : (
            <>
              <ValidationStack.Screen
                name='ValidateDocument'
                options={({ navigation }) => ({ headerTitle: () => headerTitle('Cargar documento'), headerBackVisible: false, headerLeft: () => headerBackLeft(navigation) })}
                component={DocumentInfoScreen}
              />
              <ValidationStack.Screen name='Camera' options={{ headerShown: false }} component={CameraScreen} />
              <ValidationStack.Screen name='PhotoPreview' options={{ headerShown: true, headerTitle: '', headerRight: null }} component={PhotoPreviewScreen} />
              <ValidationStack.Screen name='DocumentUploaded' options={{ headerLeft: null, headerTitle: '', headerLeft: null }} component={DocumentUploadedScreen} />
            </>
          )}
        </>
      )}
    </ValidationStack.Navigator>
  );
}
