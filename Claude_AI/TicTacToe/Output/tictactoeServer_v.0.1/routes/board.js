const game = require('../gameLogic');

// GET <Host>/board -> current game state as JSON
module.exports = function (request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(game.getState()));
};