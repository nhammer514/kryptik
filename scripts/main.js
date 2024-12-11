import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
import * as player from './player.js';

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

// Floor
const floorTexture = new THREE.TextureLoader().load('images/ground.png');
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(100, 100);
floorTexture.magFilter = THREE.NearestFilter;
floorTexture.minFilter = THREE.LinearMipMapLinearFilter;

const floorGeometry = new THREE.PlaneGeometry(1000,1000);

const floorMaterial = new THREE.MeshStandardMaterial({
  map: floorTexture,
  side: THREE.DoubleSide,
})

const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
floorMesh.rotation.x = -Math.PI / 2;

scene.add(floorMesh);

// Player
player.spawn(scene);

// Per-Frame/Animate/Step
function animate() {
  player.movePosition()
  requestAnimationFrame( animate );
  renderer.render( scene, player.camera );
}
animate()