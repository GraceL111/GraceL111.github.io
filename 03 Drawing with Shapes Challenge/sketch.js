// 03 Drawing with Shapes Challenge
// Grace Li
// Date: Feb 10


//Global Variable Declarations
let cenX;
let cenY;
let diameter = 100;
let radius;
let eyePos;
let eyePositionX;
let eyePositionY;
let eyeRadius;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawCharacter();
 // drawBox();
}

function drawCharacter(){
  // the underlining system, draw an alien 
  cenX = width/2;
  cenY = height/2;
  radius = diameter/2;
  eyePos = radius/2;
  fill(23, 233, 46);
  //Head:
  circle(cenX, cenY, diameter);
  //Body:
  rect(cenX - radius, cenY, diameter, diameter);
  // Left eye:
  fill(0, 0, 0);
  circle(cenX - eyePos, cenY, 10);
  // Right eye:
  circle(cenX + eyePos, cenY,10);
//                Set the diameter of eye into a variable
  eyeRadius = 
  eyePositionX = cenX - eyePos;
  eyePositionY = cenX + eyePos;

  line()
}




function drawBox(){
  //draw box on screen
  fill(23,233,45)
  rect(boxX, boxY, 50, 30, 5, 5, 0, 0);
  rect(boxX, boxY - 50, 30);

}

function keyPressed(){
  if(key === "a"){
    boxX = 0;
  }
  if(key === "b"){
    boxY = 400;
  }
  if(keyCode === ESCAPE){
    boxX = width *  0.85; // 85 percent across the screen
    boxY = height * 0.6; // 60 percent down the screen
  }
}
