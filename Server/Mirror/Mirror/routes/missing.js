/**
 * routes/missing.js — fallback handler.
 *
 * Invoked by the router's default branch for any path that has no
 * dedicated handler. Sends an honest 404 status (machine-readable)
 * alongside a short JSON explanation (human-readable).
 */

const missingHandler = function (incomingMessage, serverResponse) {
    serverResponse.writeHead(404, {
        'content-type': 'application/json'
    });

    serverResponse.end(JSON.stringify({
        error: 'Not Found',
        detail: `No route is registered for "${incomingMessage.url}"`
    }));
};

module.exports = missingHandler;
