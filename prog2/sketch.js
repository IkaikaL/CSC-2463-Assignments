let currentColor, red, orange, yellow, green, lightBlue, blue, pink, brown, white, black;

function setup() {
  createCanvas(800, 800);
  background(200);
  currentColor = 0;
  red = new colors(0, "#ea412c");
  orange = new colors(50, "#ef8734")
  yellow = new colors(100, "#fff84a");
  green = new colors(150, "#77f23b");
  lightBlue = new colors(200, "#74f9fc");
  blue = new colors(250, "#0044f7");
  pink = new colors(300, "#e95dfa");
  brown = new colors(350, "#774315");
  white = new colors(400, "#ffffff");
  black = new colors(450, "#000000");
}

function draw() {
  if(mouseIsPressed){
    drawing();
  }
  red.appear();
  red.onMousePressed();
  orange.appear();
  yellow.appear();
  green.appear();
  lightBlue.appear();
  blue.appear();
  pink.appear();
  brown.appear();
  white.appear();
  black.appear();
}

class colors {
  constructor(colorOption, color){
    this.x = 0;
    this.y = colorOption;
    this.w = 50;
    this.h = 50;
    this.color = color;
  }
  appear() {
    push();
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
  onMousePressed(){
    if(mouseIsPressed){
      if(mouseX < 50){
        if(mouseY > 0 && mouseY < 50){
          currentColor = "#ea412c";
        }
        else if(mouseY > 50 && mouseY < 100){
          currentColor = "#ef8734";
        }
        else if(mouseY > 100 && mouseY < 150){
          currentColor = "#fff84a";
        }
        else if(mouseY > 150 && mouseY < 200){
          currentColor = "#77f23b";
        }
        else if(mouseY > 200 && mouseY < 250){
          currentColor = "#74f9fc";
        }
        else if(mouseY > 250 && mouseY < 300){
          currentColor = "#0044f7";
        }
        else if(mouseY > 300 && mouseY < 350){
          currentColor = "#e95dfa";
        }
        else if(mouseY > 350 && mouseY < 400){
          currentColor = "#774315";
        }
        else if(mouseY > 400 && mouseY < 450){
          currentColor = "#ffffff";
        }
        else if(mouseY > 450 && mouseY < 500){
          currentColor = "#000000";
        }
      }
    }
  }
}

function drawing() {
  push();
  stroke(currentColor);
  strokeWeight(10);
  line(pmouseX, pmouseY, mouseX, mouseY);
  pop();
}