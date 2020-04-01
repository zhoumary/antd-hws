import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";
import { Provider } from 'react-redux';
// import i18n (needs to be bundled ;)) 
import './i18n';
import store from "./redux-ts/store";


import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  </Suspense>
  ,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
