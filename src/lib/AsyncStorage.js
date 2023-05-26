import AsyncStorage from '@react-native-async-storage/async-storage'

export async function storeData(key, value) {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    // saving error
    throw e
  }
}

export async function getData(key) {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    // error reading value
    throw e
  }
}

export async function removeData(key) {
  try {
    await AsyncStorage.removeItem(key)
  } catch (e) {
    // remove error
    throw e
  }
}
