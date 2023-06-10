import React,{ useState } from 'react';

import {
    createSmartappDebugger,
    createAssistant,
} from "@salutejs/client";

import "./App.css";

import SudokuBoard from './components/SudokuBoard';

const initializeAssistant = (getState/*: any*/) => {
    if (process.env.NODE_ENV === "development") {
        return createSmartappDebugger({
        token: process.env.REACT_APP_TOKEN,
        initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
        getState,
        });
    }
    return createAssistant({ getState });
};
  

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.board = Array(9).fill(Array(9).fill(12));
          
        this.state = {}

        this.assistant = initializeAssistant(() => this.getStateForAssistant() );
    }

    // handleCellChange = (row, col, value) => {
    //     const newBoard = this.board.map((r, i) => (i === row ? [...r.slice(0, col), value, ...r.slice(col + 1)] : r));
    //     this.setBoard(newBoard);
    // };
    
    
    render() {
          return (
            <div className="App">
              <SudokuBoard board={this.board} onChange={this.handleCellChange} />
            </div>
          );
        
    }

    getStateForAssistant () {
        const state = {};
        return state;
    }
}

