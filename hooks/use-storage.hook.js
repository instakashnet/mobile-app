import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getData = async (key) => {
  let value;

  try {
    const storedValue = await AsyncStorage.getItem(key);
    if (storedValue) value = JSON.parse(storedValue);
    return value;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(error);
    throw error;
  }
};
