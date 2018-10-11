import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./css/index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
