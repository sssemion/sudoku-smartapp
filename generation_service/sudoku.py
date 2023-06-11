import copy
import random
from enum import StrEnum
from typing import Iterator


class Difficulty(StrEnum):
    EASY = 'easy'
    MEDIUM = 'medium'
    HARD = 'hard'
    NOT_SET = ''


class SudokuField:
    difficulty: Difficulty
    field: list[list[int]]
    size: int

    def __init__(self, size: int, difficulty: Difficulty) -> None:
        self.difficulty = difficulty
        self.field = [[0 for _ in range(size * size)] for _ in range(size * size)]
        self.size = size

    def generate_field(self) -> None:
        self.field = [
            [
                (i * self.size + i // self.size + j) % (self.size ** 2) + 1
                for j in range(self.size ** 2)
            ] for i in range(self.size ** 2)
        ]

        steps = random.randrange(10, 16)
        for i in range(steps):
            action = random.choice((
                self._transpose,
                self._swap_single_rows,
                self._swap_single_columns,
                self._swap_row_sectors,
                self._swap_column_sectors,
            ))
            action()

    def _transpose(self) -> None:
        self.field = list(map(list, zip(*self.field)))

    def _swap_rows(self, row1: int, row2: int) -> None:
        self.field[row1], self.field[row2] = self.field[row2], self.field[row1]

    def _swap_single_rows(self) -> None:
        sector = random.randrange(self.size)
        row1 = random.randrange(self.size) + sector * self.size
        row2 = random.randrange(self.size) + sector * self.size
        while row1 == row2:
            row2 = random.randrange(self.size) + sector * self.size
        self._swap_rows(row1, row2)

    def _swap_single_columns(self) -> None:
        self._transpose()
        self._swap_single_rows()
        self._transpose()

    def _swap_row_sectors(self) -> None:
        sector1 = random.randrange(self.size)
        sector2 = random.randrange(self.size)
        while sector1 == sector2:
            sector2 = random.randrange(self.size)

        for i in range(self.size):
            row1 = sector1 * self.size + i
            row2 = sector2 * self.size + i
            self._swap_rows(row1, row2)

    def _swap_column_sectors(self) -> None:
        self._transpose()
        self._swap_row_sectors()
        self._transpose()

    def strike_out(self) -> None:
        seen = [[0 for _ in range(self.size ** 2)] for _ in range(self.size ** 2)]
        seen_count = 0
        cell_count = self.size ** 4
        while seen_count < self.size ** 4 and self.difficulty_by_cells_count(cell_count) != self.difficulty:
            i = random.randrange(self.size ** 2)
            j = random.randrange(self.size ** 2)
            if seen[i][j]:
                continue
            seen_count += 1
            seen[i][j] = 1

            temp = self.field[i][j]
            self.field[i][j] = 0
            cell_count -= 1

            if len(Solver(self).solutions) != 1:
                self.field[i][j] = temp
                cell_count += 1

    def difficulty_by_cells_count(self, cells_count: int) -> Difficulty | None:
        total_cells = self.size ** 4
        k = (total_cells - cells_count) / total_cells
        if k > 0.5:
            return None
        elif k > 0.4:
            return Difficulty.EASY
        elif k > 0.325:
            return Difficulty.MEDIUM
        elif k > 0.25:
            return Difficulty.HARD
        return None

    def validate(self) -> bool:
        for row in self.field:
            if sorted(row) != list(range(1, self.size ** 2 + 1)):
                return False
        self._transpose()
        for col in self.field:
            if sorted(col) != list(range(1, self.size ** 2 + 1)):
                return False
        self._transpose()
        for sector_i in range(self.size):
            for sector_j in range(self.size):
                sector = set()
                for i in range(sector_i * self.size, sector_i * self.size + self.size):
                    for j in range(sector_j * self.size, sector_j * self.size + self.size):
                        sector.add(self.field[i][j])
                if sector != set(range(1, self.size ** 2 + 1)):
                    return False
        return True

    def __iter__(self) -> Iterator[list[int]]:
        return iter(self.field)

    def __getitem__(self, item) -> list[int]:
        return self.field[item]

    def __len__(self) -> int:
        return self.size ** 2

    def __eq__(self, other):
        return self.field == other.field


class Solver:
    field: SudokuField
    solutions: list[SudokuField]

    def __init__(self, field: SudokuField):
        self.solutions = []
        for solution in solve(copy.deepcopy(field.field), field.size):
            sudoku_field_solution = SudokuField(field.size, field.difficulty)
            sudoku_field_solution.field = solution
            self.solutions.append(sudoku_field_solution)


def possible(field: list[list[int]], size: int, x: int, y: int, n: int) -> bool:
    for i in range(size ** 2):
        if field[x][i] == n or field[i][y] == n:
            return False
    x0 = (y // size) * size
    y0 = (x // size) * size
    for i in range(size):
        for j in range(size):
            if field[y0+i][x0+j] == n:
                return False
    return True


def solve(field: list[list[int]], size: int) -> list[list[list[int]]]:
    solutions = []
    for i in range(size ** 2):
        for j in range(size ** 2):
            if field[i][j] == 0:
                for n in range(1, size ** 2 + 1):
                    if possible(field, size, i, j, n):
                        field[i][j] = n
                        solutions.extend(solve(field, size))
                        field[i][j] = 0
                return solutions
    solutions.append([row[:] for row in field])
    return solutions


if __name__ == '__main__':
    grid = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ]

    solutions = solve(grid, 3)
    print(len(solutions))
    for solution in solutions:
        for row in solution:
            print(*row)
    print(solutions)
