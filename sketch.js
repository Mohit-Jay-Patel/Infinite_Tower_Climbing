var ghost_img,ghost;
var climber_img,climber;
var door_img,door;
var tower_img,tower;
var door_group,climber_group,ground_group;
var invisible_ground;
var game_state = "play";
var score = 0;
var flag = true;

function preload(){
  climber_img = loadImage("climber.png");
  door_img = loadImage('door.png');
  tower_img = loadImage('tower.png');
  ghost_img = loadImage('ghost-standing.png');
  

}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300,100);
  tower.addImage(tower_img);
  tower.velocityY = 2;
  
  ghost = createSprite(300,500);
  ghost.addImage(ghost_img);
  ghost.scale = 0.35;
  
  door_group = new Group();
  climber_group = new Group();
  ground_group = new Group();


}

function draw() {
  background(200);
  
  
  if(game_state == "play"){
  
  if(tower.y > 565){
   tower.y=300;
  }
  if(keyDown('space')){
    ghost.velocityY = -6 ;
    flag = true;
  }
  if(keyDown('right_arrow')){
    ghost.x += 3;
  }
  if(keyDown('left_arrow')){
    ghost.x -= 3;
  }
  if(ghost.isTouching(climber_group)){
    ghost.velocityY = 0;
    if(flag){
      score += 100;
      flag = false;
    }
  }
  if(ghost.isTouching(ground_group)){
    ghost.destroy();
    game_state = "over";

  }
  
  ghost.velocityY += 0.5 ;

  spawn_door_climber();
  drawSprites();
  fill("white");
  textSize(25);
  text("Score : "+score,450,100);
 

  }
else{
  background('aqua')
  fill("red");
  textSize(60);
  text("GameOver",150,300);
}
 

}
function spawn_door_climber(){
if(frameCount % 200 == 0){
  door = createSprite(300,0);
  door.addImage(door_img);
  door.x = Math.round(random(150,475));

  climber = createSprite(door.x,52);
  climber.addImage(climber_img);
  climber.scale  = 0.9;
  invisible_ground = createSprite(door.x,59,climber.width,8);
  invisible_ground.visible = false;


  door.lifetime = 500;
  climber.lifeTime = 500;

  door_group.add(door)
  climber_group.add(climber);
  ground_group.add(invisible_ground);


  door.depth = ghost.depth;
  ghost.depth += 1;

  climber.velocityY = 2;
  door.velocityY = 2;
  invisible_ground.velocityY = 2;


} 
}