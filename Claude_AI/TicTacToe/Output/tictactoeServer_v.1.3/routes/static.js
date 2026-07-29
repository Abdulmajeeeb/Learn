// ============================================================
// routes/static.js
// ------------------------------------------------------------
// Serves the plain files that make up the web page itself:
// the HTML page and the browser-side script.js. These are not
// game logic - they're just what the browser needs to draw the
// page and talk to the API.
// ============================================================

const fs = require('node:fs');
const path = require('node:path');

// Maps a URL path to the file it should serve, and what kind
// of file it is (so the browser knows how to handle it).
const FILES = {
    '/': { file: 'index.html', type: 'text/html' },
    '/script.js': { file: 'script.js', type: 'application/javascript' }
};

module.exports = function (request, response, urlPath) {
    const entry = FILES[urlPath];

    const filePath = path.join(__dirname, '..', 'public', entry.file);
    const contents = fs.readFileSync(filePath);

    response.writeHead(200, { 'Content-Type': entry.type });
    response.end(contents);
};
