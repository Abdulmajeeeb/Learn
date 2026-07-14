let currentPlayer = "X";
let gameOver = false;
let moves = 0;
let boardSize = 3;

const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");

for (const cell of cells) {
    cell.addEventListener("click", function () {
        cellClicked(cell);
    });
};

function updateStatus(message) {
    status.innerText = message;
};

updateStatus(`Current Player = ${currentPlayer}`);

function resetBoard() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
    };
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
}

function cellClicked(cell) {
    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);
    //Don't place any value
    if (gameOver || cell.innerText !== "") {
        return;
    }
    //Place the value
    if (!updateTable(row, col, currentPlayer)) {
        return;
    }
    cell.innerText = currentPlayer;
    moves++;
    //Game OVer
    if (gameEnd()) {
        gameOver = true;
        updateStatus(`${currentPlayer} Wins`);
        return;
    };

    if (draw()){
        return;
    };

    switchPlayer();

    updateStatus(`Current Player = ${currentPlayer}`);
};

function restartGame(){
    currentPlayer="X";
    moves=0;
    gameOver= false;
    resetBoard();
    resetTable();
    updateStatus(`Current Player = ${currentPlayer}`);
}