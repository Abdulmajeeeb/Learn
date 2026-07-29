const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join(__dirname, "public", "index.html");

const server = http.createServer(function (request, response) {
    const url = request.url;
    console.log(request.url);
    switch (url) {
        case "/":

            response.end(fs.readFileSync(filePath));
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
