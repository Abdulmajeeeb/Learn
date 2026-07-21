let currentPlayer = "X";
let gameOver = false;
let moves = 0;

const boardButtons= document.querySelectorAll("#types button");
for (const button of boardButtons){
    button.addEventListener("click", function(){
        boardSize=Number(button.dataset.size);
        startGame();
    })
}

function startGame(){
    currentPlayer = "X";
    moves = 0;
    gameOver = false;
    updateStatus(`Current Player = ${currentPlayer}`);
    createBoard();
    createTable();
}
const status = document.getElementById("status");
const gameBoard = document.getElementById("gameBoard");

function createBoard() {
    gameBoard.innerHTML = "";
    for (let row = 0; row < boardSize; row++) {
        const tr = document.createElement("tr");
        for (let col = 0; col < boardSize; col++) {
            const td = document.createElement("td");
            td.classList.add("cell");
            td.setAttribute("data-row", row);
            td.setAttribute("data-col", col);
            tr.appendChild(td);
        }
        gameBoard.appendChild(tr);
    }
};
startGame();
const cells = document.querySelectorAll(".cell");
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

    if (draw()) {
        return;
    };

    switchPlayer();

    updateStatus(`Current Player = ${currentPlayer}`);
};

function restartGame() {
startGame();
}