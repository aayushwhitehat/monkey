var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, ground
var survivalTime
var monkeysong;
var background,backgroundImage;
var gameoverImage,gameover;
var restart,restartImage;
var monkey_collided;
function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeyCollided=loadAnimation("monkey_collided.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
 
  
  backgroundImage=loadImage("backg.jpg");
  
  monkeysong=loadSound("monkey1.mp3");
  restartImage=loadImage("restart.png");

  gameoverImage=loadImage("gameOver.png");  
}



function setup() {
  createCanvas(670, 400);
  
 background = createSprite(0,0,600,600);
  background.addImage(backgroundImage);
  background.scale = 5
  
  score=0
  survivalTime=0
  
  ground=createSprite(0,400,1500,10)
  ground.visible=false;
   monkey=createSprite(90,370,10,10)
  monkey.addAnimation("monkey_running",monkey_running)
  monkey.scale=0.1
  
   FoodGroup= createGroup()
  obstacleGroup= createGroup()

  restart=createSprite(320,300)
  restart.addImage(restartImage)
  restart.visible=false

  gameover=createSprite(320,200,700,700);
  gameover.addImage(gameoverImage);
  gameover.visible=false;
  }
function draw() {
 background.velocityX = -3 
   if (background.x < 0){
      background.x = background.width/2;
    } 
    if(gameState === PLAY){
      gameover.visible = false;
       restart.visible = false;

    if(keyDown("space")&&monkey.y >= 350){
    monkey.velocityY=-10
    }
    ground.velocityX = -7 
 ground.x = ground.width/2;
    
 if(World.frameCount%200===0){
    fruits()
 }
  
  if(World.frameCount%300===0){
    stones()
 }
  
  if(monkey.isTouching(FoodGroup)){
     FoodGroup.destroyEach()
    score=score+1
    monkeysong.play();
      }
  monkey.velocityY = monkey.velocityY + 0.3
  monkey.collide(ground)

  if(monkey.isTouching(obstacle)){
        
       
    gameState = END;
  }
}
else if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
 
 
  monkey.changeAnimation("collided", monkey_collided);

 
 
  ground.velocityX = 0;
  monkey.velocityY = 0
  
 
  //set lifetime of the game objects so that they are never destroyed
obstacleGroup.setLifetimeEach(-1);
FoodGroup.setLifetimeEach(-1);
 
 obstacleGroup.setVelocityXEach(0);
 FoodGroup.setVelocityXEach(0); 

 //if(obstacleGroup.isTouching(monkey)){
   // ground.velocityX=0;
   // monkey.velocityX=0;
   // background.velocityX=0;
   // obstacleGroup.setVelocityXEach(0);
    //FoodGroup.setVelocityXEach(0);
   // obstacleGroup.setLifetimeEach(-1);
    //FoodGroup.setLifetimeEach(-1);  }

    monkey.collide(invisibleGround);
  
    if(mousePressedOver(restart)) {
        reset();
      }
  

  
    
  }
  
  
  
 
 drawSprites()
  fill("white") 
  text("Score: "+ score, 500,50);
  
  fill("black")
  var survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime,350,50)
  
}

function fruits(){
  banana=createSprite(670,Math.round(random(170,230)),10,10)
  banana.addImage(bananaImage)
  banana.scale=0.1
  banana.velocityX=-3
  FoodGroup.add(banana)
}

function stones(){
  obstacle=createSprite(670,380,10,10)
  obstacle.addImage(obstaceImage)
  obstacle.velocityX=-4
  obstacle.scale=0.2
  obstacleGroup.add(obstacle)
  
}


