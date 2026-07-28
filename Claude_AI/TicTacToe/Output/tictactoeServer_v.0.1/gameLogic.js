// Tic Tac Toe game logic (n x n board)

let boardSize = 3;
let ticTacToeTable = [];
let currentPlayer = "X";
let winner = null;
let gameOver = false;

function createTable(size) {
    boardSize = size || 3;
    ticTacToeTable = [];
    currentPlayer = "X";
    winner = null;
    gameOver = false;
    for (let row = 0; row < boardSize; row++) {
        let newRow = [];
        for (let col = 0; col < boardSize; col++) {
            newRow.push("");
        }
        ticTacToeTable.push(newRow);
    }
    return getState();
}
createTable(3);

function updateTable(row, col, value) {
    if (ticTacToeTable[row][col] !== "") {
        console.log("Cell Already Occupied");
        return false;
    }
    ticTacToeTable[row][col] = value;
    return true;
}

// Returns "X" / "O" if someone has won, "draw" if the board is full, otherwise null
function gameEnd() {
    // Check rows
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
            return first;
        }
    }
    // Check columns
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
            return first;
        }
    }
    // Check Diagonal
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
            return diagonalFirst;
        }
    }
    // Check Anti-Diagonal
    let antiDiagonalFirst = ticTacToeTable[0][boardSize - 1];
    if (antiDiagonalFirst !== "") {
        let antiDiagonalWin = true;
        for (let i = 1; i < boardSize; i++) {
            if (antiDiagonalFirst !== ticTacToeTable[i][boardSize - 1 - i]) {
                antiDiagonalWin = false;
                break;
            }
        }
        if (antiDiagonalWin) {
            return antiDiagonalFirst;
        }
    }
    // Check draw (no empty cells left)
    let boardFull = true;
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (ticTacToeTable[row][col] === "") {
                boardFull = false;
                break;
            }
        }
    }
    if (boardFull) {
        return "draw";
    }
    return null;
}

// playerId is "X" or "O". Returns { error } on a bad move, otherwise the new state.
function makeMove(playerId, m, n) {
    if (gameOver) {
        return { error: "Game is already over. Start a new game with /new" };
    }
    if (playerId !== "X" && playerId !== "O") {
        return { error: "playerId must be 'X' or 'O'" };
    }
    if (playerId !== currentPlayer) {
        return { error: "Not your turn. It is " + currentPlayer + "'s turn" };
    }
    if (!Number.isInteger(m) || !Number.isInteger(n) || m < 0 || n < 0 || m >= boardSize || n >= boardSize) {
        return { error: "m and n must be integers between 0 and " + (boardSize - 1) };
    }
    if (!updateTable(m, n, playerId)) {
        return { error: "Cell already occupied" };
    }

    let result = gameEnd();
    if (result !== null) {
        gameOver = true;
        winner = result; // "X", "O" or "draw"
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
    return getState();
}

function getState() {
    return {
        board: ticTacToeTable,
        boardSize: boardSize,
        currentPlayer: currentPlayer,
        winner: winner,
        gameOver: gameOver
    };
}

module.exports = { createTable, makeMove, getState };
