const name = ["Rock", "Paper", "Scissors", "Spock", "Lizard"];
const rules = {
    Rock: {
        Scissors: "Rock crushes Scissors",
        Lizard: "Rock crushes Lizard"
    },
    Paper: {
        Rock: "Paper covers Rock",
        Spock: "Paper disproves Spock"
    },
    Scissors: {
        Paper: "Scissors cuts Paper",
        Lizard: "Scissors decapitates Lizard"
    },
    Spock: {
        Scissors: "Spock smashes Scissors",
        Rock: "Spock vaporizes Rock"
    },
    Lizard: {
        Paper: "Lizard eats Paper",
        Spock: "Lizard poisons Spock"
    }
};
function winner(A, B) {
    if (A === B) {
        return {
            winner: "draw",
            message: "DRAW"
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