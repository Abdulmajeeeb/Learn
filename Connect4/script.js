const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');
const { table, updateTable, gameEnd, ROWS, COLS, resetTable } = require('./logic');
let moves = 0;

async function askQuestion(inputPrompt) {
    const rl = readline.createInterface({ input: stdin, output: stdout });
    const answer = await rl.question(inputPrompt);
    rl.close();
    return answer;
}
async function gameSystem() {
    while (true) {
        console.table(table);
        let A = Number(await askQuestion(`Choose your column (0-7):`));
        if (A < 0 || A > COLS - 1 || isNaN (A)) {
            console.log("Enter correct value of column");
            console.log("Column must be from 1 to 7");
            continue;
        }
        let placed = updateTable(A, "🟢");
        if (!placed) {
            console.log("No space, choose another column")
            continue;
        }


        if (gameEnd()) {
            console.table(table);
            console.log("Green Wins");
            break;
        }
        moves++;
        if (moves === ROWS * COLS) {
            console.log("DRAW");
        }
        let B;
        do { B = Math.floor(Math.random() * COLS); }
        while (!updateTable(B, "🔴"));
        if (gameEnd()) {
            console.table(table);
            console.log("Red Wins");
            break;
        }
        moves++;
        if (moves === ROWS * COLS) {
            console.log("DRAW");
            break;
        }

    }
}
async function main() {
    while (true) {
        moves = 0;
        resetTable();
        await gameSystem();
        let again = await askQuestion("Do you want to play again? (y/n)");
        if (again === "y" || again === "Y") {
            continue;
        } else {
            break;
        }
    }
}
main();

