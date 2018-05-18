var players = [];
function Player(id, x, y, v, w, h, p){ //id, pos x, pos y, velocidade, largura, altura, pontos
    this.id = id;
    this.x = x;
    this.y = y;
    this.v = v;
    this.w = w;
    this.h = h;
    this.p = p;
};
var connections = [];
var express = require('express');
var app = express();
var server = app.listen(3000);
app.use(express.static('public'));

console.log("RUNNING");

var socket = require('socket.io');
var io = socket(server);

function getCounter(){ // conta jogadores conectados
    io.sockets.emit("getCounter", connections.length);
}

function heartBeat() {
    io.sockets.emit("heartBeat", players)
}

setInterval(heartBeat, 33);

io.sockets.on('connection', function(socket){
    connections.push(socket);
    getCounter();
    socket.on('start', function(data){
        console.log("Um usuário se conectou "+data.id+" número de conexões "+connections.length);
        var p = new Player(socket.id, data.x, data.y, data.w, data.h, data.p);
        players.push(p);
    })

    socket.on('update', function(data){
        var pl;
        for (var i = 0; i < players.length; i++) {
            if (socket.id === players[i].id)
                pl = players[i];
        }
        console.log(data);
        pl.x = data.x;
        pl.y = data.y;
        pl.v = data.v;
        pl.w = data.w;
        pl.h = data.h;
        pl.p = data.p;
    })
});
