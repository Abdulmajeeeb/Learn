const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');
const console = require('node:console');

// Calling API
const { board, placeBombs, makeBoard, neighbours } = require('./terminalLogic');


async function askQuestion(inputPrompt) {
    const rl = readline.createInterface({ input: stdin, output: stdout });
    const answer = await rl.question(inputPrompt);
    rl.close();
    return answer;
}

function displayTable(rows, cols) {

    // console.table(table);  
};



async function gameLoop() {
    const rows = Number(await askQuestion("Enter number of Rows for you table: "));
    const cols = Number(await askQuestion("Enter number of Columns for your table: "));
    //make display table
    let table = [];
    for (let i = 0; i < rows; i++) {
        table.push([]);
        for (let j = 0; j < cols; j++) {
            table[i].push("");
        }
    }
    makeBoard(rows, cols);
    // console.table(board);
    placeBombs(rows, cols);
    // console.table(board);
    neighbours(rows, cols);
    console.table(board)
    while (true) {
        console.table(table);
        const getRow = Number(await askQuestion("Enter Cell Row Index: "));
        if (getRow < 0 || getRow >= rows || getRow==isNaN()) {
            console.log("Enter correct ROW INDEX");
            continue;
        }
        const getCol = Number(await askQuestion("Enter Cell Cell Index: "));
                if (getCol < 0 || getCol >= cols|| getRow==isNaN()) {
            console.log("Enter correct COLUMN INDEX");
            continue;
        }
        //Update Table
        table[getRow][getCol] = board[getRow][getCol];
        if (table[getRow][getCol] === "x") {
            console.table(table);
            console.log("YOU LOSE");
            return false;
        }
    }
};
gameLoop();

