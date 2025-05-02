import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';





const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);        // add a canvas

scene.background = new THREE.Color(0xff9900);      // background color
camera.position.z = 5;       // reposition the camera on the z axis

const clock = new THREE.Clock();

let idle, run, walk;
let currentAction;

// ----- Add light -----------
const light = new THREE.DirectionalLight(0x00ff00, 100);
light.position.set(5, 5, 5);
scene.add(light);


// ------ Create Plane -----------
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = THREE.MathUtils.degToRad(90);

scene.add(plane);



//----------- Loading glTF file ---------

let model;
let modelLoaded;
let mixer;

const loader = new GLTFLoader();
const url = '/assets/Wizard.gltf';
loader.load(url, (gltf) => {
    modelLoaded = false;
    model = gltf.scene;
    model.scale.set(0.90, 0.90, 0.90);
    model.rotation.y = THREE.MathUtils.degToRad(180);
    scene.add(model);

    // -------- gltf animation ----------

    // Mixer is a helper object that controls the playbacks of animations,
    // it keeps track of time and updates the animation frame-by-frame
    mixer = new THREE.AnimationMixer(model);
    console.log(gltf.animations);
    idle = mixer.clipAction(gltf.animations[1]);
    walk = mixer.clipAction(gltf.animations[14]);
    run = mixer.clipAction(gltf.animations[9]);

    idle.play();
    currentAction = idle;
    modelLoaded = true;
});



function switchActions(newAction){
    if(currentAction !== newAction){
        currentAction.fadeOut(0.2);
        newAction.reset().fadeIn(0.2).play();
        currentAction = newAction;
    }
}


// -----------character movement -----------
// Create an object to track which keys are pressed
const keys = {};
let characterSpeed = 0.05;

// When a key is pressed down
window.addEventListener('keydown', function(event) {
  const key = event.key.toLowerCase(); // get the key as lowercase
  keys[key] = true; // mark that key as "pressed"
  console.log(keys);
});

// When a key is released
window.addEventListener('keyup', function(event) {
  const key = event.key.toLowerCase(); // get the key as lowercase
  keys[key] = false; // mark that key as "not pressed"
});



// --------animate object -----------
function animate(){
    requestAnimationFrame(animate);

    controls.update();

    const delta = clock.getDelta();
    if(mixer){
        mixer.update(delta);
    }


    if(modelLoaded && model){        // making sure everything is loaded
        if(keys['shift'] === true){
            characterSpeed = 0.10;
        }
        else{
            characterSpeed = 0.05;
        }

        let moved = false;

        if(keys['w'] === true){
            model.position.z -= characterSpeed;
            moved = true;
            model.rotation.y = THREE.MathUtils.degToRad(180);
        }
        if(keys['s'] === true){
            model.position.z += characterSpeed;
            moved = true;
            model.rotation.y = THREE.MathUtils.degToRad(0);
        }
        if(keys['a'] === true){
            model.position.x -= characterSpeed;
            moved = true;
            model.rotation.y = THREE.MathUtils.degToRad(270);
        }
        if(keys['d'] === true){
            model.position.x += characterSpeed;
            moved = true;
            model.rotation.y = THREE.MathUtils.degToRad(90);
        }

        if(moved ===true){
            if(keys['shift'] === true){
                switchActions(run);
            }
            else{
                switchActions(walk);
            }

        }
        else{
            switchActions(idle);
        }


    const anyKey = keys['w'] || keys['a'] || keys['s'] || keys['d'];
    if(!anyKey){
        switchActions(idle);
    }



    renderer.render(scene, camera);
    }
}

animate();





// // ----------Create an object -------------
// const boxObj = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00} );     // MeshBasicMaterial give only color, they dont care about lights.
// let cube = new THREE.Mesh(boxObj, material);
// scene.add(cube);


// // ------- outline cube ---------
// const edges = new THREE.EdgesGeometry(boxObj);          // get edge from cube
// const lineMaterial = new THREE.LineBasicMaterial({color: 'red'});
// const line = new THREE.LineSegments(edges, lineMaterial);
// scene.add(line);
// cube.add(line);          // keeping line consistant when moving/ rotating




// //renderer.render(scene, camera);        // always put this at the end (rendering after change?)
