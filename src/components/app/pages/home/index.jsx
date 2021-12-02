/** @format */

import React from "react";

import Page from "../page";

import { Link } from "react-router-dom";

import styles from "./styles.scss";

const Home = () => {
	return (
		<Page>
			<div className={styles.hello}>Hello World!</div>
			<Link to='/games'>Games</Link>
		</Page>
	);
};

export default Home;
