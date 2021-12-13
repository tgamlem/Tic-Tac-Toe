/** @format */

import React from "react";

import { useHistory } from "react-router-dom";

import styles from "./styles.scss";

import { createGame } from "../../helpers/gameActions";

const CreateGameButton = () => {
	const history = useHistory();

	const onClick = async () => {
		// send a creat game request and await the server's response
		const game = await createGame();
		// if the request was successful, open the new game
		if (game) history.push(`${game}/1/play`);
		else alert("unable to create game");
	};

	return (
		<button className={styles.createButton} onClick={onClick}>
			Create
		</button>
	);
};

export default CreateGameButton;
