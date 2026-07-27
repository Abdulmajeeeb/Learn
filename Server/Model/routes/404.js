const _404 = function (request, response){

    response.end('Route not found');
    return;
}


module.exports = _404;