import * as SecureStore from 'expo-secure-store'

export async function storeSecureData(key, value = '') {
  try {
    const jsonValue = JSON.stringify(value)

    await SecureStore.setItemAsync(key, jsonValue)
  } catch (error) {
    console.error(error)
  }
}

export async function getSecureData(key) {
  let result

  try {
    let storedValue = await SecureStore.getItemAsync(key)

    if (storedValue) {
      result = JSON.parse(storedValue)
    }

    return result
  } catch (error) {
    console.error(error)
  }
}

export async function removeSecureData(key) {
  try {
    await SecureStore.deleteItemAsync(key)
  } catch (error) {
    console.error(error)
  }
}
