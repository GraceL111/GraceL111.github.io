// Cars Cars Cars
// Grace Li
// March 21th
//
// 


let pickSpeed;
let randomNum1;
let randomNum2;
let randomNum3;
let ranColorlist = [];
let carColor;
let choseColor;
let ranColor;
let ranType;
let ranxSpeed;
let yRangeE;
let yRangeW;

let eastbound = [];
let westbound = [];

let trafficL;
let timer = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ranColorlist.push('red', 'yellow', 'blue', 'green', 'purple', 'orange',);

// ---------- Push in 20 cars--------------
//     I missed up west and east, so east is now west (Vise Versa)
  for(let i = 0; i < 20; i++){
    ranxSpeed = floor(random(-15, 15));
    if(ranxSpeed < 0){  //  negative xSpeed
      ranType = round(random(1));
      choseColor = floor(random(ranColorlist.length));
      ranColor = ranColorlist[choseColor];
      westbound.push(new Vehicle(0, random(height/2 + 10, height/2 + (height/2)/2 - 30), ranType, ranColor, 0, -1*ranxSpeed));
    }
    if(ranxSpeed > 0){  //  positive xSpeed
      ranType = round(random(1));
      choseColor = floor(random(ranColorlist.length));
      ranColor = ranColorlist[choseColor];
      eastbound.push(new Vehicle(width, random(height/2 - (height/2)/2, height/2 - 50), ranType, ranColor, 1, ranxSpeed));
    }
    
  }

  // ------ Traffic Light ---------
  trafficL = new TrafficLight('green');
}

function draw() {
  background(220);
  drawRoad();
  trafficL.display();

  for(let currentCar of westbound){
    currentCar.display();
    if(trafficL.lightColor === 'green'){
<<<<<<< HEAD
=======
      currentCar.display();
      currentCar.move();
>>>>>>> 1afc51e035fe133712655ef8e711675ad2e045e5
      currentCar.action();
    }
  }
  for(let currentCar1 of eastbound){
    currentCar1.display();
    if(trafficL.lightColor === 'green'){
<<<<<<< HEAD
=======
      currentCar1.display();
      currentCar1.move();
>>>>>>> 1afc51e035fe133712655ef8e711675ad2e045e5
      currentCar1.action();
    }
  }

  if(keyCode === 32 && keyIsPressed){
    trafficL.turnRed();
  }        
  countFrames();
}

function countFrames(){
  if(timer < 120){
    timer += 1;
  }
  else{
    trafficL = new TrafficLight('green');
    timer = 0;
  }
}

function mousePressed(){
  if(mouseButton === LEFT && !keyIsDown(SHIFT)){
    ranType = round(random(1));
    choseColor = floor(random(ranColorlist.length));
    ranColor = ranColorlist[choseColor];
    ranxSpeed = floor(random(1, 15));
    yRangeW = random(height/2 + 10, height/2 + (height/2)/2 - 30);
    westbound.push(new Vehicle(0, yRangeW, ranType, ranColor, 0, ranxSpeed));
  }
  if(keyIsDown(SHIFT) && mouseButton ===LEFT){
    print('shift detected');
    ranType = round(random(1));
    choseColor = floor(random(ranColorlist.length));
    ranColor = ranColorlist[choseColor];
    ranxSpeed = floor(random(-15, -1));
    yRangeE = random(height/2 - (height/2)/2, height/2 - 50);
    eastbound.push(new Vehicle(width, yRangeE, ranType, ranColor, 1, ranxSpeed));
  }
  print(westbound);
  print(eastbound);
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

class TrafficLight{
  // -----constructor ------------
  constructor(color){
    this.lightColor = color;
    this.countDown = 0;
  }

  // ---------- Class Properties --------------
  display(){
    fill(this.lightColor);
    circle(width/2, 0 + 50, 30);
    if(this.countDown > 0){
      this.countDown -= 1;
    }
    if(this.countDown <= 0 && this.lightColor === 'red'){
      this.lightColor = 'green';
    }
  }
  actionL(){
    if(this.lightColor === 'red'){
      for(let currentCar of westbound){ 
        currentCar.display();     
      }
      for(let currentCar1 of eastbound){
        currentCar1.display();
      }
    }
  }
  turnRed(){
    trafficL.lightColor ='red';
    trafficL.countDown = 120;
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
    // this.display();
    // this.move();

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