const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const tableApi = require('./table')

async function askQuestion(inputPrompt) {
    const rl = readline.createInterface({ input:stdin, output:stdout });

    const answer = await rl.question(inputPrompt);

    rl.close();

    return answer;
}

async function gameLoop() {
    while (true) {
        // print current state
        console.table(tableApi.table);
        // input m, n, o/x => askQuestion
        const row = await askQuestion("Enter Row number");

        const column = await askQuestion("Enter Column number");
        const input = await askQuestion("Enter value O/X");

        // console.log(row, column, input)
        tableApi.updateTable(row, column, input);
        if(tableApi.gameEnd()){
            console.log("GAME ENDS");
            break;
        }

    }
}

gameLoop();
