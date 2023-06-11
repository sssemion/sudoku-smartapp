import React, {useState} from 'react';
import "../App.css";

export function SudokuCell({row, col, value_row}) {
  const [value, setValue] = useState(value_row);  
  function handleValueChange(value){
      setValue(value);
  }

  return (
    <input
      className="sudoku-cell"
      type="number"
      maxLength="1"
      value={value ? value : ''}
      onChange={(e)=> handleValueChange(e.target.value)}
      
      // onChange={(e) => props.onChange(props.row, props.col, e.target.value)}
    />
  );
}