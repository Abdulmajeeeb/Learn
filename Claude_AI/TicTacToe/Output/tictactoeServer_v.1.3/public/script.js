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
// The server gives whoever opens the page first a permanent
// "seat", and the next person the other seat, so there's no way
// to end up both playing as the same side. Whoever loses a game
// plays X (and moves first) in the next one.
// ============================================================

// How often (in milliseconds) we check the server for updates.
// This lets you see your friend's move without refreshing.
const POLL_INTERVAL_MS = 500;

// The key used to remember, in this browser only, which seat it
// was assigned. Using a fresh key name here (V3) makes sure
// anyone with an old symbol-based value from before gets
// reassigned properly instead of getting stuck.
const STORAGE_KEY = 'ticTacToeSeatV3';

// Which seat this browser is ("seat1" or "seat2") - this is
// permanent for the session. Which SYMBOL (X/O) that seat is
// currently playing as can change between games, so it's looked
// up fresh from the server's state each time (see myPlayerId
// inside renderBoard).
let mySeat = localStorage.getItem(STORAGE_KEY);
let myPlayerId = null; // filled in each time we get board state

const statusEl = document.getElementById('status');
const joinStatusEl = document.getElementById('joinStatus');
const boardBody = document.getElementById('gameBoard');

// Remember the last chosen board size so "New Game" can reuse it.
let currentBoardSize = 3;

// Asks the server "can I play?" and remembers whichever seat
// we get assigned. Only needs to happen once per browser -
// after that, mySeat is reused from storage.
function joinGame() {
    fetch('/join')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.seat) {
                mySeat = data.seat;
                localStorage.setItem(STORAGE_KEY, mySeat);
            } else {
                // Both seats are already taken - just watch the game.
                joinStatusEl.textContent = data.error + ' - you can still watch.';
            }
        });
}

// If we don't already know which seat we are, ask the server.
if (!mySeat) {
    joinGame();
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
    // Work out which symbol WE are this game, based on our seat.
    // This can be different from game to game - whoever lost
    // last time starts this game as X.
    myPlayerId = mySeat ? state.seatSymbol[mySeat] : null;

    if (mySeat) {
        joinStatusEl.textContent = 'You are playing as ' + myPlayerId;
    }

    // Figure out what the status text should say.
    if (state.winner === 'draw') {
        statusEl.textContent = "It's a draw!";
    } else if (state.winner) {
        statusEl.textContent = state.winner + ' wins!';
    } else {
        statusEl.textContent = 'Turn: ' + state.currentPlayer +
            (myPlayerId ? (state.currentPlayer === myPlayerId ? ' (your move)' : ' (waiting for opponent)') : '');
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
    // If we haven't been assigned a player yet (or both seats
    // were full), clicking shouldn't do anything.
    if (!myPlayerId) {
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
