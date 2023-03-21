let spriteSheetGuy;
let spriteSheetWoman
let walkingAnimation;

function preload() {
  spriteSheetGuy = loadImage('SpelunkyGuy.png');
  spriteSheetWoman = loadImage('SpelunkyWoman.png');
}

function setup() {
  createCanvas(400, 480);
  imageMode(CENTER);
  walkingAnimationGuy = new SpriteAnimation(spriteSheetGuy, 80, 80, 200, 200, 9);
  walkingAnimationWoman = new SpriteAnimation(spriteSheetWoman, 80, 80, 300, 200, 9);
}

function draw() {
  background(220);
  walkingAnimationGuy.draw();
  walkingAnimationWoman.draw();
}

function keyPressed(){
  walkingAnimationGuy.keyPressed();
  walkingAnimationWoman.keyPressed();
}

function keyReleased(){
  walkingAnimationGuy.keyReleased();
  walkingAnimationWoman.keyReleased();
}

class SpriteAnimation {
  constructor(sheet, width, height, x, y, length) {
    this.sheet = sheet;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.u = 0;
    this.v = 0;
    this.length = length;
    this.currentFrame = 0;
    this.moving = 0;
    this.xDirection = 1;
  }

  draw () {
    this.u = (this.moving != 0) ? this.currentFrame % this.length : 0;
    push();
    translate(this.x, this.y);
    scale(this.xDirection, 1);
    image(this.sheet, 0, 0, this.width, this.height, this.u * this.width, this.v * this.height, this.width, this.height);
    pop();
    if (frameCount % 6 == 0) {
      this.currentFrame++;
    }
    this.x += this.moving;
  }

  keyPressed() {
    if (keyCode === RIGHT_ARROW) {
      this.moving = 1;
      this.xDirection = 1;
      this.currentFrame = 1;
    }
    else if (keyCode === LEFT_ARROW) {
      this.moving = -1;
      this.xDirection = -1;
      this.currentFrame = 1;
    }
  }

  keyReleased() {
    if(keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW){
      this.moving = 0;
    }
  }
}