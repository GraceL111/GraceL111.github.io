// Capstone Project
// Name: Grace Li
// Date: May 11, 2025
// 

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ObjectLoader } from 'three/examples/jsm/loaders/OBJLoader.js';


// ----------Set up-----------
const width = window.innerWidth;
const height = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);  
camera.position.set(20, 20, 20);
// fov = zoom in or out      aspect = rendering space    near & far = rendering limitations

scene.background = new THREE.Color('orange');

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
const canvas = renderer.domElement    // HTML
document.body.appendChild(canvas);

const controls = new OrbitControls(camera, canvas);


// --------Light -----------
const light = new THREE.AmbientLight( 0x404040 );
scene.add(light);

// -------create object ------------




function animate(){       // draw()
  requestAnimationFrame(animate);
  controls.update();


  
  renderer.render(scene, camera);
}
animate();
