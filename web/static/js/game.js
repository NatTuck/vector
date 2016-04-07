
var game = {
    player: { xx: 1000, yy: 1000, aa: 0 },
    cursor: { xx: 1000, yy:  950 },
    ents:   [],
};

function gen_ents() {
    for (var ii = 0; ii < 20; ++ii) {
        for (var jj = 0; jj < 20; ++jj) {
            var ent = { xx: ii * 100, yy: jj * 100, aa: 0, size: 20, color: "green" };
            game.ents.push(ent);
        }
    }
}

function get_player() {
    return game.player;
}

function player_move(pt) {
    console.log("player_move: " + pt);
    game.player.xx = pt.xx;
    game.player.yy = pt.yy;
}

function put_cursor(pt) {
    console.log("put_cursor: " + pt);
}

function setup() {
    gen_ents();
}

function tick() {

}

export var Game = {
    setup: setup,
    tick: tick,
    game: game,
    get_player: get_player,
    put_cursor: put_cursor,
    player_move: player_move,
};

window.Game = Game;

