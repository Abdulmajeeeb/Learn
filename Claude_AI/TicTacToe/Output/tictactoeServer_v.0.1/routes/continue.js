const game = require('../gameLogic');

// GET <Host>/continue -> current board state
module.exports = function (request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(game.getState()));
};
