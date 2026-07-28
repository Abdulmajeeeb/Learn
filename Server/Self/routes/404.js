const _404= function(request,response){
    response.writeHead(404, {
        'content-type':'text/plain'
    });
    response.end('Error 404');
};

module.exports=_404;