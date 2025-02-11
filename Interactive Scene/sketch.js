// Interactive Scene
// Grace Li
// Feb 11 2025

// - describe what you did to take this project "above and beyond"




function setup() {
  createCanvas(windowWidth, windowHeight);
  background(65, 74, 76);
}

function draw() {
  drawMoon();
}

function drawMoon(){
  
  fill(246, 241, 213);
  circle(width - 100, height - 60, 600);
  fill(300, 241, 213);
  stroke(300, 241, 213)
  circle(width/1.2, height/1.2, 40);
  circle(width/1.1, height/1.1, 50);
  circle(width/1.5, height/1.1, 45);
  circle(width/1.4, height/1.3, 42);
  circle(width/1.034, height/1.4, 50);



}