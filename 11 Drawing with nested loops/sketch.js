// Drawing with nested loops
// Grace Li
// March 7th
//


let gridSpacing = 20;


function setup() {
  createCanvas(windowWidth, windowHeight);
  loopReview();
}


function loopReview(){
  // quickly recap single and nested loops
  for(let x = 0; x <= 40; x += 20){
    for(let y = 0; y <= 40; y += 20){
      print(x, y);
    }
  }
}

function renderGrid(){
  // use nested loop to draw objects in a grid arrangement 
  for(let x = 0; x < width; x += gridSpacing){
    for(let y = 0; y < height; y += gridSpacing){
      let d = roundedDist(x, y, mouseX, mouseY);

      // set fill value based on the proximity amount
      noStroke();
      let alpha = map(d, 0, 150, 255, 0);
      if(d < 100){
        fill(50, 100, 50, alpha);
      }
      else{
        fill(255);
      }

      circle(x, y, gridSpacing);
      textAlign(CENTER, CENTER);
      text(d, x, y);
    }
  }
}

function roundedDist(x1, y1, x2, y2){
  // take two coordinate points and return
  // the distance between, but rounded
  let a = abs(x1 - x2);
  let b = abs(y1 - y2);
  let c = sqrt(sq(a) + sq(b));
  return round(c);




}

function draw() {
  background(220);
  renderGrid();
}
