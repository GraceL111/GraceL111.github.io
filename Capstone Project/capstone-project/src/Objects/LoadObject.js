import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { scene } from '../main.js'

// -------Load FBX -------

const loader = new FBXLoader();
const birchTree_3URL = '/assets/BirchTree_3.fbx'

export function loadTree(){
    loader.load(
    birchTree_3URL, 
    function(fbx){
        const tree = fbx;
        tree.scale.set(10, 10, 10);
        tree.position.set(0,0,0);
        console.log(tree);

        scene.add(tree);
        }
    )

}
