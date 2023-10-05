import React from 'react'
import { HelperText, useTheme } from 'react-native-paper'

export default function Helper({ error, helper }) {
  const { colors, fonts } = useTheme()

  return error || helper ? (
    <HelperText
      type={error ? 'error' : 'info'}
      className="!m-0"
      style={{ color: error ? colors.error : colors.gray700, fontFamily: fonts.bodyLarge.fontFamily }}>
      {error || helper}
    </HelperText>
  ) : null
}
