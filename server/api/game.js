/** @format */

import express from "express";
import { v1 as uuidv1 } from "uuid";
const gameAPI = express.Router();

let games = [];

gameAPI.post("/new", (req, res) => {
	var id = uuidv1(); // make a game id
	games.push(new Game(id)); // make the new game
	res.status(201).send(`${id}`); // return the id
});

gameAPI.put("/:id/player1move", (req, res) => {
	var game = getGameById(req.params.id); // get the game that is being played
	if (game.setValue(req.body.row, req.body.position, "X")) {
		// if the space is empty, place move and return game
		res.status(200).send(game);
	} else {
		// if the space is occupied, return error message
		res.status(400).send("invalid move");
	}
});

gameAPI.put("/:id/player2move", (req, res) => {
	var game = getGameById(req.params.id); // get the game that is being played
	if (game.setValue(req.body.row, req.body.position, "O")) {
		// if the space is empty, place move and return game
		res.status(200).send(game);
	} else {
		// if the space is occupied, return error message
		res.status(400).send("invalid move");
	}
});

gameAPI.get("/:id/gameWon", (req, res) => {
	var game = getGameById(req.params.id);
	if (game === null) res.status(404).send("Game not found");
	if (game.checkWin()) res.send("Game Won!");
	res.status(204).send();
});

gameAPI.get("/:id/gameTie", (req, res) => {
	var game = getGameById(req.params.id);
	if (game === null) res.status(404).send("Game not found");
	if (game.checkTie()) res.send("Tie!");
	res.status(204).send();
});

gameAPI.get("/:id", (req, res) => {
	var game = getGameById(req.params.id); // find the game by id
	// if the game exists, return it
	if (game !== null) res.json(game);
	// if the game doesn't exist, return an error message
	else res.status(404).send("Game not found");
});

const getGameById = (id) => {
	// check all open games
	for (var game of games) {
		if (game.id === id) {
			// if the given id is the same as one in the array
			return game;
		}
	}
	return null;
};

export default gameAPI;

class Game {
	constructor(id) {
		this.id = id; // game id
		this.rows = [
			["", "", ""],
			["", "", ""],
			["", "", ""],
		]; // spaces on the game board
	}

	setValue(row, position, value) {
		// don't let someone overwrite a space
		if (this.checkMove(row, position) === true) {
			this.rows[row][position] = value;
			return true;
		} else {
			return false;
		}
	}

	checkMove(row, position) {
		// check if the desired space is empty
		if (this.rows[row][position] === "") return true;
		else return false;
	}

	checkWin() {
		// row
		for (var row of this.rows) {
			if (
				this.arraysMatch(row, ["X", "X", "X"]) ||
				this.arraysMatch(row, ["O", "O", "O"])
			) {
				return true;
			}
		}
		// col
		for (var i = 0; i < 3; i++) {
			if (
				(this.rows[0][i] === "X" &&
					this.rows[1][i] === "X" &&
					this.rows[2][i] === "X") ||
				(this.rows[0][i] === "O" &&
					this.rows[1][i] === "O" &&
					this.rows[2][i] === "O")
			) {
				return true;
			}
		}
		// left to right diagonal
		if (
			(this.rows[0][0] === "X" &&
				this.rows[1][1] === "X" &&
				this.rows[2][2] === "X") ||
			(this.rows[0][0] === "O" &&
				this.rows[1][1] === "O" &&
				this.rows[2][2] === "O")
		) {
			return true;
		}
		// right to left diagonal
		if (
			(this.rows[0][2] === "X" &&
				this.rows[1][1] === "X" &&
				this.rows[2][0] === "X") ||
			(this.rows[0][2] === "O" &&
				this.rows[1][1] === "O" &&
				this.rows[2][0] === "O")
		) {
			return true;
		}

		return false;
	}

	checkTie() {
		// if someone won, not a tie
		if (this.checkWin === true) {
			return false;
		}
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				// if any space is empty
				if (this.rows[i][j] === "") {
					return false;
				}
			}
		}
		// otherwise, nobody won and no empty spaces, so a tie
		return true;
	}

	arraysMatch(arr1, arr2) {
		// Check if the arrays are the same length
		if (arr1.length !== arr2.length) return false;

		// Check if all items exist in the same order
		for (var i = 0; i < arr1.length; i++) {
			if (arr1[i] !== arr2[i]) return false;
		}

		// Otherwise, the arrays are the same
		return true;
	}
}
