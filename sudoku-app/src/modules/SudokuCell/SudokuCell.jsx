import React, { useState, useEffect, useContext } from 'react';
import cl from './SudokuCell.module.css';
import { BoardContext } from '../../App';


export function SudokuCell({ row, col, value_row }) {
	const [value, setValue] = useState(value_row);
    
	const { data, handleBoardChange } = useContext(BoardContext);

	function _isNumberInRange(str) {
		var regex = /^[1-9]$/;
		return regex.test(str);
	}

	useEffect(() => {
		setValue(value_row);
	}, [value_row]);

	return (
		<>
			{value_row<0 ? (
				<input
					className={cl.sudokuCellFixed}
					type='text'
					maxLength='1'
					disabled={true}
					value={value ? -value : ''}
					onChange={e => {
						setValue(_isNumberInRange(e.target.value) ? e.target.value : '');
					}}
				/>
			) : (
				<input
					className={cl.sudokuCell}
					type='text'
					maxLength='1'
					value={value ? value : ''}
					onChange={e => {
						data.field[row][col] = +e.target.value;
						setValue(_isNumberInRange(e.target.value) ? e.target.value : '');
						handleBoardChange(data);
					}}
				/>
			)}
		</>
	);
}
