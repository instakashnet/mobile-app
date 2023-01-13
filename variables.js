import { AWS_ACCESS_KEY, AWS_SECRET_KEY, FB_APP_ID, GOOGLE_PLACES_API } from "@env";
import * as Updates from "expo-updates";

let ENV = {
  stage: "dev",
  apiUrl: "https://api.dev.instakash.net",
  websocketUrl: "wss://ws.dev.instakash.net",
  bucketName: "instakash-docs-dev-us-east-1",
  googlePlacesKey: GOOGLE_PLACES_API,
  awsAccessKey: AWS_ACCESS_KEY,
  awsSecretKey: AWS_SECRET_KEY,
  fbAppId: FB_APP_ID,
};

if (Updates.channel === "production") {
  ENV.stage = "prod";
  ENV.apiUrl = "https://api.instakash.net";
  ENV.websocketUrl = "wss://ws.instakash.net";
  ENV.bucketName = "instakash-docs-us-east-1";
}

export default ENV;
