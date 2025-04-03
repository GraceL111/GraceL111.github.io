// Puzzle Game
// Grace Li
// April 3rd
//
// 

let grid = 
[
 [0,   0, 255,  0, 255],
 [255, 0, 255, 0,   0],
 [0,   255, 0,   255,  0],
];

let squareSize = 60;
const NUM_ROWS = 3;
const NUM_COLS = 5;

function setup() {
  createCanvas(NUM_COLS * squareSize, NUM_ROWS * squareSize);
}

function draw() {
  background(220);
  renderGrid();

}

function renderGrid(){
  // interpret the information in the 2D array, and 
  // draw a grid of colors on the screen to reflect it

  for(let y = 0; y < NUM_ROWS; y++){
    for(let x = 0; x < NUM_COLS; x++){
      let fillColor = grid[y][x];
      fill(fillColor);
      square(x*squareSize, y*squareSize, squareSize);
    }
  }
}

function getCurrentY(){
  // determine current row of the mouse position
  let constrainedY = constrain(mouseY, 0, height-1);
  return floor(constrainedY / squareSize);

}

function getCurrentX(){
  // determine the current column of the mouse position
  let constrainedX = constrain(mouseX, 0, width-1);
  return floor(constrainedX / squareSize);
}

function mousePressed(){
  // flip current tile to a randim greyscale value 
  // only do something if mouseX/ mouseY are on the canvas. 

  let x = getCurrentX();
  let y = getCurrentY();

  //always: flip the current tile
  flip(x,y);
  // sometimes: depending on position, flip the neighbours
  if(y > 0){
    flip(x, y-1);
  }
  if(x > 0){
    flip(x - 1, y);
  }
  if(x < NUM_COLS - 1){
    flip(x + 1, y);
  }
  if(y < NUM_ROWS - 1){
    flip(x, y+1);
  }
}

function flip(x,y){
  // take a tile and invert it's value 
  if(grid[y][x] === 0){
    grid[y][x] = 255;
  }
  else{
    grid[y][x] = 0;
  }
}