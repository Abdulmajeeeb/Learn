const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');
const { table, updateTable, winner } = require('./logic');

async function askQuestion(inputPrompt) {
    const rl = readline.createInterface({ input: stdin, output: stdout });
    const answer = await rl.question(inputPrompt);
    rl.close();
    return answer;
}
async function gameLoop() {
    while (true) {
        console.table(table);
        let A = Number(await askQuestion(`Choose your column (0-7):`));
        if (A < 0 || A > 6) {
            console.log("Enter correct value of column");
            console.log("Column must be from 1 to 7");
            continue;
        }
        updateTable(A, "g");
        if(winner()) {
            console.table(table);
            console.log("Green Wins");
            break;
        }
        let B = Math.floor(Math.random() * 7);
        updateTable(B, "r");
        if(winner()) {
            console.table(table);
            console.log("Red Wins");
            break;
        }

    }
}
gameLoop();
