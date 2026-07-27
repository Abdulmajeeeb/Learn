const hello = (request, response) => {
    response.writeHead(200, {
        'content-type': 'application/json'
    })
    response.end(JSON.stringify({
        content: 'hello world'
    }));

    return;
}


module.exports = hello;