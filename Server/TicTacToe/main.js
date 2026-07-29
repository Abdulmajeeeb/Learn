const express = require('express');
const app = express();
const PORT = 3000;

app.get("/",function(request, response){
    response.send("Hello World");
});
app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT}`);
});
