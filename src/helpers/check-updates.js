import * as Updates from 'expo-updates'
import { Alert } from 'react-native'

export async function checkUpdates() {
  console.log('Checking for updates...')

  if (__DEV__) {
    console.log("Can't check for updates in development.")
    return
  }

  try {
    const update = await Updates.checkForUpdateAsync()

    if (update.isAvailable) {
      await Updates.fetchUpdateAsync()

      Alert.alert(
        'Actualización realizada',
        'La aplicación ha sido actualizada correctamente, reinicie la aplicación para aplicar los cambios.',
        [{ text: 'Reiniciar', onPress: () => Updates.reloadAsync() }],
      )
    }
  } catch (error) {
    console.log(error)
  }
}
