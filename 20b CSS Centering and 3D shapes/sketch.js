// CSS Centering and 3D shapes
// Grace Li
// April 15
//
// 

let angle = 5;

function setup() {
  createCanvas(500, 500, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(220);  // webgl has 0,0 at center, 
  //translate(90, 0, 400);//need to use translate() to shift center of object
  rotateX(-20);
  rotateY(frameCount);
  angle = map(mouseX, 0, width, -120, 120);
  for(let i = 0; i < 360; i += 45){
    push();
    rotateY(i);
    drawBox(30);
    pop();
  }
}

function drawBox(size){
  if(size < 3){
    rotateZ(angle);
    translate(size*1.5, 0);
    box(size);
    drawBox(size*0.8);
  }
}