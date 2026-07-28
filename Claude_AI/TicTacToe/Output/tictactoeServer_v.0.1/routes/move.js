const game = require('../gameLogic');

// POST <Host>/move   body: { "playerId": "X", "m": 0, "n": 2 }
// (also works as GET <Host>/move?playerId=X&m=0&n=2 for easy browser testing)
module.exports = function (request, response, query) {
    if (request.method === 'POST') {
        let body = '';
        request.on('data', function (chunk) {
            body += chunk;
        });
        request.on('end', function () {
            let data;
            try {
                data = JSON.parse(body);
            } catch (err) {
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'Invalid JSON body' }));
                return;
            }
            handleMove(response, data.playerId, data.m, data.n);
        });
    } else {
        // GET fallback with query params
        handleMove(response, query.get('playerId'), parseInt(query.get('m'), 10), parseInt(query.get('n'), 10));
    }
};

function handleMove(response, playerId, m, n) {
    const result = game.makeMove(playerId, m, n);
    if (result.error) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
    } else {
        response.writeHead(200, { 'Content-Type': 'application/json' });
    }
    response.end(JSON.stringify(result));
}
