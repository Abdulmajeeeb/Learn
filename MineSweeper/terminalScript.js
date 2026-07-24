const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');
const console = require('node:console');
let rows;
let cols;

// Calling API
const { board, table, createBoard, showCell, checkWin, floodFill } = require('./terminalLogic');

async function askQuestion(inputPrompt) {
    const rl = readline.createInterface({ input: stdin, output: stdout });
    const answer = await rl.question(inputPrompt);
    rl.close();
    return answer;
};

async function gameLoop() {
    while (true) {
        rows = Number(await askQuestion("Enter number of Rows for you table: "));
        if (rows < 0 || rows > 50 || rows === isNaN()) {
            console.log("Rows can not exceed 50");
            continue;
        }
        cols = Number(await askQuestion("Enter number of Columns for your table: "));
        if (cols < 0 || cols > 50 || cols === isNaN()) {
            console.log("Columns can not exceed 50");
            continue;
        }

        //make board and display table
        createBoard(rows, cols);
        let gameRunning = true
        while (gameRunning === true) {
            console.table(table);
            const getRow = Number(await askQuestion("Enter Cell Row Index: "));
            if (getRow < 0 || getRow >= rows || getRow === isNaN()) {
                console.log("Enter correct ROW INDEX");
                continue;
            }
            const getCol = Number(await askQuestion("Enter Cell Cell Index: "));
            if (getCol < 0 || getCol >= cols || getCol === isNaN()) {
                console.log("Enter correct COLUMN INDEX");
                continue;
            }
            //Update Table
            let result = showCell(getRow, getCol);
            if (result === "bomb") {
                console.table(table);
                console.log("A bomb has been triggered");
                console.log("YOU LOSE");
                gameRunning = false;
            } else if (result === "repeat") {
                console.log("Cell Already Revealed. Try a different Cell");
                continue;
            };
            if (checkWin()) {
                console.table(table);
                console.log("YOU WIN");
                gameRunning = false;
            }
        }
        if (!gameRunning) {
            const restart = await askQuestion("Do you want to play again? Y/N: ");
            if (restart === "Y" || restart === "y") {
                continue;
            } else {
                break;
            }
        }
    };
};
gameLoop();