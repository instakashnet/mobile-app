import React from 'react'
import { useTheme } from 'react-native-paper'
import CustomToast, { BaseToast, ErrorToast } from 'react-native-toast-message'

const config = ({ fonts, colors }) => {
  const text1Styles = { color: '#fff', fontSize: 14, fontFamily: fonts?.button?.fontFamily }
  const text2Styles = { color: '#fff', fontSize: 13, fontFamily: fonts?.default?.fontFamily }

  return {
    success: props => (
      <BaseToast
        {...props}
        style={{ backgroundColor: colors?.primary500, height: 'auto', paddingVertical: 12 }}
        text1Style={text1Styles}
        text2Style={text2Styles}
        text2Props={{ numberOfLines: 3 }}
      />
    ),
    error: props => (
      <ErrorToast
        {...props}
        style={{ backgroundColor: '#CC3C44', height: 'auto', paddingVertical: 12 }}
        text1Style={text1Styles}
        text2Props={{ numberOfLines: 3 }}
        text2Style={text2Styles}
      />
    ),
  }
}

export default function Toast() {
  const theme = useTheme()

  return <CustomToast topOffset={60} position="top" config={config(theme)} />
}
