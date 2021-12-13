/** @format */

import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./components/app";

// if defined, open the app
if (typeof window !== "undefined") {
	ReactDOM.render(<App />, document.getElementById("root"));
}
