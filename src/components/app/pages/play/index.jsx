/** @format */

import React from "react";

import Page from "../page";

import { Link } from "react-router-dom";

const Play = () => {
	return (
		<Page>
			<Link to='/home'>Home</Link>
			<div>Play a Game</div>
			<div class="game-board">
				<div class="box">X</div>
				<div class="box">O</div>
				<div class="box">O</div>
				<div class="box">O</div>
				<div class="box">X</div>
				<div class="box">O</div>
				<div class="box">O</div>
				<div class="box">X</div>
				<div class="box">X</div>
			</div>
		</Page>
	);
};

export default Play;
