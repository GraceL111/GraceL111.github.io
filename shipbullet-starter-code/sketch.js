// OOP Pair Programming Starter Code
// Your Names
// The Date


// ------------------------------------------------------------------------- //
// You don't need to edit this section...

let enterprise;
let shipImage, bulletImage;
let singleBullet;
let bullets = [];

function preload() {
  shipImage = loadImage("assets/enterprise.png");
  bulletImage = loadImage("assets/laser-shot.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  enterprise = new Ship(width/2, height/2, shipImage);
}

function draw() {
  background("black");
  enterprise.update();
  enterprise.display();
}

function keyPressed() {
  if(keyCode === SHIFT){
    enterprise.handleKeyPress();
    for(let i = 0; i < bullets.length; i++){
      let currentBullet = bullets[i];
      currentBullet.display();
    }
  }
}

// ------------------------------------------------------------------------- //
// Start editing here!

class Ship {
  constructor(x, y, theImage) {
    // define the variables needed for this ship
    this.x = x;
    this.y = y;
    this.theImage = shipImage;
    this.speed = 5; 
  }

  update() {
    // move ship -- you might want to use the keyIsDown() function here
    if(keyIsDown(LEFT_ARROW) === true){
      this.x -= this.speed;
    }
    if(keyIsDown(RIGHT_ARROW) === true){
      this.x += this.speed;
    }
    if(keyIsDown(UP_ARROW) === true){
      this.y -= this.speed;
    }
    if(keyIsDown(DOWN_ARROW) === true){
      this.y += this.speed;
    }
    // if doing extra for experts, show bullet(s)
    
  }

  display() {
    // show the ship
    image(this.theImage, this.x, this.y);
  }

  handleKeyPress() {
    // you only need to use this if you are doing the extra for experts...
    // if you are, you should make a bullet if the space key was pressed
    bullets.push(new Bullet(this.x, this.y, this.dx, this.dy, bulletImage));
  }
}

// ------------------------------------------------------------------------- //

// Extra for Experts 
//  - you can instantiate a bullet (or a bullet array) within the Ship class,
//    and call the display and update functions in the logical location of the 
//    Ship class. If you create an array of bullets, you might want to think about
//    when the bullets should be removed from the array...

class Bullet {
  constructor(x, y, dx, dy, theImage) {
    // define the variables needed for the bullet here
    this.x = x,
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.theImage = bulletImage;
    this.bulletSpeed = 10;
  }

  update() {
    // what does the bullet need to do during each frame? how do we know if it is off screen?
    
  }

  display() {
    // show the bullet
    rectMode(CENTER);
    rect(this.x, this.y, 2, 6);
  }

  isOnScreen() {
    // check if the bullet is still on the screen
  }
}

