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
  rotateY(frameCount);
  rotateX(frameCount);


  drawSnow(wSnow, hSnow, 10);
}

function drawSnow(w, h, depth){
  if(depth > 0){
    for(let i = 0; i < anglesList.length;i++){
      push();
      plane(w,h);
      rotateZ(anglesList[i]);


      drawSnow(w*0.5, h*0.5);
      pop();
    }
  }
}




 
