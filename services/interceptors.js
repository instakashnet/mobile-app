import * as SecureStore from "expo-secure-store";

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
    (error) => {
      console.log(error);

      let message;
      if (error.response) {
        message = error.response.data.error
          ? error.response.data.error.message
          : "Ha ocurrido un error inesperado, por favor intenta de nuevo. Si el problema persiste contacte a soporte.";
      }

      error.message = message;

      return Promise.reject(error);
    }
  );
