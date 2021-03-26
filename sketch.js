var ball, bgimg, hotair;
var database, position;

function preload(){
bgimg = loadImage("Ballon-01.png")
hotair = loadAnimation("Ballon-02.png", "Ballon-03.png", "Ballon-04.png")
}
function setup(){
    createCanvas(500,500);
    database = firebase.database();
    ball = createSprite(250,250,10,10);
    ball.addAnimation("hotaair", hotair);
ball.scale = 0.3;
    var locofchild = database.ref("ball/positions")
    locofchild.on("value", readOp, showerr)
    

}

function draw(){
    background(bgimg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref("ball/positions"). set({
x: ball.x + x, y: ball.y + y
})
}

function readOp(data){
position = data.val();
ball.x = position.x;
ball.y = position.y;
}

function showerr(){
console.log("error");
}