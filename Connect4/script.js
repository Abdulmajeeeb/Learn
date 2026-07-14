const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');
const {  } = require('./logic');

async function askQuestion(inputPrompt) {
const rl = readline.createInterface({ input: stdin, output: stdout });
const answer = await rl.question(inputPrompt);
    rl.close();
    return answer;
}
