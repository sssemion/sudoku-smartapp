import React, { useState, useEffect, useContext, useRef } from 'react';
import cl from './SudokuCell.module.css';
import { BoardContext, CellContext } from '../../App';


export function SudokuCell({ row, col, value_row }) {
	const [value, setValue] = useState(value_row);
    
	const { data, handleBoardChange } = useContext(BoardContext);

	const {cell, setCell} = useContext(CellContext);

	function _isNumberInRange(str) {
		str = str.toString();
		var regex = /^[1-9]$/;
		return regex.test(str);
	}

	useEffect(() => {
		setValue(value_row);
	}, [value_row]);

	useEffect(() => {
		const allActive = Array.from(
			document.getElementsByClassName('activeCell')
		);
		for (var i = 0; i < allActive.length; i++) {
			allActive[i].focus();
		}
	}, [cell])

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
					readOnly={ true }
				/>
			) : (
				<input
					className={cl.sudokuCell + (row == cell.row && col == cell.col ? ' activeCell' : '')}
					type='text'
					maxLength='1'
					value={value ? value : ''}
					onChange={e => {
						data.field[row][col] = +e.target.value;
						setValue(_isNumberInRange(e.target.value) ? e.target.value : '');
						handleBoardChange(data);
					}}
					onClick={e => {
						cell.row = row;
						cell.col = col;
						handleBoardChange(data);
						setCell({row: cell.row, col: cell.col});
					}}
					onKeyDown={e => {
						if (e.key === 'Backspace') {
							data.field[cell.row][cell.col] = '';
							handleBoardChange(data);
							setCell({row: cell.row, col: cell.col});
						}
						else if (_isNumberInRange(e.key)) {
							data.field[cell.row][cell.col] = e.key;
							handleBoardChange(data);
							setCell({row: cell.row, col: cell.col});
						}
						else if (e.key === 'ArrowLeft') {
							var col_ = cell.col - 1;
							var row_ = cell.row;
							while (col_ >= 0 && data.field[row_][col_] < 0) {
								if (row_ > 0 && data.field[row_ - 1][col_] >= 0) {
									row_--;
									break;
								} 
								if (row_ < 8 && data.field[row_ + 1][col_] >= 0) {
									row_++;
									break;
								} 
								col_--;
							}
							if (col_ >= 0 && data.field[row_][col_] >= 0) {
								cell.col = col_;
								cell.row = row_;
								setCell({row: cell.row, col: cell.col});
							}
						}
						else if (e.key === 'ArrowRight') {
							var col_ = cell.col + 1;
							var row_ = cell.row;
							while (col_ <= 8 && data.field[row_][col_] < 0) {
								if (row_ > 0 && data.field[row_ - 1][col_] >= 0) {
									row_--;
									break;
								} 
								if (row_ < 8 && data.field[row_ + 1][col_] >= 0) {
									row_++;
									break;
								} 
								col_++;
							}
							if (col_ <= 8 && data.field[row_][col_] >= 0) {
								cell.col = col_;
								cell.row = row_;
								setCell({row: cell.row, col: cell.col});
							}
						}
						else if (e.key === 'ArrowUp') {
							var col_ = cell.col;
							var row_ = cell.row - 1;
							while (row_ >= 0 && data.field[row_][col_] < 0) {
								if (col_ > 0 && data.field[row_][col_ - 1] >= 0) {
									col_--;
									break;
								} 
								if (col_ < 8 && data.field[row_][col_ + 1] >= 0) {
									col_++;
									break;
								} 
								row_--;
							}
							if (row_ >= 0 && data.field[row_][col_] >= 0) {
								cell.col = col_;
								cell.row = row_;
								setCell({row: cell.row, col: cell.col});
							}
						}
						else if (e.key === 'ArrowDown') {
							var col_ = cell.col;
							var row_ = cell.row + 1;
							while (row_ <= 8 && data.field[row_][col_] < 0) {
								if (col_ > 0 && data.field[row_][col_ - 1] >= 0) {
									col_--;
									break;
								} 
								if (col_ < 8 && data.field[row_][col_ + 1] >= 0) {
									col_++;
									break;
								} 
								row_++;
							}
							if (row_ <= 8 && data.field[row_][col_] >= 0) {
								cell.col = col_;
								cell.row = row_;
								setCell({row: cell.row, col: cell.col});
							}
						}
						else if (e.key === 'Enter') {
							cell.col = col;
							cell.row = row;
							setCell({row: cell.row, col: cell.col});
						}
					}}
					readOnly={ true }
				/>
			)}
		</>
	);
}
