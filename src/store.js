import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import middleware from "./saga";
import reducer from "./reducers/reducer";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(middleware);

export default store;
