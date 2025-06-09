// Practice for Final Coding Challenge

// Classes and Objects
// Working with images/animations
// Keyboard and mouse interactions


// ----- Global Variables ------
let gorillaIdle = [];
let gorillaSwipe = [];
let spiralImages = [];


// Gorilla related
let idleIndex = 0;
let swipeIndex = 0;
let gorillaState = 0;  // 0 - Idle   1 - Swipe
let gorillaX = 200;
let velo = 10;

// Spiral
let spiralObj = [];


function preload(){  //fill arrays with gorilla and spiral images
  //Gorilla Images First   1-6
  for (let i = 1; i <= 6; i++) {
    gorillaIdle.push(loadImage("assets/Gorilla/idle" + i + ".png"));
    gorillaSwipe.push(loadImage("assets/Gorilla/swipe" + i + ".png"));
  }

  //Load Circle Next:   circle00.png  00-15
  for (let i = 0; i <= 15; i++) {
    if (i < 10) {
      spiralImages.push(loadImage("assets/Circle/circle0" + i + ".png"));
    }
    else {
      spiralImages.push(loadImage("assets/Circle/circle" + i + ".png"));
    }
  }
}

class spiral{
  constructor(x,y){ // runs onces each time an object is made
    this.x = x;
    this.y = y;
    this.currentFrame = 0;
    this.active = true;
  }

  display(){
    if(this.currentFrame > 15){
      this.active = false;
    }
    else{
      image(spiralImages[this.currentFrame], this.x, this.y);
      if(frameCount % 3 === 0){
        this.currentFrame++;
      }
    }
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  background(220);
  drawGorilla();
  move();

  // spiral
  for(let i = 0; i < spiralObj.length; i++){
    let s = spiralObj[i];
    s.display();
    print(spiralObj);
    if(s.active === false){
      spiralObj.splice(i,1);
    }
  }
}

function mousePressed(){
  spiralObj.push(new spiral(mouseX, mouseY));
}

function drawGorilla(){
  // render gorilla, choosing the correct image for animation playback
  if(gorillaState === 0){
    image(gorillaIdle[idleIndex], gorillaX, height/2);
    if(frameCount % 10 === 0){
      idleIndex++;
      if(idleIndex > 5){
        idleIndex = 0;
      }
    }
  }
  else if(gorillaState === 1){
    image(gorillaSwipe[swipeIndex], gorillaX, height/2);
    if(frameCount % 10 === 0){
      swipeIndex++;
      if(swipeIndex > 5){
        swipeIndex= 0;
      }
    }
  }

}

function keyPressed(){
  if(keyCode === 32){
    if(gorillaState === 0){
      gorillaState = 1;
    }
    else{
      gorillaState = 0;
    }
  }
}

function move(){
  if(keyIsDown(LEFT_ARROW)){
    gorillaX -= velo;
    if(gorillaX <= 0){
      gorillaX = 0;
    }
  }
  if(keyIsDown(RIGHT_ARROW)){
    gorillaX += velo;
    if(gorillaX >= width){
      gorillaX = width;
    }
  }
}

