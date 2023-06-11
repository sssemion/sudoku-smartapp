import React from 'react'
import { useEffect, useState } from 'react';
import SudokuBoard from './SudokuBoard';
import MyButton from './MyButton';
import Strings from '../constants/strings';

export const Layout = () => {
	const [loading, setLoading] = useState(true)
	const [board, setBoard] = useState(null);

	const fetchBoard = (difficulty) => {
		let params = {
			"size": 3,
			"difficulty": `${difficulty}`,
		};
		fetch("http://172.20.10.13:8888/api/v1/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(params),
		}).then(res => res.json())
			.then(data => {
				setBoard(data);
				setLoading(false);
				console.log(board);
			}
			)
	}

	useEffect(() => {
		let params = {
			"size": 3,
			"difficulty": "easy",
		};
		fetch("http://172.20.10.13:8888/api/v1/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(params),
		}).then(res => res.json())
			.then(data => {
				setBoard(data);
				setLoading(false);
				console.log(board);
			}
			)
	}, [loading]);

	return (
		<div>
			<SudokuBoard board={board} />
			<MyButton title={Strings.check} view={Strings.primary}></MyButton>
			<MyButton title={Strings.difficultyLevel} view={Strings.warning}></MyButton>
			<MyButton title={Strings.startAgain} view={Strings.critical} onClick={() => fetchBoard('medium')}></MyButton>
		</div>
	)
}
