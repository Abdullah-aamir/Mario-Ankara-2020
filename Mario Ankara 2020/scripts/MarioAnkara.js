//taking elements from html
var cvs = document.getElementById("canvas");
var btn=document.getElementById("btn");
var ctxt = cvs.getContext("2d");

//creating objects
var mario = new Image();
var bg = new Image();
var gd  = new Image();
var crn = new Image();
var stz = new Image();
var gOver = new Image();
var jump = new Audio();
var die = new Audio();
var double = new Audio();

//sourcing files
mario.src = "images/mario.png";
bg.src  = "images/bg.jpg";
gd.src  = "images/gd.png";
crn.src  = "images/corona.png";
stz.src  = "images/sanitizer.png";
gOver.src = "images/game_over.png";
jump.src = "sounds/jump.wav";
double.src = "sounds/double.wav";
die.src = "sounds/die.wav";

//some variables
var mx= 10;
var my= 280;
var gravity = 7;
var score = 0;
var rndNo = 0;
var easy = 10;


//on pressing a key
document.addEventListener("keydown",moveUp);
btn.addEventListener("click",draw);

function moveUp(){
    if (my>=280)
    my-=200;
    jump.play();
}

// Obstacle Coordinates
var obstacles = [];

obstacles[0] = {
    ox : cvs.width,
    oy : cvs.height-170
}

//draw function
function draw(){
    btn.disabled=true;
    ctxt.drawImage(bg,0,0);
    ctxt.drawImage(gd, 0,cvs.height-gd.height);
    ctxt.drawImage(mario, mx,my);
    for (var i = 0; i < obstacles.length; i++){
        if(rndNo<60)
        ctxt.drawImage(crn, obstacles[i].ox, obstacles[i].oy)
        else
        ctxt.drawImage(stz, obstacles[i].ox, obstacles[i].oy)
        obstacles[i].ox -=easy;

        if(obstacles[i].ox == -100){
            rndNo = Math.floor(Math.random()*100);
            obstacles.push({
            ox : cvs.width,
            oy : cvs.height-170
        });
        }
    
        //collision detection
        if (mx + mario.width >= obstacles[i].ox && obstacles[i].ox + crn.width >= mx && obstacles[i].oy <= my + mario.height && my <= obstacles[i].oy + crn.height && rndNo<60){
            die.play();
            ctxt.fillStyle = "#000";
            ctxt.font = "15px Verdana";
            ctxt.fillText("Score: "+score,10,cvs.height-20);
            ctxt.fillText("Corona Kills from a distance!",10,20);
            ctxt.drawImage(gOver, 180, 120);
            btn.innerHTML = "Start Over";
            btn.disabled=false;
            btn.addEventListener("click",reld);
            return 1;
        }
        else if(mx + mario.width == obstacles[i].ox && obstacles[i].oy <= my + mario.height && my <= obstacles[i].oy + crn.height && rndNo>=60){
            score+=2;
            double.play();
        }
        // If no collision occurs
        if(obstacles[i].ox == 0 && rndNo<60){
            score++;
        }
    }

    //jump
    if (my<=280)
    my += gravity;

    // text and score display
    ctxt.fillStyle = "#111";
    ctxt.font = "15px Verdana";
    ctxt.fillText("Score: "+score,10,cvs.height-20);
    ctxt.fillText("Keep Mario away as far as possible from Corona and don't forget to take the sanitizer!!",10,20);

    requestAnimationFrame(draw);
}

//reload for replay
function reld(){
    location.reload();
}