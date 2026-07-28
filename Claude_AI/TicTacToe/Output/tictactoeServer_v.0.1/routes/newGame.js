const game = require('../gameLogic');

// GET <Host>/new        -> 3x3 board
// GET <Host>/new?size=5 -> 5x5 board
module.exports = function (request, response, query) {
    let size = parseInt(query.get('size'), 10);
    if (!Number.isInteger(size) || size < 3 || size > 10) {
        size = 3;
    }
    const state = game.createTable(size);
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(state));
};
