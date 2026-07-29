const express = require('express');
const path = require('path')
const app = express();
const PORT = 3000;

app.get("/",function(request, response){
    response.sendFile(path.join(__dirname,'public','index.html'));
});
app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT}`);
});
