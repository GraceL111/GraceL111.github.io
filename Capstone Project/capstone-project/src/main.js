// Capstone Project
// Name: Grace Li
// Date: May 11, 2025
// 

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { loadBirchTree1, loadMonk } from './Objects/LoadObject';


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
const light = new THREE.AmbientLight(0xffffff, 100.5);
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
let lastTreePos = [0, 0];
let treePos = [];

let ranPosX = THREE.MathUtils.randInt(-50, 35);
let ranPosZ = THREE.MathUtils.randInt(-50, 35);
treePos.push([ranPosX, ranPosZ]);
loadBirchTree1(ranPosX, ranPosZ);
for(let i = 0; i < 4;){
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
    //console.log(t);
  }


  if(closesTree >= 30){
    console.log(closesTree);
    treePos.push([ranPosX, ranPosZ]);
    loadBirchTree1(ranPosX, ranPosZ);
    lastTreePos = [ranPosX, ranPosZ];
    i++;
  }

}

loadMonk();







function animate(){       // draw()
  requestAnimationFrame(animate);
  controls.update();

  
  renderer.render(scene, camera);
}
animate();
