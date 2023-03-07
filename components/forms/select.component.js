import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import React from 'react';
import { HelperText } from 'react-native-paper';
import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

const FormGroup = styled.View`
  width: 100%;
  margin-top: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme, error }) => (error ? theme.space[0] : theme.space[2])};
  position: relative;
`;

const PickerIcon = styled(Ionicons).attrs({
  name: 'ios-caret-down-sharp',
  size: 13,
  color: '#444',
})`
  right: 15px;
  top: 18px;
`;

export const Select = ({ label, inputValue, onChange, name, options = [], error, isFlex }) => {
  return (
    <FormGroup error={!!error}>
      <RNPickerSelect
        onValueChange={(value) => onChange(name, value)}
        placeholder={{
          label,
          value: null,
        }}
        items={options}
        value={inputValue}
        Icon={() => <PickerIcon />}
        style={selectStyles(!!error)}
        useNativeAndroidPickerStyle={false}
      />

      {!!error && !isFlex && (
        <HelperText style={{ textAlign: 'left' }} type='error' visible={!!error}>
          {error}
        </HelperText>
      )}
    </FormGroup>
  );
};

const selectStyles = (error) =>
  StyleSheet.create({
    inputAndroid: {
      color: 'black',
      paddingHorizontal: 12,
      paddingTop: 11,
      paddingBottom: 9,
      borderWidth: 1,
      borderColor: error ? '#FF4B55' : '#aaa',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30,
      backgroundColor: 'white',
    },
    inputIOS: {
      color: 'black',
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: error ? '#FF4B55' : '#aaa',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30,
      backgroundColor: 'white',
    },
    placeholder: { fontSize: 16, color: '#777' },
  });
