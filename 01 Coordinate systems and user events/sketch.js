// Coordinate System and User Events
// Grace Li
// Feb 6th , 2025

// Not run to completion, but interactive programs...


function setup() {
  // runs once, at the very beginning...
  createCanvas(500, 500);
}

function draw() {
  // draw LOOP, repeats over and over forever...
  // - target of 60 frames per second
  // A new image is drawn at the bottom of the loop
  //Dont dump everyting in draw function
  background(220);
  firstCircle();
  secCircle();
  thirdCircle();
  fourthCircle();
  centerCircle();
}


function firstCircle(){
  //draws two circles, one at a fixed location and one at the mouse location
  fill(0,255,0); //Green fill
  stroke(0, 0, 255);  //Blue outline
  strokeWeight(3);    //Thickness of outline
  circle(0,0,50);


  // Secret calculated delay()
  // Screen updates at end of loop
}

function secCircle(){
  fill(0,255,0); 
  stroke(0, 0, 255); 
  strokeWeight(3);    
  circle(0,height, 50);
}

function thirdCircle(){
  fill(0,255,0); 
  stroke(0, 0, 255); 
  strokeWeight(3);    
  circle(width, 0, 50);
}

function fourthCircle(){
  fill(0,255,0); 
  stroke(0, 0, 255); 
  strokeWeight(3);    
  circle(width, height, 50);
}

function centerCircle(){
  fill(0,255,0); 
  stroke(0, 0, 255); 
  strokeWeight(3);    
  circle(width/2, height/2, 50);
}