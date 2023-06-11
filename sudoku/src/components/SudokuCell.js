import React, {useState} from 'react';
import "../App.css";

export function SudokuCell(props) {
  const [value, setValue] = useState(0);

  function handleValueChange(value){
      setValue(value);
  }

  return (
    <input
      className="sudoku-cell"
      type="text"
      maxLength="1"
      value={props.value==0? '' : props.value}
      onChange={(e)=> setValue(e.target.value)}
      
      // onChange={(e) => props.onChange(props.row, props.col, e.target.value)}
    />
  );
}