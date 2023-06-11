import flask

from sudoku import Difficulty, SudokuField

api = flask.Blueprint('api', __name__)


@api.route('/generate', methods=['POST'])
def generate() -> flask.Response | None:
    request = flask.request.json
    if not (size := request.get('size')):
        return flask.abort(400, 'Missing "size" parameter')
    if not (difficulty := request.get('difficulty')):
        return flask.abort(400, 'Missing "difficulty" parameter')
    try:
        difficulty = Difficulty(difficulty)
    except ValueError:
        return flask.abort(400, 'Parameter "difficulty" must be one of ["easy", "medium", "hard"]')

    field = SudokuField(size, difficulty)
    field.generate_field()
    field.strike_out()
    result = flask.jsonify({'size': size, 'difficulty': difficulty.value, 'field': field.field})
    return result


@api.route('/validate', methods=['POST'])
def validate() -> flask.Response | None:
    request = flask.request.json
    if not (field := request.get('field')):
        return flask.abort(400, 'Missing "field" parameter')
    size = int(len(field) ** 0.5)
    sudoku = SudokuField(size, Difficulty.NOT_SET)
    sudoku.field = field
    return flask.jsonify({'valid': sudoku.validate()})
