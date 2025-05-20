// Capstone Project
// Name: Grace Li
// Date: May 11, 2025
// 

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { loadTrees, treeObjects, groundObjects, loadGroundObj } from './Objects/LoadObject';
import { deltaTime } from 'three/src/nodes/TSL.js';


// ----------Set up-----------
const width = window.innerWidth;
const height = window.innerHeight;
export const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);  
camera.position.set(100, 100, 100);
// fov = zoom in or out      aspect = rendering space    near & far = rendering limitations

scene.background = new THREE.Color(0x87ceeb);

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
const canvas = renderer.domElement    // HTML
document.body.appendChild(canvas);

const controls = new OrbitControls(camera, canvas);


// --------Light -----------
const light = new THREE.AmbientLight(0xffffff, 50);
scene.add(light);
const directionLight = new THREE.DirectionalLight(0xffffff, 1);
directionLight.position.set(50, 50, 50);
scene.add(directionLight);

// ---------Create Plane ------------
let planeW = 100;
let planeH = 100;
const planeGeometry = new THREE.PlaneGeometry(planeW, planeH);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = THREE.MathUtils.degToRad(90);
scene.add(plane);

//------------ Load environment -----------------
let treePos = [];     // Load Trees
let groundObjPos = [];    //Load Ground Objects

let ranPosX = THREE.MathUtils.randInt(-50, 35);
let ranPosZ = THREE.MathUtils.randInt(-50, 35);
treePos.push([ranPosX, ranPosZ]);
loadTrees(treeObjects[0][1], treeObjects[0][0], ranPosX, ranPosZ);

let ranPosXG = THREE.MathUtils.randInt(-50, 35);
let ranPosZG = THREE.MathUtils.randInt(-50, 35);
groundObjPos.push([ranPosXG, ranPosZG]);
loadGroundObj(treeObjects[0][1], treeObjects[0][0], ranPosX, ranPosZ);


function placeAllTrees(){
  for(let i = 0; i < treeObjects.length; i++){
    let objURL = treeObjects[i][0];
    let mtlURL = treeObjects[i][1];

    let count = 0;
    let attempt = 0;
    let maxAttempt = 200;

    while(count < 2 && attempt < maxAttempt){
      attempt ++;
      ranPosX = THREE.MathUtils.randInt(-50, 35);
      ranPosZ = THREE.MathUtils.randInt(-50, 35);
      let closesTree = -1;

      for(let t of treePos){
        let disX = ranPosX - t[0];
        let disZ = ranPosZ - t[1];
        let treeDistance = Math.sqrt((disX * disX) + (disZ * disZ));
        if(treeDistance < closesTree || closesTree === -1){
          closesTree = treeDistance;
        }
      }

      if(closesTree >= 30){
        treePos.push([ranPosX, ranPosZ]);
        loadTrees(mtlURL, objURL, ranPosX, ranPosZ);
        count++;
      }
    }
    if(attempt >= maxAttempt){
      console.log('too many attempts');
    }
  }
}

function placeAllGroundObj(){
  for(let i = 0; i < groundObjects.length; i++){
    let objURL = groundObjects[i][0];
    let mtlURL = groundObjects[i][1];

    let count = 0;
    let attempt = 0;
    let maxAttempt = 200;

    while(count < 2 && attempt < maxAttempt){
      attempt ++;
      ranPosXG = THREE.MathUtils.randInt(-50, 35);
      ranPosZG = THREE.MathUtils.randInt(-50, 35);
      let closesGObj = -1;

      for(let t of groundObjPos){
        let disXG = ranPosXG - t[0];
        let disZG = ranPosZG - t[1];
        let groundDistance = Math.sqrt((disXG * disXG) + (disZG * disZG));
        if(groundDistance < closesGObj || closesGObj === -1){
          closesGObj = groundDistance;
        }
      }

      if(closesGObj >= 30){
        groundObjPos.push([ranPosXG, ranPosZG]);
        loadGroundObj(mtlURL, objURL, ranPosXG, ranPosZG);
        count++;
      }
    }
    if(attempt >= maxAttempt){
      console.log('too many attempts');
    }
  }
}


