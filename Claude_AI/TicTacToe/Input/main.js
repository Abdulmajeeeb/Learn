const http = require('node:http');
// node:fs node:fs/promises

const helloRoute = require('./routes/hello');
const notFoundRoute = require('./routes/404');


// Create server
const server = http.createServer(function (request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    const url = request.url;
    return;
    switch (url) {
        case '/hello':
              helloRoute(request, response);
            break;
        // case '/hi':
        //     aasdasdasd
        default:
             notFoundRoute(request, response);
    }
    return;
})

// Bind to port
server.listen(4400);

// new-game (5) => 
// make-move (m,n) => {winner:null, currentState)
// continue
// get-game