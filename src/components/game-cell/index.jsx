/** @format */

import React from "react";

import styles from "./styles.scss";

// create a custom game cell that holds a value or displays a button to play the space
const GameCell = ({ value, row, pos, onPlayHereClicked, isLoading }) => {
	return (
		<div className={styles.box}>
			{value && <span>{value}</span>}
			{!value && (
				<button
					className={styles.button}
					onClick={() => onPlayHereClicked(row, pos)}
					disabled={isLoading}
				></button>
			)}
		</div>
	);
};

export default GameCell;
