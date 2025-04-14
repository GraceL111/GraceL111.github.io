// Recursion - Fractals
// Grace Li
// April 14
//
// Cantor Set, CircleFractal, RectangleFractal


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  //cantor(width*0.1, height*0.3, width*0.8, 9);
  circleFractal(width/2, height/2, height/2);
}

function circleFractal(x, y, d){
  noFill();
  if(d > 1){
    circle(x, y, d);

    // recursive Call
    circleFractal(x-d/2, y, d/2);   // to the left
    circleFractal(x + d/2, y, d/2);  // to the right
    circleFractal(x, y - d/2, d/2);   // to the top
    circleFractal(x, y + d/2, d/2);    // to the bottom
  }
  // implicit base case - don't recurse if the d is small

}



// function cantor(x,y, len, depth){
//   if(depth > 1){
//     line(x, y, x+len, y);
//     y += 15;

//     cantor(x, y, len/3, depth-1);  // left third
//     cantor(x + len*2/3, y, len/3, depth-1);
//   }
//   // otherwise, Base case(implicit) Unravel
// }



// function reCircle(x, y, d){
//   // recursively draw circles as long as diamether > 5
//   circle(x, y, d);

//   if(d >= 10){   // Recursive call
//     reCircle(x, y, d* 0.9);
//   }
//   // implicit base case (if d < 10)

// }
