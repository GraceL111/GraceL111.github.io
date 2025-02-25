// Interactive Scene
// Grace Li
// Feb 11 2025
// This interactive scene is based in space, with 3 backgrounds, 
// and many key features including an interactive character (rocket) and background interactions. 

// Global Variable Declaration:
let randomDotX;
let randomDotY;
let star;
let oneShape = true; 
let numStars = 0;
let starPosX = [];
let starPosY = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  generateStar();
}


function draw() {
  background(65, 74, 76);
  drawMars();
  drawMoon();
  drawStar();
  rocket();
  
 


}





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
  while(numStars < 20){       // storing random positions so to print consistent    // star positions after each background refresh 
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
