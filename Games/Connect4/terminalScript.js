const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

// Import the game board, game logic functions, board dimensions,
// and the function used to reset the board.
const { table, updateTable, gameEnd, ROWS, COLS, resetTable } = require('./terminalLogic');

// Counts the total number of successful moves played.
let moves = 0;

// -----------------------------------------------------------------------------
// Displays a prompt, waits for the user's input, and returns the entered value.
// -----------------------------------------------------------------------------
async function askQuestion(inputPrompt) {

    // Create a readline interface for terminal input/output.
    const rl = readline.createInterface({ input: stdin, output: stdout });

    // Display the prompt and wait until the user enters a response.
    const answer = await rl.question(inputPrompt);

    // Close the readline interface.
    rl.close();

    // Return the user's response.
    return answer;
}
// -----------------------------------------------------------------------------
// Runs one complete game of Connect Four.
// The function ends only when either player wins or the game is a draw.
// -----------------------------------------------------------------------------
async function gameSystem() {

    // Keep playing until the game reaches an ending condition.
    while (true) {

        // Display the current game board.
        console.table(table);

        // Ask the player to choose a column.
        let A = Number(await askQuestion(`Choose your column (0-7):`));

        // Reject invalid input.
        // The value must:
        // 1. Be a number.
        // 2. Be within the valid column range.
        if (A < 0 || A > COLS - 1 || isNaN(A)) {
            console.log("Enter correct value of column");
            console.log("Column must be from 1 to 7");
            continue;
        }

        // Attempt to place the player's piece.
        let placed = updateTable(A, "🟢");

        // If the chosen column is full, ask for another column.
        if (!placed) {
            console.log("No space, choose another column");
            continue;
        }

        // Check whether the player has won after placing the piece.
        if (gameEnd()) {
            console.table(table);
            console.log("Green Wins");
            break;
        }

        // Count the player's successful move.
        moves++;

        // If every cell has been occupied, declare a draw.
        if (moves === ROWS * COLS) {
            console.log("DRAW");
        }

        // Variable that will store the computer's selected column.
        let B;

        // Keep generating random columns until an available one is found.
        do {
            B = Math.floor(Math.random() * COLS);
        }
        while (!updateTable(B, "🔴"));

        // Check whether the computer has won after placing its piece.
        if (gameEnd()) {
            console.table(table);
            console.log("Red Wins");
            break;
        }

        // Count the computer's successful move.
        moves++;

        // If every cell has been occupied, declare a draw.
        if (moves === ROWS * COLS) {
            console.table(table);
            console.log("DRAW");
            break;
        }
    }
}

// -----------------------------------------------------------------------------
// Controls the overall program.
//
// Starts a new game, waits until it finishes, then asks the player
// whether another game should be played.
// -----------------------------------------------------------------------------
async function main() {

    // Continue starting new games until the player decides to quit.
    while (true) {

        // Reset the move counter for the new game.
        moves = 0;

        // Clear the game board.
        resetTable();

        // Play one complete game.
        await gameSystem();

        // Ask whether another game should be started.
        let again = await askQuestion("Do you want to play again? (y/n)");

        // Start another game only if the player enters 'y' or 'Y'.
        if (again === "y" || again === "Y") {
            continue;
        }

        // Any other input ends the program.
        else {
            break;
        }
    }
}

// Start the application.
main();