// -----------------------------------------------------------------------------
// Board Configuration
// -----------------------------------------------------------------------------

// Number of rows on the game board.
let ROWS;

// Number of columns on the game board.
let COLS;

// Number of consecutive pieces required to win.
let WIN = 4;

// Empty Cells
let empty=".";

// -----------------------------------------------------------------------------
// Game Board
// -----------------------------------------------------------------------------

// Create an empty game board.
// Every cell is initialized with "." to represent an empty position.
let board = [];

function initializeBoard(ROWS, COLS){
    board=[];
for (let i = 0; i < ROWS; i++) {

    // Create a new row.
    board.push([]);

    // Fill the row with empty cells.
    for (let j = 0; j < COLS; j++) {
        board[i].push(empty);
    }
}
}

// -----------------------------------------------------------------------------
// Places a piece into the selected column.
//
// The function starts from the bottom row and searches upward until
// it finds the first empty position.
//
// Returns:
//      true  -> Piece successfully placed.
//      false -> Selected column is already full.
// -----------------------------------------------------------------------------
function updateBoard(col, value) {

    // Start from the bottom-most row.
    for (let i = ROWS - 1; i > -1; i--) {

        // Place the piece in the first available position.
        if (board[i][col] === empty) {
            board[i][col] = value;
            return true;
        }
    }

    // No empty position was found.
    return false;
}

// -----------------------------------------------------------------------------
// Determines whether the game has ended.
//
// Checks every possible winning direction:
//      1. Horizontal
//      2. Vertical
//      3. Main diagonal
//      4. Anti-diagonal
//
// Returns:
//      true  -> Either player has connected four pieces.
//      false -> No winner yet.
// -----------------------------------------------------------------------------
function winner() {

    // -------------------------------------------------------------------------
    // Check every row.
    // -------------------------------------------------------------------------
    for (let i = 0; i < ROWS; i++) {

        let rowString = board[i].join("");

        let win = rowString.match(/🟢🟢🟢🟢/);
        let lose = rowString.match(/🔴🔴🔴🔴/);

        if (win) {
            return {
                message:"🟢 Green Wins"
            };
        }

        if (lose) {
            return {
                message:"🔴 Red Wins"
            };
        }
    }

    // -------------------------------------------------------------------------
    // Check every column.
    // -------------------------------------------------------------------------
    for (let i = 0; i < COLS; i++) {

        let columnString = "";

        // Build one complete column as a string.
        for (let j = 0; j < ROWS; j++) {
            columnString += board[j][i];
        }

        let win = columnString.match(/🟢🟢🟢🟢/);
        let lose = columnString.match(/🔴🔴🔴🔴/);

        if (win) {
            return {
                message:"🟢 Green Wins"
            };
        }

        if (lose) {
            return {
                message:"🔴 Red Wins"
            };
        }
    }

    // -------------------------------------------------------------------------
    // Check every main diagonal (↘).
    // -------------------------------------------------------------------------
    for (let i = 0; i < ROWS - (WIN - 1); i++) {

        for (let j = 0; j < COLS - (WIN - 1); j++) {

            let diagonalString = "";

            // Collect four consecutive cells along the diagonal.
            for (let k = 0; k < WIN; k++) {
                diagonalString += board[i + k][j + k];
            }

            let win = diagonalString.match(/🟢🟢🟢🟢/);
            let lose = diagonalString.match(/🔴🔴🔴🔴/);

            if (win) {
                return {
                message:"🟢 Green Wins"
            };
            }

            if (lose) {
                return {
                message:"🔴 Red Wins"
            };
            }
        }
    }

    // -------------------------------------------------------------------------
    // Check every anti-diagonal (↙).
    // -------------------------------------------------------------------------
    for (let i = 0; i < ROWS - (WIN - 1); i++) {

        for (let j = WIN-1; j < COLS; j++) {

            let aDiagonalString = "";

            // Collect four consecutive cells along the anti-diagonal.
            for (let k = 0; k < WIN; k++) {
                aDiagonalString += board[i + k][j - k];
            }

            let win = aDiagonalString.match(/🟢🟢🟢🟢/);
            let lose = aDiagonalString.match(/🔴🔴🔴🔴/);

            if (win) {
                return {
                message:"🟢 Green Wins"
            };
            }

            if (lose) {
                return {
                message:"🔴 Red Wins"
            };
            }
        }
    }

    // No winning sequence was found.
    return false;
}

// -----------------------------------------------------------------------------
// Resets the game board.
//
// Every occupied position is replaced with empty so that a new game
// starts with an empty board.
// -----------------------------------------------------------------------------
function resetBoard() {

    for (let i = 0; i < ROWS; i++) {

        for (let j = 0; j < COLS; j++) {

            board[i][j] = empty;

        }
    }
}

// -----------------------------------------------------------------------------
// Export the board, configuration values, and game logic so they can be used
// inside other JavaScript files.
// -----------------------------------------------------------------------------
// module.exports = {
//     updateBoard,
//     board,
//     winner,
//     ROWS,
//     COLS,
//     resetBoard
// };