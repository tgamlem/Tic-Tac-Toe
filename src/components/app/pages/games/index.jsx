/** @format */

import React, { useState, useEffect } from "react";

import Page from "../page";

import { Link, useHistory } from "react-router-dom";

import { fetchJSON } from "../../../../helpers/fetch";

import { joinGame } from "../../../../helpers/gameActions";

import styles from "./styles.scss";

const Games = () => {
	const history = useHistory();
	const [games, setGames] = useState([]);
	useEffect(async () => {
		const res = await fetchJSON("/api/game/listavailablebyid");
		setGames(res);
	}, []);

	const onClick = async (id) => {
		const join = await joinGame(id);
		if (join) history.push(`${id}/2/play`);
		else alert("unable to join game");
	};

	return (
		<Page>
			<Link className={styles.homeButton} to='/home'>
				Home
			</Link>
			<div className={styles.bodyContainer}>
				<h1 className={styles.gameText}>Available Games:</h1>
				{games.map((x) => {
					return (
						<div className={styles.listItem} key={x}>
							<span className={styles.listText}>{x}</span>
							<button
								className={styles.button}
								onClick={() => onClick(x)}
							>
								Join
							</button>
						</div>
					);
				})}
			</div>
		</Page>
	);
};

export default Games;
