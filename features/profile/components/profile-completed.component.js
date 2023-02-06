import React from 'react';
import { Circle as ProgressCircle } from 'react-native-progress';
import { ActivityIndicator } from 'react-native-paper';
import { Dimensions } from 'react-native';
import { Text } from '../../../components/typography/text.component';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { useProfileCompleted } from '../../../hooks/use-completed.hook';

// STLYED COMPONENTS
import { CompletedWrapper, CompletedInfo, CompletedText, CompletedItem } from './profile.styles';

export const ProfileCompleted = ({ user }) => {
  const [percentage, color] = useProfileCompleted(user.validationLevel);

  return (
    <CompletedWrapper>
      <ProgressCircle
        progress={percentage / 100}
        size={Dimensions.get('window').width < 380 ? 80 : 90}
        animated={false}
        borderWidth={1}
        thickness={3}
        showsText
        textStyle={{ color, fontFamily: 'lato-black', fontSize: 22 }}
        color={color}
      />
      <CompletedInfo>
        <Text variant='bold'>{percentage < 100 ? 'Por completar' : 'Perfil completado'}</Text>
        <CompletedItem>
          <MaterialCommunityIcons size={20} color={user.phone ? '#0D8284' : '#AFAFAF'} name={user.phone ? 'check' : 'minus'} style={{ marginRight: 5 }} />
          <CompletedText color={user.phone ? '#0D8284' : '#AFAFAF'}>Datos personales</CompletedText>
        </CompletedItem>

        <CompletedItem>
          {user.documentValidation === 'none' && (
            <>
              <MaterialCommunityIcons size={20} color='#AFAFAF' name='minus' style={{ marginRight: 5 }} />
              <CompletedText color='#AFAFAF'>Debes verificar tu identidad</CompletedText>
            </>
          )}
          {user.documentValidation === 'pending' && (
            <>
              <ActivityIndicator color='#EB9824' size={20} style={{ marginRight: 5 }} />
              <CompletedText color='#EB9824'>Verificando identidad</CompletedText>
            </>
          )}
          {user.documentValidation === 'failed' && (
            <>
              <MaterialIcons size={20} name='error-outline' color='#FF4B55' style={{ marginRight: 5 }} />
              <CompletedText color='#FF4B55'>Error en la verificación</CompletedText>
            </>
          )}
          {user.documentValidation === 'success' && (
            <>
              <MaterialCommunityIcons size={20} name='check' color='#0D8284' style={{ marginRight: 5 }} />
              <CompletedText color='#0D8284'>Identidad verificada</CompletedText>
            </>
          )}
        </CompletedItem>

        <CompletedItem>
          <MaterialCommunityIcons
            size={20}
            color={user.address && user.birthday ? '#0D8284' : '#AFAFAF'}
            name={user.address && user.birthday ? 'check' : 'minus'}
            style={{ marginRight: 5 }}
          />
          <CompletedText color={user.address && user.birthday ? '#0D8284' : '#AFAFAF'}>
            {user.address && user.birthday ? 'Datos adicionales' : 'Faltan datos adicionales'}
          </CompletedText>
        </CompletedItem>
      </CompletedInfo>
    </CompletedWrapper>
  );
};
