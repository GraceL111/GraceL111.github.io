// Square 2D Fractial
// Grace
// April 15
//
// 


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  background(220);
  randomSeed(1);
  //noFill();
  squareFractal(width/2, height/2, height/2);
}

function squareFractal(x,y, w){
  fill(random(255), random(255), random(255), 100);
  noStroke();
  square(x, y, w);
  
  if(w > 10){
    squareFractal(x - w/2, y + w/2, w/2);
    squareFractal(x - w/2, y - w/2, w/2);
    squareFractal(x + w/2, y + w/2, w/2);
    squareFractal(x + w/2, y - w/2, w/2);

  }

}
