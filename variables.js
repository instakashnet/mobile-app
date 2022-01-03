import * as Updates from "expo-updates";
import { DEV_API, PROD_API, GOOGLE_PLACES_API, GOOGLE_SIGNIN_ANDROID, GOOGLE_SIGNIN_EXPO, GOOGLE_SIGNIN_IOS, AWS_ACCESS_KEY, AWS_SECRET_KEY } from "@env";

const ENV = {
  dev: {
    apiUrl: DEV_API,
    googlePlacesKey: GOOGLE_PLACES_API,
    googleSinInAndroid: GOOGLE_SIGNIN_ANDROID,
    googleSinInIos: GOOGLE_SIGNIN_IOS,
    googleSinInExpo: GOOGLE_SIGNIN_EXPO,
    awsAccessKey: AWS_ACCESS_KEY,
    awsSecretKey: AWS_SECRET_KEY,
    bucketName: "instakash-docs-dev",
  },
  staging: {
    apiUrl: DEV_API,
    googlePlacesKey: GOOGLE_PLACES_API,
    googleSinInAndroid: GOOGLE_SIGNIN_ANDROID,
    googleSinInIos: GOOGLE_SIGNIN_IOS,
    googleSinInExpo: GOOGLE_SIGNIN_EXPO,
    awsAccessKey: AWS_ACCESS_KEY,
    awsSecretKey: AWS_SECRET_KEY,
    bucketName: "instakash-docs-dev",
  },
  prod: {
    apiUrl: PROD_API,
    googlePlacesKey: GOOGLE_PLACES_API,
    googleSinInAndroid: GOOGLE_SIGNIN_ANDROID,
    googleSinInIos: GOOGLE_SIGNIN_IOS,
    googleSinInExpo: GOOGLE_SIGNIN_EXPO,
    awsAccessKey: AWS_ACCESS_KEY,
    awsSecretKey: AWS_SECRET_KEY,
    bucketName: "instakash-docs",
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
