const http = require('node:http');              //built in

const helloRoute = require('./routes/hello');   //my file (./path)
const _404Route  = require('./routes/404');

//create Server
const server = http.createServer(function (request, response) {
    //CORS
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');

    const url = request.url;
    //no return here, orelse the switch won't be able to be called
    switch (url) {
        case '/hello':
            helloRoute(request, response);
            break;
        default:
            _404Route(request, response);
    }
});
server.listen(4400);