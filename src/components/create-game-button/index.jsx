/** @format */

import React from "react";

import { useHistory } from "react-router-dom";

import styles from "./styles.scss";

import { createGame } from "../../helpers/gameActions";

const CreateGameButton = () => {
	const history = useHistory();

	const onClick = async () => {
		const game = await createGame();
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
