
// View data:
// data = { 
//   player: { xx: Float, yy: Float, aa: Float },
//   ents: [
//     { id: Int, xx: Float, yy: Float, aa: Float, shape: "circle"|"square", size: Float }
//   ],
// }
// Coordinates are zone-relative, in meters.

var stage;

var player = { x: 400, y: 400 };
var dots   = [ [100, 100], [600, 600] ];

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

var circle;

function draw() {
    var div = $('#vector-game');
    var ww = div.innerWidth();
    var hh = window.innerHeight;

    stage.canvas.width  = ww;
    stage.canvas.height = hh;

    stage.removeAllChildren();

    var bg = new createjs.Shape();
    bg.graphics.beginFill("#f0f0f0").drawRect(0, 0, ww, hh);
    bg.x = 0;
    bg.y = 0;
    stage.addChild(bg);
    
    circle = new createjs.Shape();
    circle.graphics.beginFill("blue").drawCircle(0, 0, 50);
    circle.x = player.x;
    circle.y = player.y;
    circle.addEventListener("click", function(ev) {
        console.log(ev);
    });
    stage.addChild(circle);
    
    dots.forEach(function (ee) {
        var square = new createjs.Shape();
        square.graphics.beginFill("red").drawRect(0, 0, 50, 50);
        square.x = ee[0];
        square.y = ee[1];
        stage.addChild(square);
    });
    
    stage.update();
}

function gotLeftClick(xx, yy) {
    console.log("Left click: " + xx + "," + yy);
}

function gotRightClick(xx, yy) {
    console.log("Right click: " + xx + "," + yy);
    circle.x = xx;
    circle.y = yy;
    stage.update();
}

export var View = {
    setup: setup,
    draw: draw,
};

window.View = View;

