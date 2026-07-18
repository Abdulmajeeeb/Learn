// Counts the total number of successful moves played.
let moves = 0;
const boardElement = document.getElementById("htmlBoard");
const sizeButtons = document.querySelectorAll("#boardSize button");
for (const button of sizeButtons) {
    button.addEventListener("click", function () {
        ROWS = Number(button.dataset.rows);
        COLS = Number(button.dataset.cols);
        console.log(ROWS, COLS);
        console.log(sizeButtons.length);
        console.log(button.dataset);
        startGame();
    })
}


function renderBoard(ROWS, COLS) {
    boardElement.innerHTML = "";
    console.log("boardElement=",boardElement)
    for (let row = 0; row < ROWS; row++) {
        const tr = document.createElement("tr");
        console.log(tr);
        for (let col = 0; col < COLS; col++) {
            const td = document.createElement("td");
            td.classList.add("cell");
            td.setAttribute("data-col", col);
            //EVENT LISTENER (MAY BE)
            tr.appendChild(td);
        }
        boardElement.appendChild(tr);
        console.log(boardElement.children.length);
    }
    console.log("render board finished")
    console.log(boardElement.innerHTML)
}

function startGame() {
    console.log("start game")
    initializeBoard(ROWS, COLS);
    renderBoard(ROWS, COLS);

}
