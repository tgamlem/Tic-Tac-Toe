/** @format */

import React, { useState, useEffect } from "react";

import Page from "../page";

import { Link, useParams } from "react-router-dom";

import GameCell from "../../../game-cell";

import styles from "./styles.scss";

import {
	player1Move,
	player2Move,
	fetchGame,
	win,
	tie,
} from "../../../../helpers/gameActions";

const Play = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [game, setGame] = useState({ id: "0", rows: [[], [], []] });
	const [winKind, setWinKind] = useState("");
	const { id, playerid } = useParams();
	useEffect(async () => {
		await updateGame();
	}, []);
	const onCellClicked = async (row, pos) => {
		setIsLoading(true);
		let res;
		if (playerid === "1") {
			res = await player1Move(id, row, pos);
		} else {
			res = await player2Move(id, row, pos);
		}
		if (!res) alert("Error occurred while moving");

		updateGame();

		setIsLoading(false);
	};

	const updateGame = async () => {
		setGame(await fetchGame(id));
		if ((await win(id)) === 200) setWinKind("win");
		else if ((await tie(id)) === 200) setWinKind("tie");
	};

	const getGameWonMessage = () => {
		switch (winKind) {
			case "tie":
				return <div>Game Tied!</div>;
			case "win":
				return <div>Game Won!</div>;
			default:
				return null;
		}
	};

	return (
		<Page>
			<Link to='/home'>Home</Link>
			<div>Play a Game</div>
			<div>Game id: {id}</div>
			{winKind && getGameWonMessage()}
			<div className={styles.gameboard}>
				<GameCell
					row={0}
					pos={0}
					value={game.rows[0][0]}
					onPlayHereClicked={onCellClicked}
					isLoading={isLoading}
				/>
				<GameCell
					row={0}
					pos={1}
					value={game.rows[0][1]}
					onPlayHereClicked={onCellClicked}
					isLoading={isLoading}
				/>
				<GameCell
					row={0}
					pos={2}
					value={game.rows[0][2]}
					onPlayHereClicked={onCellClicked}
					isLoading={isLoading}
				/>
				<GameCell
					row={1}
					pos={0}
					value={game.rows[1][0]}
					onPlayHereClicked={onCellClicked}
					isLoading={isLoading}
				/>
				<GameCell
					row={1}
					pos={1}
					value={game.rows[1][1]}
					onPlayHereClicked={onCellClicked}
					isLoading={isLoading}
				/>
				<GameCell
					row={1}
					pos={2}
					value={game.rows[1][2]}
					onPlayHereClicked={onCellClicked}
					isLoading={isLoading}
				/>
				<GameCell
					row={2}
					pos={0}
					value={game.rows[2][0]}
					onPlayHereClicked={onCellClicked}
					isLoading={isLoading}
				/>
				<GameCell
					row={2}
					pos={1}
					value={game.rows[2][1]}
					onPlayHereClicked={onCellClicked}
					isLoading={isLoading}
				/>
				<GameCell
					row={2}
					pos={2}
					value={game.rows[2][2]}
					onPlayHereClicked={onCellClicked}
					isLoading={isLoading}
				/>
			</div>
		</Page>
	);
};

export default Play;
