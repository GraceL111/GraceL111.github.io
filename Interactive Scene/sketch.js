// Interactive Scene
// Grace Li
// Feb 11 2025
// This interactive scene is based in space, with 3 backgrounds, 
// and many key features including an interactive character (rocket) and background interactions. 

// Global Variable Declaration:
let randomDotX;
let randomDotY;
let star;
let ufo;
let numStars = 0;
let starPosX = [];
let starPosY = [];
let backgroundColour = 74;
let xValue;
let yValue;



function setup() {
  createCanvas(windowWidth, windowHeight);
  generateStar();
  xValue = width/2;
  yValue = height/2;
}


function draw() {
  background(65, backgroundColour, 76);
  createUFO();
  textSize(30);
  fill(500);
  text('Grace', 0 + 15, height - 15);
  drawMars();
  drawMoon();
  drawStar();
  rocket();
  
 


}



//      ------------Background--------

function drawMoon(){
  fill(128, 137, 142);
  circle(width - 100, height - 60, 600);
  fill(	80, 80, 80);
  noStroke();
  circle(width/1.2, height/1.2, 40);
  circle(width/1.1, height/1.1, 50);
  circle(width/1.5, height/1.1, 45);
  circle(width/1.4, height/1.3, 42);
  circle(width/1.034, height/1.4, 50);
}

function drawMars(){
  fill(211, 150, 103);
  noStroke();
  circle(0 + 150, 0 + 100, 100);

}
function drawStar(){
  stroke(249, 243, 100);
  strokeWeight(5);
  for(let i = 0; i < starPosX.length; i++){
    point(starPosX[i], starPosY[i]);
  }
}
function generateStar(){               
  while(numStars < 20){       
    // storing random positions so to print consistent star 
    // positions after each background refresh 
    randomDotX = random(0, width - 100);
    randomDotY = random(0, height - 60);
    starPosX.push(randomDotX); 
    starPosY.push(randomDotY);
    numStars ++; 
  }
}



// -----------Interactive Character-----------
function rocket(){
  noStroke();
  fill('white');
  triangle(mouseX, mouseY - 15, mouseX - 15, mouseY, mouseX + 15, mouseY);
  square(mouseX - 15, mouseY, 30);
  rect(mouseX - 15, mouseY + 30, 8, 20);
  rect(mouseX + 7, mouseY + 30, 8, 20);
  fill('black');
  noStroke();
  circle(mouseX, mouseY + 8, 15);

}


// ---------Mouse Interaction -------------
function mousePressed(){
  for(let w = 0; w < 5; w++){
    backgroundColour += 8;
    background(65, backgroundColour, 76);
  }
  if(backgroundColour > 265){
    backgroundColour = 74;
  }
}


function createUFO(){
  fill(65, 265, 76);
  arc(xValue, yValue, 100, 100, PI, HALF_PI - HALF_PI);
  if(keyIsDown(LEFT_ARROW) === true){
    xValue -= 5;
  }
  if(keyIsDown(RIGHT_ARROW) === true){
    xValue += 5;
  }
  if(keyIsDown(UP_ARROW) === true){
    yValue -= 5;
  }
  if(keyIsDown(DOWN_ARROW) === true){
    yValue += 5;
  }


  arc(xValue, yValue, 100, 100, PI, HALF_PI - HALF_PI);
  ellipse(xValue, yValue, 130, 30);
  fill('black');
  circle(xValue - 34, yValue, 15);
  circle(xValue, yValue, 15);
  circle(xValue + 34, yValue, 15);
}


