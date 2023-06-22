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
			document.getElementsByClassName('focusCell')
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
					className={cl.sudokuCell + (row == cell.active.row && col == cell.active.col ? ' activeCell' : '') + (row == cell.focus.row && col == cell.focus.col ? ' focusCell' : '')}
					type='text'
					maxLength='1'
					value={value ? value : ''}
					onChange={e => {
						data.field[row][col] = +e.target.value;
						setValue(_isNumberInRange(e.target.value) ? e.target.value : '');
						handleBoardChange(data);
					}}
					onClick={e => {
						cell.active.row = row;
						cell.active.col = col;
						cell.focus.row = row;
						cell.focus.col = col;
						handleBoardChange(data);
						setCell({active: {row: cell.active.row, col: cell.active.col}, focus: {row: cell.focus.row, col: cell.focus.col}});
					}}
					onKeyDown={e => {
						if (e.key === 'Backspace') {
							data.field[cell.active.row][cell.active.col] = '';
							handleBoardChange(data);
							setCell({active: {row: cell.active.row, col: cell.active.col}, focus: {row: cell.focus.row, col: cell.focus.col}});
						}
						else if (_isNumberInRange(e.key)) {
							data.field[cell.active.row][cell.active.col] = e.key;
							handleBoardChange(data);
							setCell({active: {row: cell.active.row, col: cell.active.col}, focus: {row: cell.focus.row, col: cell.focus.col}});
						}
						else if (e.key === 'ArrowLeft') {
							var col_ = cell.focus.col - 1;
							var row_ = cell.focus.row;
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
								cell.focus.col = col_;
								cell.focus.row = row_;
								setCell({active: {row: cell.active.row, col: cell.active.col}, focus: {row: cell.focus.row, col: cell.focus.col}});
							}
						}
						else if (e.key === 'ArrowRight') {
							var col_ = cell.focus.col + 1;
							var row_ = cell.focus.row;
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
								cell.focus.col = col_;
								cell.focus.row = row_;
								setCell({active: {row: cell.active.row, col: cell.active.col}, focus: {row: cell.focus.row, col: cell.focus.col}});
							}
						}
						else if (e.key === 'ArrowUp') {
							var col_ = cell.focus.col;
							var row_ = cell.focus.row - 1;
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
								cell.focus.col = col_;
								cell.focus.row = row_;
								setCell({active: {row: cell.active.row, col: cell.active.col}, focus: {row: cell.focus.row, col: cell.focus.col}});
							}
						}
						else if (e.key === 'ArrowDown') {
							var col_ = cell.focus.col;
							var row_ = cell.focus.row + 1;
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
								cell.focus.col = col_;
								cell.focus.row = row_;
								setCell({active: {row: cell.active.row, col: cell.active.col}, focus: {row: cell.focus.row, col: cell.focus.col}});
							}
						}
						else if (e.key === 'Enter') {
							cell.active.col = col;
							cell.active.row = row;
							cell.focus.col = col;
							cell.focus.row = row;
							setCell({active: {row: cell.active.row, col: cell.active.col}, focus: {row: cell.focus.row, col: cell.focus.col}});
						}
					}}
					readOnly={ true }
				/>
			)}
		</>
	);
}
