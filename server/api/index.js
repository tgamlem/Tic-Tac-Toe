/** @format */

import express from "express";
import gameAPI from "./game";
const api = express.Router();

api.use("/game", gameAPI);

api.all("/", (req, res) => {
	res.status(501).end();
});

export default api;
