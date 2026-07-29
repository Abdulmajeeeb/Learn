// ============================================================
// gameLogic.js
// ------------------------------------------------------------
// This file contains all the "brains" of the Tic Tac Toe game.
// It keeps track of the board, whose turn it is, and who has
// won. The web server (main.js) calls the functions below to
// start games and record moves - it does not know how Tic Tac
// Toe actually works, that logic all lives here.
//
// A note on identity: each browser is given a permanent "seat"
// (seat1 or seat2) the first time it joins, and keeps that seat
// for the whole session. Which SYMBOL a seat plays as (X or O)
// can change between games - specifically, whoever lost the
// last game plays X (and therefore moves first) in the next one.
// ============================================================

// The size of the board (3 means a 3x3 grid).
let boardSize = 3;

// The board itself, stored as a 2D array (a list of rows,
// where each row is a list of cells). Each cell holds "X",
// "O", or "" (empty).
let ticTacToeTable = [];

// Whose turn it is right now: "X" or "O".
let currentPlayer = "X";

// Who has won the game: "X", "O", "draw", or null if the
// game is still going.
let winner = null;

// Becomes true once someone has won or the board is full.
let gameOver = false;

// Tracks which seats are already taken by a browser. Whoever
// asks to join first gets "seat1", the next person gets
// "seat2". Seats stay assigned for as long as the server keeps
// running, even across multiple "New Game" restarts.
let seatsTaken = { seat1: false, seat2: false };

// Which symbol each seat is currently playing as. This is what
// swaps around after someone loses.
let seatSymbol = { seat1: "X", seat2: "O" };

// Remembers which seat lost the most recent game, so the next
// game can give them "X" (and the first move) as a do-over.
let lastLoserSeat = null;

// Sets up a brand new, empty board and resets the game. Seats
// (who is "seat1"/"seat2") are NOT reset here, so the same two
// people keep playing across repeated "New Game" restarts - only
// which symbol they play as can change.
function createTable(size) {
    boardSize = size || 3;
    ticTacToeTable = [];
    winner = null;
    gameOver = false;

    // If someone lost last time, give them X (and the first
    // move) this time as a chance to bounce back. Otherwise,
    // leave the symbols as they already are (or as the default,
    // for the very first game).
    if (lastLoserSeat) {
        const otherSeat = lastLoserSeat === "seat1" ? "seat2" : "seat1";
        seatSymbol = { [lastLoserSeat]: "X", [otherSeat]: "O" };
    }

    // X always moves first.
    currentPlayer = "X";

    // Build an empty grid: boardSize rows, each with
    // boardSize empty cells.
    for (let row = 0; row < boardSize; row++) {
        let newRow = [];
        for (let col = 0; col < boardSize; col++) {
            newRow.push("");
        }
        ticTacToeTable.push(newRow);
    }

    return getState();
}

// Create the first board as soon as this file loads, so
// there's always something to show.
createTable(3);

// Places a player's mark ("X" or "O") on the board at the
// given row/column.
function updateTable(row, col, value) {
    ticTacToeTable[row][col] = value;
    return true;
}

// Looks at the board and figures out if the game has ended.
// Returns "X" or "O" if that player has three (or more) in a
// row, "draw" if the board is full with no winner, or null if
// the game should continue.
function gameEnd() {
    // --- Check every row for three matching marks ---
    for (let row = 0; row < boardSize; row++) {
        let first = ticTacToeTable[row][0];
        if (first === "") {
            continue; // an empty cell means this row can't be a win yet
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

    // --- Check every column for three matching marks ---
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

    // --- Check the main diagonal (top-left to bottom-right) ---
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

    // --- Check the anti-diagonal (top-right to bottom-left) ---
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

    // --- No winner found - check if the board is completely full ---
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

    // Still empty cells left and no winner yet - keep playing.
    return null;
}

// Records a move for the given player at row m, column n, then
// checks whether that move ended the game. Switches turns if
// the game is still going.
function makeMove(playerId, m, n) {
    updateTable(m, n, playerId);

    let result = gameEnd();
    if (result !== null) {
        // Someone won, or the board is full - the game is over.
        gameOver = true;
        winner = result;

        // If someone actually won (not a draw), remember which
        // seat lost, so they can start as X next game.
        if (result === "X" || result === "O") {
            const losingSymbol = result === "X" ? "O" : "X";
            lastLoserSeat = seatSymbol.seat1 === losingSymbol ? "seat1" : "seat2";
        }
    } else {
        // Nobody has won yet - pass the turn to the other player.
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    return getState();
}

// Called when someone opens the page and wants to play. Gives
// out "seat1" to whoever asks first, "seat2" to whoever asks
// next, and says the game is full if both seats are already
// taken. The seat is a permanent identity for that browser -
// which symbol (X/O) it plays as can still change between games.
function joinGame() {
    if (!seatsTaken.seat1) {
        seatsTaken.seat1 = true;
        return "seat1";
    }
    if (!seatsTaken.seat2) {
        seatsTaken.seat2 = true;
        return "seat2";
    }
    return null; // both seats are already taken
}

// Bundles up everything about the current game into one plain
// object, so it's easy to send back as JSON.
function getState() {
    return {
        board: ticTacToeTable,
        boardSize: boardSize,
        currentPlayer: currentPlayer,
        winner: winner,
        gameOver: gameOver,
        // Lets a browser look up "I am seat1, so what symbol am
        // I playing as this game?"
        seatSymbol: seatSymbol
    };
}

// Make these functions available to other files (like the routes).
module.exports = { createTable, makeMove, getState, joinGame };
