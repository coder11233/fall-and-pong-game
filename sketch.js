var leftWall,rightWall,topWall, bottomWall;
var gameOver,restart;
var leftWallGroup,rightWallGroup;
var ball, ball_img;
var invisibleLeftEdge, invisibleRightEdge;

var PLAY = 1;
var END = 2;
var SERVE = 3;
var FPLAY = 4;
var F_OVER = 5;
var gameState = PLAY;
var wallSpeed=-2;

var score=0;

var footBall, boy, robot;
var fball, boyImg, bot;
var boyScore = 0;
var robotScore = 0;

function preload(){
  ball_img = loadImage("redBall.png");
  fball = loadImage ("fball.gif");
  boyImg = loadImage ("boy.gif");
  bot = loadImage ("robot.gif");
}

function setup() {
  createCanvas(400,500);

  ball=createSprite(200,100,10,10);
  ball.addImage(ball_img);
  ball.scale= 0.14;

  topWall=createSprite(200,0,400,5);
  topWall.visible= false;

  bottomWall = createSprite(200,500,400,5);
  bottomWall.visible = false;

  invisibleLeftEdge = createSprite(0,200,2,700);
  invisibleLeftEdge.visible = false;
  //invisibleLeftEdge.shapeColor = "black";

  invisibleRightEdge = createSprite(400,200,2,700);
  invisibleRightEdge.visible = false;
  //invisibleRightEdge.shapeColor = "black";

 leftWallGroup=new Group();
 rightWallGroup=new Group();

 ball.setCollider("circle", 0,0, 90);


  footBall = createSprite(200,250,10,10);
  //footBall.addImage(fball);
  footBall.scale = 1.5;

  boy = createSprite(365,250,10,70);
  //boy.addImage(boyImg);
  boy.scale = 3;

  robot = createSprite(35,250,10,70);
  //robot.addImage(bot);
  robot.scale = 3;
 
  footBall.visible= false;
  boy.visible= false;
  robot.visible= false;
  
}



