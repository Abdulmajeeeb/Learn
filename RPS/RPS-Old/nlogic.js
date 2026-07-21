const name = ["rock", "paper", "scissors", "spock", "lizard"];
const rules = {
    rock: {
        scissors: "Rock crushes Scissors",
        lizard: "Rock crushes Lizard"
    },
    paper: {
        rock: "Paper covers Rock",
        spock: "Paper disproves Spock"
    },
    scissors: {
        paper: "Scissors cuts Paper",
        lizard: "Scissors decapitates Lizard"
    },
    spock: {
        scissors: "Spock smashes Scissors",
        rock: "Spock vaporizes Rock"
    },
    lizard: {
        paper: "Lizard eats Paper",
        spock: "Lizard poisons Spock"
    }
};
function winner(A, B) {
    if (A === B) {
        return {
            winner: "draw",
            message: "\x1b[33mit's a DRAW\x1b[0m"
        };
    }
    if (rules[A][B]) {
        return {
            winner: "A",
            message: rules[A][B]
        };
    } else {
        return {
            winner: "B",
            message: rules[B][A]
        };
    }
}
//module.exports = {
//    name,
//    winner
//}