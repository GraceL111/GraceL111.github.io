// 24 Map Data Structure
// Grace 
// May 26
//
// JS Split and spread syntax

let textFile, img, rows, cols, grid, colorMap;

function preload(){
  textFile = loadStrings('assets/info.txt');
  img = loadStrings('assets/colorImage.txt');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  //processText();

  //determine # of rows/cols
  rows = img.length;
  cols = img[0].length;

  //create and populate the 2D array(grid)
  grid = [];
  for(let i = 0; i < rows; i++){
    grid.push([...img[i]]);
  }

  //create map of colors
  colorMap = new Map([
    ['b', 'black'],
    ['w', 'white'],
    ['r', 'red'],
    ['l', 'peru'],
    ['p', color(150, 150, 255)],
  ]);

  renderGrid();
}

function renderGrid(){
  // calculate rectangle sizes
  let cellWidth = width/cols;
  let cellHeight = height/rows;

  for(let x = 0; x < cols; x++){
    for (let y = 0; y < rows; y++){
      let currentKey = grid[y][x];
      fill(colorMap.get(currentKey));
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}

function draw() {
  //background(220);
}





function processText(){
  print('split into words');
  let splitWords = textFile[0].split(' ');
  print(splitWords);

  print("split into characters");
  let splitChars = textFile[1].split('');
  print(splitChars);

  print('spread into characters');
  let spreadChars = [...textFile[2]];
  print(spreadChars);
}
