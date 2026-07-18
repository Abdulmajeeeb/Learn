// Counts the total number of successful moves played.
let moves = 0;
let currentPlayer = "🟢";

const boardElement = document.getElementById("htmlBoard");
const sizeButtons = document.querySelectorAll("#boardSize button");
for (const button of sizeButtons) {
    button.addEventListener("click", function () {
        ROWS = Number(button.dataset.rows);
        COLS = Number(button.dataset.cols);
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
    const columnClicked = Number(cell.dataset.col);
    updateBoard(columnClicked, currentPlayer);
    renderBoard();
    switchPlayer();



}


function renderBoard(ROWS, COLS) {
    boardElement.innerHTML = "";
    for (let row = 0; row < ROWS; row++) {
        const tr = document.createElement("tr");
        for (let col = 0; col < COLS; col++) {
            const td = document.createElement("td");
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

function startGame() {
    initializeBoard(ROWS, COLS);
    renderBoard(ROWS, COLS);
}

