// Cars Cars Cars
// Grace Li
// March 21th
//
// 


let testCar;

function setup() {
  createCanvas(windowWidth, windowHeight);
  testCar = new Vehicle(width/2, height/2, 1, 'red', 0, 10);
}

function draw() {
  background(220);
  drawRoad();
  testCar.display();
  testCar.move();
}

function drawRoad(){
  // ------ draw gravel -------
  fill('black');
  let roadHeight = (width/2) - (width/2)/2;
  rect(0, roadHeight, width, roadHeight*2);

  // ------draw line ------
  for(let i = 0; i < width; i += 25){
    fill('yellow');
    rect(i, width/2, 12, 4);
  }
}


class Vehicle{
  // -----Constructor --------
  constructor(x , y, type, color, direction, xSpeed){
    this.x = x;
    this.y = y;
    this.type = type;
    this.color = color;
    this.direction = direction;
    this.xSpeed = xSpeed;
  }

  // ------- Class Properties --------
  action(){

  }
  
  display(){
    let wheelWidth = 10;
    let wheelHeight = 5;

    //  ------ Car ----------
    if (this.type === 0){  //  0 = car
      let carWidth = 55;
      let carHeight = 25;
      fill(this.color);
      rect(this.x, this.y, carWidth, carHeight);
      // --- wheels ----
      fill('white');
      rect(this.x, this.y - 5, wheelWidth, wheelHeight);
      rect(this.x + (carWidth - wheelWidth), this.y - 5, wheelWidth, wheelHeight);
      rect(this.x, this.y + carHeight, wheelWidth, wheelHeight);
      rect(this.x + (carWidth - wheelWidth), this.y + carHeight, wheelWidth, wheelHeight);
    }

    // ------- Truck ----------
    else if(this.type === 1){    //  1 = truck
      let truckWidth = 60;
      let truckHeight = 45;
      fill(this.color);
      //noStroke();
      rect(this.x, this.y, truckWidth, truckHeight);
      if(this.direction === 0){
        rect(this.x + truckWidth, this.y + 8, 15, 30);
      }
      else if(this.direction === 1){
        rect(this.x - 15, this.y + 8, 15, 30);
      }

      // --- wheels -----
      fill('white');
      rect(this.x, this.y - 5, wheelWidth, wheelHeight);
      rect(this.x + (truckWidth - wheelWidth), this.y - 5, wheelWidth, wheelHeight);
      rect(this.x, this.y + truckHeight, wheelWidth, wheelHeight);
      rect(this.x + (truckWidth - wheelWidth), this.y + truckHeight, wheelWidth, wheelHeight);
    }
  }
  move(){
    if(this.direction === 0){ //  0 = right
      this.x += this.xSpeed;
      if(this.x > width){
        this.x = 0;
      }
    }
    if(this.direction === 1){   // 1 = left
      this.x -= this.xSpeed;
      if(this.x < 0){
        this.x = width;
      }
    }

  }
  speedUp(){

  }
  speedDown(){

  }
  changeColor(){

  }
}
