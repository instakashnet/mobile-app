import { AWS_ACCESS_KEY, AWS_SECRET_KEY, GOOGLE_PLACES_API } from "@env";
import * as Updates from "expo-updates";

const ENV = {
  dev: {
    apiUrl: "https://api.dev.instakash.net",
    googlePlacesKey: GOOGLE_PLACES_API,
    awsAccessKey: AWS_ACCESS_KEY,
    awsSecretKey: AWS_SECRET_KEY,
    websocketUrl: "wss://ws.dev.instakash.net",
    bucketName: "instakash-docs-dev",
    stage: "dev",
  },
  staging: {
    apiUrl: "https://api.dev.instakash.net",
    googlePlacesKey: GOOGLE_PLACES_API,
    awsAccessKey: AWS_ACCESS_KEY,
    awsSecretKey: AWS_SECRET_KEY,
    websocketUrl: "wss://ws.dev.instakash.net",
    bucketName: "instakash-docs-dev",
    stage: "staging",
  },
  prod: {
    apiUrl: "https://api.instakash.net",
    googlePlacesKey: GOOGLE_PLACES_API,
    awsAccessKey: AWS_ACCESS_KEY,
    awsSecretKey: AWS_SECRET_KEY,
    websocketUrl: "wss://ws.instakash.net",
    bucketName: "instakash-docs",
    stage: "prod",
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
