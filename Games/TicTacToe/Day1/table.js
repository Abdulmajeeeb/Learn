const ticTacToeTable = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];

function updateTable(row, col, value) {
    ticTacToeTable[row][col] = value;
}

function getCell(m, n) {
    return ticTacToeTable[m][n];
}

function compareCells(m1, n1, m2, n2) {
    const A = getCell(m1, n1);
    const B = getCell(m2, n2);

    if (A !== "" && B !== "" && A === B) {
        return true;
    }
    return false;
}

function gameEnd() {
    // Any row
    let row = 0;
    while (row < 3) {
        if (compareCells(row, 0, row, 1) && compareCells(row, 1, row, 2)) {
            console.log('here')
            return true;
        }
        row += 1;
    }
    // Any column
    let col = 0;
    while (col < 3) {
        if (compareCells(0, col, 1, col) && compareCells(1, col, 2, col)) {
            return true;
        }
        col += 1;
    }


    // primary diagonal
    if (compareCells(0, 0, 1, 1) && compareCells(0, 0, 2, 2)) {
        return true;
    }
    // secondary diagonal
    if (compareCells(2, 0, 1, 1) && compareCells(2, 0, 0, 2)) {
        return true;
    }
    return false;
}

module.exports = {
    table: ticTacToeTable,
    updateTable,
    gameEnd
};