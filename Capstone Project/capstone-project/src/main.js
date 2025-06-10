// Capstone Project
// Name: Grace Li
// Date: May 11, 2025
// 

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { loadTrees, treeObjects, groundObjects, loadGroundObj } from './Objects/LoadObject';
import { Monsters, monstersObjects, monstersAnimation, monsterRandAng } from './Objects/monsters';


// ----------Set up-----------
const width = window.innerWidth;
const height = window.innerHeight;
export const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);  
camera.position.set(50, 50, 50);
// fov = zoom in or out      aspect = rendering space    near & far = rendering limitations

const cameraHelper = new THREE.CameraHelper(camera);
scene.add(cameraHelper);

scene.background = new THREE.Color(0x87ceeb);

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
const canvas = renderer.domElement    // HTML
document.body.appendChild(canvas);
const controls = new OrbitControls(camera, canvas);


// --------Light -----------
const light = new THREE.AmbientLight(0xffffff, 40);
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
const monkURL = '/assets/Rogue.gltf';
export let monkGLTF;
let modelLoaded;
let mixer;
let idle, walk, run, roll, attacks, hit, death;
let currentAction;

function loadMonk(){
    GLTFloader.load(
        monkURL, 
        function(gltf){
            modelLoaded = false;   // preload()
            monkGLTF = gltf.scene;
            monkGLTF.rotation.y = THREE.MathUtils.degToRad(180);

            scene.add(monkGLTF);

            // --------GLTF Animations -----------
            // Mixer is a built-in class from the Three.js library that controls 
            // the playback of animations
            mixer = new THREE.AnimationMixer(monkGLTF);
            console.log(gltf.animations);
            // Animation library:
            idle = mixer.clipAction(gltf.animations[4]);
            walk = mixer.clipAction(gltf.animations[11]);
            run = mixer.clipAction(gltf.animations[10]);
            roll = mixer.clipAction(gltf.animations[9]);
            attacks = mixer.clipAction(gltf.animations[2]);
            hit = mixer.clipAction(gltf.animations[7]);
            death = mixer.clipAction(gltf.animations[3]);

            monkGLTF.userData.dead = false;

            currentAction = idle;
            modelLoaded = true;
        }
    )
}

// -------Switch Action ------

function switchAction(newAction){
  if(currentAction !== newAction){
    currentAction.fadeOut(0.2);
    newAction.reset().fadeIn(0.5).play();
    currentAction = newAction;
  }
}

// -------Make KeyPressed Listerner ---------
const keys = {};

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

//  ----- Add mousePressed Listener -------
window.addEventListener('mousedown', 
  function(){
    if(monkGLTF.userData.dead === false){
      switchAction(attacks);
      attack();
    }
  }
);

window.addEventListener('mouseup', 
  function(){
  }
);


function thirdPersonCam(){
    if(modelLoaded === true){

    let cameraYOffset = new THREE.Vector3(-2, 6, -15);
    let camVelOffset = new THREE.Vector3(0, 1, 0);
    cameraYOffset.applyAxisAngle(camVelOffset, monkGLTF.rotation.y);

    let camPos = monkGLTF.position.clone().add(cameraYOffset);
    camera.position.set(camPos.x, camPos.y, camPos.z);

    let sideOffSet = new THREE.Vector3(-2, 3, 0);
    sideOffSet.applyAxisAngle(camVelOffset, monkGLTF.rotation.y);
    let shoulderTarget = monkGLTF.position.clone().add(sideOffSet);
    
    camera.lookAt(shoulderTarget);
  }
}

