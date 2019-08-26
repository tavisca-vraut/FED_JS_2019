const express = require('express');
const app = express();

const PORT = 8001;


app.get('/', function(request, response) {
    response.send("<h1>Hello</h1>");
});


app.listen(PORT, function() {
    console.log(`Server listening at port: ${PORT}...`);
    console.log(`Visit http://localhost:${PORT}/ `);
});