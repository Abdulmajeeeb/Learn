// ============================================================
// routes/continue.js
// ------------------------------------------------------------
// Handles: GET <Host>/continue
// Simply returns whatever the current game state is right now,
// without changing anything. Handy for refreshing a screen or
// checking in on an in-progress game.
// ============================================================

const game = require('../gameLogic');

module.exports = function (request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(game.getState()));
};
