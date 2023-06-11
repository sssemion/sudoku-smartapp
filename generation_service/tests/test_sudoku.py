from generation_service.sudoku import SudokuField, Difficulty


def test_generation():
    field = SudokuField(3, Difficulty.EASY)
    field.generate_field()

    for row in field:
        assert sorted(row) == list(range(1, 10))

    cols = [[] for _ in range(9)]
    for i in range(len(field)):
        for j in range(len(field[i])):
            cols[j].append(field[i][j])

    for col in cols:
        assert sorted(col) == list(range(1, 10))

    for sector_i in range(3):
        for sector_j in range(3):
            sector = set()
            for i in range(sector_i * 3, sector_i * 3 + 3):
                for j in range(sector_j * 3, sector_j * 3 + 3):
                    sector.add(field[i][j])
            assert len(sector) == 9

    field._transpose()
    assert cols == field.field


def test_strike_out():
    easy_field = SudokuField(3, Difficulty.EASY)
    easy_field.generate_field()
    easy_field.strike_out()
    empty_cell_count = 0
    for row in easy_field:
        empty_cell_count += row.count(0)
    assert 30 <= empty_cell_count < 35

    medium_field = SudokuField(3, Difficulty.MEDIUM)
    medium_field.generate_field()
    medium_field.strike_out()
    empty_cell_count = 0
    for row in medium_field:
        empty_cell_count += row.count(0)
    assert 25 <= empty_cell_count < 30

    hard_field = SudokuField(3, Difficulty.HARD)
    hard_field.generate_field()
    hard_field.strike_out()
    empty_cell_count = 0
    for row in hard_field:
        empty_cell_count += row.count(0)
    assert 20 <= empty_cell_count < 25


def test_validate():
    field = SudokuField(3, Difficulty.EASY)
    field.generate_field()
    assert field.validate()

    field.field[0][0] = field.field[0][1]
    assert not field.validate()

    field.generate_field()
    assert field.validate()

    field.field[0][0] = field.field[1][1]
    assert not field.validate()

    field.generate_field()
    assert field.validate()

    field.field[8][8] = field.field[6][6]
    assert not field.validate()
