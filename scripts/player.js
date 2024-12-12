import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import * as level from './level.js';
import * as inventory from './inventory.js';
import * as itemManager from './itemManager.js';


const camera = new THREE.PerspectiveCamera(50, document.getElementById('game').clientWidth / document.getElementById('game').clientHeight, 0.1, 1000);
const object = new THREE.Object3D();
var toPosition = new THREE.Vector3();
var toRotation = new THREE.Vector3();
var playerPosition = [0,0];
var playerDirectionReal = 0;
var health = 100;

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
}


function changePosition(){
    let playerDirection;

    level.levelMatrix[playerPosition[0]][playerPosition[1]] = 0;

    if (keys.ArrowLeft){
        --playerDirectionReal;
    };

    if (keys.ArrowRight){
        ++playerDirectionReal;
    };

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
            if (keys.Enter && (typeof level.levelMatrix[playerPosition[0]+1][playerPosition[1]] === "object"))
                {
                    var object = level.levelMatrix[playerPosition[0]+1][playerPosition[1]]
                    console.log(object)
                    switch (object.constructor.name)
                    {
                        case 'itemBase':
                            inventory.changeInventory(inventory.selectedInventorySlot, object.item)
                            object.destroy()
                            break;
                        case 'enemyBase':
                            object.updatePosition([object.levelPosition[0]+1, object.levelPosition[1]])
                            break;                  
                    }


                };
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
            if (keys.ArrowDown && (level.levelMatrix[playerPosition[0]][playerPosition[1]+1] == 0))
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

export { object, camera, spawn, movePosition, health, setHealth};