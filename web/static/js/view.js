
var stage;
var ww;
var hh;

var player = { xx: 400, yy: 400 };
// An Ent is {xx, yy, aa, size, shape, color}

var ents = [
    {xx: 300, yy: 300, aa: 0, size: 50, shape: "square", color: "green"},
    {xx: 500, yy: 300, aa: 2, size: 50, shape: "square", color: "green"},
];

function setup() {
    $('canvas').bind('contextmenu', function (e) { return false; });
    
    stage = new createjs.Stage("vector-canvas");
    
    stage.addEventListener("click", function(ev) {
        if (ev.nativeEvent.button == 0) {
            gotLeftClick(ev.stageX, ev.stageY);
        }
        if (ev.nativeEvent.button == 2) {
            gotRightClick(ev.stageX, ev.stageY);
        }
    });
    
    stage.update();
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
   
    ents.forEach(drawEnt);

    drawPlayer();
    
    stage.update();
}

function gotLeftClick(xx, yy) {
    console.log("Left click: " + xx + "," + yy);
}

function gotRightClick(xx, yy) {
    console.log("Right click: " + xx + "," + yy);
    player.xx = xx;
    player.yy = yy;
    stage.update();
}

function gotEntClick(ent, xx, yy) {
    console.log("Ent click: ", ent);
}

function drawEnt(ent) {
    var x0 = player.xx - Math.floor(ww / 2);
    var y0 = player.yy - Math.floor(hh / 2);
    drawShape(ent, ent.xx - x0, ent.yy - y0);
}

function drawPlayer() {
    var pent = { shape: "circle", color: "blue", size: 50 };
    drawShape(pent, ww / 2, hh / 2);
}

function drawShape(ent, xx, yy) {
    console.log("draw at: " + xx + "," + yy);

    var cc = new createjs.Container();
    cc.x = xx;
    cc.y = yy;

    var shape = new createjs.Shape();
    if (ent.shape == "circle") {
        shape.graphics.beginFill(ent.color).drawCircle(0, 0, ent.size);
    }
    else {
        var sz = ent.size;
        shape.graphics.beginFill(ent.color).drawRect(-sz, -sz, 2*sz, 2*sz);
    }
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

export var View = {
    setup: setup,
    draw: draw,
};

window.View = View;

