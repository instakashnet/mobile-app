import React from 'react'
import { View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

export default function PlacesInput({ onSelect }) {
  return (
    <View style={{ zIndex: 1, flex: 0.5, marginBottom: 60 }}>
      <GooglePlacesAutocomplete
        placeholder='Buscar dirección'
        minLength={2}
        onPress={onSelect}
        onFail={(error) => console.log(error)}
        onNotFound={() => console.log('no results')}
        query={{
          key: 'AIzaSyCeUH29tjrgxkCV79ckgGRVPCRKTvxDnrY',
          language: 'es',
          type: 'address'
        }}
        nearbyPlacesAPI='GooglePlacesSearch'
        enablePoweredByContainer={false}
        textInputProps={{
          placeholderTextColor: '#999'
        }}
        styles={{
          listView: {
            position: 'absolute',
            marginTop: 45
          },
          textInput: {
            paddingHorizontal: 12,
            borderWidth: 2,
            borderRadius: 8,
            borderColor: '#dedede',
            fontSize: 16
          }
        }}
      />
    </View>
  )
}
