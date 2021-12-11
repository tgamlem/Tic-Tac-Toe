/** @format */

import express from "express";
import gameAPI from "./game";
const api = express.Router();

api.use("/game", gameAPI);

// send 501 for anything without /game
api.all("/", (req, res) => {
	res.status(501).end();
});

export default api;
