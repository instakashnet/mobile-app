import { Linking, NativeModules, Platform } from 'react-native'

export async function openAppSetting() {
  if (Platform.OS === 'ios') {
    const isSupported = await Linking.canOpenURL('app-settings:')
    if (isSupported) await Linking.openSettings()
  } else {
    NativeModules.IntentAndroid.openSettings()
  }
}
