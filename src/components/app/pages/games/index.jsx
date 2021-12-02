/** @format */

import React from "react";

import Page from "../page";

import { Link } from "react-router-dom";

const Games = () => {
	return (
		<Page>
			<Link to='/home'>Home</Link>
			<div>Show list of games</div>
		</Page>
	);
};

export default Games;
