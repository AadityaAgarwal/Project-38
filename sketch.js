var ghost, ghostImg;
var doorImg;
var tower, towerImg;
var  climberImg;
var sound;
var END=0;
var PLAY=1;
var gameState=1;
var doorGroup, BlockGroup, climberGroup;
var button;

function preload(){
  
  ghostImg= loadImage( "ghost-standing.png");
  doorImg= loadImage("door.png");
 towerImg= loadImage("tower.png");
  climberImg= loadImage("climber.png");
  //sound= loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
 tower= createSprite(300,300,600,600);
  tower.addImage(towerImg);
  tower.scale=1;
  
  ghost= createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  ghost.setCollider("circle",-10,0,100)
  //ghost.debug=true;
  
 
  
  doorGroup=createGroup();
  BlockGroup=c=createGroup();
  climberGroup=createGroup();
  
 //sound.loop();
}

function draw(){
  background("black");
  
 if(gameState===PLAY){
  tower.velocityY=10;
  
  if(tower.y>600){
    tower.y= tower.width/2;
  }
  
  if (keyDown("space")){
  ghost.velocityY= -10;
  }
  ghost.velocityY= ghost.velocityY+3;    
  
  if(keyDown("right")){
  ghost.velocityX= 3;
  }
  if(keyDown("left")){
  ghost.velocityX= - 3;
  }
  
  if(climberGroup.isTouching(ghost)){
  ghost.collide(climberGroup);
  }
   
  if(ghost.y>600 ||  BlockGroup.isTouching(ghost) || ghost.x>525 || ghost.x<75){
  ghost.destroy();
  gameState=END;
  }
  obstacles();
  drawSprites();
}
  if(gameState===END){
    fill("yellow");
    textSize(30);
    text("Game Over!", 300,300);
   // button=createButton('restart');
    //button.position(400,300);
  }
  
  //button.mousePressed({
    //gameState=PLAY
  //})
}
function obstacles(){
  
  if(frameCount%240===0){
    
   var door= createSprite(200,-50);
    var climber= createSprite(200,10);
    var invisibleBlock= createSprite(200,15);
    invisibleBlock.width= climber.width;
    invisibleBlock.height=4;
    
     door.x= Math.round(random(120,400));
    climber.x= door.x;
    invisibleBlock.x= door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY=1;
   climber.velocityY=1;
    invisibleBlock.velocityY=1;
    
    door.lifetime= 600;
    climber.lifetime=600;
    invisibleBlock.lifetime=600;
    
    invisibleBlock.debug=true;
    
    climber.setCollider("rectangle",0,0,climber.width,4)
   // climber.debug=true;
     
    ghost.depth=door.depth;
    ghost.depth= ghost.depth+1;
    
    doorGroup.add(door);
    BlockGroup.add(invisibleBlock);
    climberGroup.add(climber);
  }
}