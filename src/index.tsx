import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"

import { App } from "./components/App";
import { setupStore } from "./redux/store";

const domContainer = document.querySelector("#root");

if (domContainer) {
  const root = ReactDOM.createRoot(domContainer);
  root.render(
    <Provider store={setupStore(undefined)}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>,
  );
}