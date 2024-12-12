import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import * as level from './level.js';
import * as main from './main.js';
import * as player from './player.js';

class itemType{
    constructor(_name, _sprite, _action){
        this.name = _name;
        this.sprite = _sprite;
        this.action = _action
    }
};

const itemData = 
{
    potion : new itemType("Potion", "images/potion.png", function(){
        player.setHealth(player.health+25)
    })
};

class itemBase
{
    constructor(_item, _position){
        this.item = _item
        this.texture = new THREE.TextureLoader().load(this.item.sprite);
        this.texture.magFilter = THREE.NearestFilter;
        this.texture.minFilter = THREE.NearestFilter;
        this.material = new THREE.MeshStandardMaterial({map: this.texture, transparent: true});
        this.geometry = new THREE.PlaneGeometry(8,8);
        this.object = new THREE.Mesh(this.geometry, this.material);
        this.levelPosition = _position;
        this.destroy = function(){
            this.material.map.dispose();
            this.material.dispose();
            this.geometry.dispose();
            level.levelMatrix[this.levelPosition[0]][this.levelPosition[1]] = 0
            main.scene.remove(this.object);
        };
        this.animate = () => { this.object.lookAt(player.object.position) };
    }
}

function spawnItem(_scene, _item, _position)
{
    
    level.levelMatrix[_position[0]][_position[1]] = new itemBase(_item, _position);
    let item = level.levelMatrix[_position[0]][_position[1]];

    item.object.position.setY(6);
    item.object.position.setX(_position[0]*16)
    item.object.position.setZ(_position[1]*16)

    _scene.add(item.object)
};

export { spawnItem, itemData};