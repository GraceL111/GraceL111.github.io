// Interactive Scene
// Grace Li
// Feb 11 2025

// - describe what you did to take this project "above and beyond"

// Global Variable Declaration:
let randomDotX;
let randomDotY;
let star;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(65, 74, 76);
  drawMoon();
  // Draw Star:
  for(let i = 0; i <= 15; i++){         //  NOT WORKING
    if(drawStar === false){
      i = i;
    }
    else{
      drawStar();
    }
  }
}


function draw() {
  drawEarth();
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

}
function drawStar(){               //     NOT WORKING
  randomDotX = random(0, width);
  randomDotY = random(0, height);
  stroke(249, 243, 100);
  strokeWeight(5);
  if(randomDotX > width - 100 || randomDotY > height - 60){
    return false;
  }
  else{
    star = point(randomDotX, randomDotY);
  }
}



// -----------Interactive Character-----------

