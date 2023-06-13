import React from 'react';
import {SudokuCell} from '../SudokuCell/SudokuCell';
import cl from './SudokuRow.module.css';

export function SudokuRow({row, rowIndex}) {
  
    return (
      <div className={cl.sudokuRow}>
        {row.map((cell, index) => (
          <SudokuCell
            key={index}
            row={rowIndex}
            col={index}
            value_row={cell}
          />
        ))}
      </div>
    );
  }
  