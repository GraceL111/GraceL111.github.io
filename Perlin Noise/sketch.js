// Perlin Noise Assignment
// Grace Li
// March 3, 2025
//
//


let rectWidth = 10;
let rectHeight;

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

  rectMode(CORNERS);
  for(let x = 0; x < width; x += rectWidth){
    //generate a random height
    let noiseNum = noise(5) * frameCount;
    rectHeight = 100 * noiseNum;
    // Find the other corner of our rectangle
    let x2 = x + rectWidth;
    let y2 = height - rectHeight;

    rect(x, height, x2, y2);
  }


  rectMode(CORNER);
}