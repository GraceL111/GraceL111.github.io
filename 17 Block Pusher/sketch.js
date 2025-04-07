// Block Pusher Starter
// Your Name
// Date


let tiles = [];  //0 → grass  1 → chicken   2 → cow  3 → star
let level = [
  [0, 1, 0, 3, 0],
  [1, 0, 0, 1, 0],
  [0, 1, 1, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0]
]
const COLUMNS = 5; const ROWS = 5; let TILE_SIZE = 100;
let playerX = 3; let playerY = 4;

function preload() {
  for (let i = 0; i < 4; i++) {
    tiles.push(loadImage("assets/" + i + ".png"));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  level[playerY][playerX] = 2;
}

function draw() {
  background(220);
  renderBoard();
}

function keyPressed(){
  // try a single action per keypress
  if(keyCode === UP_ARROW && playerY > 0){
    // before doing anything else, inspect top neighbour
    if(level[playerY - 1][playerX] === 0){ // Grass
      swap(playerX, playerY, playerX, playerY -1);
      playerY --;
    }
    else if(level[playerY - 1][playerX] === 1){
      // is there room for it to be pushed
      if(playerY -2 >= 0 && level[playerY - 2][playerX] === 0){
        // grass above the chicken - allowed to push
        swap(playerX, playerY - 1, playerX, playerY -2);
        swap(playerX, playerY, playerX, playerY - 1);
        playerY --;
      }
    }
  }
  else if( keyCode === DOWN_ARROW && playerY < 4){
    // before doing anything else, inspect top neighbour
    if(level[playerY - 1][playerX] === 0){ // Grass
      swap(playerX, playerY, playerX, playerY + 1);
      playerY ++;
    }
    else if(level[playerY + 1][playerX] === 1){
      // is there room for it to be pushed
      if(playerY + 2 <= height && level[playerY + 2][playerX] === 0){
        // grass above the chicken - allowed to push
        swap(playerX, playerY + 1, playerX, playerY + 2);
        swap(playerX, playerY, playerX, playerY + 1);
        playerY ++;
      }
    }
  }
  else if(keyCode === LEFT_ARROW && playerX > 0){
    swap(playerX, playerY, playerX - 1, playerY);
    playerX --;
  }
  else if(keyCode === RIGHT_ARROW && playerX < 4){
    swap(playerX, playerY, playerX + 1, playerY);
    playerX ++;
  }
}

function swap(x1, y1, x2, y2){
  // modify the gameboard, switch two items.
  let temp = level[y1][x1];
  level[y1][x1] = level[y2][x2];
  level[y2][x2] = temp;
}

function renderBoard() {
  // interpret data in our 2D array (level), place images
  // on canvas.
  for (let x = 0; x < COLUMNS; x++) {
    for (let y = 0; y < ROWS; y++) {
      let type = level[y][x];
      let currentImage = tiles[type];
      image(currentImage, x * TILE_SIZE, y * TILE_SIZE);
    }
  }
}
