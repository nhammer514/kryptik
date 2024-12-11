import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import * as level from './level.js';

var playerPosition = [0,0];
var playerDir = 0
const moveSpeed = 0.1;
const rotateSpeed = 0.02;
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    KeyW: false,
    KeyA: false,
    KeyS: false,
    KeyD: false,
};
window.addEventListener('keydown', (event) => {
    if (keys.hasOwnProperty(event.code)) keys[event.code] = true;
    changePosition();
});
window.addEventListener('keyup', (event) => {
    if (keys.hasOwnProperty(event.code)) keys[event.code] = false;
});

const camera = new THREE.PerspectiveCamera(50, document.getElementById('game').clientWidth / document.getElementById('game').clientHeight, 0.1, 1000);
const object = new THREE.Object3D();
var toPosition = new THREE.Vector3();
var toRotation = new THREE.Vector3();

function spawn(_scene){
    _scene.add(object);
    object.add(camera);
    camera.position.setY(4);
    object.rotation.y = 270 * (Math.PI / 180)
}

function changePosition(){
    var direction = new THREE.Vector3();
    let playerDirReal;
    direction = camera.getWorldDirection(direction);
    level.levelMatrix[playerPosition[0]][playerPosition[1]] = 0

    if (keys.ArrowLeft){
        --playerDir;
    }
    if (keys.ArrowRight){
        ++playerDir;
    }

    if (playerDir < 0){
        playerDirReal = 4 + playerDir%4
    }
    else{
        playerDirReal = playerDir
    }

    switch (((playerDirReal%4))){
        case 0:
            if (keys.ArrowUp){ playerPosition[0] = playerPosition[0] + 1}
            if (keys.ArrowDown){ playerPosition[0] = playerPosition[0] - 1}
            break;
        case 1:
            if (keys.ArrowUp){ playerPosition[1] = playerPosition[1] + 1}
            if (keys.ArrowDown){ playerPosition[1] = playerPosition[1] - 1}
            break;
        case 2:
            if (keys.ArrowUp){ playerPosition[0] = playerPosition[0] - 1}
            if (keys.ArrowDown){ playerPosition[0] = playerPosition[0] + 1}
            break;
        case 3:
            if (keys.ArrowUp){ playerPosition[1] = playerPosition[1] - 1}
            if (keys.ArrowDown){ playerPosition[1] = playerPosition[1] + 1}
            break;
    }
    toRotation.y = -(playerDir*90) * (Math.PI/180)
    toPosition.x = playerPosition[0]*16
    toPosition.z = playerPosition[1]*16
}

function movePosition(){
    object.position.x += (toPosition.x - object.position.x) / 6;
    object.position.z += (toPosition.z - object.position.z) / 6;
    camera.rotation.y += (toRotation.y - camera.rotation.y) / 6;
    //updateDebug()
}

// function updateDebug(){
//     const debugPanel = document.getElementById('debug');
//     level.levelMatrix[playerPosition[0]][playerPosition[1]] = 2
//     debugPanel.children[1].innerHTML = level.drawMapText();
// }

export { object, camera, spawn, movePosition};