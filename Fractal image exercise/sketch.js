// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rotateAngle;

function setup() {
  createCanvas(500, 500, WEBGL);
  angleMode(DEGREES);
  rotateAngle = mouseX;
}

function draw() {
  background(220);
  //translate(90, 0, 300);
  drawBox(50);
}

function drawBox(w){
  if(w < 5){
    rotateZ(rotateAngle);
    box(w * 0.1);
  }
}



 
