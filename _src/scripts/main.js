import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
import * as player from './player.js';
import * as level from './level.js';

// Scene
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#renderer'),
});
renderer.setSize(document.getElementById('game').clientWidth, document.getElementById('game').clientHeight);

// Model Loaders
const gltfLoader = new GLTFLoader();

// Background
const bg = new THREE.MeshBasicMaterial( { color: 0x000000 } );
scene.background = bg;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Player
level.generate(10);
level.load(scene);
player.spawn(scene);

// Per-Frame/Animate/Step
function animate() {
  player.movePosition()
  requestAnimationFrame( animate );
  renderer.render( scene, player.camera );
}
animate()