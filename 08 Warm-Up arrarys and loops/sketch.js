// 08 Warm-Up arrays and loops
// Grace Li
// Mar 3, 2025

// 1. Summing an array
// 2. Drawing with loops Practice

let a =[22, 11, 5, 5, 90, 80, 70, 60];
let sumA = 0;
let xPos1 = 0;
let yPos1 = 0;
let xPos2;
let yPos2 = 0;
let numCircle;
// a.length = 8


function setup() {
  createCanvas(400, 400);
  background(200);
  // Task 1: Add all values in array and display the total in console
  for(let i = 0; i < a.length; i++){
    sumA = sumA + a[i];
  }
  console.log(sumA);

  numCircle = width / 10; 
  for(let n = 0; n < width; n += 40){
    circle(xPos1, yPos1, 10);
    xPos1 += numCircle;
    yPos1 += numCircle;
  }
  xPos2 = width;
  for(let n = 0; n < width; n += 40){
    circle(xPos2, yPos2, 10);
    xPos2 -= numCircle;
    yPos2 += numCircle;
  }


}

function draw() {
  
}
