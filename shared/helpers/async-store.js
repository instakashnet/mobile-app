import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveInStore = async (key, value) => {
  try {
    const formattedValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, formattedValue);

    return "saved";
  } catch (error) {
    throw error;
  }
};

export const getFromStore = async (key) => {
  let parsedValue = null;

  const value = await AsyncStorage.getItem(key);

  if (value) parsedValue = JSON.parse(value);

  return parsedValue;
};

export const deleteFromStore = async (key) => {
  try {
    await AsyncStorage.removeItem(key);

    return "deleted";
  } catch (error) {
    throw error;
  }
};
