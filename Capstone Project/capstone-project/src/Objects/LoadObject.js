import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'
import { scene } from '../main.js'

// -------Load OBJ -------

const OBJloader = new OBJLoader();
const birchTree1URL = '/assets/environmentOBJ/BirchTree_1.obj'
const mtlloader = new MTLLoader();
const bt1_MTLURL = '/assets/environmentOBJ/BirchTree_1.mtl'



export function loadBirchTree1(x, z){
    mtlloader.load(
        bt1_MTLURL,
        function(mtl){
            const bt1MTL = mtl;   // this is a group of the mtl file
            mtl.preload();    // ensure material are loaded
            OBJloader.setMaterials(bt1MTL);
            OBJloader.load(
                birchTree1URL, 
                function(obj){
                    const birchTree_1 = obj;
                    birchTree_1.scale.set(5, 5, 5);
                    birchTree_1.position.set(x, 0, z);
                    scene.add(birchTree_1);

                }
            );
        }
    )
}






// ---------Load GLTF -----------
const GLTFloader = new GLTFLoader();
const monkURL = '/assets/Monk.gltf';

export function loadMonk(){
    GLTFloader.load(
        monkURL, 
        function(gltf){
            const monkGLTF = gltf.scene;


            scene.add(monkGLTF);
        }
    )
}
