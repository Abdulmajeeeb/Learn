// ============================================================
// routes/newGame.js
// ------------------------------------------------------------
// Handles: GET <Host>/new
// Starts a brand new game and sends back the empty board.
//
// Optional: add ?size=5 to the URL to play on a 5x5 board
// instead of the default 3x3.
// ============================================================

const game = require('../gameLogic');

module.exports = function (request, response, query) {
    // Read the "size" value from the URL, e.g. /new?size=5
    let size = parseInt(query.get('size'), 10);

    // If no size was given (or it's not a sensible number),
    // just fall back to the standard 3x3 board.
    if (!Number.isInteger(size)) {
        size = 3;
    }

    // Reset the game and get the fresh, empty board back.
    const state = game.createTable(size);

    // Send the board back to whoever asked for it, as JSON.
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(state));
};