function characterControl(){
  let moved = false;   // control animations

  let vel = new THREE.Vector3(0, 0, 0.1);

  if(modelLoaded === true){
    if(keys['shift'] === true){
      vel.z = 0.25;
    }
    else{
      vel.z = 0.1;
    }

    let vecFowardOffset = new THREE.Vector3(0, 1, 0);
    vel.applyAxisAngle(vecFowardOffset, monkGLTF.rotation.y);

    let nextPos = monkGLTF.position.clone().add(vel);

    if(keys['w'] === true && isInBound(nextPos) && monkGLTF.userData.dead === false){  // Move foward
      //console.log(vel);
      monkGLTF.position.add(vel);
      moved = true;
    }

    let backVel = new THREE.Vector3(0, 0, -0.1);
    let vecBackOffset = new THREE.Vector3(0, 1, 0);
    backVel.applyAxisAngle(vecBackOffset, monkGLTF.rotation.y);

    if(keys['s'] === true && isInBound(nextPos) && monkGLTF.userData.dead === false){      // Move backwards
      monkGLTF.position.add(backVel);
      moved = true;
    }
    if(keys['a'] === true && monkGLTF.userData.dead === false){    // rotate left
      monkGLTF.rotation.y += 0.05;
      moved = true;
    }
    if(keys['d'] === true && monkGLTF.userData.dead === false){    // rotate right
      monkGLTF.rotation.y -= 0.05;
      moved = true;
    }




    if(moved === true){
      if(keys['shift'] === true){
        if(!keys['s']){
          switchAction(run);
        }
      }
      else{
        switchAction(walk);
      }
    }
    else{
      switchAction(idle);
    }
  }
}

function isInBound(pos){
  if(pos.x >= 50 || pos.x <= -50 || pos.z >= 50 || pos.z <= -50){
    return false;
  }
  else{
    return true;
  }

}

//----------- Monster Attack system -----------\

export let playerStats = {
  playerHealth: 6,
  playerStamina: 10,
}

let startHit = 3; // Start's at 50% health bar


function calcMonsterDist(){
  if(modelLoaded === true){
    for(let i = 0; i< monstersObjects.length; i++){
      const monster = monstersObjects[i];
      const anims = monstersAnimation[i];
      let dis = monster.position.distanceTo(monkGLTF.position);
      //console.log(monstersObjects[i].name + dis);

      // turn to face player
      if(dis < 15 && monstersObjects[i].userData.dead !== true && monkGLTF.userData.dead === false){
        let disX = monkGLTF.position.x - monster.position.x;
        let disZ = monkGLTF.position.z - monster.position.z;
        let targetAngle = Math.atan2(disX, disZ);
        monster.rotation.y = THREE.MathUtils.lerp(monster.rotation.y, targetAngle, 1);   // smooth transition between 2 values (rotation y)

        // Move towards
        if(dis < 15 && monster.userData.state === 'walk'){
          let velMonster = new THREE.Vector3(0, 0, 0.05);
          let velMonsterOffset = new THREE.Vector3(0, 1, 0);
          velMonster.applyAxisAngle(velMonsterOffset, monster.rotation.y);
          monster.position.add(velMonster);
        }

        // if(monster.position.x <= -50 || monster.position.x >= 50 || 
        //   monster.position.z <= -50 || monster.position.z >= 50){
        //   monster.rotation.y += THREE.MathUtils.degToRad(180);
        // }
      }
      if(dis > 15 && monstersObjects[i].userData.dead !== true){
        monster.rotation.y = monsterRandAng[i];
      }

      // attack animation
      if(dis < 3 && monster.userData.dead === false && monkGLTF.userData.dead === false){
        if(monster.userData.state !== 'attack'){
          anims.walk.stop();
          anims.attack.reset().play();
          monster.userData.state = 'attack';
        }

        if(playerStats.playerHealth <= 0){
          playerDeath();
          monster.userData.continue = false;
          playerStats.playerHealth = 6;
        }

      }
      else if(dis >= 3 && monster.userData.state !== 'walk' && monkGLTF.userData.dead === false){
        anims.attack.stop();
        anims.walk.reset();
        anims.walk.play();
        monster.userData.state = 'walk';
      }

      // stopping animation
      if(justDied === true){
        for(let i = 0; i < monstersObjects.length; i++){
          const monster = monstersObjects[i];
          const anims = monstersAnimation[i];

          if(!monster.userData.dead === true){
            anims.attack.stop();
            anims.walk.stop();
          }
        }
        justDied = false;
      }
    }
  }
}

