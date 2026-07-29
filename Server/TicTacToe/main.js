const http = require('http');
const path = require('path')
const server = http.createServer(function (request, response) {
    const url = request.url;
    console.log(request.url);
    switch (url) {
        case "/":
            response.end("Home Page");
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
