import Game from './game.js';
import $ from "jquery";

const socket = new WebSocket("ws://localhost:8081");

// отправить сообщение из формы publish
// document.forms.publish.onsubmit = function () {
//     var outgoingMessage = this.message.value;
//
//     socket.send(outgoingMessage);
//     return false;
// };

// обработчик входящих сообщений
socket.onmessage = function (event) {
    let data = JSON.parse(event.data);
    console.log(data);
    var incomingMessage = data.text;
    Game.showMessage(incomingMessage);

    if (data.status === 2) {
        Game.init();
    }
};