const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const index = path.join(__dirname, "public", "index.html");
const script = path.join(__dirname, "public", "script.js");

const server = http.createServer(function (request, response) {
    const url = request.url;
    console.log(request.url);
    switch (url) {
        case "/":
            response.writeHead(200,{'Content-Type':'text/html'});
            response.end(fs.readFileSync(index));
            break;
        case "/script.js":
            response.writeHead(200,{'Content-Type':'text/javascript'});
            response.end(fs.readFileSync(script));
            break;
        case "/about":
            response.end("About page");
            break;
        case "/game":
            response.end("Game Page");
            break;
        default:
            response.end("Page not found");
    }
});
const PORT = 3000;

server.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});
