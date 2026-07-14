const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const tableApi = require('./logic');

async function askQuestion(inputPrompt) {
    const rl = readline.createInterface({ input: stdin, output: stdout });
    const answer = await rl.question(inputPrompt);
    rl.close();
    return answer;
}

async function gameLoop() {
    let currentPlayer = "X";
    let moves=0;
    while (true) {
        //print table
        console.table(tableApi.table);
        console.log("Current Player:", currentPlayer);
        // input m, n, o/x => askQuestion
        //ROW
        //const row = await askQuestion("enter ROW number: ");
        let row;
        while (true) {
            row = await askQuestion("enter ROW number: ");
            if (row >= 0 && row <= 2) {
                break;
            }
            console.log("Invaid ROW.")
        }
        //COLUMN
        //const column = await askQuestion("enter COLUMN number: ");
        let column;
        while (true) {
            column = await askQuestion("enter COLUMN number: ");
            if (column >= 0 && column <= 2) {
                break;
            }
            console.log("Invaid COLUMN.")
        }
        //update table
        const updated = tableApi.updateTable(row, column, currentPlayer);
        if (!updated) {
            continue;
        }
        //count moves
        moves++;
        //Close
        if (tableApi.gameEnd()) {
            console.table(tableApi.table);
            console.log(`${currentPlayer} Wins`);
            break;
        }
        if (moves===9){
            console.table(tableApi.table);
            console.log("It's a DRAW")
            break;
        }
        //Change Player
        if (currentPlayer === "X") {
            currentPlayer = "O";
        } else {
            currentPlayer = "X";
        }
    }
}
async function startGame() {
    while(true){
    await gameLoop();
    const answer = await askQuestion("Play again? (Y/N)");
    if (answer=="y" || answer=="Y"){
        tableApi.resetTable();
        continue;
    }else{
        break;
    }
    }
}
startGame();