var express = require('express');
var path = require('path');
var CLIENT_PATH = '/html';

var app = express();
app.use('/', express.static(path.join(__dirname, CLIENT_PATH)));
var server = app.listen(3000, function () {
    console.log('Running....');
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening %s:%s', host, port);
});
