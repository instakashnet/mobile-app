import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { clearProfile, logoutUserSuccess } from "../store/actions";

let store;

export const injectStore = (_store) => {
  store = _store;
};

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

      if (status === 418 && !originalRequest._retry) {
        originalRequest._retry = true;

        await SecureStore.deleteItemAsync("authData");
        await AsyncStorage.removeItem("profileSelected");

        dispatch(clearProfile());
        dispatch(logoutUserSuccess());

        return Alert.alert("Tu sesión ha terminado", "El tiempo de tu sesión ha terminado, debes iniciar sesión nuevamente.", [{ text: "Lo entiendo" }]);
      } else {
        let message;
        if (error.response) {
          message = error.response.data.error?.message || "Ha ocurrido un error inesperado, por favor intenta de nuevo. Si el problema persiste contacte a soporte.";

          error.code = error.response.data.error?.code;
        }
        error.message = message;
        return Promise.reject(error);
      }
    }
  );
