const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const { winner, name } = require('./nlogic');

async function askQuestion(inputPrompt) {
    const rl = readline.createInterface({ input: stdin, output: stdout });
    const answer = await rl.question(inputPrompt);
    rl.close();
    return answer;
}
const status= document.getElementById("status");
const optionButtons = document.querySelectorAll("#options button");

async function gameLoop() {
    while (true) {

        let A = await askQuestion(`Choose your weapon (0-4):
0 - Rock
1 - Paper
2 - Scissors
3 - Spock
4 - Lizard
Your Weapon: `);
        let B = Math.floor(Math.random() * name.length);
        console.log(`${name[A]} vs ${name[B]}`);
        const result = (winner(name[A], name[B]));
        console.log(result.message)
        if (result.winner === "A") {
            console.log("\x1b[32mYou WIN\x1b[0m");
        } else if (result.winner === "B") {
            console.log("\x1b[31mYou LOSE\x1b[0m");
        } else {
        };
        console.log("________________________")
    }
}
gameLoop();
