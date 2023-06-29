import React from 'react'
import * as AppleAuthentication from 'expo-apple-authentication'

export default function AppleLogin() {
  return (
    // <Button variant="secondary" className="w-full" onPress={() => console.log('logging apple..')} icon={() => <AppleIcon width={20} />}>
    //   <Text variant="button" style={{ color: '#525252' }}>
    //     Ingresar con apple
    //   </Text>
    // </Button>
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={5}
      style={{ height: 44, width: '100%' }}
      onPress={async () => {
        try {
          const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME, AppleAuthentication.AppleAuthenticationScope.EMAIL],
          })
          console.log(credential)
          // signed in
        } catch (e) {
          if (e.code === 'ERR_REQUEST_CANCELED') {
            // handle that the user canceled the sign-in flow
          } else {
            // handle other errors
          }
        }
      }}
    />
  )
}
