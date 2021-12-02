/** @format */

import React from "react";

import Page from "../page";

import { Link } from "react-router-dom";

const Create = () => {
	return (
		<Page>
			<Link to='/home'>Home</Link>
			<div>Create a new game</div>
		</Page>
	);
};

export default Create;
