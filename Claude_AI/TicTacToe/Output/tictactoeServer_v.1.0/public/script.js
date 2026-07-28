// ============================================================
// script.js
// ------------------------------------------------------------
// This runs in the browser. It does NOT know the rules of
// Tic Tac Toe - it just asks the server what the board looks
// like right now, draws it on screen, and tells the server
// when a cell is clicked. The server decides if a move is
// allowed, who wins, etc.
//
// Two people can open this same page (on two different
// laptops) and play against each other, because they are both
// just looking at - and updating - the same game on the server.
// ============================================================

// How often (in milliseconds) we check the server for updates.
// This lets you see your friend's move without refreshing.
const POLL_INTERVAL_MS = 3000;

// Remember which player this browser is playing as ("X" or "O"),
// saved so it's still remembered if the page is refreshed.
let myPlayerId = localStorage.getItem('ticTacToePlayer');

const statusEl = document.getElementById('status');
const boardBody = document.getElementById('gameBoard');
const playerSelectEl = document.getElementById('playerSelect');

// If this browser has already chosen a player, hide the
// "Play as X / Play as O" buttons.
if (myPlayerId) {
    playerSelectEl.style.display = 'none';
}

// Called when someone clicks "Play as X" or "Play as O".
function selectPlayer(playerId) {
    myPlayerId = playerId;
    localStorage.setItem('ticTacToePlayer', playerId);
    playerSelectEl.style.display = 'none';
}

// Asks the server for the current game state and redraws the board.
function fetchBoard() {
    fetch('/board')
        .then(function (response) {
            return response.json();
        })
        .then(function (state) {
            renderBoard(state);
        });
}

// Draws the board and status message on the page, based on the
// game state the server sent back.
function renderBoard(state) {
    // Figure out what the status text should say.
    if (state.winner === 'draw') {
        statusEl.textContent = "It's a draw!";
    } else if (state.winner) {
        statusEl.textContent = state.winner + ' wins!';
    } else {
        statusEl.textContent = 'Turn: ' + state.currentPlayer +
            (myPlayerId ? (state.currentPlayer === myPlayerId ? ' (your move)' : " (waiting for opponent)") : '');
    }

    // Rebuild the table rows/cells to match the current board.
    boardBody.innerHTML = '';
    for (let row = 0; row < state.boardSize; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < state.boardSize; col++) {
            const value = state.board[row][col];

            const td = document.createElement('td');
            td.className = 'cell' + (value ? ' ' + value : '');
            td.textContent = value;

            // Clicking a cell tries to make a move there.
            td.addEventListener('click', function () {
                cellClicked(row, col, state);
            });

            tr.appendChild(td);
        }
        boardBody.appendChild(tr);
    }
}

// Handles a click on a specific cell.
function cellClicked(row, col, state) {
    // Make sure this browser has picked a player first.
    if (!myPlayerId) {
        playerSelectEl.style.display = 'block';
        return;
    }

    // Don't allow moves once the game is finished.
    if (state.gameOver) {
        return;
    }

    // Don't allow playing on the opponent's turn.
    if (state.currentPlayer !== myPlayerId) {
        return;
    }

    // Don't allow playing on a cell that's already filled.
    if (state.board[row][col]) {
        return;
    }

    // Send the move to the server.
    fetch('/move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId: myPlayerId, m: row, n: col })
    })
        .then(function () {
            // Refresh right away so the move shows up instantly,
            // instead of waiting for the next poll.
            fetchBoard();
        });
}

// Starts a new game at the given board size (defaults to 3x3).
function startNewGame(size) {
    fetch('/new?size=' + (size || 3))
        .then(function () {
            fetchBoard();
        });
}

// "New Game" button - restarts at the current board size.
function restartGame() {
    startNewGame(currentBoardSize);
}

// Remember the last chosen board size so "New Game" can reuse it.
let currentBoardSize = 3;
document.querySelectorAll('#types button').forEach(function (button) {
    button.addEventListener('click', function () {
        currentBoardSize = parseInt(button.getAttribute('data-size'), 10);
        startNewGame(currentBoardSize);
    });
});

// Draw the board as soon as the page loads...
fetchBoard();

// ...and keep checking every few seconds so both players stay in sync.
setInterval(fetchBoard, POLL_INTERVAL_MS);
