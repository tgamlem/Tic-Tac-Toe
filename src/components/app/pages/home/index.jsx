/** @format */

import React from "react";

import Page from "../page";

import styles from "./styles.scss";

const Home = () => {
	return (
		<Page>
			<div className={styles.hello}>Hello World!</div>
		</Page>
	);
};

export default Home;
