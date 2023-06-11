import React from 'react';
import {SudokuCell} from './SudokuCell';
import "../App.css";
import { useId } from 'react';

export function SudokuRow({row, rowIndex}) {
    return (
      <div className="sudoku-row">
        {row.map((cell, index) => (
          <SudokuCell
            key={useId()}
            row={rowIndex}
            col={index}
            value_row={cell}
            // onChange={props.onChange}
          />
        ))}
      </div>
    );
  }
  