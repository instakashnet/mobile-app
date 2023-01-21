import * as Updates from "expo-updates";

let ENV = {
  stage: "dev",
  apiUrl: "https://api.dev.instakash.net",
  websocketUrl: "wss://ws.dev.instakash.net",
  bucketName: "instakash-docs-dev-us-east-1",
  googlePlacesKey: "AIzaSyC_fg3cQN2wcXRAdoUVup0X3JXSw4lOdGc",
  awsAccessKey: "AKIASK3IUQPBETGMFCF7",
  awsSecretKey: "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",
  fbAppId: "285266469843350",
};

if (Updates.channel === "production") {
  ENV.stage = "prod";
  ENV.apiUrl = "https://api.instakash.net";
  ENV.websocketUrl = "wss://ws.instakash.net";
  ENV.bucketName = "instakash-docs-us-east-1";
}

export default ENV;
