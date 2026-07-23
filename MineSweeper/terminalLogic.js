let board = [];
let table = [];
let percentBomb = 15;

function createBoard(rows, cols) {
    //make board and table
    board.length = 0;
    table.length = 0;
    for (let i = 0; i < rows; i++) {
        board.push([]);
        table.push([]);
        for (let j = 0; j < cols; j++) {
            board[i].push(0);
            table[i].push("");
        }
    };

    //place bombs
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

    // Calculate neighbour counts
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
}
//Reveal a cell selected by the user
function showCell(row, col) {
    //if cell already revealed
    if (table[row][col] === board[row][col]) {
        return "repeat";

    };
    //update the table
    table[row][col] = board[row][col];

    //A bomb triggered
    if (board[row][col] === "x") {
        return "bomb";
    }
    return false;
}

function checkWin() {
    const rows = board.length;
    const cols = board[0].length;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j] === "x") {
                continue;
            } else if (table[i][j] === "") {
                return false;
            }
        }
    }
    return true;
}

module.exports = {
    board,
    table,
    createBoard,
    showCell,
    checkWin
    // gameEnd
}