// ---------- Character Movement -----------
// ---------Load Character -----------
const GLTFloader = new GLTFLoader();
const monkURL = '/assets/Monk.gltf';
let monkGLTF;
let modelLoaded;
let mixer;
let idle, walk, run, roll;
let currentAction;

function loadMonk(){
    GLTFloader.load(
        monkURL, 
        function(gltf){
            modelLoaded = false;
            monkGLTF = gltf.scene;
            monkGLTF.rotation.y = THREE.MathUtils.degToRad(180);

            scene.add(monkGLTF);

            // --------GLTF Animations -----------
            console.log(gltf.animations);
            // Mixer is a built-in class from the Three.js library that controls 
            // the playback of animations
            mixer = new THREE.AnimationMixer(monkGLTF);

            // Animation library:
            idle = mixer.clipAction(gltf.animations[3]);
            walk = mixer.clipAction(gltf.animations[10]);
            run = mixer.clipAction(gltf.animations[9]);
            roll = mixer.clipAction(gltf.animations[8]);

            idle.play();

            currentAction = idle;
            modelLoaded = true;
        }
    )
}

// -------Switch Action ------

function switchAction(newAction){
  if(currentAction !== newAction){
    currentAction.fadeOut(0.2);
    newAction.reset().fadeIn(0.2).play();
    currentAction = newAction;
  }
}

// -------Make KeyPressed Function ---------
const keys = {};
let characterSpeed = 0.05;

window.addEventListener('keydown',
  function(event){    // access property
    const key = event.key.toLowerCase();
    keys[key] = true;     // Ex: keys['w'] = true when w/W is pressed
  }
);

window.addEventListener('keyup', 
  function(event){
    const key = event.key.toLowerCase();
    keys[key] = false;     // Ex: keys['w'] = false when w/W is relesed
  }
);






// ---------Function Declare Center ---------
loadMonk();
placeAllTrees();
placeAllGroundObj();

const clock = new THREE.Clock();

function animate(){       // draw()
  requestAnimationFrame(animate);
  controls.update();

  // Update Animation
  const timeDelta = clock.getDelta();
  if(mixer){
    mixer.update(timeDelta);
  }


  let moved = false;   // control animations

  // -------- Character Controls --------
  if(modelLoaded === true){
    if(keys['shift'] === true){
      characterSpeed = 0.10;
    }
    else{
      characterSpeed = 0.05;
    }
    if(keys['w'] === true){  // Move foward
      monkGLTF.rotation.y = THREE.MathUtils.degToRad(180);
      monkGLTF.position.z -= characterSpeed;
      moved = true;
    }
    if(keys['s'] === true){
      monkGLTF.rotation.y = THREE.MathUtils.degToRad(0);
      monkGLTF.position.z += characterSpeed;
      moved = true;
    }
    if(keys['a'] === true){
      monkGLTF.rotation.y = THREE.MathUtils.degToRad(270);
      monkGLTF.position.x -= characterSpeed;
      moved = true;
    }
    if(keys['d'] === true){
      monkGLTF.rotation.y = THREE.MathUtils.degToRad(90);
      monkGLTF.position.x += characterSpeed;
      moved = true;
    }
    // if(keys['w'] && keys['a'] === true){
    //   monkGLTF.rotation.y = THREE.MathUtils.degToRad(210);
    //   monkGLTF.position.z -= characterSpeed;
    //   moved = true;
    // }
    // if(keys['s'] && keys['d'] === true){
    //   monkGLTF.rotation.y = THREE.MathUtils.degToRad(60);
    //   monkGLTF.position.z -= characterSpeed;
    //   moved = true;
    // }
    // if(keys['w'] && keys['d'] === true){
    //   monkGLTF.rotation.y = THREE.MathUtils.degToRad(120);
    //   monkGLTF.position.z -= characterSpeed;
    //   moved = true;
    // }



    if(moved === true){
      if(keys['shift'] === true){
        switchAction(run);
      }
      else{
        switchAction(walk);
      }
    }
    else{
      switchAction(idle);
    }
  }

  
  renderer.render(scene, camera);
}
animate();
