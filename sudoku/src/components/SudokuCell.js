import React from 'react';
import "../App.css";

export  function SudokuCell(props) {
  return (
    <input
      className="sudoku-cell"
      type="text"
      maxLength="1"
      value={props.value==0? '' : props.value}
      onChange={(e) => props.onChange(props.row, props.col, e.target.value)}
    />
  );
}