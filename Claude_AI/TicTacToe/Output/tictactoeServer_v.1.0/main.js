// ============================================================
// main.js
// ------------------------------------------------------------
// This is the starting point of the Tic Tac Toe web server.
// It listens for incoming web requests and sends each one to
// the right "route" file, based on the URL that was visited.
//
// Available endpoints:
//   GET  /new       - start a new game (optionally ?size=5)
//   POST /move      - make a move: { playerId, m, n }
//   GET  /continue  - get the current game state
//   GET  /board     - get the current game state (same as /continue)
// ============================================================

const http = require('node:http');

// Each of these files knows how to handle one specific endpoint.
const newGameRoute = require('./routes/newGame');
const moveRoute = require('./routes/move');
const continueRoute = require('./routes/continue');
const boardRoute = require('./routes/board');
const staticRoute = require('./routes/static');
const notFoundRoute = require('./routes/404');

// Create the actual web server.
const server = http.createServer(function (request, response) {
    // These headers allow the API to be called from a web page
    // hosted on a different domain (this is called "CORS").
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Browsers send an OPTIONS request first to check CORS rules
    // before sending the real request - just say "OK" to it.
    if (request.method === 'OPTIONS') {
        response.writeHead(204);
        response.end();
        return;
    }

    // Split the incoming URL into the path (e.g. "/move") and
    // any query parameters (e.g. "?size=5").
    const parsedUrl = new URL(request.url, 'http://' + request.headers.host);
    const path = parsedUrl.pathname;
    const query = parsedUrl.searchParams;

    // Send the request to whichever route file matches the path.
    switch (path) {
        case '/':
        case '/script.js':
            staticRoute(request, response, path);
            break;
        case '/new':
            newGameRoute(request, response, query);
            break;
        case '/move':
            moveRoute(request, response, query);
            break;
        case '/continue':
            continueRoute(request, response);
            break;
        case '/board':
            boardRoute(request, response);
            break;
        default:
            notFoundRoute(request, response);
    }
});

// Start listening for requests on port 4400.
server.listen(4400, function () {
    console.log('Tic Tac Toe API running on http://localhost:4400');
});
