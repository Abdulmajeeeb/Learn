/**
 * app.js — application entry point.
 *
 * Responsibilities:
 *   1. Import the route handlers (one file per route).
 *   2. Create the HTTP server and attach shared response headers (CORS).
 *   3. Dispatch each incoming request to the matching handler.
 *   4. Bind the server to a port.
 *
 * This file never writes a response body itself — that is always
 * delegated to a handler in the routes/ directory.
 */

const http = require('node:http');

// Route handlers — each module exports a single (incomingMessage, serverResponse) function.
const statusRoute  = require('./routes/status');
const missingRoute = require('./routes/missing');

/**
 * Create the server.
 * Node invokes this callback once per incoming request, passing:
 *   incomingMessage — the parsed request (URL, method, headers, ...)
 *   serverResponse  — the writable reply; every code path MUST call .end()
 */
const app = http.createServer(function (incomingMessage, serverResponse) {

    // --- CORS headers -------------------------------------------------
    // Applied before routing so that every response (including 404s)
    // is readable by browser pages served from other origins.
    // NOTE: '*' is convenient for development; restrict it in production.
    serverResponse.setHeader('Access-Control-Allow-Origin', '*');
    serverResponse.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    serverResponse.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // --- Router -------------------------------------------------------
    // A plain switch on the requested path. Adding a feature means:
    // one new file in routes/, one new require above, one new case here.
    const requestedPath = incomingMessage.url;

    switch (requestedPath) {
        case '/status':
            statusRoute(incomingMessage, serverResponse);
            break;

        // Future endpoints (planned):
        // case '/tasks'      => list all tasks
        // case '/tasks/add'  => create a task from the request body
        // case '/tasks/done' => mark a task complete

        default:
            // Fallback for any unrecognized path.
            missingRoute(incomingMessage, serverResponse);
    }
});

// --- Startup ----------------------------------------------------------
const PORT = 5500;

app.listen(PORT, function () {
    // Runs once, when the port has been successfully claimed.
    console.log(`mirror-api listening on http://localhost:${PORT}`);
});
