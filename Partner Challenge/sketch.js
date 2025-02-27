// Partner Challenge


// Global Variable:
let x =  0;
let y = 0;
let leftDirection;
let looping = true;



function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  moveRight();

}



function moveRight(){
  x += 6;
  square(x , y,  30);
  if(x > width - 30){
    moveDown();
  }
}

function moveDown(){
  x = width - 30;
  y += 6;
  square(x , y, 30);
  if(y > height){
    moveLeft();
  }
}
function  moveLeft(){
  y = height;
  x = width;
  x -= 6;
  square(x, y, 30);
  if(x === 0){
    moveUp();
  }
}
function moveUp(){
  
}



//   let ypos;
//   square()
//   for (let x = 0; x <= 2 * (windowHeight + windowWidth); x++){
//     if (x >= windowWidth){
//       ypos+=1;
//     }

//     square(x,ypos, 50);
//   }
//   if (frameCount % 3 === 0){
    
//   }