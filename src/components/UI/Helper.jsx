import React from 'react'
import { HelperText, useTheme } from 'react-native-paper'

export default function Helper({ error, helper }) {
  const { colors, fonts } = useTheme()

  return (
    <HelperText
      type={Boolean(error) ? 'error' : 'info'}
      className='mt-[2px]'
      style={{ color: Boolean(error) ? colors.error : colors.gray700, fontFamily: fonts.bodyLarge.fontFamily, lineHeight: 16 }}
    >
      {error || helper}
    </HelperText>
  )
}
