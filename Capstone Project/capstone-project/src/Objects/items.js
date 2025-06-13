import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { scene } from '../main.js';

let storeHealth = false;
let storeStam = false;

const health = ['/assets/items/Potion2_Filled.obj', '/assets/items/Potion2_Filled.mtl'];
const stamina = ['/assets/items/Potion4_Filled.obj', '/assets/items/Potion4_Filled.mtl'];

export function loadHealth(){
    const objLoader = new OBJLoader();
    const mtlLoader = new MTLLoader();

    mtlLoader.load()
}

export function loadStam(){

}