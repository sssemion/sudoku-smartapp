import React, {useContext} from "react";
import {
    createSmartappDebugger,
    createAssistant,
} from "@salutejs/client";
import { AssistantContext } from "../../App";

var assistant = null;

export default function Assistant(props) {

	const { handleStartAgainButton, handleClickCheckButton, setButtonValue, buttonValue } = useContext(AssistantContext);

    const initializeAssistant = (getState/*: any*/) => {
		if (import.meta.env.MODE === "development") {
			return createSmartappDebugger({
				token: import.meta.env.VITE_TOKEN,
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
                buttonValue.difficulty = data.action.difficulty;
				setButtonValue(buttonValue);
				handleStartAgainButton();
			}
	
			else if (data.action.type === "quit") {
				// Когда пользователь сказал "нет" на вопрос "давай сыграем в судоку?"
			}
	
			else if (data.action.type === "validate") {
                handleClickCheckButton();
			}
		}
	}
	
	function getStateForAssistant () {
		const state = {};
		return state;
	}

	if (assistant === null) {
		assistant = initializeAssistant(() => getStateForAssistant() );
		assistant.on('data', (data) => {handleAssistantData(data);});
	}

    return (
        <div style={{display: null}}></div>
    );
}