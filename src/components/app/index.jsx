import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./pages/home";

const customHistory = createBrowserHistory();

const App = () => {
	return (
		<div className='app'>
			<Router history={customHistory}>
				<Switch>
					<Route path={"/"}>
						<Home />
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
