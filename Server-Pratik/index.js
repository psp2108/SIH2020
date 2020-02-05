require("dotenv").config();

var port = process.env['SIH_PORT'] || 3000;
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    console.log(req);
    res.send('hello world');
})

app.listen(port);
