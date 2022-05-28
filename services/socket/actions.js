import { WEBSOCKET } from "./types";

export const connectWebsocket = (service) => ({
  type: WEBSOCKET.CONNECT,
  service,
});

export const disconnectWebsocket = () => ({
  type: WEBSOCKET.DISCONNECT,
});
