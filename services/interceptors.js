import { getErrorMessage } from "./error-codes";
import * as SecureStore from "expo-secure-store";

export const reqInterceptor = (instance) =>
  instance.interceptors.request.use(
    async (config) => {
      console.log(`Request sent to: ${config.url}`);
      const authData = await SecureStore.getItemAsync("authData");
      let token;

      if (authData) {
        token = JSON.parse(authData).token;
        console.log("token", token);
        config.headers["x-access-token"] = token;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

export const resInterceptor = (instance) =>
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      let message = getErrorMessage();
      if (error.response) {
        console.log(error.response);
        message = getErrorMessage(error.response.data.code);
      }

      error.message = message;

      return Promise.reject(error);
    }
  );
