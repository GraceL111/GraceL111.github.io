// Load monsters and movements

import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { scene } from '../main.js'

export const monstersList = [
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

export const monstersObjects = [];
export const monstersAnimation = [];

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
                    // load random position and rotation
                    const monster = gltf.scene;
                    scene.add(monster);
                    let ranNumX = THREE.MathUtils.randFloat(-40, 40);
                    let ranNumZ = THREE.MathUtils.randFloat(-40, 40);
                    let ranRotation = THREE.MathUtils.randFloat(0, 360);
                    monster.rotation.y = THREE.MathUtils.degToRad(ranRotation);
                    monster.position.set(ranNumX, 0, ranNumZ);
                    // -------get animations-------
                    const mixer = new THREE.AnimationMixer(monster);

                    let animations ={
                            mixer: mixer,
                            walk: mixer.clipAction(gltf.animations[10]),
                            attack: mixer.clipAction(gltf.animations[8]),
                            death: mixer.clipAction(gltf.animations[0]),
                            hit: mixer.clipAction(gltf.animations[2]),
                    };

                    monstersAnimation.push(animations);
                    monstersObjects.push(monster);
                    animations.walk.play();
                }
            )
        }
    }

    update(){
        for (let obj of monstersObjects){
            let velMonster = new THREE.Vector3(0, 0, 0.02);
            let velMonsterOffset = new THREE.Vector3(0, 1, 0);
            velMonster.applyAxisAngle(velMonsterOffset, obj.rotation.y);
            obj.position.add(velMonster);

            // check for boundaries
            const bound = 100;
            if(obj.position.x <= -50 || obj.position.x >= 50 || 
                obj.position.z <= -50 || obj.position.z >= 50){
                    obj.rotation.y += THREE.MathUtils.degToRad(180);
                }

        }
    }

}
