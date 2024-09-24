import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="41377596152-na9k4rhig6qssbksas0dq6006431s3qt.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
      
  </Provider>
);
