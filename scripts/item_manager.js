import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import * as player from './player.js';
import * as level from './level.js';

class item{
    constructor(_name, _sprite){
        this.name = _name;
        this.sprite = _sprite;

    }
};

const itemData = 
{
    potion : new item("Potion", "images/potion.png")
};

function createItem(_scene, _item, position){
    let objectTexture = new THREE.TextureLoader().load(_item.sprite);
    objectTexture.magFilter = THREE.NearestFilter;
    objectTexture.minFilter = THREE.NearestFilter;
    let objectMaterial = new THREE.MeshStandardMaterial({
        map: objectTexture,
        transparent: true
    });
    let objectGeometry = new THREE.PlaneGeometry(8,8);
    let object = new THREE.Mesh(objectGeometry, objectMaterial)
    object.animate = () => { object.lookAt(player.object.position)}
    object.data = _item;
    _scene.add(object);
    level.levelMatrix[position[0]][position[1]] = 3
    object.position.setX(position[0]*16);
    object.position.setZ(position[1]*16);
    object.position.setY(6);
    console.log("Created item: " + object.data.name);
    return object;
};

export { createItem, itemData};