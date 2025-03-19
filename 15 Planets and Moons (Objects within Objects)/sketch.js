// 15 Planets and Moons
// Grace Li
// March 19
//
// Storing objecs in objects, overwriting objects, transforming objects.

let myPlanet;


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  myPlanet = new Planet(width/2, height/2);
}

function draw() {
  background(70);
  noStroke();
  myPlanet.display();
}

function mouseDragged(){
  if(keyIsPressed && keyCode === SHIFT){
    myPlanet = new Planet(mouseX, mouseY);
  }
  else{
    myPlanet.createMoon();
  }

}

function keyPressed(){
  //if any key (Not shift) is pressed...
  if(keyCode !== SHIFT){
    myPlanet.relocate(mouseX, mouseY);
  }
}

class Planet{
  // Constructor
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.s = 100;
    this.moon = [];
  }

  // class methods
  display(){
    // draw the planet plus all the moons.
    circle(this.x, this.y, this.s);

    for(let m of this.moon){
      m.update();
    }

  }

  relocate(x, y){
    //First, relocate planet
    this.x = x;
    this.y = y;
    for(let m of this.moon){
      m.x = x;
      m.y = y;
    }
  }

  createMoon(){
    this.moon.push(new Moon(this.x, this.y));
  }
}

class Moon{
  // Constructor
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.angle = 0;
    this.orbitRadius = 80;
    this.s = 25;
  }

  //Class methods

  update(){
    // Handles all internal class function calls
    this.move();
    this.display();
  }

  move(){
    this.angle += this.speed;
  }

  display(){
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    circle(this.orbitRadius, 0, this.s);
    pop();
  }
}


