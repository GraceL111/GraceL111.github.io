// Drawing with single loops
// Grace Li
// Feb 24, 2025


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawCircle();


}
//   gradientBackground();
//   circleLine();
// }
// function gradientBackground(){
//   //create a gradient to use as background
//   let h = 10;

//   // use a loop to draw vertical stack of rectangles. 
//   for(let y = 0; y < height; y += h){
//     //     start at the top of canvas;   loop until the bottom of canvas; 
//     noStroke();
//     let mappedY = map(y, 0, height, 0, 255);
//     let reversedY = map(y, 0, height, 255, 0);
//     fill(mappedY, reversedY, mouseX/3);
//     rect(0, y, width, h);
//   }
// }

// function circleLine(){
//   //use a loop (for or while) to draw a line
//   //of circles side by side.
//   let d = 40; //diameter of each circle
//   let y = height/2;
//   let xStart = 0;
//   let xEnd = mouseX;   //width*0.75;

//   //use a loop to do the drawing
//   for(let x = xStart; x <= xEnd; x+=d){
//     //x: 0  40  80  120  160   200  240
//     circle(x, y, d);
//   }

//        Challenge:

function drawCircle(){
  let startPos = 0;
  let d = 30;
  for(let i = 0; i === width; i+=d){
    circle( x, 0, d);

  }
}







