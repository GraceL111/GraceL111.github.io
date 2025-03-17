// Round Racer Challenge
// Grace
// March 17
//

let racer1;
let racer2;
let racer3;
let scoreRed = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  racer1 = new RoundRacer(random(20, height - 20), 'green');
  racer2 = new RoundRacer(random(20, height -20), 'red');
  racer3 = new RoundRacer(random(20, height -20), 'blue');
}

function draw() {
  background(220);
  racer1.move();
  racer1.display();
  racer2.move();
  racer2.display();
  racer3.move();
  racer3.display();
}

class RoundRacer{
  constructor(yPos, c){
    this.xPos = 0;
    this.yPos = yPos;
    this.xSpeed = random(3, 15);
    this.color = c;
  }

  display(){
    noStroke();
    fill(this.color);
    circle(this.xPos, this.yPos, 25);
  }


  move(){
    this.xPos += this.xSpeed;
    if(this.xPos > width){
      this.xPos = 0;
    }
  }



}
