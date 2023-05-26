import React, { useMemo } from 'react'
import { Button as PaperButton, useTheme } from 'react-native-paper'

const VARIANTS = {
  primary: {
    buttonColor: '#0a686a',
    textColor: '#FFF'
  },
  secondary: {
    buttonColor: '#FFF',
    textColor: '#0a686a',
    borderColor: '#F0F0F0'
  }
}

export default function Button({ variant = 'primary', disabled = false, children, ...rest }) {
  const { fonts, colors } = useTheme()

  const selectedVariant = useMemo(() => {
    return VARIANTS[variant]
  }, [variant])

  return (
    <PaperButton
      mode='contained'
      buttonColor={disabled ? colors.primary100 : selectedVariant?.buttonColor}
      textColor={selectedVariant?.textColor}
      contentStyle={{ height: 40, borderWidth: 1, borderColor: selectedVariant?.borderColor || 'transparent' }}
      labelStyle={{ fontFamily: fonts.button.fontFamily }}
      theme={{ roundness: 1 }}
      {...rest}
    >
      {children}
    </PaperButton>
  )
}
