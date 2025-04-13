import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "remixicon/fonts/remixicon.css";
import "react-toastify/dist/ReactToastify.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "./index.css";
import "./App.css";

import { Provider } from "react-redux";
import { store, persistedStore } from "./store/Store";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./Components/spinner/loading/Loading.jsx";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistedStore}>
      <App />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnHover={false}
        draggable
        closeOnClick
      />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
