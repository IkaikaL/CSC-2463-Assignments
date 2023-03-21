function setup() {
  createCanvas(400, 200);
}

function draw() {
  background('black');

  noStroke();
  fill('#fff84a');
  arc(100, 100, 150, 150, 4, 2.5);

  fill('#ea412c');
  arc(300, 100, 150, 150, PI , TWO_PI);
  rect(225, 100, 150, 70);

  fill('#ffffff');
  circle(260,100,50);
  circle(340,100,50);

  fill('#0044f7');
  circle(260,100,30);
  circle(340,100,30);
}
