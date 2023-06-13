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
		fetch("https://bbamlm6cc4sq228u0rp1.containers.yandexcloud.net/api/v1/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(params),
		}).then(res => res.json())
			.then(data => {
				setBoard(data);
				setLoading(false);
			}
			)
	}

	useEffect(() => {
		let params = {
			"size": 3,
			"difficulty": "easy",
		};
		fetch("https://bbamlm6cc4sq228u0rp1.containers.yandexcloud.net/api/v1/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(params),
		}).then(res => res.json())
			.then(data => {
				setBoard(data);
				setLoading(false);
			}
			)
	}, [loading]);

	return (
		<div className="App">
            <div className="ButtonRow">
                <MyButton title={Strings.check} view={Strings.primary}></MyButton>
                <MyButton title={Strings.difficultyLevel} view={Strings.warning}></MyButton>
                <MyButton title={Strings.startAgain} view={Strings.critical} onClick={() => fetchBoard('medium')}></MyButton>
            </div>
            <div className="BoardContainer">
                <SudokuBoard board={board} />
            </div>
		</div>
	)
}
