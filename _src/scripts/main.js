import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
import * as player from './player.js';
import * as level from './level.js';
import * as itemManager from './itemManager.js';
import * as enemyManager from './enemyManager.js';


// Scene
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#renderer'),
});
renderer.setSize(document.getElementById('game').clientWidth, document.getElementById('renderer').clientHeight);
scene.fog = new THREE.Fog( 0x000000, 10, 45 );

// Model Loaders
const gltfLoader = new GLTFLoader();

// Background
const bg = new THREE.MeshBasicMaterial( { color: 0x000000 } );
scene.background = bg;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Level generation
level.generate(10);
level.load(scene);
enemyManager.spawnEnemy(scene, enemyManager.enemyData.rat, [5,5])
itemManager.spawnItem(scene, itemManager.itemData.potion, [4, 3])

// Player
player.spawn(scene, [1,1]);

// Per-Frame/Animate/Step
let frameCount = 0;
function animate() {
  frameCount++;
  player.movePosition()
  requestAnimationFrame( animate );
  
    level.levelMatrix.forEach(row => {
        row.forEach(enemy => {
            if (enemy && typeof enemy.animate === "function") {
              enemy.animate();
            }
            if (enemy && typeof enemy === "object" && enemy.constructor.name === "enemyBase") {
              if (frameCount % 60 === 0){
                enemy.findPath(player.playerPosition)
              }
            }
        });
    });

  renderer.render( scene, player.camera );
}
animate()

export{scene, frameCount}