import * as SecureStore from 'expo-secure-store';

export const saveInSecureStore = async (key, value) => {
  try {
    const formattedValue = JSON.stringify(value);
    await SecureStore.setItemAsync(key, formattedValue);

    return 'saved';
  } catch (error) {
    throw error;
  }
};

export const getFromSecureStore = async (key) => {
  try {
    let parsedValue;

    const value = await SecureStore.getItemAsync(key);

    if (value) parsedValue = JSON.parse(value);

    return parsedValue;
  } catch (error) {
    throw error;
  }
};

export const deleteFromSecureStore = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);

    return 'deleted';
  } catch (error) {
    throw error;
  }
};
