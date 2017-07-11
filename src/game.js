import $ from "jquery";

export default {
    selectedBoat: {},
    init() {
        this.createGameField();
        this.setBoats();
    },
    createGameField() {
        let game = this;
        let table = document.createElement('table');
        let tr, id = 1;

        for (let i = 0; i < 10; i++) {
            tr = document.createElement('tr');
            for (let a = 0; a < 10; a++) {
                let td = document.createElement('td');
                td.id = id;
                id++;
                tr.appendChild(td);
                $(td).mouseenter(function () {
                    console.log(this);
                    console.log(game.selectedBoat);

                    if (game.selectedBoat.deck === 0) {
                        return;
                    }

                    let cellId = parseInt(this.id);
                    this.style = 'background: ' + game.selectedBoat.color;

                    if (game.selectedBoat.deck == 4) {

                    }
                    if (game.selectedBoat.deck == 3) {

                    }
                    if (game.selectedBoat.deck == 2) {
                        if (parseInt((cellId / 10), 10) !== (cellId / 10)) {
                            let nextCellId = cellId + 1;
                            $('#battleground table tr #' + nextCellId).css({
                                background: game.selectedBoat.color
                            });
                        }
                    }

                }).mouseleave(function () {
                    if (game.selectedBoat.deck === 0) {
                        return;
                    }

                    this.style = '';
                    let cellId = parseInt(this.id);
                    if (game.selectedBoat.deck == 2) {
                        if (parseInt((cellId / 10), 10) !== (cellId / 10)) {
                            let nextCellId = cellId + 1;
                            $('#battleground table tr #' + nextCellId).css({
                                background: ''
                            });
                        }
                    }
                }).click(function () {
                    console.log(this);
                    game.selectedBoat.deck = 0;
                });
            }
            table.appendChild(tr);
        }

        table.border = 1;
        table.cellPadding = 10;
        table.cellSpacing = 1;

        let battleground = document.getElementById('battleground');
        battleground.appendChild(table);
    },
    setBoats() {
        this.showMessage("Фаза расстановки кораблей");
        let boat_4_1 = this.createBoat("boat_4_1", 4, 'darkred');
        this.createBoat("boat_3_1", 3, 'goldenrod');
        this.createBoat("boat_3_2", 3, 'goldenrod');
        this.createBoat("boat_2_1", 2, 'lightgreen');
        this.createBoat("boat_2_2", 2, 'lightgreen');
        this.createBoat("boat_2_3", 2, 'lightgreen');
        this.createBoat("boat_1_1", 1, 'lightblue');
        this.createBoat("boat_1_2", 1, 'lightblue');
        this.createBoat("boat_1_3", 1, 'lightblue');
        this.createBoat("boat_1_4", 1, 'lightblue');
    },
    createBoat(id, deck, color) {

        let div = document.createElement('div');
        div.id = deck;
        div.style = 'margin-bottom: 10px';

        let table = document.createElement('table');
        let tr = document.createElement('tr');

        for (let i = 0; i < deck; i++) {
            let td = document.createElement('td');
            td.style = 'background: ' + color;
            tr.appendChild(td);
        }

        table.border = 1;
        table.cellPadding = 10;
        table.cellSpacing = 1;

        table.appendChild(tr);
        div.appendChild(table);

        let boats = document.getElementById('boats');
        boats.appendChild(div);

        let game = this;
        $(div).click(function () {
            console.log(this);
            game.selectedBoat.deck = deck;
            game.selectedBoat.color = color;
        });

        return div;
    },
    showMessage(message) {
        $('#info').text('');
        $('#info').text(message);
    }
}