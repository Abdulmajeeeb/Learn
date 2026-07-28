// ============================================================
// routes/join.js
// ------------------------------------------------------------
// Handles: GET <Host>/join
// Called once when the page first loads. Assigns the visitor
// "X" if that seat is free, otherwise "O", otherwise tells them
// the game already has two players.
// ============================================================

const game = require('../gameLogic');

module.exports = function (request, response) {
    const playerId = game.joinGame();

    response.writeHead(200, { 'Content-Type': 'application/json' });
    if (playerId) {
        response.end(JSON.stringify({ playerId: playerId }));
    } else {
        response.end(JSON.stringify({ error: 'This game already has two players' }));
    }
};
