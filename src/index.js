import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const api_key = "vTpZ6QOhXdgDp2FXRmsd2phf4Y3MGMaKZ7QCT2p1";

root.render(
  <React.StrictMode>
    <App api_key={api_key} />
  </React.StrictMode>
);
