import React from 'react';
import {SudokuCell} from './SudokuCell';
import "../App.css";

export function SudokuRow(props) {
    return (
      <div className="sudoku-row">
        {props.row.map((cell, col) => (
          <SudokuCell
            key={col}
            row={props.rowIndex}
            col={col}
            value={cell}
            onChange={props.onChange}
          />
        ))}
      </div>
    );
  }
  