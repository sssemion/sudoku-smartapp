import React, { useEffect, useState } from 'react';
import { SudokuRow } from './SudokuRow';
import "../App.css";
import { useId } from 'react';


export default function SudokuBoard({board}) {
  return (
    <div className="sudoku-board">
        {board && board.field.map((row, index) => (
          <SudokuRow
            key={useId()}
            rowIndex={index}
            row={row}
          // onChange={props.onChange}
        />
      ))}
  </div>
    );
    
}

