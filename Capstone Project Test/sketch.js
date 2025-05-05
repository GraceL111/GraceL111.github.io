// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let tree, axe, alien;
let x = 0;
let y = 10;
let z = 20;

function setup() {
  createCanvas(500, 450, WEBGL);
  angleMode(DEGREES);
}

function preload(){
  tree = loadModel("assets/tree1.obj",true);
  axe = loadModel('assets/axe.obj', true);
  alien = loadModel('assets/Alien.obj', true);
}

function draw() {
  background(135, 206, 250);
  loadPlain();
  orbitControl();
  drawCharacter();

  push();
  translate(x, y, z);
  rotateX(180);
  noStroke();
  model(alien);
  pop();
}

function loadPlain(){
  push();
  rotateX(90);
  fill(100, 200, 100);
  noStroke();
  plane(1000, 1000);
  pop();
}

function drawCharacter(){
  if(keyIsDown(87) === true){  // w
    z -= 2;
  }
  if(keyIsDown(65) === true){   // a
    x -= 2;
  }
  if(keyIsDown(83) === true){   // s
    z += 2;
  }
  if(keyIsDown(68) === true){   // d
    x += 2;
  }
  if(keyIsDown(69) === true){   // e
    y -= 2;
  }
  if(keyIsDown(81) === true){   // q
    y += 2;
  }


  
}
