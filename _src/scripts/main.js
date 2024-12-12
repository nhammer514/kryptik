import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
import * as player from './player.js';
import * as level from './level.js';
import * as itemManager from './itemManager.js';
import * as enemyManager from './enemy.js';


// Scene
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#renderer'),
});
renderer.setSize(document.getElementById('game').clientWidth, document.getElementById('game').clientHeight);
scene.fog = new THREE.Fog( 0x000000, 10, 45 );

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
player.spawn(scene, [1,1]);
itemManager.createItem(scene, itemManager.itemData.potion,[3,3]);
itemManager.createItem(scene, itemManager.itemData.potion,[3,4]);
enemyManager.spawnEnemy(scene, enemyManager.enemyData.rat, [4,4])
//enemyManager.destroyEnemy(scene, level.levelMatrix[4][4]);

// Per-Frame/Animate/Step
function animate() {
  player.movePosition()
  requestAnimationFrame( animate );


  
  scene.children.forEach((child) => {
    if (typeof child.animate === "function"){
      child.animate();
    }
  });

    level.levelMatrix.forEach(row => {
        row.forEach(enemy => {
            if (enemy && typeof enemy.animate === "function") {
                enemy.animate();
            }
        });
    });

  renderer.render( scene, player.camera );
}
animate()

export{scene}