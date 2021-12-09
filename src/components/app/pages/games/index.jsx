/** @format */

import React, { useState, useEffect } from "react";

import Page from "../page";

import { Link, useHistory } from "react-router-dom";

import { fetchJSON } from "../../../../helpers/fetch";

import { joinGame } from "../../../../helpers/gameActions";

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
			<Link to='/home'>Home</Link>
			<div>Show list of games</div>
			{games.map((x) => {
				return (
					<div key={x}>
						<span>{x}</span>
						<button onClick={() => onClick(x)}>Join</button>
					</div>
				);
			})}
		</Page>
	);
};

export default Games;
