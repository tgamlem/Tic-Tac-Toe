/** @format */

import { fetchJSON } from "./fetch";

export const joinGame = async (id) => {
	try {
		// make a join request and await the result
		const res = await fetch(`/api/game/${id}/join`, { method: "PUT" });
		// check the response status to determine success
		if (res.status === 200) return true;
		else return false;
	} catch (e) {
		console.error("error while joining game: ", e);
		return false;
	}
};

export const createGame = async () => {
	try {
		// make a create game request and await the result
		const res = await fetch("/api/game/new", { method: "POST" });
		// check the response status to determine success
		if (res.status === 201) return res.json();
		else return null;
	} catch (e) {
		console.error("error while creating game: ", e);
		return null;
	}
};

export const fetchGame = async (id) => {
	// return the JSON game response
	return await fetchJSON(`/api/game/${id}`);
};

export const player1Move = async (id, row, pos) => {
	// move for player 1
	return await makeMove(id, 1, row, pos);
};

export const player2Move = async (id, row, pos) => {
	// move for player 2
	return await makeMove(id, 2, row, pos);
};

export const win = async (id) => {
	try {
		// make a win request and await the result
		const res = await fetch(`/api/game/${id}/gamewon`);
		return res.status;
	} catch (e) {
		console.error("Error while checking win: ", e);
	}
};

export const tie = async (id) => {
	try {
		// make a tie request and await the result
		const res = await fetch(`/api/game/${id}/gametie`);
		return res.status;
	} catch (e) {
		console.error("Error while checking tie: ", e);
	}
};

const makeMove = async (id, playerid, row, pos) => {
	try {
		// make a move request and await the response
		const res = await fetch(`/api/game/${id}/player${playerid}move`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ row, position: pos }),
		});
		// check the response status to determine success
		if (res.status === 200) return true;
		else return false;
	} catch (e) {
		console.error("error while making move: ", e);
		return false;
	}
};
