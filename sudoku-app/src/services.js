import axios from 'axios';
import Strings from './constants/Strings';

// export const BASIC_URL = 'http://localhost:8080';

export const $api = axios.create({
	// baseURL: BASIC_URL,
});

export const findBoard = (difficulty, size) =>
	axios
		.post(
			Strings.generate,
			{
				size: size,
				difficulty: difficulty,
			},
		)
		.then(({ data }) => data);

function _to_positive(field) {
	let res = [];
	for (let i = 0; i < field.length; i++) {
		res.push([]);
		for (let j = 0; j < field[i].length; j++) {
			res[i].push(Math.abs(field[i][j]));
		}
	}
	return res;
}

export const validateBoard = (board) =>
	axios.post(Strings.validate, 
	{ field: _to_positive(board.field) },
	)
	.then(({ data }) => data);


