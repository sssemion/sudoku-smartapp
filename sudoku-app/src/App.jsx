import { useState, createContext } from 'react';
import './App.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { findBoard, validateBoard } from './services';
import { SudokuBoard } from './modules/SudokuBoard/SudokuBoard';
import { Keyboard } from './modules/Keyboard/Keyboard';
import { CustomToast } from './modules/CustomToast/CustomToast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Strings from './constants/Strings';
import MyButton from './modules/MyButton/MyButton';
import SberRadioButtons from './modules/CustomRadioButton/SberRadioButtons';
import Assistant from './modules/Assistant/Assistant';

export const BoardContext = createContext({ board: [], setBoard: () => { } });

export const CellContext = createContext({ cell: {row: null, col: null}, setCell: () => { } });

export const AssistantContext = createContext({handleStart: () => {}, handleCheck: () => {}, setDifficulty: () => {}, buttonValue: {} });


function countZeroes(matrix) {
	if (!matrix) return;
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			if (matrix[i][j] === 0) {
				return false;
			}
		}
	}
	return true;
}

function App() {
	const queryClient = useQueryClient();

	const [board, setBoard] = useState(null);
	const [verif, setVerif] = useState(false);

	//выбранный уровень сложности
	const [buttonValue, setButtonValue] = useState({difficulty: "easy"});

	//показываем ли тост сейчас или нет
	const [toastVisible, setToastVisible] = useState(false);

	//выбранная ячейка 
	const [cell, setCell] = useState({row: null, col: null});


	function handleBoardChange(board) {
		if (board) {
			setVerif(countZeroes(board.field));
		}
		setBoard(board);
	}

	function handleButtonValueChange(value) {
		setButtonValue(value);
	}

	function handleStartAgainButton() {
		refetch();
		setVerif(false);
	}

	const handleClickCheckButton = () => {
		console.log(board);
		mutation.mutate();
	};

	const showToast = (message) => {
		if (!toastVisible) {
			setToastVisible(true);
			toast(<CustomToast message={message} />, {
				onClose: () => setToastVisible(false),
			});
		}
	};

	const { data, refetch } = useQuery({
		queryKey: ['board'],
		queryFn: () => findBoard(buttonValue.difficulty, 3),
		onSuccess: data => {
			for (let i = 0; i < data.field.length; i++) {
				for (let j = 0; j < data.field[i].length; j++) {
					data.field[i][j] *= -1;
				}
			}
			setBoard(data);
		}
	});

	const mutation = useMutation({
		queryKey: ['validate'],
		mutationFn: () => validateBoard(board),
		onSuccess: (data) => {
			if (data.valid) {
				showToast(Strings.correct);
			}
			else {
				showToast(Strings.incorrect);
			}
		},
		onError: () => {
			showToast("Поле не заполнено");
		}
	});

	return (
		<CellContext.Provider value={{ cell, setCell }}>
			<AssistantContext.Provider value={{ handleStartAgainButton, handleClickCheckButton, setButtonValue, buttonValue }}>
				<BoardContext.Provider value={{ data, handleBoardChange }}>
					<Assistant />
				{mutation.isLoading && <div class="spinnerContainer"><div class="spinner"></div></div>}
					<div className='App'>
						<div className='ControlPanel'>
							<div className='SelectDifficulty'>
							<SberRadioButtons onChange={(e) => handleButtonValueChange({difficulty: e.target.value})} value={buttonValue.difficulty} ></SberRadioButtons>
							</div>

							<div className="ButtonRow">
								<MyButton title={Strings.startAgain} onClick={handleStartAgainButton} disabled={false}></MyButton>
								<MyButton title={Strings.check} onClick={handleClickCheckButton} disabled={!verif} ></MyButton>
							</div>
							<Keyboard></Keyboard>
						</div>
						
						<ToastContainer toastStyle={{ backgroundColor: "#00000033" }} />

						<div className='BoardContainer'>
							<SudokuBoard board={data} />
						</div>

					</div>
				</BoardContext.Provider>
			</AssistantContext.Provider> 
		</CellContext.Provider>
	);
}

export default App;
