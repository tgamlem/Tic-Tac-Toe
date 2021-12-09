/** @format */

import React from "react";

import Page from "../page";

import { Link } from "react-router-dom";

import CreateGameButton from "../../../create-game-button";

import styles from "./styles.scss";

const Home = () => {
	return (
		<Page>
			<div className={styles.title}>Welcome to 2-Player Tic-Tac-Toe!</div>
			<Link className={styles.joinButton} to='/games'>
				Games
			</Link>
			<CreateGameButton />
			<div className={styles.joinText}>Join a Game!</div>
			<div className={styles.createText}>Create a Game!</div>
		</Page>
	);
};

export default Home;
