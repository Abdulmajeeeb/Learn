const hello = function(request, response){
    response.writeHead(200, {
        'content-type': 'application/JSON'
    });
    response.end(JSON.stringify({
        'content': 'hello from the other side'
    }));
};

module.exports= hello;