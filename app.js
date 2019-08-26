const express = require('express');
const app = express();

const PORT = 8001;
const STATIC_FILES_DIR = "assets"


app.use(express.static(`${STATIC_FILES_DIR}`));


app.get('/', function(request, response) {
    response.render("index.ejs");
});


app.listen(PORT, function() {
    console.log(`Server listening at port: ${PORT}...`);
    console.log(`Visit http://localhost:${PORT}/ `);
});