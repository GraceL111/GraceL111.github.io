// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const wSnow = 40;
const hSnow = 40;

let mappedFrameCount;
let randomAngle;
let anglesList = [];
let numSnow = 0;

function setup() {
  createCanvas(500, 500, WEBGL);
  angleMode(DEGREES);
  for(let i = 0; i < 5; i++){
    randomAngle = floor(random(0, 360));
    anglesList.push(randomAngle);
  }
}

function draw() {
  background(220);
  translate(-130, 0, 100);
  rotateY(frameCount);
  //drawSnow(wSnow, hSnow);
  drawMoreSnow();
}

function drawSnow(w, h){
  if(w > 5){
    for(let i = 0; i < anglesList.length;i++){
      plane(w,h);
      rotateZ(i);
      //rotateX(i);
      drawSnow(w*0.5, h*0.5);
    }
  }
}

function drawMoreSnow(){
  if(numSnow < 100){
    translate(w*0.5, h*0.5, 30);
    drawSnow(wSnow, hSnow);
  }
}



 
