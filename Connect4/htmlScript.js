// -----------------------------------------------------------------------------
// Game State
// -----------------------------------------------------------------------------

// Counts the total number of successful moves played.
let moves = 0;

// Stores the current player's turn.
let currentPlayer = "🟢";

// Indicates whether the game has finished.
let gameOver = false;


// -----------------------------------------------------------------------------
// HTML Elements
// -----------------------------------------------------------------------------

// Displays the current player's turn.
const status = document.getElementById("status");

// Button used to reset the current game.
const reset = document.getElementById("reset");

// Initial screen containing the game options.
const startScreen = document.getElementById("startScreen");

// Screen containing the actual game board.
const gameScreen = document.getElementById("gameScreen");

// Dialog displayed when the game ends.
const gameOverDialog = document.getElementById("gameOverDialog");

// Button that returns the player to the start screen.
const startScreenButton = document.getElementById("startScreenButton");

// HTML element where the board is rendered.
const boardElement = document.getElementById("boardElement");


// -----------------------------------------------------------------------------
// Start Screen
// -----------------------------------------------------------------------------

// Returns from the game screen back to the start screen.
startScreenButton.addEventListener("click", function () {
    gameScreen.style.display = "none";
    startScreen.style.display = "block";
});


// -----------------------------------------------------------------------------
// Board Size Selection
// -----------------------------------------------------------------------------

// Get all available board size buttons.
const sizeButtons = document.querySelectorAll("#boardSize button");

// Wait for the player to choose a board size.
for (const button of sizeButtons) {
    button.addEventListener("click", function () {

        // Read the selected number of rows and columns.
        ROWS = Number(button.dataset.rows);
        COLS = Number(button.dataset.cols);

        // Switch from the start screen to the game screen.
        startScreen.style.display = "none";
        gameScreen.style.display = "block";

        // Reset the game state.
        gameOver = false;
        moves = 0;

        // Start a new game.
        startGame();
    });
}


// -----------------------------------------------------------------------------
// Player Management
// -----------------------------------------------------------------------------

// Switches the turn to the other player.
function switchPlayer() {
    if (currentPlayer === "🟢") {
        currentPlayer = "🔴";
    } else {
        currentPlayer = "🟢";
    }
}


// -----------------------------------------------------------------------------
// Cell Click Handling
// -----------------------------------------------------------------------------

// Handles a player's click on a board cell.
function cellClicked(cell) {

    // Ignore clicks if the game has already ended.
    if (gameOver) {
        return;
    }

    // Determine which column was clicked.
    const columnClicked = Number(cell.dataset.col);

    // Attempt to place the current player's piece.
    const success = updateBoard(columnClicked, currentPlayer);

    // Continue only if the move was successful.
    if (success) {

        // Refresh the displayed board.
        renderBoard(ROWS, COLS);

        // Count the successful move.
        moves++;

        // Check whether the current move produced a winner.
        if (winner()) {
            const result = winner();

            document.getElementById("conclusion").innerText = result.message;
            gameOverDialog.showModal();

            gameOver = true;
        }

        // Check whether every board position has been filled.
        if (moves === ROWS * COLS) {
            document.getElementById("conclusion").innerText = "It's a DRAW";
            gameOverDialog.showModal();

            gameOver = true;
        }

        // Change the turn to the other player.
        switchPlayer();

        // Update the turn indicator.
        status.innerHTML = `${currentPlayer}'s TURN`;
    }
}


// -----------------------------------------------------------------------------
// Board Rendering
// -----------------------------------------------------------------------------

// Draws the current game board on the webpage.
function renderBoard(ROWS, COLS) {

    // Remove the previously displayed board.
    boardElement.innerHTML = "";

    // Create each board row.
    for (let row = 0; row < ROWS; row++) {

        const tr = document.createElement("tr");

        // Create each board column.
        for (let col = 0; col < COLS; col++) {

            const td = document.createElement("td");

            // Display the value stored in the board array.
            td.innerHTML = board[row][col];

            // Apply the board cell styling.
            td.classList.add("cell");

            // Store the column index for click handling.
            td.setAttribute("data-col", col);

            //column hover effect
            td.addEventListener("mouseenter", function () {
                highlightColumn(col);
            });

            td.addEventListener("mouseleave", function () {
                clearHighlight(col);
            });

            // Listen for clicks on this cell.
            td.addEventListener("click", function () {
                cellClicked(td);
            });

            // Add the cell to the current row.
            tr.appendChild(td);
        }

        // Add the completed row to the board.
        boardElement.appendChild(tr);
    }
}


// -----------------------------------------------------------------------------
// Reset Game
// -----------------------------------------------------------------------------

// Starts a new game using the current board size.
reset.addEventListener("click", function () {

    moves = 0;
    gameOver = false;
    currentPlayer = "🟢";

    startGame();
});


// -----------------------------------------------------------------------------
// Game Initialization
// -----------------------------------------------------------------------------

// Creates a new board and prepares the game for play.
function startGame() {

    // Create an empty game board.
    initializeBoard(ROWS, COLS);

    // Display the board.
    renderBoard(ROWS, COLS);

    // Show which player moves first.
    status.innerHTML = `${currentPlayer}'s TURN`;
}


//column hover
function highlightColumn(column) {
    for (let row = 0; row < ROWS; row++) {
        boardElement.rows[row].cells[column].classList.add("column-hover");
    }
}

function clearHighlight(column) {
    for (let row = 0; row < ROWS; row++) {
        boardElement.rows[row].cells[column].classList.remove("column-hover");
    }
}