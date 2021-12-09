/** @format */

import React from "react";

import styles from "./styles.scss";

const GameCell = ({ value, row, pos, onPlayHereClicked, isLoading }) => {
	return (
		<div className={styles.box}>
			{value && <span>{value}</span>}
			{!value && (
				<button
					onClick={() => onPlayHereClicked(row, pos)}
					disabled={isLoading}
				>
					Play here
				</button>
			)}
		</div>
	);
};

export default GameCell;
