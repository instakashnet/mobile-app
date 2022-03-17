import { END, eventChannel } from "redux-saga";
import { call, fork, take, takeEvery, cancel, cancelled, put, select } from "redux-saga/effects";
import * as SecureStore from "expo-secure-store";
import { WEBSOCKET } from "./types";
import { getVariables } from "../../variables";
import { loadUserSuccess } from "../../store/actions";

const { websocketUrl } = getVariables();
let ws;

const createChannel = (token, service) =>
  eventChannel((emit) => {
    const connectToWs = () => {
      ws = new WebSocket(`${websocketUrl}/ws?token=${token}&service=${service}`);

      ws.onopen = () => {
        console.log("Connection opened.");
      };

      ws.onerror = (error) => {
        console.log("error in the connection: " + error);
      };

      ws.onmessage = (event) => {
        let message;

        try {
          message = JSON.parse(event.data);
        } catch (error) {
          console.log("Error parsing: ", event.data);
        }

        if (message) return emit(message);
      };

      ws.onclose = (e) => {
        console.log(e.code);

        if (e.code === 1001 || e.code === 1000) {
          console.log("Connection closed.");
          emit(END);
        } else {
          console.log("The connection has closed unexpectedly. Reconnect try.");
          setTimeout(() => {
            connectToWs();
          }, 5000);
        }
      };
    };
    connectToWs();

    return () => {
      ws.onmessage = null;
      console.log("closing connection");
      ws.close();
    };
  });

function* listenToSocketSaga(...args) {
  let socketChannel;

  try {
    socketChannel = yield call(createChannel, ...args);

    while (true) {
      const action = yield take(socketChannel);

      switch (action.type) {
        case "validation":
          let user = yield select((state) => state.authReducer.user);
          yield put(loadUserSuccess({ ...user, identityDocumentValidation: action.data.status, ...action.data }));
        default:
          break;
      }
    }
  } catch (error) {
    console.log("Error connecting.. " + error);
  } finally {
    if (yield cancelled()) socketChannel.close();
  }
}

function* connectToSocketSaga({ service }) {
  const authData = yield call([SecureStore, "getItemAsync"], "authData");
  const { token } = JSON.parse(authData);

  const socket = yield fork(listenToSocketSaga, token, service);

  yield take(WEBSOCKET.DISCONNECT);
  yield cancel(socket);
}

export function* socketSaga() {
  yield takeEvery(WEBSOCKET.CONNECT, connectToSocketSaga);
}
