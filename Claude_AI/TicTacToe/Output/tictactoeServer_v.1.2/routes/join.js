// ============================================================
// routes/join.js
// ------------------------------------------------------------
// Handles: GET <Host>/join
// Called once when the page first loads. Assigns the visitor a
// permanent seat ("seat1" if free, otherwise "seat2"), or tells
// them the game already has two players. The seat stays theirs
// for the whole session - which symbol (X/O) that seat plays as
// can still change between games.
// ============================================================

const game = require('../gameLogic');

module.exports = function (request, response) {
    const seat = game.joinGame();

    response.writeHead(200, { 'Content-Type': 'application/json' });
    if (seat) {
        response.end(JSON.stringify({ seat: seat }));
    } else {
        response.end(JSON.stringify({ error: 'This game already has two players' }));
    }
};
