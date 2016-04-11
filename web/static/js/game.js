
var game = {
    player: { xx: 1000, yy: 1000, aa: 0, x1: 1100, y1: 1100, speed: 20 },
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
    game.player.x1 = pt.xx;
    game.player.y1 = pt.yy;
}

function put_cursor(pt) {
    game.cursor.xx = pt.xx;
    game.cursor.yy = pt.yy;
}

function setup() {
    gen_ents();
}

function distance(dx, dy) {
    return sqrt(dx*dx + dy*dy);
}

function tick() {
    var p0 = game.player;
    var dx = p0.x1 - p0.xx;
    var dy = p0.y1 - p0.yy;

    /*
    if (distance(dx, dy) > p0.speed) {

    }

    var p1 = _.extend(_.clone(game.player), {
        xx: p0.xx + 
    })
    */
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

