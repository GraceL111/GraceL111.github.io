// Vector Visualization
// Grace Li
// May 5, 2025

let objects = [];



function setup() {
  createCanvas(windowWidth, windowHeight);
  objects.push(new Ball (width*0.1, height*0.5));
}

function draw() {
  background(220);

  if(mouseIsPressed){
    objects.push(new Ball(mouseX, mouseY));
  }
  for(let o of objects){
    o.move();
    //o.calcMouse();
    o.display();
  }
}

class Ball{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.velo = createVector(5, -3);
    this.grav = createVector(0, 0.1);
    //this.grav;  //   mouse
  }

  calcMouse(){
    // mouse vector calculations
    this.grav = createVector(mouseX, mouseY);
    this.grav.sub(this.pos);
    this.grav.normalize();    
    this.grav.mult(4);       
  } 

  move(){
    // update velocity and position vectors
    this.velo.add(this.grav);
    this.velo.limit(20);
    this.pos.add(this.velo);
  }

  display(){
    // display ball
    circle(this.pos.x, this.pos.y, 20);

    // display vectors
    stroke('red');          //
    line(0, 0, this.pos.x, this.pos.y);

    stroke('blue');
    line(this.pos.x, this.pos.y, this.pos.x + this.velo.x, this.pos.y + this.velo.y);

    stroke('green');
    line(this.pos.x + this.velo.x, this.pos.y + this.velo.y, this.pos.x + this.velo.x + this.grav.x, this.pos.y + this.velo.y + this.grav.y);
  }
}
