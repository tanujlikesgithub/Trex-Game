var trex, trexRunning
var cloud, cloudImg, cloudsGroup
var ground, groundImg
var ob1, ob2, ob3, ob4, ob5, ob6, obGroup
var gameState, PLAY, END
var score = 0
var gameOver, gameOverImg
var restart, restartImg
var invisibleGround
var jump, die, check

function preload() {
trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png")
trexCollided = loadImage("trex_collided.png");
groundImg = loadImage("ground2.png"); 
cloudImg = loadImage("cloud.png");
gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");
ob1 = loadImage("obstacle1.png");
ob2 = loadImage("obstacle2.png");
ob3 = loadImage("obstacle3.png");
ob4 = loadImage("obstacle4.png");
ob5 = loadImage("obstacle5.png");
ob6 = loadImage("obstacle6.png");
jump = loadSound("jump.mp3")
die = loadSound("die.mp3");
check = loadSound("checkPoint.mp3");
}


function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,165,20,20);
  ground = createSprite(300,175,600,20);
  trex.addAnimation("t1" , trexRunning);
  trex.addAnimation("t2" , trexCollided);
  gameOver = createSprite(300,80,10,10);
  restart = createSprite(300,120,10,10);
  gameOver.addImage(gameOverImg);
  restart.addImage(restartImg);
  gameOver.visible = false;
  restart.visible = false;
  gameOver.scale = 0.5;
  restart.scale = 0.4;
  ground.addImage(groundImg);
  trex.scale = 0.4;
  ground.velocityX = -5;
  cloudsGroup = createGroup();
  obGroup = createGroup();
  PLAY=1;
  END=0;
  gameState = PLAY;
  trex.setCollider("rectangle", 0 ,0, trex.width, trex.height);
  invisibleGround = createSprite(300,175,600,5);
  invisibleGround.visible = false;
 
}

function draw() {
  background(255);
  if(gameState === PLAY){
      if(keyDown("space")&& trex.y>150){
   trex.velocityY = -12;
  jump.play();
  }
    
    if(score%100 === 0&& score >0){
     check.play(); 
    }
      if(ground.x<0){
   ground.x = ground.width/2; 
  }
    trex.velocityY += 1;
  spawnClouds();
  spawnObstacles();
    if(obGroup.isTouching(trex)){
     gameState = END; 
      die.play();
    }
  score = score + Math.round(getFrameRate()/60);
  }
  
  else if(gameState === END){
    trex.velocityY = 0;
    ground.velocityX = 0;
    obGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
  trex.changeAnimation ("t2");
  obGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
    gameOver.visible = true;
    restart.visible = true;
  }

if(mousePressedOver(restart)&&gameState === END){
  cloudsGroup.destroyEach();
  obGroup.destroyEach();
  restart.visible = false;
  gameOver.visible = false;
  score = 0;
  gameState = PLAY;
  trex.changeAnimation("t1"); 
}
  
  
  
  drawSprites();
  trex.collide(invisibleGround);
  textSize(18);
  textFont("Impact");
  fill("#555555");
  text("Score: " + score, 500,50);
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImg)
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 250;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,160,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
    switch(rand){
      case 1 : obstacle.addImage(ob1);
        break;
      case 2 : obstacle.addImage(ob2);
        break;
      case 3 : obstacle.addImage(ob3);
        break;
      case 4 : obstacle.addImage(ob4);
        break;
      case 5 : obstacle.addImage(ob5);
        break;
      case 6 : obstacle.addImage(ob6);
      obstacle.setCollider("rectangle", -20, 0, obstacle.width - 30, obstacle.height -10);
      break;
      default : break;
      
        
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 150;
    
    //add each obstacle to the group
    obGroup.add(obstacle);
    

  }
}