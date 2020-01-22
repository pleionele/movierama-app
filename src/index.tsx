import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App/App";
import "./styles/index.scss";

ReactDOM.render(
    <div>
        <App name="world"/>
  </div>,
  document.getElementById("app"),
);