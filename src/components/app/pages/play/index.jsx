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
	const [game, setGame] = useState({ id: "0", rows: [[], [], []], turn: 1 });
	const [winKind, setWinKind] = useState("");
	const { id, playerid } = useParams();
	// when the game changes, call set turn function
	useEffect(() => setTurn(), [game]);
	useEffect(() => {
		// update the game every two seconds
		const interval = setInterval(async () => await updateGame(), 2000);
		return () => {
			clearInterval(interval);
		};
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

	const setTurn = () => {
		// if a win or tie, don't allow for more moves
		if (winKind) setIsLoading(true);
		// if it isn't this player's turn, don't let them move
		else if (game.turn.toString() !== playerid) setIsLoading(true);
		else setIsLoading(false);
	};

	const getGameWonMessage = () => {
		switch (winKind) {
			case "tie":
				return <div className={styles.gameText}>Game Tied!</div>;
			case "win":
				return <div className={styles.gameText}>Game Won!</div>;
			default:
				return null;
		}
	};

	return (
		<Page>
			<Link className={styles.homeButton} to='/home'>
				Exit Game
			</Link>
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
			<div className={styles.gameInfo}>Game id: {id}</div>
		</Page>
	);
};

export default Play;
