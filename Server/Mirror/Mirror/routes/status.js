/**
 * routes/status.js — GET /status
 *
 * A lightweight health-check endpoint. Responds with a small JSON
 * payload confirming the service is up, plus the server's current time.
 */

const statusHandler = (incomingMessage, serverResponse) => {
    // 200 = success; the content-type header tells the client
    // to interpret the body as JSON rather than plain text.
    serverResponse.writeHead(200, {
        'content-type': 'application/json'
    });

    // Objects cannot travel over HTTP directly — serialize to text first.
    serverResponse.end(JSON.stringify({
        service: 'mirror-api',
        status: 'ok',
        timestamp: new Date().toISOString()
    }));
};

module.exports = statusHandler;
