const game = {
    boardSize: 3,
    board: [],
    currentPlayer: "X",
    moves: 0,
    gameOver: false
}


function createTable(game) {
    game.board = [];
    for (let row = 0; row < game.boardSize; row++) {
        let newRow = [];
        for (let col = 0; col < game.boardSize; col++) {
            newRow.push("");
        }
        game.board.push(newRow);
    }
};

function updateTable(row, col, value) {
    if (game.board[row][col] !== "") {
        console.log("Cell Already Occupied");
        return false;
    }
    game.board[row][col] = value;
    return true;
};

function gameEnd() {
    //Check rows
    for (let row = 0; row < boardSize; row++) {
        let first = game.board[row][0];
        if (first === "") {
            continue;
        }
        let rowWin = true;
        for (let col = 1; col < boardSize; col++) {
            if (game.board[row][col] !== first) {
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
        let first = game.board[0][col];
        if (first === "") {
            continue;
        }
        let colWin = true;
        for (let row = 1; row < boardSize; row++) {
            if (game.board[row][col] !== first) {
                colWin = false;
                break;
            }
        }
        if (colWin) {
            return true;
        }
    };
    //Check Diagonal
    let diagonalFirst = game.board[0][0];
    if (diagonalFirst !== "") {
        let diagonalWin = true;
        for (let i = 1; i < boardSize; i++) {
            if (game.board[i][i] !== diagonalFirst) {
                diagonalWin = false;
                break;
            }
        }
        if (diagonalWin) {
            return true;
        }
    };
    //Check Anti-Diagonal
    let antiDiagonalFirst = game.board[0][boardSize - 1]
    if (antiDiagonalFirst !== "") {
        let antiDiagonalWin = true;
        for (let i = 1; i < boardSize; i++) {
            if (antiDiagonalFirst !== game.board[i][boardSize - 1 - i]) {
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

module.exports = {
    game,
    createTable,
    updateTable,
    gameEnd
}
