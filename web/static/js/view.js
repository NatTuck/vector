
var stage;
var ww;
var hh;

// Coordinates are in zone coordinates.
function point(xx, yy) {
    return { xx: xx, yy: yy };
}

function zone2view(pt) {
    var player = Game.get_player();
    var x0 = player.xx - Math.floor(ww / 2);
    var y0 = player.yy - Math.floor(hh / 2);
    return point(pt.xx - x0, pt.yy - y0);
}

function view2zone(pt) {
    var player = Game.get_player();
    var x0 = player.xx - Math.floor(ww / 2);
    var y0 = player.yy - Math.floor(hh / 2);
    return point(pt.xx + x0, pt.yy + y0);
}

function setup() {
    $('canvas').bind('contextmenu', function (e) { return false; });
    
    stage = new createjs.Stage("vector-canvas");
    
    stage.addEventListener("stagemouseup", function(ev) {
        if (ev.nativeEvent.button == 0) {
            gotLeftClick(ev.stageX, ev.stageY);
        }
        if (ev.nativeEvent.button == 2) {
            gotRightClick(ev.stageX, ev.stageY);
        }
    });

    stage.enableMouseOver(5);
    stage.on("stagemousemove", function(evt) {
        /*
        mouse.xx = evt.stageX;
        mouse.yy = evt.stageY;
        draw();
        */
    });

    draw(Game.game);
}

var icon;

function draw(game) {
    var div = $('#vector-game');
    ww = div.innerWidth();
    hh = window.innerHeight;

    stage.canvas.width  = ww;
    stage.canvas.height = hh;

    stage.removeAllChildren();

    var bg = new createjs.Shape();
    bg.graphics.beginFill("#f0f0f0").drawRect(0, 0, ww, hh);
    bg.x = 0;
    bg.y = 0;
    stage.addChild(bg);

    var text = new createjs.Text();
    var mpos = view2zone({xx: 10, yy: 10});
    text.font = "16px Play";
    text.text = "Mouse @ zone = " + mpos.xx + "," + mpos.yy;
    text.x = 100;
    text.y = 100;
    stage.addChild(text);

    game.ents.forEach(drawEnt);

    drawPlayer(game.player);
    drawCursor(game.cursor);
    
    stage.update();
}

function gotLeftClick(xx, yy) {
    var pt = view2zone(point(xx, yy));
    Game.put_cursor(pt);
    draw(Game.game);
}

function gotRightClick(xx, yy) {
    var pt = view2zone(point(xx, yy));
    Game.player_move(pt);
    draw(Game.game);
}

function gotEntClick(ent, xx, yy) {
    console.log("Ent click: ", ent);
}

function drawEnt(ent) {
    drawCircle(ent);
}

function drawPlayer() {
    var player = Game.get_player();
    var pent = { color: "blue", size: 50, xx: player.xx, yy: player.yy };
    drawCircle(pent);
}

function drawCircle(ent) {
    var vpos = zone2view(ent);

    var cc = new createjs.Container();
    cc.x = vpos.xx;
    cc.y = vpos.yy;

    var shape = new createjs.Shape();
    shape.graphics.beginFill(ent.color).drawCircle(0, 0, ent.size);
    shape.addEventListener("click", function(ev) {
        gotEntClick(ent, ev.stageX, ev.stageY);
    });
    cc.addChild(shape);

    var arrow = new createjs.Text();
    arrow.font = ent.size + "px Play";
    arrow.color = "white";
    arrow.textAlign = "center";
    arrow.textBaseline = "middle";
    arrow.text = "\u27A1";
    arrow.rotation = -180.0 * ent.aa / Math.PI;
    cc.addChild(arrow);
 
    stage.addChild(cc);
}

function drawCursor(cursor) {
    var vpos = zone2view(cursor);
    var cc = new createjs.Text();
    cc.text = "\u2295";
    cc.font = "40px Play";
    cc.color = "blue";
    cc.textAlign = "center";
    cc.textBaseline = "middle";
    cc.x = vpos.xx;
    cc.y = vpos.yy;
    stage.addChild(cc);
}

export var View = {
    setup: setup,
    draw: draw,
};

window.View = View;

