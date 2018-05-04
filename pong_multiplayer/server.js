var connections = [];
var express = require('express');
var app = express();
var server = app.listen(3000);
app.use(express.static('public'));

console.log("RUNNING");

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', function(socket){
    connections.push(socket);
    socket.on('start', function(data){
        console.log("Um usuário se conectou "+data.id+" número de conexões"+connections.length);
    })
});
