let ticTacToeTable = [];
function createTable() {
    ticTacToeTable = [];
    for (let row = 0; row < boardSize; row++) {
        let newRow = [];
        for (let col = 0; col < boardSize; col++) {
            newRow.push("");
        }
        ticTacToeTable.push(newRow);
    }
};
createTable();

function updateTable(row, col, value) {
    if (ticTacToeTable[row][col] !== "") {
        console.log("Cell Already Occupied");
        return false;
    }
    ticTacToeTable[row][col] = value;
    return true;
};

function gameEnd() {
    //Check rows
    for (let row = 0; row < boardSize; row++) {
        let first = ticTacToeTable[row][0];
        if (first === "") {
            continue;
        }
        let rowWin = true;
        for (let col = 1; col < boardSize; col++) {
            if (ticTacToeTable[row][col] !== first) {
                rowWin = false;
                break;
            }
        }
        if (rowWin) {
            return true;
        }
    };
    //Check columns
    for (let col = 0; col < boardSize; col++) {
        let first = ticTacToeTable[0][col];
        if (first === "") {
            continue;
        }
        let colWin = true;
        for (let row = 1; row < boardSize; row++) {
            if (ticTacToeTable[row][col] !== first) {
                colWin = false;
                break;
            }
        }
        if (colWin) {
            return true;
        }
    };
    //Check Diagonal
    let diagonalFirst = ticTacToeTable[0][0];
    if (diagonalFirst !== "") {
        let diagonalWin = true;
        for (let i = 1; i < boardSize; i++) {
            if (ticTacToeTable[i][i] !== diagonalFirst) {
                diagonalWin = false;
                break;
            }
        }
        if (diagonalWin) {
            return true;
        }
    };
    //Check Anti-Diagonal
    let antiDiagonalFirst = ticTacToeTable[0][boardSize - 1]
    if (antiDiagonalFirst !== "") {
        let antiDiagonalWin = true;
        for (let i = 1; i < boardSize; i++) {
            if (antiDiagonalFirst !== ticTacToeTable[i][boardSize - 1 - i]) {
                antiDiagonalWin = false;
                break;
            }

        }
        if (antiDiagonalWin) {
            return true;
        }
    }
    return false;
};