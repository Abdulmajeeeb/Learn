let size;
const sizeButtons = document.querySelectorAll("#size button");
for (const button of sizeButtons) {
    button.addEventListener("click", function () {
        size = Number(button.dataset.size);
    })
};
const difficultyButton = document.querySelectorAll("#difficulty button");
for (const button of difficultyButton) {
    button.addEventListener("click", function () {
        percentBomb = Number(button.dataset.percent)
    })
};

const startScreenButton = document.getElementById("startScreenButton");
startScreenButton.addEventListener("click", function () {
    gameScreen.style.display = "none";
    startScreen.style.display = "block"
});
const startGame = document.getElementById("startGame");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
startGame.addEventListener("click", function () {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
    createBoard(size,size);
    renderBoard(size,size);
});
const boardElement=document.getElementById("renderBoard");
function renderBoard(rows,cols){
    boardElement.innerHTML="";
    for (let i=0; i<rows; i++){
        const tr=document.createElement("tr");
        for (let j=0; j<cols;j++){
            const td=document.createElement("td");
            td.innerHTML=table[i][j];
            td.classList.add("cell");
            tr.appendChild(td);
        }
        boardElement.appendChild(tr);
    }
}

