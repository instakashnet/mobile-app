import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { appReducer } from "./reducers";
import { LOGOUT_SUCCESS } from "../services/auth/types";
import createSaga from "redux-saga";
import { rootSaga } from "./sagas";

const sagaMiddleware = createSaga();

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) state = undefined;
  return appReducer(state, action);
};

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export { store };
