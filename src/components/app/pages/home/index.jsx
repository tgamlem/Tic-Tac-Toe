/** @format */

import React from "react";

import Page from "../page";

import { Link } from "react-router-dom";

import styles from "./styles.scss";

const Home = () => {
	return (
		<Page>
			<div className={styles.title}>Welcome to 2-Player Tic-Tac-Toe!</div>
			<Link className={styles.joinButton} to='/games'>
				Games
			</Link>
			<Link className={styles.createButton} to='/create'>
				Create
			</Link>
			<Link className={styles.playButton} to='/Play'>
				Play
			</Link>
			<div className={styles.joinText}>Join a Game!</div>
			<button className={styles.joinButton}>Join</button>
			<div className={styles.createText}>Create a Game!</div>
			<button className={styles.createButton}>Create</button>
		</Page>
	);
};

export default Home;
