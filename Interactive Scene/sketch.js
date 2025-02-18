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


function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i <= 20; i++){
    drawStar();
  }
}


function draw() {
  background(65, 74, 76);
  drawEarth();
  drawMoon();
  if(numStars <= 20){
    drawStar();
    numStars ++; 
  }
  else{
    break;
  }
  

  // if(oneShape === true){
  //   rocket();
  //   oneShape = false;                                              
  // }
  // else{
  //   oneShape = true; 
  // }
  
 


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

function drawEarth(){
  fill(70, 215, 235);
  noStroke();
  circle(0 + 150, 0 + 100, 100);
  // Use green curved lines if possible

}
function drawStar(){               
  randomDotX = random(0, width - 100);
  randomDotY = random(0, height - 60);
  stroke(249, 243, 100);
  strokeWeight(5);
  point(randomDotX, randomDotY);
}



// -----------Interactive Character-----------
function rocket(){
  fill('white');
  triangle(mouseX, mouseY - 15, mouseX - 15, mouseY, mouseX + 15, mouseY);
  // square(width/2 - 15, height/2, 30);
  // rect(width/2 - 15, height/2 + 30, 8, 20);
  // rect(width/2 + 7, height/2 + 30, 8, 20);
  // fill('black');
  // circle(width/2, height/2 + 8, 15);

}
