import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import * as level from './level.js';

var playerPosition = [0,0];
var playerDirectionReal = 0
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

const camera = new THREE.PerspectiveCamera(80, document.getElementById('game').clientWidth / document.getElementById('game').clientHeight, 0.1, 1000);
const object = new THREE.Object3D();
var toPosition = new THREE.Vector3();
var toRotation = new THREE.Vector3();

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
}

function changePosition(){
    let playerDirection;

    level.levelMatrix[playerPosition[0]][playerPosition[1]] = 0
    if (keys.ArrowLeft){
        --playerDirectionReal;
    }
    if (keys.ArrowRight){
        ++playerDirectionReal;
    }

    playerDirection = () => {
        if (playerDirectionReal < 0) { return ((4-(Math.abs(playerDirectionReal) % 4))) }
        else { return (Math.abs(playerDirectionReal % 4)) }
    }
    switch (((playerDirection()))){
        case 0:
            if (keys.ArrowUp && (level.levelMatrix[playerPosition[0]+1][playerPosition[1]] == 0))
                { playerPosition[0] = playerPosition[0] + 1};
            if (keys.ArrowDown && (level.levelMatrix[playerPosition[0]-1][playerPosition[1]] == 0))
                { playerPosition[0] = playerPosition[0] - 1};
            break;
        case 4:
            if (keys.ArrowUp && (level.levelMatrix[playerPosition[0]+1][playerPosition[1]] == 0))
                { playerPosition[0] = playerPosition[0] + 1};
            if (keys.ArrowDown && (level.levelMatrix[playerPosition[0]-1][playerPosition[1]] == 0))
                { playerPosition[0] = playerPosition[0] - 1};
            break;
        case 1:
            if (keys.ArrowUp && (level.levelMatrix[playerPosition[0]][playerPosition[1]+1] == 0))
                { playerPosition[1] = playerPosition[1] + 1};
            if (keys.ArrowDown && (level.levelMatrix[playerPosition[0]][playerPosition[1]-1] == 0))
                { playerPosition[1] = playerPosition[1] - 1};
            break;
        case 2:
            if (keys.ArrowUp && (level.levelMatrix[playerPosition[0]-1][playerPosition[1]] == 0))
                { playerPosition[0] = playerPosition[0] - 1};
            if (keys.ArrowDown && (level.levelMatrix[playerPosition[0]+1][playerPosition[1]] == 0))
                { playerPosition[0] = playerPosition[0] + 1};
            break;
        case 3:
            if (keys.ArrowUp && (level.levelMatrix[playerPosition[0]][playerPosition[1]-1] == 0))
                { playerPosition[1] = playerPosition[1] - 1};
            if (keys.ArrowDown && (level.levelMatrix[playerPosition[0]][playerPosition[1]-1] == 0))
                { playerPosition[1] = playerPosition[1] + 1};
            break;
    }
    level.levelMatrix[playerPosition[0]][playerPosition[1]] = 2
    toRotation.y = -(playerDirectionReal*90) * (Math.PI/180)
    toPosition.x = playerPosition[0]*16
    toPosition.z = playerPosition[1]*16
}

function movePosition(){
    object.position.x += (toPosition.x - object.position.x) / 10;
    object.position.z += (toPosition.z - object.position.z) / 10;
    camera.rotation.y += (toRotation.y - camera.rotation.y) / 10;

}

export { object, camera, spawn, movePosition};