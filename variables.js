import * as Updates from "expo-updates";
import { DEV_API, PROD_API } from "@env";

const ENV = {
  dev: {
    apiUrl: DEV_API,
  },
  staging: {
    apiUrl: PROD_API,
  },
  prod: {
    apiUrl: PROD_API,
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
