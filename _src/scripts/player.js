import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import * as level from './level.js';
import * as inventory from './inventory.js';

const camera = new THREE.PerspectiveCamera(50, document.getElementById('game').clientWidth / document.getElementById('renderer').clientHeight, 0.1, 1000);
const object = new THREE.Object3D();
var toPosition = new THREE.Vector3();
var toRotation = new THREE.Vector3();
var playerPosition = [0,0];
var playerDirectionReal = 0;
var health = 100;
var levelPosition = [];

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    Enter: false,
};

window.addEventListener('keydown', (event) => {
    if (keys.hasOwnProperty(event.code)) keys[event.code] = true;
    changePosition();
});
window.addEventListener('keyup', (event) => {
    if (keys.hasOwnProperty(event.code)) keys[event.code] = false;
});

function setHealth(num){
    health = num
}

function spawn(_scene, _position){
    _scene.add(object);
    object.add(camera);
    playerPosition[0] = _position[0]
    playerPosition[1] = _position[1]
    level.levelMatrix[playerPosition[0]][playerPosition[1]] = 2
    camera.position.setY(4);
    object.rotation.y = 270 * (Math.PI / 180)
    toRotation.y = -(playerDirectionReal*90) * (Math.PI/180)
    toPosition.x = playerPosition[0]*16
    toPosition.z = playerPosition[1]*16
    inventory.slotSelected(0)
    inventory.resetGUI()
}


function changePosition() {
    const directionMap = [
        { x: 1, z: 0 },  // Case 0 (East)
        { x: 0, z: 1 },  // Case 1 (North)
        { x: -1, z: 0 }, // Case 2 (West)
        { x: 0, z: -1 }  // Case 3 (South)
    ];

    const updatePosition = (dx, dz) => {
        const newX = playerPosition[0] + dx;
        const newZ = playerPosition[1] + dz;

        if (level.levelMatrix[newX]?.[newZ] === 0) {
            playerPosition[0] = newX;
            playerPosition[1] = newZ;
        }
    };

    // Reset current position in the level matrix
    level.levelMatrix[playerPosition[0]][playerPosition[1]] = 0;
    
    // Update direction
    if (keys.ArrowLeft) playerDirectionReal--;
    if (keys.ArrowRight) playerDirectionReal++;
    const playerDirection = ((playerDirectionReal % 4) + 4) % 4; // Normalize direction (0-3)

    // Handle movement
    if (keys.ArrowUp) {
        updatePosition(directionMap[playerDirection].x, directionMap[playerDirection].z);
    }
    if (keys.ArrowDown) {
        updatePosition(-directionMap[playerDirection].x, -directionMap[playerDirection].z);
    }
    // Handle interaction
    if (keys.Enter) {
        const interactX = playerPosition[0] + directionMap[playerDirection].x;
        const interactZ = playerPosition[1] + directionMap[playerDirection].z;

        const target = level.levelMatrix[interactX]?.[interactZ];
        console.log(target)
        if (typeof target === "object") {
            switch (target.constructor.name) {
                case 'itemBase':
                    inventory.changeInventory(inventory.selectedInventorySlot, target.item);
                    target.destroy();
                    break;
                case 'enemyBase':
                    target.destroy();
                    break;
            }
        }
    }

    // Update level matrix and target positions
    level.levelMatrix[playerPosition[0]][playerPosition[1]] = 2;
    toRotation.y = -(playerDirectionReal * 90) * (Math.PI / 180);
    toPosition.x = playerPosition[0] * 16;
    toPosition.z = playerPosition[1] * 16;
}

// Smooth movement
function movePosition(){
    object.position.x += (toPosition.x - object.position.x) / 10;
    object.position.z += (toPosition.z - object.position.z) / 10;
    camera.rotation.y += (toRotation.y - camera.rotation.y) / 10;
}

export { object, camera, spawn, movePosition, health, setHealth, playerPosition};