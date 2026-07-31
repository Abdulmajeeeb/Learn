const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const logic=require('./logic');
console.log(logic);
const contentTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png"
}

const index = path.join(__dirname, "public", "index.html");

const server = http.createServer(function (request, response) {
    let url = request.url;
    console.log(request.method, request.url);
if (request.method==="POST"){
    if (request.url === "/move"){
        console.log("Move Route Reached");
        return;
    }
}


    if (url === "/") {
        url = "/index.html";
    }
    const filePath = path.join(__dirname, "public", url.slice(1));
    const extension = path.extname(filePath);
    const contentType = contentTypes[extension] || "application/octet-stream";
    try {
        const file = fs.readFileSync(filePath);
        response.writeHead(200, { "Content-Type": contentType });
        response.end(file);
    }
    catch (error) {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end("File not found");
    }
});
const PORT = 3000;

server.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});
