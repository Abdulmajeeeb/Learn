const http = require('node:http');

const newGameRoute = require('./routes/newGame');
const moveRoute = require('./routes/move');
const continueRoute = require('./routes/continue');
const boardRoute = require('./routes/board');
const notFoundRoute = require('./routes/404');

// Create server
const server = http.createServer(function (request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Answer CORS preflight requests
    if (request.method === 'OPTIONS') {
        response.writeHead(204);
        response.end();
        return;
    }

    // Split path and query string: "/move?playerId=X&m=0&n=1"
    const parsedUrl = new URL(request.url, 'http://' + request.headers.host);
    const path = parsedUrl.pathname;
    const query = parsedUrl.searchParams;

    switch (path) {
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

// Bind to port
server.listen(4400, function () {
    console.log('Tic Tac Toe API running on http://localhost:4400');
});