function draw() {
  background(255)

  ball.collide(invisibleLeftEdge);
  ball.collide(invisibleRightEdge);
  // edges = createEdgeSprites();
  // ball.collide(leftEdge);
  // ball.collide(rightEdge);

  if(gameState===1){

    ball.velocityY = 4;
  if(keyDown(LEFT_ARROW)){
    ball.x -= 8;
  }

  if(keyDown(RIGHT_ARROW)){
    ball.x += 8;
  }
   spawnWalls();
   scoring();

   if(leftWallGroup.isTouching(ball)){
     ball.collide(leftWallGroup);
     ball.setVelocity(0,0);
   }
  
   if(rightWallGroup.isTouching(ball)){
    ball.collide(rightWallGroup);
    ball.setVelocity(0,0);
  }

  if(ball.isTouching(topWall)){
     
     score=leftWallGroup.length-8;
     alert( "Score : "+score);

     leftWallGroup.setVelocityYEach(0);
  rightWallGroup.setVelocityYEach(0);

  leftWallGroup.setLifetimeEach(-1);
  rightWallGroup.setLifetimeEach(-1);

  gameState=3;
  }
  drawSprites();
}

if(gameState===3){
  background(144,238,144);

  ball.visible= false;
  leftWallGroup.destroyEach();
  rightWallGroup.destroyEach();

  footBall.visible = true;
  boy.visible = true;
  robot.visible = true;

  //place info text in the center
  if (gameState === 3) {
    text("Press Space to Serve",150,180);
  }
  
  //display scores
  text(robotScore, 170,20);
  text(boyScore, 230,20);
  
  //make the player paddle move with the mouse's y position
  boy.y = mouseY;
  
  //AI for the computer paddle
  //make it move with the ball's y position
  robot.y = footBall.y;
  
  //draw line at the centre
  for (var i = 0; i < 500; i=i+20) {
    line(200,i,200,i+10);
  }
  
  //create edge boundaries
  //make the ball bounce with the top and the bottom edges
  //createEdgeSprites();
  
  if(footBall.isTouching(topWall)||footBall.isTouching(bottomWall)){
    //playSound("wall_hit.mp3");
  }
  
  footBall.bounceOff(topWall);
  footBall.bounceOff(bottomWall);
  footBall.bounceOff(boy);
  footBall.bounceOff(robot);
  
  //serve the ball when space is pressed
  if (keyDown("space") &&  gameState === 3) {
    gameState = 4;
  }

  drawSprites();
}

if(gameState===4){
  background(144,238,144);

ball.visible= false;
leftWallGroup.destroyEach();
rightWallGroup.destroyEach();

footBall.visible = true;
boy.visible = true;
robot.visible = true;

text(robotScore, 170,20);
  text(boyScore, 230,20);
  
  //make the player paddle move with the mouse's y position
  boy.y = mouseY;
  
  //AI for the computer paddle
  //make it move with the ball's y position
  robot.y = footBall.y;
  
  //draw line at the centre
  for (var i = 0; i < 500; i=i+20) {
    line(200,i,200,i+10);
  }

  footBall.bounceOff(topWall);
  footBall.bounceOff(bottomWall);
  footBall.bounceOff(boy);
  footBall.bounceOff(robot);

  serve();

//reset the ball to the centre if it crosses the screen
if(footBall.x > 400 || footBall.x <0) {
  //playSound("score.mp3");
  if(footBall.x > 400) {
    robotScore = robotScore + 1;
   }
  
  if(footBall.x < 0) {
    boyScore = boyScore + 1;
  }
  
  reset();
  gameState = 3;
}

drawSprites ();
}



if (boyScore === 5 || robotScore === 5){
  gameState = 5;
}

if(gameState === 5){
  background(144,238,144);

ball.visible= false;
leftWallGroup.destroyEach();
rightWallGroup.destroyEach();

footBall.visible = true;
boy.visible = true;
robot.visible = true;

text(robotScore, 170,20);
  text(boyScore, 230,20);
  
  //make the player paddle move with the mouse's y position
  boy.y = mouseY;
  
  //AI for the computer paddle
  //make it move with the ball's y position
  robot.y = footBall.y;
  
  //draw line at the centre
  for (var i = 0; i < 500; i=i+20) {
    line(200,i,200,i+10);
  }

  footBall.bounceOff(topWall);
  footBall.bounceOff(bottomWall);
  footBall.bounceOff(boy);
  footBall.bounceOff(robot);

  text("Game Over!",170,160);
  text("Press 'R' to Restart",150,180);

  if (keyDown("r") && gameState === 5) {
    gameState = 3;
    boyScore = 0;
    robotScore = 0;
  }
  drawSprites();
}

}
function spawnWalls(){
  
   
    if(frameCount%40===0){
      var randomWidth = random(50,300)
    leftWall= createSprite(randomWidth/2, 600, randomWidth,20);
    leftWall.shapeColor = "black";
    leftWall.velocityY = wallSpeed;
  
    rightWall=createSprite(randomWidth+40+(400-40-randomWidth)/2, leftWall.y, 400-40-randomWidth,20);
    rightWall.shapeColor = "black";
    rightWall.velocityY =leftWall.velocityY;


//Giving pipes lifetime.
//leftWall.lifetime= 350;
//rightWall.lifetime= 350;

// topPipe.depth=gameOver.depth;
// gameOver.depth=restart.depth;
// restart.depth=restart.depth+1;

// bottomPipe.depth=gameOver.depth;
// gameOver.depth=restart.depth;
// restart.depth=restart.depth+1;

//Creating food in between pipes at random positions.
// if(Math.round(random(1,6))%2===0){
// var food=createSprite(topPipe.x,randomHeight+random(20,170));
// food.addImage(foodImg);
// food.scale=0.2;
// food.velocityX=topPipe.velocityX;

// //Adding food in the food group.
// foodGroup.add(food);}

//Adding pipes in their groups.
leftWallGroup.add(leftWall);
rightWallGroup.add(rightWall);
}
 }


//}
// //Reset function.
// function reset(){
//   gameState=PLAY;
//   gameOver.visible = false;
//   restart.visible = false;
  
//    topPipeGroup.destroyEach();
//    bottomPipeGroup.destroyEach();
//    foodGroup.destroyEach();
  
//    bird.x=displayWidth/2-100;
//    bird.y=displayHeight/2;

//    score=0;
//    pipespeed=-4;
// }

//Creating a scoring function.
function scoring(){
//  for(var i=0;i<leftWallGroup.length;i++){
//    if(ball.y-leftWallGroup[i].y<=4 && ball.y-leftWallGroup[i].y>4+wallSpeed){

//     //Increasing score by 1 if bird travels in between the pipes.
//      score=score+1;
//    }
//    if(score%2===0)
//    {
//      wallSpeed=-2;
//      leftWallGroup.setVelocityYEach(wallSpeed);
//      rightWallGroup.setVelocityYEach(wallSpeed);
     
//    }
//  }
}

function serve() {
  footBall.velocityX = 3;
  footBall.velocityY = 4;
}

function reset() {
  footBall.x = 200;
  footBall.y = 250;
  footBall.velocityX = 0;
  footBall.velocityY = 0;
}
