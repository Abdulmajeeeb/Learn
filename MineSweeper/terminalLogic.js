let board = [];
let percentBomb = 20;
function makeBoard(rows, cols) {
    for (let i = 0; i < rows; i++) {
        board.push([]);
        for (let j = 0; j < cols; j++) {
            board[i].push(0);
        }
    };
    return;
};

function placeBombs(rows, cols) {
    let numberBomb = Number(Math.floor((percentBomb * rows * cols) / 100));
    for (let i = 0; i < numberBomb; i++) {
        let compRow = Number(Math.floor(Math.random() * rows));
        let compCol = Number(Math.floor(Math.random() * cols));
        if (board[compRow][compCol] !== 0) {
            i--;
            continue;
        } else {
            board[compRow][compCol] = "x";
        }
    }
    // console.table(board);
    // console.log(numberBomb);
};

//Place neighbours
function neighbours(rows, cols) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j] === "x") {
                for (let p = -1; p < 2; p++) {
                    let newRow = i + p;
                    for (let q = -1; q < 2; q++) {
                        let newCol = j + q;
                        if (p === 0 && q === 0) {
                            continue;
                        }
                        if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) {
                            continue;
                        }
                        //update the neighbours with number of bombs in the surrounding
                        if (board[newRow][newCol] !== "x") {
                            board[newRow][newCol]++;
                        }
                    }
                }
            }
        }
    }
    // console.table(board);
}


// function gameEnd(){
// if (displayTable(m,n)===bomb){
//     return lose;
// }
// }

module.exports = {
    board,
    placeBombs,
    makeBoard,
    neighbours,
    // gameEnd
}