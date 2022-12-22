import { AWS_ACCESS_KEY, AWS_SECRET_KEY, FB_APP_ID, GOOGLE_PLACES_API } from "@env";
import * as Updates from "expo-updates";

const ENV = {
  dev: {
    apiUrl: "https://api.dev.instakash.net",
    googlePlacesKey: GOOGLE_PLACES_API,
    awsAccessKey: AWS_ACCESS_KEY,
    awsSecretKey: AWS_SECRET_KEY,
    websocketUrl: "wss://ws.dev.instakash.net",
    bucketName: "instakash-docs-dev",
    fbAppId: FB_APP_ID,
    stage: "dev",
  },
  prod: {
    apiUrl: "https://api.instakash.net",
    googlePlacesKey: GOOGLE_PLACES_API,
    awsAccessKey: AWS_ACCESS_KEY,
    awsSecretKey: AWS_SECRET_KEY,
    websocketUrl: "wss://ws.instakash.net",
    bucketName: "instakash-docs",
    fbAppId: FB_APP_ID,
    stage: "prod",
  },
};

export const getVariables = () => {
  if (Updates.releaseChannel.startsWith("prod")) {
    // matches prod-v1, prod-v2, prod-v3
    return ENV.prod;
  } else {
    // assume any other release channel is development
    return ENV.dev;
  }
};
