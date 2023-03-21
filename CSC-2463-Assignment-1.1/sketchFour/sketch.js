function setup() {
  createCanvas(400, 400);
}

function draw() {
  background('#000081');

  stroke('#ffffff');
  strokeWeight(5);
  
  fill('#008000');
  circle(200,200, 200);


  fill('#ff0000');
  beginShape(TESS);
  vertex(200,100);
  vertex(220,165);
  vertex(295,167);
  vertex(235,215);
  vertex(260,280);
  vertex(200,245);
  vertex(140,280);
  vertex(165,215);
  vertex(105,167);
  vertex(180,165);
  endShape(CLOSE);
}
