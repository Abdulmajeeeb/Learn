const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

// Calling API
const {board} = require('./terminalLogic');
const console = require('node:console');

async function askQuestion(inputPrompt) {
    const rl = readline.createInterface({ input:stdin, output:stdout });
    const answer = await rl.question(inputPrompt);
    rl.close();
    return answer;
}





