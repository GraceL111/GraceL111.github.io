// Capstone Project
// Name: Grace Li
// Date: May 11, 2025
// 

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { loadOBJ, loadMTL } from './Objects/LoadObject';


// ----------Set up-----------
const width = window.innerWidth;
const height = window.innerHeight;
export const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);  
camera.position.set(20, 20, 20);
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
directionLight.position.set(10, 20, 10);
scene.add(directionLight);

// ---------Create Plane ------------
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = THREE.MathUtils.degToRad(90);
scene.add(plane);

 loadOBJ();
 loadMTL();


function animate(){       // draw()
  requestAnimationFrame(animate);
  controls.update();

  
  renderer.render(scene, camera);
}
animate();
