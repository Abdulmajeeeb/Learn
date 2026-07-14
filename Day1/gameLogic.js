const boardSize = 4;
let ticTacToeTable = [];
function createTable() {
    ticTacToeTable=[];
    for (let row = 0; row < boardSize; row++) {
        let newRow=[];
        for (let col = 0; col < boardSize; col++) {
            newRow.push("");
        }
        ticTacToeTable.push(newRow);
    }
};
createTable();
console.log(ticTacToeTable);

function updateTable(row, col, value) {
    if (ticTacToeTable[row][col] !== "") {
        console.log("Cell Already Occupied");
        return false;
    }
    ticTacToeTable[row][col] = value;
    return true;
};

function getCell(m, n) {
    return ticTacToeTable[m][n];
};

function compareCells(m1, n1, m2, n2) {
    const A = getCell(m1, n1);
    const B = getCell(m2, n2);
    if (A !== "" && B !== "" && A === B) {
        return true;
    }
};
function resetTable() {
    for (let row = 0; row < boardSize; row++) {
        ticTacToeTable[row] = ["", "", ""];
    }
}
function gameEnd() {
    //Rows
    let row = 0;
    while (row < 3) {
        if (compareCells(row, 0, row, 1) && compareCells(row, 0, row, 2)) {
            return true;
        }
        row += 1;
    }
    //Columns
    let col = 0;
    while (col < 3) {
        if (compareCells(0, col, 1, col) && compareCells(0, col, 2, col)) {
            return true;
        }
        col += 1;
    }
    //Primary Diagonal
    if (compareCells(0, 0, 1, 1) && compareCells(0, 0, 2, 2)) {
        return true;
    }
    //Secondary Diagonal
    if (compareCells(2, 0, 1, 1) && compareCells(2, 0, 0, 2)) {
        return true;
    }
    return false;
}