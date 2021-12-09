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
			<div className={styles.bodyContainer}>
				<div className={styles.joinText}>
					<p>Join a Game!</p>
					<Link className={styles.joinButton} to='/games'>
						Games
					</Link>
				</div>
				<div className={styles.createText}>
					<p>Create a Game!</p>
					<CreateGameButton />
				</div>
			</div>
		</Page>
	);
};

export default Home;
