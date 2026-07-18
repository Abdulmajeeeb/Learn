// Counts the total number of successful moves played.
let moves = 0;
let currentPlayer = "🟢";

const startScreen=document.getElementById("startScreen");
const gameScreen=document.getElementById("gameScreen");
const startScreenButton=document.getElementById("startScreenButton");
startScreenButton.addEventListener("click",function(){
    gameScreen.style.display="none";
    startScreen.style.display="block";
})

const boardElement = document.getElementById("htmlBoard");
const sizeButtons = document.querySelectorAll("#boardSize button");
for (const button of sizeButtons) {
    button.addEventListener("click", function () {
        ROWS = Number(button.dataset.rows);
        COLS = Number(button.dataset.cols);
        startScreen.style.display="none";
        gameScreen.style.display="block";
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
    const success= updateBoard(columnClicked, currentPlayer);
    if (success){
    renderBoard(ROWS,COLS);
    switchPlayer();
    }




}


function renderBoard(ROWS, COLS) {
    boardElement.innerHTML = "";
    for (let row = 0; row < ROWS; row++) {
        const tr = document.createElement("tr");
        for (let col = 0; col < COLS; col++) {
            const td = document.createElement("td");
            td.innerHTML=board[row][col];            //stay up-to=date
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

