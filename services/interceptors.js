import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../store";
import { clearProfile, logoutUserSuccess } from "../store/actions";

export const reqInterceptor = (instance) =>
  instance.interceptors.request.use(
    async (config) => {
      console.log(`Request sent to: ${config.url}`);
      const authData = await SecureStore.getItemAsync("authData");
      let token;

      if (authData) {
        token = JSON.parse(authData).token;
        config.headers["x-access-token"] = token;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

export const resInterceptor = (instance) =>
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.status || error.response.status,
        originalRequest = error.config,
        { dispatch } = store;

      if ((status === 403 || status === 401) && !originalRequest._retry) {
        await SecureStore.deleteItemAsync("authData");
        await AsyncStorage.removeItem("profileSelected");

        dispatch(clearProfile());
        return dispatch(logoutUserSuccess());
      } else {
        let message;
        if (error.response) {
          message = error.response.data.error
            ? error.response.data.error.message
            : "Ha ocurrido un error inesperado, por favor intenta de nuevo. Si el problema persiste contacte a soporte.";
        }

        error.message = message;

        return Promise.reject(error);
      }
    }
  );
