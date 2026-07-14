const P = "rock";
const Q = "paper";
const R = "scissors";
const S = "spock";
const T = "lizard";

const name = [P, Q, R, S, T];

function winner(A, B) {
    if (A === B) {
        console.log("it's a draw");
    }
    if (A === P) {
        if (B === Q) {
            console.log("Paper covers Rock");
            console.log("you lose");
        } else if (B === R) {
            console.log("Rock crushes Scissors");
            console.log("you win");
        } else if (B === S) {
            console.log("Spock vaporizes Rock");
            console.log("you lose");
        } else if (B === T) {
            console.log("Rock crushes Lizard");
            console.log("you win");
        };
    } else if (A === Q) {
        if (B === R) {
            console.log("scissors cuts Paper");
            console.log("you lose");
        } else if (B === S) {
            console.log("Paper disproves Spock");
            console.log("you win");
        } else if (B === T) {
            console.log("Lizard eats Paper");
            console.log("you lose");
        } else if (B === P) {
            console.log("Paper covers Rock");
            console.log("you win");
        };
    } else if (A === R) {
        if (B === S) {
            console.log("Spock smashes Scissors");
            console.log("you lose");
        } else if (B === T) {
            console.log("Scissors decapitates Lizard");
            console.log("you win");
        } else if (B === P) {
            console.log("Rock crushes Scissors");
            console.log("you lose");
        } else if (B === Q) {
            console.log("Scissors cuts Paper");
            console.log("you win");
        };
    } else if (A === S) {
        if (B === T) {
            console.log("Lizard poisons Spock");
            console.log("you lose");
        } else if (B === P) {
            console.log("Spock vaporizes Rock");
            console.log("you win");
        } else if (B === Q) {
            console.log("Paper disproves Spock");
            console.log("you lose");
        } else if (B === R) {
            console.log("Spock smashes Scissors");
            console.log("you win");
        };
    } else if (A === T) {
        if (B === P) {
            console.log("Rock crushes Lizard");
            console.log("you lose");
        } else if (B === Q) {
            console.log("Lizard eats Paper");
            console.log("you win");
        } else if (B === R) {
            console.log("Scissors decapitates Lizard");
            console.log("you lose");
        } else if (B === S) {
            console.log("Lizard poisons Spock");
            console.log("you win");
        };
    };
};
module.exports = {
    winner,
    name
};