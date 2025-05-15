// Capstone Project
// Name: Grace Li
// Date: May 11, 2025
// 

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { loadBirchTree1, treePos } from './Objects/LoadObject';


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
const light = new THREE.AmbientLight(0xffffff, 0.5);
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
console.log(treePos)

//------------ Load environment -----------------
let lastTreePos = [[0, 0]];
let treeDistance = treePos[0][0] - lastTreePos[0][0]
console.log(treeDistance);
for(let i = 0; i < 5; i++){
  if(treeDistance >= 10 || treeDistance === 0){
    loadBirchTree1();
  }
  else{
    i--;
  }
}




function animate(){       // draw()
  requestAnimationFrame(animate);
  controls.update();

  
  renderer.render(scene, camera);
}
animate();
