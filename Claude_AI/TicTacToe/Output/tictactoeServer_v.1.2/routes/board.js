// ============================================================
// routes/board.js
// ------------------------------------------------------------
// Handles: GET <Host>/board
// Returns the current game state as JSON - the board itself,
// whose turn it is, and the winner (if any).
// ============================================================

const game = require('../gameLogic');

module.exports = function (request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(game.getState()));
};
