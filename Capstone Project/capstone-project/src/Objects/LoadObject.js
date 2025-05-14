import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'
import { scene } from '../main.js'

// -------Load FBX -------

const OBJloader = new OBJLoader();
const birchTree1URL = 'assets/environmentOBJ/BirchTree_1.obj'
const mtlloader = new MTLLoader();
const bt1_MTLURL = 'assets/environmentOBJ/BirchTree_1.mtl'

export function loadBirchTree1(){
    mtlloader.load(
        bt1_MTLURL,
        function(mtl){
            const bt1MTL = mtl;   // this is a group of the mtl file
            bt1MTL.preload();    // ensure material are loaded
            OBJloader.setMaterials(bt1MTL);
        }
    )
}








export function loadMTL(){
    mtlloader.load(
        bt1_MTLURL, 
    function(mtl){
        const bt1_MTL = mtl;
        OBJloader.setMaterials(bt1_MTL);
        OBJloader.load(birchTree1URL, function(birchTree){
            scene.add(birchTree);
                }
            );
        }
    );
}

export function loadOBJ(){
    OBJloader.load(
    birchTree1URL, 
    function(obj){
        const birchTree = obj;
        
        birchTree.scale.set(10, 10, 10);
        birchTree.position.set(0,0,0);
        console.log(birchTree);
        // const helperBox = new THREE.BoxHelper(tree, 0xffff00);
        // scene.add(helperBox);
        scene.add(birchTree);
        }
    );

}
