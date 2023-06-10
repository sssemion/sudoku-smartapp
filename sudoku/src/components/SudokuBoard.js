import React from 'react';
import {SudokuRow} from './SudokuRow';
import "../App.css";

export default function SudokuBoard(props) {
    return (
      <div className="sudoku-board">
        {props.board.map((row, rowIndex) => (
          <SudokuRow
            key={rowIndex}
            rowIndex={rowIndex}
            row={row}
            onChange={props.onChange}
          />
        ))}
      </div>
    );
  }

