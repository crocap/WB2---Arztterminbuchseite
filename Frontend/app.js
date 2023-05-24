const express = require('express');
const path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);
console.log('Frontend listening on port 3000');