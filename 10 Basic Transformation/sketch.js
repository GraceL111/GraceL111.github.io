// 10 Basic Transformation
// Grace
// March 6

// Coordinate System Transformation (translate, move, scale)




let originalSpacing = 20;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  drawBasicGrid(220);
  drawCircle();

  // Test: 
  // face(width/2, height/2);
  // rectangleBlue(200, 150);
  // rectangleRed(200, 100);



  //transformation one: TRANSLATION

  // push(); // Makes a new coordinate system on top
  // translate(120,120); // Move the coordinate system
  // drawBasicGrid(150);
  // rectangleRed(0, 0);
  // pop(); // Reverts to previous coordinate system
  




  //transformation two: SCALE
  // push();
  // rectangleRed(40, 0);   // 50 px square

  // //scale: no change < 1 (smaller)    > 1 (larger)
  // let scaleAmount = 2.5;
  // scale(scaleAmount, 2);
  // translate(60, 60);
  // drawBasicGrid(100);
  // rectangleBlue(20,20);


  // pop();




  //transformation three: ROTATION
  //reminder: rotations are measured in radians, not degrees! Functions can help with the conversion...
  // angleMode(DEGREES);

  // push();
  // translate(140, 140);
  // rotate(frameCount); // always rotates around the origin
  // //drawBasicGrid(100);
  // face(100,0);




  // pop();

  // push();
  // //to rotate an object around itself
  // //1. translate to the objects position
  // //2. apply the rotation transformation
  // //3. draw object at (0,0)
  // rectMode(CENTER);
  // translate(mouseX, mouseY);
  // scale(2);
  // rotate(-frameCount*2);
  // rectangleBlue(0,0);
  // pop();


  //Combinations of Transformations

  

}

function drawCircle(){
  push();
  translate(200, 200);
  drawBasicGrid(220);
  noFill();
  circle(0, 0, 150);

  let numSpokes = 4;
  let spokeAngle = 360/numSpokes;

  angleMode(DEGREES);
  for(let i = 0; i < numSpokes; i++){
    line(0, 0, 150/2, 0);
    rotate(spokeAngle);
  }



  pop();
}










function face(x, y) {
  //draw a face at x,y
  push();
  translate(x,y);
  ellipseMode(CENTER);
  fill(200,200,0);
  stroke(0);
  ellipse(0,0,80,80);
  fill(90, 140, 30, 220);
  triangle(-20, 20, 20, 20, 0, 30);
  fill(0);
  ellipse(-25,0,10,10);
  ellipse(25,0,10,10);
  strokeWeight(5);
  line(-30,-10,30,-10);
  strokeWeight(1);
  pop();

}

function rectangleRed(x, y) {
  //draw a red rectangle at x,y (sized 50 pixels square) - to visualize what happens to the coordinate system
  //when different basic transformations are applied.
  noStroke();
  fill(255, 0, 0, 150);
  rect(x, y, 50, 50);

}

function rectangleBlue(x, y) {
  //draw a red rectangle at x,y (sized 50 pixels square) - to visualize what happens to the coordinate system
  //when different basic transformations are applied.
  noStroke();
  fill(0, 0, 255, 150);
  rect(x, y, 50, 50);

}

function drawBasicGrid(shade) {
  //draw the normal cartesian Coordinate Grid, in a light color. Spaced at 20 px by default
  stroke(shade);
  for (let x = 0; x < width; x += 20) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += 20) {
    line(0, y, width, y);
  }

  //Draw "X" at the origin
  strokeWeight(3);
  stroke(0);
  line(-5,0,5,0);
  line(0,5,0,-5);
  strokeWeight(1);
}