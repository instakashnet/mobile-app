import * as Updates from "expo-updates";
import { DEV_API, PROD_API, GOOGLE_PLACES_API, GOOGLE_SIGNIN_ANDROID, GOOGLE_SIGNIN_EXPO, GOOGLE_SIGNIN_IOS } from "@env";

const ENV = {
  dev: {
    apiUrl: "https://api.dev.instakash.net",
    googlePlacesKey: GOOGLE_PLACES_API,
    googleSinInAndroid: GOOGLE_SIGNIN_ANDROID,
    googleSinInIos: GOOGLE_SIGNIN_IOS,
    googleSinInExpo: GOOGLE_SIGNIN_EXPO,
  },
  staging: {
    apiUrl: "https://api.dev.instakash.net",
    googlePlacesKey: GOOGLE_PLACES_API,
    googleSinInAndroid: GOOGLE_SIGNIN_ANDROID,
    googleSinInIos: GOOGLE_SIGNIN_IOS,
    googleSinInExpo: GOOGLE_SIGNIN_EXPO,
  },
  prod: {
    apiUrl: "https://api.instakash.net",
    googlePlacesKey: GOOGLE_PLACES_API,
    googleSinInAndroid: GOOGLE_SIGNIN_ANDROID,
    googleSinInIos: GOOGLE_SIGNIN_IOS,
    googleSinInExpo: GOOGLE_SIGNIN_EXPO,
  },
};

export const getVariables = () => {
  if (Updates.releaseChannel.startsWith("prod")) {
    // matches prod-v1, prod-v2, prod-v3
    return ENV.prod;
  } else if (Updates.releaseChannel.startsWith("staging")) {
    // matches staging-v1, staging-v2
    return ENV.staging;
  } else {
    // assume any other release channel is development
    return ENV.dev;
  }
};
