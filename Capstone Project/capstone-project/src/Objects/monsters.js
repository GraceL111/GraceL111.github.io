// Load monsters and movements

import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { scene } from '../main.js'

const monstersList = [
    '/assets/monsters/Birb.gltf',
    '/assets/monsters/BlueDemon.gltf',
    '/assets/monsters/Cactoro.gltf',
    '/assets/monsters/Demon.gltf',
    '/assets/monsters/Dino.gltf',
    '/assets/monsters/Fish.gltf',
    '/assets/monsters/Frog.gltf',
    '/assets/monsters/MushroomKing.gltf',
    '/assets/monsters/Ninja.gltf',
    '/assets/monsters/Orc.gltf',
]

export class Monsters{
    // constructor
    constructor(){

    }

    // methods
    load(){
        const gltfLoader = new GLTFLoader();
        for(let url of monstersList){
            gltfLoader.load(
                url,
                function(gltf){
                    const monster1 = gltf.scene;
                    scene.add(monster1);
                    let ranNumX = THREE.MathUtils.randFloat(-40, 40);
                    let ranNumZ = THREE.MathUtils.randFloat(-40, 40);
                    let ranRotation = THREE.MathUtils.randFloat(0, 360);
                    monster1.rotation.y = THREE.MathUtils.degToRad(ranRotation);
                    monster1.position.set(ranNumX, 0, ranNumZ);
                }
            )
        }
    }

}
