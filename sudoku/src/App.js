import React from 'react';

import { Button } from '@salutejs/plasma-ui/components/Button/Button';

import {
    createSmartappDebugger,
    createAssistant,
} from "@salutejs/client";
import "./App.css";

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

        this.state = {}

        this.assistant = initializeAssistant(() => this.getStateForAssistant() );
    }


    render() {
        return (
            <div className="App">
            </div>
        );
    }

    getStateForAssistant () {
        const state = {};
        return state;
    }
}
