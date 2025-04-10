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
let successList = [];

let x; 
let y;

function setup() {
  createCanvas(NUM_COLS * squareSize, NUM_ROWS * squareSize);
  choseTile();
}

function draw() {
  background(220);
  renderGrid();
  colorOverlay();
  printWin();
}

function choseTile(){
  for(let y = 0; y < NUM_ROWS; y++){
    for(let x = 0; x < NUM_COLS; x++){
      let randomTile = round(random(0, 1));
      if(randomTile === 0){     // white
        grid[y][x] = 255;
      }
      if(randomTile === 1){     // Black
        grid[y][x] = 0;
      }
    }
  }
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

function colorOverlay(){
  // Color overlay on the nearby tiles
  x = getCurrentX();
  y = getCurrentY();
  
  let currentTile = grid[y][x];
  let currentX = x;
  let currentY = y;
  //print(currentX);

  colorTile(x, y);
  colorTile(x +1, y);
  colorTile(x-1, y);
  colorTile(x, y-1);

  // if(x !== currentX || y !== currentY){
  //   print(1);
  //   grid[y][x] = currentTile;
  // }
  // if(y > 0){
  //   colorTile(x, y-1);
  //   if(x !== currentX || y !== currentY){
  //     grid[y][x] = currentTile;
  //   }
  // }
}

function mouseClicked(){
  // flip current tile to a random greyscale value 
  // only do something if mouseX/ mouseY are on the canvas. 

  x = getCurrentX();
  y = getCurrentY();

  //always: flip the current tile
  if(mouseButton === LEFT && keyIsDown(SHIFT)){
    flip(x,y);
  }
  else{
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

  
}

function printWin(){
  collectTiles();
  ifIdentical(successList);
  if(ifIdentical(successList) === true){
    fill('red');
    text('YOU WIN', 100, 100);   
    //text('YOU WIN', (NUM_COLS * squareSize)/2, (NUM_ROWS * squareSize)/2);      // Not displaying
    print(1);
  }
}
function collectTiles(){
  successList = [];
  // Loop through all values and check for completion
  for(let y = 0; y < NUM_ROWS; y++){
    for(let x = 0; x < NUM_COLS; x++){
      if(grid[y][x] === 255){
        successList.push('white');
      }
      if(grid[y][x] === 0){
        successList.push('black');
      }
    }
  }
}

function ifIdentical(list){
  for(let i = 0; i < list.length; i++){
    if(list[i] !== list[0]){
      return false;
    }
  }
  return true;
}

function colorTile(x,y){
  // Color Overlay
  if(x >= 0 && x <= 4 && y >= 0 && y<=2){
    if(grid[y][x] === 0){
      fill(50, 120, 50);
      square(x*squareSize, y*squareSize, squareSize);   // dark green
    }
    else{
      fill(100, 255, 100);
      square(x*squareSize, y*squareSize, squareSize);      // light green
    }
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