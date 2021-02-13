var helper, helper_running, helper_idle;
var boy, boy_running, boy_dead, boy_idle;
var boss, boss_running, boss_idle;
var gameState = 0;
var word1, word1Image, word2, word2Image;
var glass, glassImage;
var food, foodImage;
var livingRoomBG;
var button, buttonImage, button2;

function preload(){
  boy_idle = loadAnimation("People/boy_idle.png");
  boy_running = loadAnimation("People/walk1.png" , "People/walk2.png" , "People/walk3.png" , "People/walk4.png");
  boy_dead = loadAnimation("People/dead1.png" , "People/dead2.png" , "People/dead3.png");

  boss_running = loadAnimation("People/run1.png" , "People/run2.png" , "People/run3.png" , "People/run4.png");
  boss_idle = loadAnimation("People/boss_idle.png");

  helper_running = loadAnimation("People/Hwalk1.png" , "People/Hwalk2.png" , "People/Hwalk3.png" , "People/Hwalk4.png" , "People/Hwalk5.png");
  helper_idle = loadImage("People/helper_idle.png");

  kitchenBG = loadImage("BG Images/kitchen_room_background.jpg");
  livingroomBG = loadImage("BG Images/living_room_background.jpg");

  word1Image = loadImage("text/text1.png");

  word2Image = loadImage("text/text2.png");

  glassImage = loadImage("Items/water_glass.png");

  foodImage = loadImage("Items/food0.png");

  buttonImage = loadImage("text/arrow.png");
}

function setup() {
  createCanvas(800,800);

  boy = createSprite(650, 600, 10, 10);
  boy.addAnimation("idle" , boy_idle);
  boy.addAnimation("running" , boy_running);
  boy.scale = 0.7;
  boy.visible = false;

  boss = createSprite(0,600,10,10);
  boss.addAnimation("Bidle", boss_idle);
  boss.scale = 0.7;
  boss.visible = false;

  glass = createSprite(700,400,10,10);
  glass.visible = false;

  food = createSprite(580, 600, 20,20);
  food.addImage(foodImage);
  food.scale = 0.2;
  food.visible = false;


  edges = createEdgeSprites()

  boss.debug = true;

  boy.setCollider('rectangle', 0,0, 20, 40);

}

function draw() {
  background(0,0,0); 

  boy.bounceOff(edges);

  boy.changeAnimation("idle" , boy_idle);
  
  
  if(gameState == 0){
    fill("red") 
    textSize(30);
    text("The Temper Game", 200,50);
    fill("blue")
    textSize(20);
    text("A boy started his first job to meet this bossy person who made him get him all these things.", 0,150);
    text("Two years later they both got fired, but the bossy person still bosses the boy around.", 10,180);
    text("Now you will be in the boy's shoes, getting items for the bossy person.", 70,210);
    text("DON'T GET MAD", 200, 240);
    text("Press space to start.", 250,400)
  }

  if(keyDown("space") && gameState == 0){
    gameState = 1;
    boy.visible = true;
    boss.visible = true;
    glass.visible = true;
  }

  if(gameState == 1){
    background(kitchenBG);
    boss.changeAnimation("running", boss_running);
    boss.velocityX = + 6;
    glass.addImage(glassImage);
    glass.scale = 0.2;
  }

  if(gameState == 1 && boy.isTouching(glass)){
    glass.x = boy.x;
    glass.y = boy.y;
  }

  if(glass.isTouching(boss)){
    glass.destroy();
    gameState = 2;
    word1.visible = false;
  }

  if(gameState == 1 && boss.x == 300){
    boss.velocityX = 0;
    fill("black");
    word1 = createSprite(370,350,10,10);
    word1.addImage(word1Image);
    word1.lifetime = 200;
  }

  if(gameState == 2){
    background(kitchenBG);
    boss.velocityX = 0
    word2 = createSprite(370,350,10,10);
    word2.addImage(word2Image);
    word2.lifetime = 100;
    button = createSprite(75,200,20,20);
    button.addImage(buttonImage);
    button.scale = 0.4;

    if(mousePressedOver(button)){
      gameState = 3;
    }
  }

  if(gameState == 3){
    background(livingroomBG);
    boss.visible = false;
    food.visible = true;
    if(boy.isTouching(food)){
      food.x = boy.x;
      food.y = boy.y;
    }
    button2 = createSprite(75,200,20,20);
    button.addImage(buttonImage);
    button.destroy();
  }

  if(gameState == 4){
    background(kitchenBG);
    boss.visible = true;
  }


  if(keyDown("up")){
    boy.changeAnimation("running", boy_running);
    boy.y = boy.y - 5
  }

  if(keyDown("down")){
    boy.changeAnimation("running", boy_running);
    boy.y = boy.y + 5;
  }

  if(keyDown("right")){
    boy.changeAnimation("running", boy_running);
    boy.x = boy.x + 5;
  }

  if(keyDown("left")){
    boy.changeAnimation("running", boy_running);
    boy.x = boy.x - 5;
  }



  drawSprites();
}