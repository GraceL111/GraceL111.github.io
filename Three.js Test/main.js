import * as THREE from 'three';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);        // add a canvas

//scene.background = new THREE.Color(0xff9900);      // background color
camera.position.z = 5;       // reposition the camera on the z axis


// ----------Create an object -------------
const boxObj = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00} );     // MeshBasicMaterial give only color, they dont care about lights.
let cube = new THREE.Mesh(boxObj, material);
scene.add(cube);


// ------- outline cube ---------
const edges = new THREE.EdgesGeometry(boxObj);          // get edge from cube
const lineMaterial = new THREE.LineBasicMaterial({color: 'red'});
const line = new THREE.LineSegments(edges, lineMaterial);
scene.add(line);
cube.add(line);          // keeping line consistant when moving/ rotating

// --------animate object -----------
function animate(){
    requestAnimationFrame(animate);
    
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();


//renderer.render(scene, camera);        // always put this at the end (rendering after change?)
