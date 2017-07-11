"use strict";

const WebSocketServer = require('ws');

let clients = {};
let countConnections = 0;
let data = {};

const webSocketServer = new WebSocketServer.Server({port: 8081});
webSocketServer.on('connection', function (ws, req) {

    // const ip = req.connection.remoteAddress;
    // console.log("ip:" + ip);

    countConnections++;
    console.log('Новое соединение открыто ' + countConnections);

    if (countConnections === 1) {
        clients[1] = ws;
        data['status'] = 1;
        data['text'] = "Ждем оппонента...";
        clients[1].send(JSON.stringify(data));
    }
    if (countConnections === 2) {
        clients[2] = ws;
        data['status'] = 2;
        data['text'] = "Оппонент найден!";
        clients[1].send(JSON.stringify(data));
        clients[2].send(JSON.stringify(data));
    }
    if (countConnections > 2) {
        data['status'] = 0;
        data['text'] = "Извините, оппонент уже найден :(";
        ws.send(JSON.stringify(data));
        ws.close();
    }

    ws.on('message', function (message) {
        console.log('получено сообщение ' + message);

        for (var key in clients) {
            clients[key].send(message);
        }
    });

    ws.on('close', function () {
        console.log('соединение закрыто');
        ws.close();
    });

});

console.log("Сервер запущен на портах 8080, 8081");

