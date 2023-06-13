import React, {useState} from 'react';
import "../App.css";

export function SudokuCell({row, col, value_row}) {
  const [value, setValue] = useState(value_row); 
  
  
  function handleValueChange(cell_value){
      setValue(cell_value);
  }

  function _isNumberInRange(str) {
    var regex = /^[1-9]$/;
    return regex.test(str);
  }

  return (
    <input
      className={"sudoku-cell"}
      type="text"
      maxLength="1"
      value={value ? value : ''}
      onChange={(e)=> handleValueChange(_isNumberInRange(e.target.value) ? e.target.value : '')}
      
      // onChange={(e) => props.onChange(props.row, props.col, e.target.value)}
    />
  );
}