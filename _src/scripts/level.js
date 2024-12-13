import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';

var levelMatrix = [];

// Floor Textures and Geometry
const floorTexture = new THREE.TextureLoader().load('images/ground.png');
floorTexture.magFilter = THREE.NearestFilter;
floorTexture.minFilter = THREE.NearestFilter;
const floorMaterial = new THREE.MeshStandardMaterial({
    map: floorTexture
})
const floorGeometry = new THREE.PlaneGeometry(16,16);

// Wall Textures and Geometry
const wallTexture = new THREE.TextureLoader().load('images/wall.png');
wallTexture.magFilter = THREE.NearestFilter;
wallTexture.minFilter = THREE.NearestFilter;
const wallMaterial = new THREE.MeshStandardMaterial({
    map: wallTexture
})
const wallGeometry = new THREE.BoxGeometry(16,16,16);

function load(_scene){
    for (let i = 0; i < levelMatrix.length; i++){
        for (let j = 0; j < levelMatrix[i].length; j++){
            let _currentPos = levelMatrix[i][j]
            switch (_currentPos){
                case 0:
                    let floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
                    floorMesh.position.setX((16*i))
                    floorMesh.position.setZ((16*j))
                    floorMesh.rotation.x = -Math.PI / 2;
                    _scene.add(floorMesh)
                break;
                case 1:
                    let wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
                    wallMesh.position.setX((16*i))
                    wallMesh.position.setY(8)
                    wallMesh.position.setZ((16*j))
                    _scene.add(wallMesh)
                break;
            }
        }
    }
}

function drawMapText(){
    let mapString = ""
    for (let i = 0; i < levelMatrix.length; i++){
        mapString = mapString + "<br/>";
        for (let j = 0; j < levelMatrix[i].length; j++){
            mapString = mapString + String(levelMatrix[i][j]) + ", ";
        }
    }
    return mapString;
}

function generate(levelSize){
    for (let i = 0; i < levelSize; i++){
        levelMatrix[i] = [];
        for (let j = 0; j < levelSize; j++){
            levelMatrix[i][j] = 0;
        }
    }
    for (let dy = 0; dy < levelSize; dy++){
        levelMatrix[dy][0] = 1;
    }
    for (let dy = 0; dy < levelSize; dy++){
        levelMatrix[dy][2] = 1;
    }
    for (let dy = 0; dy < levelSize; dy++){
        levelMatrix[dy][9] = 1;
    }
    for (let dx = 0; dx < levelSize; dx++){
        levelMatrix[0][dx] = 1;
    }
    for (let dx = 0; dx < levelSize; dx++){
        levelMatrix[9][dx] = 1;
    }
    for (let dx = 0; dx < levelSize; dx++){
        levelMatrix[7][dx] = 1;
    }
    for (let dx = 0; dx < levelSize; dx++){
        levelMatrix[5][dx] = 1;
    }
    levelMatrix[5][1] = 0;
    levelMatrix[6][2] = 0;
    levelMatrix[5][5] = 0;
    levelMatrix[7][7] = 0;
}

export { generate, load, levelMatrix, drawMapText};