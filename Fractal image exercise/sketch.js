// Fractal image exercise
// Grace Li
// April 16
//
// A 3D "Glitch Ring" that expends in 3 dimensions with each partical being a plane. Glitch effect comes from randomly generating planes.
// It contains a special object in the center of the rings. (Inspired by the conduit in Minecraft)

const wGlitch = 45;
const hGlitch = 10;


let randomAngle;
let anglesList = [];


function setup() {
  createCanvas(500, 500, WEBGL);
  angleMode(DEGREES);

  // Set consistant angles for all axis
  for(let i = 0; i < 5; i++){
    randomAngle = floor(random(0, 360));
    anglesList.push(randomAngle);
  }
}

function draw() {
  background(220);
  noStroke();
  rotateY(frameCount*0.5);
  rotateX(frameCount*0.5);
  rotateX(frameCount*0.5);

  //-------Center Object -----------
  push();
  fill(random(255), random(255), random(255));
  sphere(12);
  pop();

  // -------Recursive Calls ----------
  drawGlitchX(wGlitch, hGlitch, 5);
  drawGlitchZ(wGlitch, hGlitch, 5);
  drawGlitchY(wGlitch, hGlitch, 5);
}

function drawGlitchX(w, h, depth){
  //Glitch ring on the X axis
  if(depth > 2){
    for(let i = 0; i < anglesList.length; i++){
      push();

      fill(random(255), random(255), random(255));

      rotateZ(anglesList[i]);
      let randomXAxis = random(-100, 100);
      translate(randomXAxis, 0,0);
      plane(w,h);
      drawGlitchX(w*0.5, h*0.5, depth - 1);

      pop();
    }
  }
}

function drawGlitchZ(w, h, depth){
  // Glitch ring on the Z axis
  if(depth > 2){
    for(let i = 0; i < anglesList.length; i++){
      push();

      fill(random(255), random(255), random(255));

      rotateY(anglesList[i]);
      let randomZAxis = random(-100, 100);
      translate(0,0,randomZAxis);
      plane(w,h);
      drawGlitchZ(w*0.5, h*0.5, depth - 1);

      pop();
    }
  }
}

function drawGlitchY(w, h, depth){
  // Glitch ring on the Y axis
  if(depth > 2){
    for(let i = 0; i < anglesList.length; i++){
      push();

      fill(random(255), random(255), random(255));

      rotateX(anglesList[i]);
      let randomYAxis = random(-100, 100);
      translate(0, randomYAxis,0);
      plane(w,h);
      drawGlitchY(w*0.5, h*0.5, depth - 1);

      pop();
    }
  }
}




 
