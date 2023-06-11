import React, { useEffect, useState } from 'react';
import { SudokuRow } from './SudokuRow';
import "../App.css";


export default function SudokuBoard(props) {
  const [loading, setLoading] = useState(true)
  const [board, setBoard] = useState(null);
  
  // handleCellChange = (row, col, value) => {
  //     const newBoard = this.board.map((r, i) => (i === row ? [...r.slice(0, col), value, ...r.slice(col + 1)] : r));
  //     this.setBoard(newBoard);
  // };

  // useEffect(() => {
  //   let params = {
  //     "size": 3,
  //     "difficulty": "easy",
  //   };
  //   fetch("http://192.168.1.66:8888/api/v1/generate", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(params),
  //   }).then(res => res.json()).then(data => {
  //       setLoading(false)
  //       setBoard(data)
  //     }
  //     )
  // }, [loading]);

  console.log(board) 

  return (
      <div className="sudoku-board">
        {props.board.map((row, rowIndex) => (
          <SudokuRow
            key={rowIndex}
            rowIndex={rowIndex}
            row={row}
          // onChange={props.onChange}
        />
      ))}
    </div>
    );
    
}

