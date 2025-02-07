// User Events
// Grace Li
// Feb 7th 2025


//Global Variable Declarations
//Define your global here.
// You can only store SIMPLE data at this point (no system variables, string or number is ok)
let tSize =10;
let x;   //Declaration
let y;

function setup() {
  //Run once at start
  createCanvas(windowWidth, windowHeight);
  x = width/2;   //Initialization
  rectMode(CENTER);
}

function draw() {
  // Run over and over, 60 fps
  background(220);
  //print("Current Frame: " + frameCount); //console.log()

  // ----------Mouse Section-----------
  fill("blue");
  textSize(tSize);
  text(mouseX + ", " + mouseY + " " + mouseButton, mouseX, mouseY);

  //---------Key Board Section -----------
  fill(300,150,100);
  square(x, 200, 50, 5);

  if(keyIsDown(LEFT_ARROW)){
    x = x - 5;
    if(x < 0){
      x = width;
    }
  }
  if(keyIsDown(RIGHT_ARROW)){
    x = x + 5;
    if(x > width){
      x = 0;
    }
  }
}

function mousePressed(){
  // this is called Automatically. 
  // This is called ONCE per mouse button press
  tSize = random(5,100);
}
