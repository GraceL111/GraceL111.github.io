// Perlin Noise Assignment
// Grace Li
// March 3, 2025
//
//


let rectWidth = 1;
let rectHeight;
let highestPeak = 0;
let x2;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  generateTerrain();
}


function generateTerrain(){
  //use a loop to generate and draw
  // several rectangles side to side
  // to look like some 2D Terrain

  let noiseX = 0;
  stroke('black');
  noFill();

  rectMode(CORNERS);
  for(let x = 0; x < width; x += rectWidth){
    
    //generate a random height
    rectHeight = noise(noiseX) * height;

    // Find the other corner of our rectangle
    x2 = x + rectWidth;
    let y2 = height - rectHeight;

    rect(x, height, x2, y2);

    // Identifying the highest peak:

    if(y2 > highestPeak){
      highestPeak = y2;
      highestX = x2;
    }

    noiseX += 0.01;
  }
  drawFlag(highestX, highestPeak);


  rectMode(CORNER);
}

function keyPressed(){

  // Interactive Width: Left arrow decrease width, right arrow increase width

  if(keyCode === LEFT_ARROW){
    if(rectWidth <= 1){
      rectWidth = 1;
    }
    else{
      rectWidth -= 1;
    }
  }
  if(keyCode === RIGHT_ARROW){
    if(rectWidth >= 25){
      rectWidth = 25;
    }
    else{
      rectWidth += 1;
    }
  }
}

function drawFlag(x, y){
  // draw flag position
  let flagWidth = 3; 
  let flagHeight = 35;
  fill('green');
  noStroke();
  rect(x - flagWidth/2, y - flagHeight, flagWidth, flagHeight);
  let cornerX = x - flagWidth/2;
  let cornerY = y - flagHeight;
  rect(cornerX, cornerY, 20, 10);
}