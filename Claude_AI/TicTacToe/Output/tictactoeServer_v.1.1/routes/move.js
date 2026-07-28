// ============================================================
// routes/move.js
// ------------------------------------------------------------
// Handles: POST <Host>/move
// Body (JSON): { "playerId": "X", "m": 0, "n": 2 }
//
//   playerId - which player is moving, "X" or "O"
//   m        - the row to place the mark in
//   n        - the column to place the mark in
//
// You can also call this as a simple GET request while testing
// in a browser, e.g. /move?playerId=X&m=0&n=2
// ============================================================

const game = require('../gameLogic');

module.exports = function (request, response, query) {
    if (request.method === 'POST') {
        // Collect the incoming request body piece by piece.
        let body = '';
        request.on('data', function (chunk) {
            body += chunk;
        });

        // Once the whole body has arrived, read the move out of it.
        request.on('end', function () {
            const data = JSON.parse(body);
            playMove(response, data.playerId, data.m, data.n);
        });
    } else {
        // GET request - read the move straight from the URL instead.
        playMove(
            response,
            query.get('playerId'),
            parseInt(query.get('m'), 10),
            parseInt(query.get('n'), 10)
        );
    }
};

// Plays the move and sends the updated game state back as JSON.
function playMove(response, playerId, m, n) {
    const result = game.makeMove(playerId, m, n);
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(result));
}
