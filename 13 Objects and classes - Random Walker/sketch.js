// 13 Objects and classes - Random Walker
// Grace Li
// March 14th
//
// a first look at working with multiple objects

let singleWalker;
let walkers = [];
const NUM_WALKERS = 10000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  singleWalker = new Walker(100, 150, "green");
  initWalkers();
  noStroke();
}
function initWalkers(){
  //create a bunch of walker objects, put in array
  for(let i = 0; i < NUM_WALKERS; i++){
    let c = color(random(255), random(255), random(255), 100);
    let w = new Walker(random(width), random(height), c);
    walkers.push(w);
  }

}

function draw() {
  background(220);
  //singleWalker.move();
  //singleWalker.display();
  // for(let currentWalker of walkers){
  //   currentWalker.move();
  //   currentWalker.display();
  // }

  circle(mouseX, mouseY, 50);


  for(let i = 0; i < walkers.length; i++){
    // this allow delete
    let currentWalker = walkers[i];
    currentWalker.move();
    currentWalker.display();

    //Ask if the current object is close to the mouse
    if(dist(currentWalker.x, currentWalker.y, mouseX, mouseY) < 30){
      // to delete from an arbitary point in array: splice()
      walkers.splice(i, 1);
    }
  }
}


class Walker {
  //1. Constructor
  constructor(x, y, c){
    this.x = x;
    this.y = y;
    this.c = c;
    this.speed = random(2, 10);
    this.size = 5;
  }

  //2. class methods
  display(){
    // render walker on screen
    rectMode(CENTER);
    fill(this.c);
    circle(this.x, this.y, this.size);

  }

  move(){
    // equally likely chance of down, up, left, and right.
    let choice = floor(random(4));
    switch (choice){
    case 0: // LEFT 
      this.x -= this.speed;
      break;
    case 1: // RIGHT
      this.x += this.speed;
      break;
    case 2: //UP
      this.y -= this.speed;
      break;
    case 3: //Down
      this.y += this.speed;
      break;
    }
  }
}