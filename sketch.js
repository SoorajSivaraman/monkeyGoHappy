var r, monkey , monkey_running, invisibleGround, gameOverMonkey;
var banana ,bananaImage, obstacle, obstacleImage1, obstacleImage2,     obstacleImage3, cryingMonkeyImg;
var bgrd1, bgrd2, bgrdImg;
var score = 0; 
var survivalTime = 0;
var bananasGroup, obstaclesGroup;
var gameState = "play";
let bananaCollectSound, gameOverSound, jumpSound, rockHitSound;

function preload()
{ 
 soundFormats('mp3','wav'); 
 bananaCollectSound = loadSound("bananaCollect.wav");
 gameOverSound = loadSound("FunkyAudioLogo2.mp3");
 jumpSound = loadSound("monkeyLaugh.wav");
 rockHitSound = loadSound("explosion.wav"); 
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage1 = loadImage("rock.png");
  obstacleImage2 = loadImage("spikyPlant.png");
  obstacleImage3 = loadImage("snake2.png");
  bgrdImg = loadImage("background.jpg");
  cryingMonkeyImg = loadImage("cryingMonkey.jpg");
}

function setup() 
{
  createCanvas(400, 400);
  bananasGroup = createGroup();
  obstaclesGroup = createGroup();
  
  bgrd1 = createSprite(200, 200, 400, 10);
  bgrd1.addImage(bgrdImg);
  bgrd1.scale = 0.55;
  bgrd1.velocityX = -10; 
  
  bgrd2 = createSprite(600, 200, 400, 10);
  bgrd2.addImage(bgrdImg);
  bgrd2.scale = 0.55;
  bgrd2.velocityX = -10;
  
  monkey = createSprite(80, 360, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.11;
  
  invisibleGround = createSprite(200, 360, 400, 10);
  invisibleGround.visible = false;
  
  gameOverMonkey = createSprite(200, 80, 400, 10);
  gameOverMonkey.addImage(cryingMonkeyImg);
  gameOverMonkey.scale = 0.12;
  gameOverMonkey.visible = false;
}

function draw() 
{
  if(gameState === "play")
  {
  createBananas();
  createObstacles();
  
  if(bgrd2.x === 200) 
  {
  bgrd1.x = 600;
  }  
  if(bgrd1.x === 200) 
  {
  bgrd2.x = 600;
  }
  if(keyDown("space") && monkey.y > 320)
  {
    jumpSound.play();
    monkey.velocityY = -17;
  }  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(invisibleGround);
  if(monkey.isTouching(bananasGroup))
  {
    bananaCollectSound.play();
    score = score + 1;
    bananasGroup.destroyEach();
  }
    
  if(monkey.isTouching(obstaclesGroup)) 
  {
    rockHitSound.play();
    gameOverSound.play();
    gameState = "end";
  }  
  } 
  if(gameState === "end")
  {
    background("lightblue");
    monkey.destroy();
    bgrd1.destroy();
    bgrd2.destroy();
    invisibleGround.destroy();
    bananasGroup.destroyEach();
    obstaclesGroup.destroyEach();
    gameOverMonkey.visible = true;
    fill("maroon");
    textSize(20);
    textFont("Lucida Calligraphy");
    text("Game Over !!", 125, 175);
    text("You have survived for " + survivalTime + " seconds !", 25, 225);
    text("You have Eaten " + score + " Bananas !", 50, 275);
  }  
  drawSprites();
  
    
  
  if(gameState === "play")
  {  
  fill("maroon");
  textSize(15);
  textFont("Segoe Print");  
  text("Bananas Eaten: " + score, 20, 20);
  survivalTime = Math.ceil(frameCount/frameRate());  
  text("Survival Time: " + survivalTime, 250, 20); 
  }  
}
function createBananas()
{
  if(World.frameCount % 80 === 0)
  {
    banana = createSprite(400, 100, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.075;
    banana.y = Math.round(random(130, 250));
    banana.velocityX = -8;
    banana.lifetime = 50;
    bananasGroup.add(banana);
  }  
}
function createObstacles()
{
  r = Math.round(random(1, 3));
  if(World.frameCount % 100 === 0)
  {
    obstacle = createSprite(400, 335, 20, 20);
    obstacle.scale = 0.04;
    if(r === 1) obstacle.addImage(obstacleImage1);
    else if(r === 2) 
    {obstacle.addImage(obstacleImage2);
     obstacle.scale = 0.35;
    }
    else
    {
      obstacle.addImage(obstacleImage3);
      obstacle.scale = 0.15;
    }
    obstacle.velocityX = -10;
    obstacle.lifetime = 100;
    obstaclesGroup.add(obstacle);
  }  
}