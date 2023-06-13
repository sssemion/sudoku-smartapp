import React from 'react';
import { SudokuRow } from '../SudokuRow/SudokuRow';
import cl from './SudokuBoard.module.css';

export function SudokuBoard({ board }) {
	return (
		<div className={cl.sudokuBoard}>
			{board.field.map((row, index) => (
				<SudokuRow
					key={index}
					rowIndex={index}
					row={row}
				/>
			))}
		</div>
	);
}
