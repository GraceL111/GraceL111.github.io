// CSS Centering and 3D shapes
// Grace Li
// April 15
//
// 

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  circleFractal(width/2, height*.8, height*.75);
  //cantor(width*0.1, height*0.3, width*0.8, 9);
}


function circleFractal(x,y,d){
  noFill();
  if(d > 1){
    circle(x,y,d);
    //recursive calls
    circleFractal(x-d/2, y, d/2); //recursive circle to left
    circleFractal(x+d/2, y, d/2); //recursive circle to right
    circleFractal(x, y-d/2, d/2); //recursive circle to top
  }
  //implicit base case - don't recurse if diameter is small
}

function cantor(x,y,len,depth){
  if(depth > 1){
    line(x,y, x+len, y);
    y += 20;

    cantor(x,y,len/3,depth-1); //left third
    cantor(x + len*2/3, y, len/3, depth-1);
  }
  //otherwise, BASE CASE unravel
}





// function reCircle(x,y,d){
//   //recursively draw circles as long as 
//   //diameter > 5
//   circle(x,y,d);
//   if (d >= 10){  //Recursive Call
//     reCircle(x,y,d*0.9)
//   }
//   //Implicit base case (if d <10)
// }