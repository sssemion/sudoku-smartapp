import React, { useState, useEffect, useContext } from 'react';
import MyButton from '../MyButton/MyButton';
import { BoardContext, CellContext } from '../../App';


export function Keyboard() {

	const { cell, setCell } = useContext(CellContext);
	const { data, handleBoardChange } = useContext(BoardContext);

    function handleKeyClick(val) {
        if (cell.active.row === null || cell.active.col === null) {
            return;
        }
        data.field[cell.active.row][cell.active.col] = val;
        handleBoardChange(data);
        setCell({active: {row: cell.active.row, col: cell.active.col}, focus: {row: cell.focus.row, col: cell.focus.col}});
    }

	return (
        <div className='Keyboard'>
            <MyButton className='KeyButton' onClick={() => handleKeyClick(1)} title='1'></MyButton>
            <MyButton className='KeyButton' onClick={() => handleKeyClick(2)} title='2'></MyButton>
            <MyButton className='KeyButton' onClick={() => handleKeyClick(3)} title='3'></MyButton>
            <MyButton className='KeyButton' onClick={() => handleKeyClick(4)} title='4'></MyButton>
            <MyButton className='KeyButton' onClick={() => handleKeyClick(5)} title='5'></MyButton>
            <MyButton className='KeyButton' onClick={() => handleKeyClick(6)} title='6'></MyButton>
            <MyButton className='KeyButton' onClick={() => handleKeyClick(7)} title='7'></MyButton>
            <MyButton className='KeyButton' onClick={() => handleKeyClick(8)} title='8'></MyButton>
            <MyButton className='KeyButton' onClick={() => handleKeyClick(9)} title='9'></MyButton>
            <MyButton className='KeyButton' onClick={() => handleKeyClick(0)} title='Очистить'></MyButton>
        </div>
	);
}
