// ---------------------------------------------------------
// Game Variables
// ---------------------------------------------------------

// Counts how many rounds have been played so far
let moves = 0;

// Stores the total number of rounds selected by the player
let maxRounds;

// Stores the player's current score
let playerScore = 0;

// Stores the computer's current score
let computerScore = 0;

// Stores the score needed to win the match
// (Example: Best of 5 → first to 3 wins)
let winningScore = 0;

// Keeps track of whether the match has finished
let gameOver = false;


// ---------------------------------------------------------
// Get Important HTML Elements
// ---------------------------------------------------------

// Dialog box shown when the match ends
const gameOverDialog = document.getElementById("gameOver");

// Reset button used to start a fresh game
const resetButton = document.getElementById("reset");

// All buttons used for selecting the number of rounds
const rounds = document.querySelectorAll("#rounds button");


// ---------------------------------------------------------
// Round Selection
// ---------------------------------------------------------

// Add a click event to every round-selection button
for (const button of rounds) {

    button.addEventListener("click", function () {

        // Read the selected number of rounds from the button
        maxRounds = Number(button.dataset.round);

        // Calculate how many wins are required to win the match
        // Example:
        // 3 rounds -> 2 wins
        // 5 rounds -> 3 wins
        winningScore = Math.ceil(maxRounds / 2);

        //Hide Start Screen
        document.getElementById("startScreen").style.display="none";

        //Show Game Screen
        document.getElementById("gameScreen").style.display="block";

        // Remove the highlight from every round button
        for (const roundButton of rounds) {
            roundButton.classList.remove("selectedRound");
        }

        // Highlight the round button that was clicked
        button.classList.add("selectedRound");
    });
}


// ---------------------------------------------------------
// Player Choice Buttons
// ---------------------------------------------------------

// Get all Rock / Paper / Scissors /Lizard / Spock choice buttons
const optionButtons = document.querySelectorAll("#options button");

// Add a click event to every choice button
for (const button of optionButtons) {

    button.addEventListener("click", function () {

        // Do not allow playing until the user selects
        // how many rounds the match should have
        if (!maxRounds) {
            document.getElementById("status").innerText = "Select rounds limit first!";
            return;
        }

        // Ignore further clicks after the match is over
        if (gameOver) {
            return;
        }

        // Store the player's selected weapon
        let A = button.innerText;

        // Generate a random index for the computer's choice
        let B = Math.floor(Math.random() * name.length);

        // Display both choices on the screen
        document.getElementById("playerChoice").innerText = A;
        document.getElementById("computerChoice").innerText = name[B];

        // Ask the game logic who won this round
        const result = winner(A, name[B]);

        // Display the explanation returned by winner()
        document.getElementById("status").innerText = result.message;


        // -------------------------------------------------
        // Update Scores
        // -------------------------------------------------

        // Player wins this round
        if (result.winner === "A") {

            // Increase player's score
            playerScore++;

            // Update the scoreboard
            document.getElementById("playerScore").innerText = `Score = ${playerScore}`;

            // Show round result
            document.getElementById("winLoss").innerText = "You Win";

        }

        // Computer wins this round
        else if (result.winner === "B") {

            // Increase computer's score
            computerScore++;

            // Update the scoreboard
            document.getElementById("computerScore").innerText = `Score = ${computerScore}`;

            // Show round result
            document.getElementById("winLoss").innerText = "You Lose";

        }

        // Round ended in a draw
        else {

            // Clear previous win/lose message
            document.getElementById("winLoss").innerText = "";

        }


        // -------------------------------------------------
        // Count Completed Games
        // -------------------------------------------------

        // Increase the number of rounds played
        moves++;

        // Update the round counter on the screen
        document.getElementById("count").innerText = `Game Count = ${moves}`;


        // -------------------------------------------------
        // Check if the Match Has Ended
        // -------------------------------------------------

        // Player reached the required winning score
        if (playerScore === winningScore) {

            // Display the final result
            document.getElementById("conclusion").innerText = "You Win";

            // Prevent any further moves
            gameOver = true;

            // Show the game over dialog
            gameOverDialog.showModal();
        }

        // Computer reached the required winning score
        else if (computerScore === winningScore) {

            // Display the final result
            document.getElementById("conclusion").innerText = "You Lose";

            // Prevent any further moves
            gameOver = true;

            // Show the game over dialog
            gameOverDialog.showModal();
        }

    });

}


// ---------------------------------------------------------
// Reset Button
// ---------------------------------------------------------

// Start a completely new match
resetButton.addEventListener("click", function () {

    // Reset all game variables
    moves = 0;
    maxRounds = undefined;
    playerScore = 0;
    computerScore = 0;
    winningScore = 0;
    gameOver = false;

    // Reset both score displays
    document.getElementById("playerScore").innerText = "Score = 0";
    document.getElementById("computerScore").innerText = "Score = 0";

    // Clear the round result
    document.getElementById("winLoss").innerText = "";

    // Reset the game counter
    document.getElementById("count").innerText = "Game Count = 0";

    // Remove the final match result
    document.getElementById("conclusion").innerText = "";

    // Restore the default instruction
    document.getElementById("status").innerText = "Choose Your Weapon!";

    // Clear the displayed choices
    document.getElementById("playerChoice").innerText = "";
    document.getElementById("computerChoice").innerText = "";

    // Remove the selected highlight from every round button
    for (const roundButton of rounds) {
        roundButton.classList.remove("selectedRound");
    }

});