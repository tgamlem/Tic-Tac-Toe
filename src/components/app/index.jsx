/** @format */

import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./pages/home";
import Games from "./pages/games";
import Play from "./pages/play";

const customHistory = createBrowserHistory();

const App = () => {
	return (
		<div className='app'>
			<Router history={customHistory}>
				<Switch>
					<Route path={"/games"} component={Games} />
					<Route path={"/:id/:playerid/play"} component={Play} />
					<Route path={"/"}>
						<Home />
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
