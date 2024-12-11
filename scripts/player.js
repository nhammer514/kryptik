import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';

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

const camera = new THREE.PerspectiveCamera(50, document.getElementById('game').clientWidth / document.getElementById('game').clientHeight, 0.1, 1000);
const object = new THREE.Object3D();
var toPosition = new THREE.Vector3();
var toRotation = new THREE.Vector3();


function spawn(_scene){
    _scene.add(object);
    object.add(camera);
    camera.position.setY(4);
}

function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

function changePosition(){
    var direction = new THREE.Vector3();
    direction = camera.getWorldDirection(direction);


    if (keys.ArrowUp){
        toPosition.add(direction.multiplyScalar(16));
    }
    if (keys.ArrowDown){
        toPosition.add(direction.multiplyScalar(-16));
    }

    if (keys.ArrowLeft){
       toRotation.y += degToRad(90);
    }
    if (keys.ArrowRight){
      toRotation.y += degToRad(-90);
    }
}

function movePosition(){
    object.position.x += (toPosition.x - object.position.x) / 10;
    object.position.y += (toPosition.y - object.position.y) / 10;
    object.position.z += (toPosition.z - object.position.z) / 10;

    camera.rotation.x += (toRotation.x - camera.rotation.x) / 10;
    camera.rotation.y += (toRotation.y - camera.rotation.y) / 10;
    camera.rotation.z += (toRotation.z - camera.rotation.z) / 10;
}

window.addEventListener('keydown', (event) => {
    if (keys.hasOwnProperty(event.code)) keys[event.code] = true;
    changePosition();
});

window.addEventListener('keyup', (event) => {
    if (keys.hasOwnProperty(event.code)) keys[event.code] = false;
});

export { object, camera, spawn, movePosition};