let currentPlayer = "X";
let gameOver = false;
let moves = 0;

const status = document.getElementById("status");
const gameBoard = document.getElementById("gameBoard");
const boardButtons = document.querySelectorAll("#types button");
//Board size buttons
for (const button of boardButtons) {
    button.addEventListener("click", function () {
        boardSize = Number(button.dataset.size);
        startGame();
    })
};

function startGame() {
    createTable();
    createBoard();
    currentPlayer = "X";
    moves = 0;
    gameOver = false;
    updateStatus(`Current Player = ${currentPlayer}`);
};

//Create HTML board
function createBoard() {
    gameBoard.innerHTML = "";
    for (let row = 0; row < boardSize; row++) {
        const tr = document.createElement("tr");
        for (let col = 0; col < boardSize; col++) {
            const td = document.createElement("td");
            td.classList.add("cell");
            td.setAttribute("data-row", row);
            td.setAttribute("data-col", col);
            td.addEventListener("click", () => {
                cellClicked(td)
            });
            tr.appendChild(td);
        }
        gameBoard.appendChild(tr);
    }
};
startGame();

function updateStatus(message) {
    status.innerText = message;
};


function switchPlayer() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
};

function draw() {
    if (moves === boardSize * boardSize) {
        gameOver = true;
        updateStatus("It's a Draw");
        return true;
    }
    return false;
};

function cellClicked(cell) {
    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);
    //Ignore Invalid Clicks
    if (gameOver) {
        return;
    }
    //Update game state
    if (!updateTable(row, col, currentPlayer)) {
        cell.classList.remove("shake");
        void cell.offsetWidth;
        cell.classList.add("shake");
        return;
    }
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer);
    moves++;
    //Check for winner
    if (gameEnd()) {
        gameOver = true;
        updateStatus(`${currentPlayer} Wins`);
        return;
    };
    //Check for draw
    if (draw()) {
        return;
    };
    //Next player turn
    switchPlayer();

    updateStatus(`Current Player = ${currentPlayer}`);
};

function restartGame() {
    startGame();
};