let justDied = false;

function playerDeath(){
  monkGLTF.userData.dead = true;
  death.reset();
  death.setLoop(THREE.LoopOnce);
  death.clampWhenFinished = true;
  death.play();

  justDied = true;
}

// ---------- HTML Section-------
// Health Bar:

const healthBar = document.getElementById('health_bar');
const staminaBar = document.getElementById('stamina_bar');

let totalHealth = playerStats.playerHealth;
let totalStamina = playerStats.playerStamina;


function updateHealthBar(){
  let hits = totalHealth - startHit;
  let healthPercentage = (hits/totalHealth) * 100;
  healthBar.style.width = `${healthPercentage}%`;
}

export function damage(){
  if(startHit < totalHealth){
    startHit++;
    updateHealthBar();
    console.log(`${startHit}`);
  }
}




// --------- Attack system ---------
const raycaster = new THREE.Raycaster();   // used for mouse picking
const pointer = new THREE.Vector2(0, 0); 
const damageList = [];


function attack(){
  let foundName;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(monstersObjects);
  if(intersects[0] !== undefined){
    let selectedName = intersects[0].object.name;
    
    for(let i = 0; i < monstersObjects.length; i++){
      if(monstersObjects[i].name === selectedName){
        foundName = i;
      }
    }

    let dis = monstersObjects[foundName].position.distanceTo(monkGLTF.position);
    
    if(dis < 4){
      //console.log('counted');
      if(intersects.length > 0){
        countHit(intersects[0].object.name, 1, intersects[0].object);
      }
    }
  }
}

function countHit(monster, hit, monsterObj){
  let found =false;
  for(let d = 0; d < damageList.length; d++){
    if(damageList[d][0] === monster){
      if(damageList[d][1] >= 5){
        damageList[d][1] = 0;
        playMonsterDeath(monsterObj);
      }
      else{
        damageList[d][1] += hit;
      }
      found = true;
      break;
    }
  }

  if(!found){
    damageList.push([monster, hit]);
  }

  console.log(damageList);
}



// -----------  Monsters Section----------
const monsters = new Monsters();
let loaded = false;
monsters.load();
loaded = true;


function playMonsterDeath(monster){
  const mixer = new THREE.AnimationMixer(monster);
  let selectedMonster = monster.name;
  for(let i = 0; i < monstersAnimation.length; i++){
    if(selectedMonster === monstersAnimation[i].name){
      let deathAction = monstersAnimation[i].death;
      monstersAnimation[i].walk.stop();
      deathAction.reset();
      deathAction.setLoop(THREE.LoopOnce);
      monstersAnimation[i].attack.stop();
      deathAction.clampWhenFinished = true;
      monstersObjects[i].userData.dead = true;
      deathAction.play();
    }
  }
}








// ---------Function Declare Center ---------
loadMonk();
placeAllTrees();
placeAllGroundObj();

const clock = new THREE.Clock();

function animate(){       // draw()
  requestAnimationFrame(animate);

  // Third Person Camera
  thirdPersonCam();


  // Update Animation
  const timeDelta = clock.getDelta();
  if(mixer){
    mixer.update(timeDelta);
  }

  // monster animation
  for(let a of monstersAnimation){
    a.mixer.update(timeDelta);
  }

  // user control
  characterControl();

  //monsters
  if(loaded === true && modelLoaded === true){
    monsters.update();
    calcMonsterDist();
    if(monkGLTF.userData.dead === true){
      idle.stop();
      idle.reset();
    }
  }




  
  renderer.render(scene, camera);
}
animate();
