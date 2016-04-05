
var stage;
var ww;
var hh;

var player = { xx: 400, yy: 400 };
var mouse  = { xx: 0, yy: 0 };
var cursor = { xx: 0, yy: 0 };
// An Ent is { xx, yy, aa, size, color }

var ents = [
    { xx: 300, yy: 300, aa: 0, size: 50, color: "green" },
    { xx: 500, yy: 300, aa: 2, size: 50, color: "orange" },
];

// Coordinates are in zone coordinates.
function point(xx, yy) {
    return { xx: xx, yy: yy };
}

function zone2view(pt) {
    var x0 = player.xx - Math.floor(ww / 2);
    var y0 = player.yy - Math.floor(hh / 2);
    return point(pt.xx - x0, pt.yy - y0);
}

function view2zone(pt) {
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
        mouse.xx = evt.stageX;
        mouse.yy = evt.stageY;
        draw();
    });

    draw();
}

var icon;

function draw() {
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
    var mpos = view2zone(mouse);
    text.font = "16px Play";
    text.text = "Mouse @ " + mouse.xx + "," + mouse.yy + "; zone = " + mpos.xx + "," + mpos.yy;
    text.x = 100;
    text.y = 100;
    stage.addChild(text);

    ents.forEach(drawEnt);

    drawPlayer();
    drawCursor();
    
    stage.update();
}

function gotLeftClick(xx, yy) {
    cursor = view2zone(point(xx, yy));
    draw();
}

function gotRightClick(xx, yy) {
    var coords = view2zone(point(xx, yy));
    player.xx = coords.xx;
    player.yy = coords.yy;
    draw();
}

function gotEntClick(ent, xx, yy) {
    console.log("Ent click: ", ent);
}

function drawEnt(ent) {
    drawCircle(ent);
}

function drawPlayer() {
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

function drawCursor() {
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

