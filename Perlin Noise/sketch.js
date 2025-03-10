// Perlin Noise Assignment
// Grace Li
// March 3, 2025

// Using Perlin Noise to generate a terrain. It features a marked highest peak, 
// convertable width using the arrow key, and a calculated average height per frame (Line). 


let rectWidth = 1;
let rectHeight;
let highestPeak;
let highestX;
let startNoise = 0;
let frameHeight;
let averageHeight;

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

  let noiseX = startNoise;
  stroke('black');
  noFill();

  rectMode(CORNERS);

  highestPeak = height;
  highestX = 0;
  frameHeight = 0;
  
  for(let x = 0; x < width; x += rectWidth){
    
    //generate a random height
    rectHeight = noise(noiseX) * height;

    // Find the other corner of our rectangle
    let x2 = x + rectWidth;
    let y2 = height - rectHeight;

    rect(x, height, x2, y2);

    // Identifying the highest peak:

    if(y2 < highestPeak){
      highestPeak = y2;
      highestX = x;
    }

    noiseX += 0.01;
    frameHeight += rectHeight;
  }

  // Calculate the average height per frame
  averageHeight = frameHeight/ (width/rectWidth);   // dividing height by the number of rectangles
  
  startNoise += 0.01;
  drawFlag(highestX, highestPeak);
  drawAverage(height - averageHeight);



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
  // Draw flag at the top of the highest peak

  rectMode(CORNER);

  // draw flag position
  let flagWidth = 20; 
  let flagHeight = 10;
  let poleWidth = 3;
  let poleHeight = 35;

  fill('red');
  noStroke();

  // Draw flagpole
  rect(x - poleWidth/2 , y - poleHeight, poleWidth, poleHeight);

  //Draw flag
  rect(x, y - poleHeight, flagWidth, flagHeight);
}

function drawAverage(h){
  // draw average-height-line 
  fill('red');
  rect(0, h, width, 5);
}