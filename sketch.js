
var sword, swordimage, gameoverImg;

var fruitgroup, enemygroup, fruit, enemy;

var play = 1;
var end = 0;
var gamestate = play;

var fruit, fruit1, fruit2, fruit3, fruit4;
var alien1, alien2, monster;

var cuttingsound, gameoversound, direction;

var score = 0;

function preload()
{
  swordimage = loadImage("sword.png");
  gameoverImg = loadImage("gameover.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  alien1 = loadImage("alien1.png");
  alien2 = loadImage("alien2.png");
  
  cuttingsound = loadSound("knifeSwooshSound.mp3");
  gameoversound = loadSound("gameover.mp3");
}


function setup()
{
  //for creating the gaming area.
  createCanvas(400,400);
  
  //creating  the groups.
  fruitgroup = createGroup();
  enemygroup = createGroup();
  
  //creating the sword.
  sword = createSprite(40,200,20,20);
  
}

  
function draw()
{
  
  background("pink");
  
  
  if(gamestate===play)
  {
   
    sword.addImage(swordimage);
    sword.scale = 0.8;
    
    sword.x = mouseX;
    sword.y = mouseY;
    
    fruits();
    enemy();
    
    if(fruitgroup.isTouching(sword))
    {
      fruitgroup.destroyEach();
      cuttingsound.play();
      score = score+1;
    }
    
    if(score==10)
    {
      monster.velocityX = -20;
    }
    
    
    if(enemygroup.isTouching(sword))
    {
      gamestate = end;
      gameoversound.play();
    }
  }
  
  
  if(gamestate===end )
  {
    
    fruitgroup.destroyEach();
    enemygroup.destroyEach();
    
    fruit.velocityX = 0;
    enemy.velocityX = 0;
    
    sword.x = 200;
    sword.y = 200;
    
   
    sword.addImage(gameoverImg);
  }
  
  
  fill("black");
  textSize(20);
  text("SCORE : "+ score,250,25);
  
  
  drawSprites(); 
}


function fruits()
{
  
  if(frameCount%80===0)
  {
    fruit = createSprite(400,200,20,20);
    
    direction = Math.round(random(1,2));
    
    if(direction==1)
    {
      fruit.x = 400;
      fruit.velocityX = -(7+(score/4));
    }
    
    else if(direction==2)
    {
      fruit.x = 0;
      fruit.velocityX = (7+(score/4));
    }
    
    var num = Math.round(random(1,4));
    
    if(num == 1)
    {

      fruit.addImage(fruit1);

    }

    else if(num == 2)
    {

      fruit.addImage(fruit2);

    }

    else if(num == 3)
    {

      fruit.addImage(fruit3);

    }

    else
    {

      fruit.addImage(fruit4);

    }
   
    fruit.y = Math.round(random(50,340));
    
    fruit.scale = 0.2;
    
    fruit.lifetime = 100;
    
    fruitgroup.add(fruit);
  
  }  
}

function enemy()
{
  if(frameCount%200===0)
  {
     
    monster = createSprite(450,200,20,20);
    
    var n = Math.round(random(1,2));
    
    if(n==1)
    {
      monster.addImage(alien1);
    }
    
    if(n==2)
    {
      monster.addImage(alien1);
    }
    
    monster.velocityX=-(10+score/10);
    monster.lifetime = 150;
    
   
    enemygroup.add(monster);
    
  }

}

