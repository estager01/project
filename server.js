var express = require('express');
var app = express();

const DEFAULT_PORT = 3377
const port = process.env.PORT || DEFAULT_PORT

// Serve up content from public directory
app.use(express.static(__dirname + '/website'));

console.log(`Server listening at port ${port}`)
app.listen(port);

