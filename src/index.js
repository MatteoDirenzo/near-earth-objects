import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App api_key={process.env.REACT_APP_NASA_API_KEY} />
  </React.StrictMode>
);
