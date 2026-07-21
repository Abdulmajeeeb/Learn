
const option=["rock", "paper", "scissors", "lizard", "spock"];
let B = Math.floor(Math.random()*option.length);
document.getElementById('AI').innerText=`${option[B]}`
