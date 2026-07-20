// Counts the total number of successful moves played.
let moves = 0;
let currentPlayer = "🟢";
let gameOver = false;

const status = document.getElementById("status");
const reset = document.getElementById("reset");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverDialog = document.getElementById("gameOverDialog")
const startScreenButton = document.getElementById("startScreenButton");
startScreenButton.addEventListener("click", function () {
    gameScreen.style.display = "none";
    startScreen.style.display = "block";
})

const boardElement = document.getElementById("htmlBoard");
const sizeButtons = document.querySelectorAll("#boardSize button");
for (const button of sizeButtons) {
    button.addEventListener("click", function () {
        ROWS = Number(button.dataset.rows);
        COLS = Number(button.dataset.cols);
        startScreen.style.display = "none";
        gameScreen.style.display = "block";
        gameOver = false;
        moves = 0;
        startGame();
    })
}

function switchPlayer() {
    if (currentPlayer === "🟢") {
        currentPlayer = "🔴"
    } else {
        currentPlayer = "🟢";
    }
};

function cellClicked(cell) {
    if (gameOver) {
        return;
    }
    const columnClicked = Number(cell.dataset.col);
    const success = updateBoard(columnClicked, currentPlayer);
    if (success) {
        renderBoard(ROWS, COLS);
        moves++
        if (gameEnd()) {
            const result = gameEnd();
            document.getElementById("conclusion").innerText = result.message;
            gameOverDialog.showModal()
            gameOver = true;
        }
        if (moves === ROWS * COLS) {
            document.getElementById("conclusion").innerText = "It's a DRAW";
            gameOverDialog.showModal()
            gameOver = true;
        }

        switchPlayer();
        status.innerHTML = `${currentPlayer}'s TURN`;
    }




}


function renderBoard(ROWS, COLS) {
    boardElement.innerHTML = "";
    for (let row = 0; row < ROWS; row++) {
        const tr = document.createElement("tr");
        for (let col = 0; col < COLS; col++) {
            const td = document.createElement("td");
            td.innerHTML = board[row][col];            //stay up-to=date
            td.classList.add("cell");
            td.setAttribute("data-col", col);
            td.addEventListener("click", function () {
                cellClicked(td);
            })
            tr.appendChild(td);
        }
        boardElement.appendChild(tr);
    }
}
reset.addEventListener("click", function () {
    moves = 0;
    gameOver = false;
    currentPlayer="🟢";
    startGame();


})

function startGame() {
    initializeBoard(ROWS, COLS);
    renderBoard(ROWS, COLS);
    status.innerHTML = `${currentPlayer}'s TURN`;
}

