// ============================================================
// routes/404.js
// ------------------------------------------------------------
// Handles any request that doesn't match a known route, e.g.
// someone visiting <Host>/banana. Just says "not found".
// ============================================================

module.exports = function (request, response) {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ error: 'Route not found' }));
};
