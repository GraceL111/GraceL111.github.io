// Object Interactions - connected nodes
// Grace Li
// March 18
//
// OOP Review + Interactions

// Global Variables
let nodes = [];   // to hold all of our objects
let reach = 150; // how far connections b/w points may be

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for(let n of nodes){
    // looping by item is good here if not used for deleting
    n.move();
    n.connect(nodes);
    n.display();
  }
}

function mouseDragged(){
  // create one node per mouse press
  nodes.push(new csNode(mouseX, mouseY));
}


class csNode{
  // constructor
  constructor(x, y){   // Called once per object created
    // Property related to positioning/rendering
    this.x = x;
    this.y = y;
    this.size = 20;
    this.c = color(random(255), random(255), random(255), random(255));


    // Properties related to motion
    this.xTime = random(10);
    this.yTime = random(10);
    this.timeShift = 0.01; 
    this.maxSpeed = 5;
  }


  // class methods
  display(){
    fill(this.c);
    noStroke();
    circle(this.x, this.y, this.size);
  }

  connect(nodeArray){
    // Check if the current point is close to any other points, if so join with a line
    stroke(this.c);
    for(let n of nodes){
      //this.x this.y    n.x n.y
      if(n !== this){ // make sure not to compare to self
        let d = dist(this.x, this.y, n.x, n.y);
        if(d< reach){  // the two point is close
          line(this.x, this.y, n.x, n.y);
        }
      }
    }
  }

  move(){
    // use perlin noise for x/y movement
    let xSpeed = noise(this.xTime);
    xSpeed = map(xSpeed, 0, 1, -this.maxSpeed, this.maxSpeed);
    this.xTime += this.timeShift;

    this.x += xSpeed;
    if(this.x < 0){
      this.x = width;
    }
    else if (this.x > width){
      this.x = 0;
    }

    let ySpeed =  noise(this.yTime);
    ySpeed = map(ySpeed, 0, 1, -this.maxSpeed, this.maxSpeed);
    this.yTime += this.timeShift;

    this.y += ySpeed;
    if(this.y < 0){
      this.y = height;
    }
    else if (this.y > height){
      this.y = 0;
    }
  }

}
