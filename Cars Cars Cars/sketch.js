// Cars Cars Cars
// Grace Li
// March 21th
//
// 


let testCar;
let pickSpeed;
let randomNum1;
let randomNum2;
let randomNum3;
let ranColorlist = [];
let carColor;

let eastbound = [];
let westbound = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  ranColorlist.push('red', 'yellow', 'blue', 'green', 'purple', 'orange',);
  for(let i = 0; i < 20; i++){
    let ranxSpeed = floor(random(-15, 15));
    if(ranxSpeed < 0){  //  negative xSpeed
      let ranType = round(random(1));
      let choseColor = floor(random(ranColorlist.length));
      let ranColor = ranColorlist[choseColor];
      westbound.push(new Vehicle(0, random(height/2 - 15, height/2 + (height/2)/2 - 30), ranType, ranColor, 0, -1*ranxSpeed));
    }
    if(ranxSpeed > 0){  //  positive xSpeed
      let ranType = round(random(1));
      let choseColor = floor(random(ranColorlist.length));
      let ranColor = ranColorlist[choseColor];
      eastbound.push(new Vehicle(width, random((height/2 - (height/2)/2) + 10, height/2 - 35), ranType, ranColor, 1, ranxSpeed));
    }
    
  }

  // testCar = new Vehicle(width/2, height/2, 1, 'red', 1, 10);
}

function draw() {
  background(220);
  drawRoad();
  for(let currentCar of westbound){        //  I missed up west and east, so west is now east
    currentCar.action();
  }
  // for(let currentCar1 of eastbound){
  //   currentCar1.action();
  // }
}

function drawRoad(){
  // ------ draw gravel -------
  fill('black');
  let roadHeight = height/2 - (height/2)/2;
  rect(0, roadHeight - 30, width, roadHeight*2 + 50);

  // ------draw line ------
  for(let i = 0; i < width; i += 25){
    fill('yellow');
    rect(i, height/2, 12, 4);
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
    this.xSpeed += 1;
    if(this.xSpeed > 15){
      this.xSpeed = 15;
    }
  }
  speedDown(){
    this.xSpeed -= 1;
    if(this.xSpeed <= 0){
      this.xSpeed = 1;
    }
  }
  changeColor(){
    carColor = floor(random(ranColorlist.length));
    this.color = ranColorlist[carColor];
  }

  action(){
    this.display();
    this.move();

    // ---- 1% Chance -------
    randomNum1 = round(random(100)); 
    if(randomNum1 === 1){ //     
      this.speedUp();
    }
    randomNum2 = round(random(100)); 
    if(randomNum2 === 1){ //     
      this.speedDown();
    }
    randomNum3 = round(random(100)); 
    if(randomNum3 === 1){ //     
      this.changeColor();
    }
    
    // print(this.xSpeed);
    // print(this.color);
  }
}
