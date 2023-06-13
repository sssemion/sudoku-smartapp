import React,{ useState, Suspense } from 'react';

import {
    createSmartappDebugger,
    createAssistant,
} from "@salutejs/client";

import "./App.css";

import SudokuBoard from './components/SudokuBoard';
import MyButton from './components/MyButton';
import Strings from './constants/strings';
import { Layout } from './components/Layout';

const initializeAssistant = (getState/*: any*/) => {
    if (process.env.NODE_ENV === "development") {
        return createSmartappDebugger({
        token: process.env.REACT_APP_TOKEN,
        initPhrase: `Запусти судоку`,
        getState,
        });
    }
    return createAssistant({ getState });
};

function handleAssistantData(data) {
    if (data.type === "smart_app_data") {
        if (data.action.type === "replay_with_difficulty") {
            console.log("Replay request with difficulty: ", data.action.difficulty);
            // TODO: здесь будет вызов обновления борды
        }

        else if (data.action.type === "quit") {
            // Когда пользователь сказал "нет" на вопрос "давай сыграем в судоку?"
        }

        else if (data.action.type === "validate") {
            // Когда пользователь просит проверить
        }
    }
}
  

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.board = Array(9).fill(Array(9).fill(12));
          
        this.state = {}

        this.assistant = initializeAssistant(() => this.getStateForAssistant() );

        this.assistant.on('data', (data) => {handleAssistantData(data);});
    }
    

    // handleCellChange = (row, col, value) => {
    //     const newBoard = this.board.map((r, i) => (i === row ? [...r.slice(0, col), value, ...r.slice(col + 1)] : r));
    //     this.setBoard(newBoard);
    // };

    
    render() {
          return (
              <Layout/>
          );
        
    }

    getStateForAssistant () {
        const state = {};
        return state;
    }
}

