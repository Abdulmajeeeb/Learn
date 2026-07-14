const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');
const { table, updateTable } = require('./logic');

async function askQuestion(inputPrompt) {
    const rl = readline.createInterface({ input: stdin, output: stdout });
    const answer = await rl.question(inputPrompt);
    rl.close();
    return answer;
}
async function gameLoop() {
    while (true) {
        let A = await askQuestion(`Choose your column (1-7):`);
        if (A < 1 || A > 7) {
            console.log("Enter correct value of column");
            console.log("Column must be from 1 to 7");
            continue;
        }
        updateTable(A - 1, "g");
        let B = Math.floor(Math.random() * 6);
        updateTable(B, "r");
        console.log(table);
    }
}
gameLoop();
